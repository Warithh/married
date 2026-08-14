import { useEffect, useState } from 'react'
import { content, formatDateAr, weddingDate } from '../config/content'

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const diff = Math.max(0, target.getTime() - now)
  const total = Math.floor(diff / 1000)
  return {
    days: pad(Math.floor(total / 86400)),
    hours: pad(Math.floor((total % 86400) / 3600)),
    minutes: pad(Math.floor((total % 3600) / 60)),
    seconds: pad(total % 60),
  }
}

export function HeroSection() {
  const t = useCountdown(weddingDate)

  return (
    <section className="hero" id="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${(i * 17) % 100}%`,
              animationDelay: `${(i % 9) * 0.7}s`,
              animationDuration: `${10 + (i % 6)}s`,
            }}
          />
        ))}
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">حفل زفاف</p>
        <div className="hero__line" />
        <h1 className="hero__names">
          <span>{content.brideName}</span>
          <span className="hero__amp">&</span>
          <span>{content.groomName}</span>
        </h1>
        <p className="hero__date">{formatDateAr(weddingDate)}</p>
        <div className="hero__countdown" role="timer" aria-live="polite">
          <div>
            <strong>{t.days}</strong>
            <span>يوم</span>
          </div>
          <div>
            <strong>{t.hours}</strong>
            <span>ساعة</span>
          </div>
          <div>
            <strong>{t.minutes}</strong>
            <span>دقيقة</span>
          </div>
          <div>
            <strong>{t.seconds}</strong>
            <span>ثانية</span>
          </div>
        </div>
        <p className="hero__scroll">مرّر للاحتفال</p>
      </div>
    </section>
  )
}
