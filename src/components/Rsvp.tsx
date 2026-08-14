import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../config/content'
import { confirmAttendance, hasConfirmedLocally } from '../lib/rsvp'
import { prefersReducedMotion } from '../lib/splitText'

gsap.registerPlugin(ScrollTrigger)

function burstParticles(host: HTMLElement) {
  const count = 18
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span')
    p.className = 'rsvp__spark'
    host.appendChild(p)
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2
    const dist = 36 + Math.random() * 48
    gsap.fromTo(
      p,
      { x: 0, y: 0, opacity: 1, scale: 0.4 },
      {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 1,
        duration: 0.7 + Math.random() * 0.25,
        ease: 'power2.out',
        onComplete: () => p.remove(),
      },
    )
  }
}

export function Rsvp() {
  const ref = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [confirmed, setConfirmed] = useState(() => hasConfirmedLocally())
  const [busy, setBusy] = useState(false)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelector('.rsvp__panel'),
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  async function onConfirm() {
    if (confirmed || busy) return
    setBusy(true)
    const result = await confirmAttendance()
    setBusy(false)
    if (!result.ok && result.message === 'network') {
      setBusy(false)
      return
    }

    setConfirmed(true)
    const btn = btnRef.current
    if (!btn || prefersReducedMotion()) return

    const label = btn.querySelector('.rsvp__label')
    const check = btn.querySelector('.rsvp__check')
    burstParticles(btn)

    gsap
      .timeline()
      .to(btn, { borderRadius: '999px', width: 64, padding: 0, duration: 0.45, ease: 'power2.inOut' })
      .to(label, { opacity: 0, y: -8, duration: 0.2 }, 0)
      .fromTo(
        check,
        { scale: 0, opacity: 0, rotate: -20 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.45, ease: 'back.out(1.6)' },
        0.25,
      )
  }

  return (
    <section className="scene scene--rsvp" ref={ref} id="rsvp">
      <div className="rsvp__panel">
        <h2 className="scene__heading">تأكيد الحضور</h2>
        <p className="rsvp__hint">اضغط للتأكيد — مرة واحدة فقط</p>
        <button
          ref={btnRef}
          type="button"
          className={`rsvp__btn${confirmed ? ' rsvp__btn--done' : ''}`}
          onClick={() => void onConfirm()}
          disabled={confirmed || busy}
          aria-live="polite"
        >
          <span className="rsvp__label">{confirmed ? content.rsvpDone : content.rsvpLabel}</span>
          <span className="rsvp__check" aria-hidden="true">
            ✓
          </span>
        </button>
      </div>
    </section>
  )
}
