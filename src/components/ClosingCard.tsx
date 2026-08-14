import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../config/content'
import { prefersReducedMotion } from '../lib/splitText'

gsap.registerPlugin(ScrollTrigger)

export function ClosingCard() {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        root.querySelectorAll('.closing__mono, .closing__line, .closing__text'),
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.18,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 70%', once: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="scene scene--closing" ref={ref} id="closing">
      <p className="closing__mono">{content.monogram}</p>
      <span className="closing__line" aria-hidden="true" />
      <p className="closing__text">{content.closingLine}</p>
      <p className="closing__names">
        {content.brideName} & {content.groomName}
      </p>
    </section>
  )
}
