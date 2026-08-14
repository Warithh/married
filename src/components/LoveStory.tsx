import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../config/content'
import { prefersReducedMotion } from '../lib/splitText'

gsap.registerPlugin(ScrollTrigger)

export function LoveStory() {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const lines = Array.from(root.querySelectorAll<HTMLElement>('.story__line'))
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(lines, { opacity: 1, y: 0, filter: 'none' })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${window.innerHeight * lines.length * 0.85}`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
        },
      })

      lines.forEach((line, i) => {
        tl.fromTo(
          line,
          { opacity: 0, y: 48, filter: 'blur(8px)', scale: 0.98 },
          { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 1 },
          i,
        )
        if (i < lines.length - 1) {
          tl.to(
            line,
            { opacity: 0, y: -36, filter: 'blur(6px)', duration: 0.85 },
            i + 0.75,
          )
        }
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="scene scene--story" ref={ref} id="story" aria-label="قصة الحب">
      <div className="story__stage">
        {content.loveStory.map((line) => (
          <p key={line} className="story__line">
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}
