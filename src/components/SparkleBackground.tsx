import { prefersReducedMotion } from '../lib/splitText'

const DOTS = [
  { x: 8, y: 12, s: 2, d: 0.2, dur: 4.2 },
  { x: 18, y: 28, s: 3, d: 1.1, dur: 5.1 },
  { x: 27, y: 8, s: 2, d: 2.4, dur: 3.8 },
  { x: 36, y: 42, s: 2.5, d: 0.7, dur: 4.8 },
  { x: 44, y: 18, s: 2, d: 3.1, dur: 5.4 },
  { x: 52, y: 55, s: 3, d: 1.6, dur: 4.1 },
  { x: 61, y: 22, s: 2, d: 0.4, dur: 5.8 },
  { x: 72, y: 14, s: 2.5, d: 2.8, dur: 3.9 },
  { x: 81, y: 38, s: 2, d: 1.9, dur: 4.6 },
  { x: 88, y: 9, s: 3, d: 0.9, dur: 5.2 },
  { x: 12, y: 62, s: 2, d: 3.4, dur: 4.4 },
  { x: 22, y: 74, s: 2.5, d: 1.3, dur: 5.6 },
  { x: 33, y: 68, s: 2, d: 2.1, dur: 3.7 },
  { x: 41, y: 82, s: 3, d: 0.5, dur: 4.9 },
  { x: 55, y: 71, s: 2, d: 2.6, dur: 5.3 },
  { x: 64, y: 86, s: 2.5, d: 1.8, dur: 4.0 },
  { x: 76, y: 64, s: 2, d: 0.3, dur: 5.7 },
  { x: 85, y: 78, s: 3, d: 3.0, dur: 4.3 },
  { x: 93, y: 52, s: 2, d: 1.4, dur: 5.0 },
  { x: 6, y: 46, s: 2.5, d: 2.2, dur: 3.6 },
  { x: 15, y: 88, s: 2, d: 0.8, dur: 4.7 },
  { x: 48, y: 6, s: 3, d: 2.9, dur: 5.5 },
  { x: 58, y: 34, s: 2, d: 1.0, dur: 4.2 },
  { x: 68, y: 48, s: 2.5, d: 3.3, dur: 3.8 },
  { x: 78, y: 26, s: 2, d: 0.6, dur: 5.1 },
  { x: 92, y: 31, s: 3, d: 2.0, dur: 4.5 },
  { x: 4, y: 33, s: 2, d: 1.7, dur: 5.9 },
  { x: 29, y: 51, s: 2.5, d: 0.1, dur: 4.1 },
  { x: 39, y: 29, s: 2, d: 2.5, dur: 3.9 },
  { x: 49, y: 91, s: 3, d: 1.5, dur: 5.4 },
  { x: 70, y: 7, s: 2, d: 3.2, dur: 4.8 },
  { x: 83, y: 91, s: 2.5, d: 0.95, dur: 5.2 },
  { x: 96, y: 67, s: 2, d: 2.7, dur: 3.5 },
  { x: 25, y: 39, s: 3, d: 1.2, dur: 4.6 },
  { x: 57, y: 15, s: 2, d: 2.3, dur: 5.0 },
  { x: 14, y: 21, s: 2.5, d: 0.55, dur: 4.3 },
] as const

type Props = {
  active: boolean
}

/** Lightweight CSS gold sparkles — no WebGL. */
export function SparkleBackground({ active }: Props) {
  const reduced = prefersReducedMotion()

  if (!active) return null

  return (
    <div
      className={`sparkles${reduced ? ' sparkles--static' : ''}`}
      aria-hidden="true"
    >
      <div className="sparkles__wash" />
      {!reduced &&
        DOTS.map((dot, i) => (
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
