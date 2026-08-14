import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { content } from '../config/content'
import { prefersReducedMotion } from '../lib/splitText'

type Props = {
  onComplete: () => void
}

export function OpeningCard({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const finished = useRef(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root || finished.current) return

    const finish = () => {
      if (finished.current) return
      finished.current = true
      setDone(true)
      onComplete()
    }

    const reduced = prefersReducedMotion()
    const monogram = root.querySelector('.opening__mono')
    const line = root.querySelector('.opening__line')

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: finish,
    })

    if (reduced) {
      tl.to(root, { opacity: 0, duration: 0.6, delay: 0.4 })
      return () => {
        tl.kill()
      }
    }

    tl.fromTo(
      monogram,
      { opacity: 0, scale: 0.86, filter: 'blur(12px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.4 },
    )
      .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.9 }, '-=0.5')
      .to({}, { duration: 0.55 })
      .to([monogram, line], { opacity: 0, filter: 'blur(8px)', duration: 0.7 })
      .to(root, { yPercent: -100, duration: 1.05, ease: 'power3.inOut' }, '-=0.15')

    return () => {
      tl.kill()
    }
  }, [onComplete])

  if (done) return null

  return (
    <div className="opening" ref={rootRef} aria-hidden="true">
      <div className="opening__glow" />
      <p className="opening__mono">{content.monogram}</p>
      <span className="opening__line" />
    </div>
  )
}
