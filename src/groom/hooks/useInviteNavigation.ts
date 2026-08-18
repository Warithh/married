import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAdjacent } from '../config/event'

export function useInviteNavigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { prev, next } = getAdjacent(pathname)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    const go = (path: string, dir: 1 | -1) => {
      navigate(path, { state: { dir } })
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && next) go(next, 1)
      if (event.key === 'ArrowRight' && prev) go(prev, -1)
    }

    const onTouchStart = (event: TouchEvent) => {
      touchX.current = event.changedTouches[0]?.clientX ?? null
    }

    const onTouchEnd = (event: TouchEvent) => {
      if (touchX.current == null) return
      const endX = event.changedTouches[0]?.clientX ?? touchX.current
      const delta = endX - touchX.current
      touchX.current = null
      if (Math.abs(delta) < 56) return
      if (delta < 0 && next) go(next, 1)
      if (delta > 0 && prev) go(prev, -1)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [navigate, next, prev])
}
