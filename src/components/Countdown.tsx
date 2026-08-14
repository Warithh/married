import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { weddingDate } from '../config/content'
import { prefersReducedMotion } from '../lib/splitText'

gsap.registerPlugin(ScrollTrigger)

type Parts = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function getParts(target: Date): Parts {
  const diff = Math.max(0, target.getTime() - Date.now())
  const totalSec = Math.floor(diff / 1000)
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60
  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  }
}

function FlipDigit({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)

  useLayoutEffect(() => {
    if (prev.current === value || !ref.current) {
      prev.current = value
      return
    }
    const el = ref.current
    if (prefersReducedMotion()) {
      el.textContent = value
      prev.current = value
      return
    }
    const tl = gsap.timeline({
      onComplete: () => {
        prev.current = value
      },
    })
    tl.to(el, { yPercent: -110, opacity: 0, duration: 0.28, ease: 'power2.in' })
      .add(() => {
        el.textContent = value
      })
      .set(el, { yPercent: 110 })
      .to(el, { yPercent: 0, opacity: 1, duration: 0.38, ease: 'power3.out' })
    return () => {
      tl.kill()
    }
  }, [value])

  return (
    <span className="flip">
      <span className="flip__inner" ref={ref}>
        {value}
      </span>
    </span>
  )
}

function FlipGroup({ value, label }: { value: string; label: string }) {
  return (
    <div className="countdown__unit">
      <div className="countdown__digits" aria-hidden="true">
        {value.split('').map((d, i) => (
          <FlipDigit key={`${label}-${i}`} value={d} />
        ))}
      </div>
      <span className="countdown__label">{label}</span>
    </div>
  )
}

export function Countdown() {
  const ref = useRef<HTMLElement>(null)
  const [parts, setParts] = useState<Parts>(() => getParts(weddingDate))

  useEffect(() => {
    const id = window.setInterval(() => setParts(getParts(weddingDate)), 1000)
    return () => window.clearInterval(id)
  }, [])

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        root.querySelectorAll('.countdown__unit'),
        { opacity: 0, y: 36, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="scene scene--countdown" ref={ref} id="countdown">
      <h2 className="scene__heading">العد التنازلي</h2>
      <div
        className="countdown"
        role="timer"
        aria-live="polite"
        aria-label={`${parts.days} يوم، ${parts.hours} ساعة، ${parts.minutes} دقيقة، ${parts.seconds} ثانية`}
      >
        <FlipGroup value={parts.days} label="يوم" />
        <FlipGroup value={parts.hours} label="ساعة" />
        <FlipGroup value={parts.minutes} label="دقيقة" />
        <FlipGroup value={parts.seconds} label="ثانية" />
      </div>
    </section>
  )
}
