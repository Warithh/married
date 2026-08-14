import { useEffect, useState } from 'react'
import { content, formatDateAr, img, weddingDate } from '../config/content'

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const total = Math.max(0, Math.floor((target.getTime() - now) / 1000))
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
      <div className="hero__photo" style={{ backgroundImage: `url(${img.hero})` }} />
      <div className="hero__veil" />
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${(i * 13) % 100}%`,
              animationDelay: `${(i % 10) * 0.55}s`,
              animationDuration: `${11 + (i % 7)}s`,
            }}
          />
        ))}
      </div>
      <div className="hero__content">
        <p className="hero__eyebrow">{content.heroEyebrow}</p>
        <div className="hero__line" />
        <h1 className="hero__names">
          <span>{content.brideName}</span>
          <span className="hero__amp">&</span>
          <span>{content.groomName}</span>
        </h1>
        <p className="hero__date">{formatDateAr(weddingDate)}</p>
        <div className="hero__countdown" role="timer">
          {[
            [t.days, 'يوم'],
            [t.hours, 'ساعة'],
            [t.minutes, 'دقيقة'],
            [t.seconds, 'ثانية'],
          ].map(([v, l]) => (
            <div key={String(l)}>
              <strong>{v}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <p className="hero__scroll">{content.scrollHint}</p>
      </div>
    </section>
  )
}
