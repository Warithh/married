import { prefersReducedMotion } from '../lib/splitText'

const DOTS = Array.from({ length: 40 }, (_, i) => {
  const col = i % 8
  const row = Math.floor(i / 8)
  return {
    x: 6 + col * 12 + ((i * 7) % 5),
    y: 8 + row * 17 + ((i * 11) % 7),
    s: 2 + (i % 3),
    d: (i % 10) * 0.35,
    dur: 3.2 + (i % 6) * 0.45,
  }
})

type Props = {
  active: boolean
}

/** Lightweight CSS gold sparkles — no WebGL. */
export function SparkleBackground({ active }: Props) {
  const reduced = prefersReducedMotion()

  return (
    <div
      className={`sparkles${active ? ' sparkles--on' : ''}${reduced ? ' sparkles--static' : ''}`}
      aria-hidden="true"
    >
      <div className="sparkles__wash" />
      {DOTS.map((dot, i) => (
        <span
          key={i}
          className="sparkles__dot"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.s}px`,
            height: `${dot.s}px`,
            animationDelay: `${dot.d}s`,
            animationDuration: `${dot.dur}s`,
          }}
        />
      ))}
    </div>
  )
}
