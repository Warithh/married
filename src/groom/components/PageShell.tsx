import { Link, useLocation } from 'react-router-dom'
import { getAdjacent, pages } from '../config/event'
import { useInviteNavigation } from '../hooks/useInviteNavigation'
import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
  showNext?: boolean
  nextLabel?: string
}

export function PageShell({
  children,
  showNext = true,
  nextLabel = 'التالي',
}: PageShellProps) {
  useInviteNavigation()
  const location = useLocation()
  const { prev, next, index, total } = getAdjacent(location.pathname)

  return (
    <div className="stage">
      <article className="sheet">
        <div className="sheet__body">{children}</div>

        <nav className="sheet__nav" aria-label="التنقل بين صفحات الدعوة">
          <div
            className="progress"
            style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
            aria-hidden="true"
          >
            {pages.map((page, i) => (
              <span
                key={page.path}
                className={`progress__seg ${i <= index ? 'is-on' : ''}`}
              />
            ))}
          </div>

          <div className="sheet__controls">
            {prev ? (
              <Link className="btn btn--ghost" to={prev} state={{ dir: -1 }}>
                السابق
              </Link>
            ) : (
              <span className="btn btn--ghost btn--hidden" aria-hidden="true">
                السابق
              </span>
            )}

            <span className="sheet__index">
              {index + 1} / {total}
            </span>

            {showNext && next ? (
              <Link className="btn btn--solid" to={next} state={{ dir: 1 }}>
                {nextLabel}
              </Link>
            ) : (
              <span className="btn btn--solid btn--hidden" aria-hidden="true">
                {nextLabel}
              </span>
            )}
          </div>
        </nav>
      </article>
    </div>
  )
}
