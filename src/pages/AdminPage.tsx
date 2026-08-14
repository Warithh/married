import { useEffect, useState } from 'react'
import { getRsvpCount } from '../lib/rsvp'

export function AdminPage() {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    void (async () => {
      const n = await getRsvpCount()
      if (!alive) return
      if (n === null) {
        setError(
          'تعذر قراءة العدد. تأكد من إعداد Firebase (ملف .env) وتفعيل Firestore.',
        )
      } else {
        setCount(n)
      }
      setLoading(false)
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <main className="admin">
      <h1 className="admin__title">لوحة التأكيدات</h1>
      {loading && <p className="admin__meta">جاري التحميل…</p>}
      {!loading && error && <p className="admin__error">{error}</p>}
      {!loading && !error && (
        <p className="admin__count">
          <span className="admin__number">{count}</span>
          <span className="admin__label">تأكيد حضور</span>
        </p>
      )}
      <a className="admin__back" href="#/">
        العودة للدعوة
      </a>
    </main>
  )
}
