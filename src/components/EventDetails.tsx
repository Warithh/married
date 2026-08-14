import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content, weddingDate } from '../config/content'
import { prefersReducedMotion, splitWords } from '../lib/splitText'

gsap.registerPlugin(ScrollTrigger)

function formatDateAr(date: Date) {
  return new Intl.DateTimeFormat('ar', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

function formatTimeAr(date: Date) {
  return new Intl.DateTimeFormat('ar', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

export function EventDetails() {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const items = root.querySelectorAll<HTMLElement>('.details__item')
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(items, { opacity: 1, clipPath: 'none', y: 0 })
        return
      }

      items.forEach((item) => {
        const value = item.querySelector<HTMLElement>('.details__value')
        const sweep = item.querySelector<HTMLElement>('.details__sweep')
        if (value) splitWords(value)

        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%', once: true },
          },
        )

        if (sweep) {
          gsap.fromTo(
            sweep,
            { xPercent: 120, opacity: 0.7 },
            {
              xPercent: -120,
              opacity: 0,
              duration: 1.15,
              ease: 'power2.inOut',
              scrollTrigger: { trigger: item, start: 'top 78%', once: true },
            },
          )
        }

        if (value) {
          gsap.fromTo(
            value.querySelectorAll('.word'),
            { opacity: 0, yPercent: 100 },
            {
              opacity: 1,
              yPercent: 0,
              duration: 0.7,
              stagger: 0.04,
              ease: 'power2.out',
              scrollTrigger: { trigger: item, start: 'top 78%', once: true },
            },
          )
        }
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const rows = [
    { label: 'التاريخ', value: formatDateAr(weddingDate) },
    { label: 'الوقت', value: formatTimeAr(weddingDate) },
    { label: 'القاعة', value: content.venueName },
    { label: 'الموقع', value: content.venueAddress },
  ]

  return (
    <section className="scene scene--details" ref={ref} id="details">
      <h2 className="scene__heading">تفاصيل الحفل</h2>
      <ul className="details__list">
        {rows.map((row) => (
          <li className="details__item" key={row.label}>
            <span className="details__label">{row.label}</span>
            <span className="details__value">{row.value}</span>
            <span className="details__sweep" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  )
}
