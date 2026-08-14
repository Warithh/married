import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../config/content'
import { prefersReducedMotion, splitChars, splitWords } from '../lib/splitText'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const reduced = prefersReducedMotion()
    const names = root.querySelectorAll<HTMLElement>('.hero__name')
    const and = root.querySelector<HTMLElement>('.hero__and')
    const invite = root.querySelector<HTMLElement>('.hero__invite')
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([names, and, invite], { opacity: 1, filter: 'none', y: 0 })
        return
      }

      names.forEach((el) => {
        const chars = splitChars(el)
        gsap.fromTo(
          chars,
          { opacity: 0, yPercent: 110, filter: 'blur(10px)' },
          {
            opacity: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: root,
              start: 'top 75%',
              once: true,
            },
          },
        )
      })

      if (and) {
        gsap.fromTo(
          and,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: 0.45,
            ease: 'power2.out',
            scrollTrigger: { trigger: root, start: 'top 75%', once: true },
          },
        )
      }

      if (invite) {
        const words = splitWords(invite)
        gsap.fromTo(
          words,
          { opacity: 0, y: 28, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: { trigger: root, start: 'top 55%', once: true },
          },
        )
      }

      gsap.fromTo(
        root,
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="scene scene--hero" ref={ref} id="hero">
      <p className="hero__eyebrow">حفل زفاف</p>
      <h1 className="hero__title">
        <span className="hero__name">{content.brideName}</span>
        <span className="hero__and">&</span>
        <span className="hero__name">{content.groomName}</span>
      </h1>
      <p className="hero__invite">{content.inviteText}</p>
    </section>
  )
}
