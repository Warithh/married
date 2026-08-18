import { useEffect, useState } from 'react'
import { getRsvpCount, loadWishes, type Wish } from '../lib/rsvp'

function formatWishDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('ar', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function AdminPage() {
  const [count, setCount] = useState<number | null>(null)
  const [wishes, setWishes] = useState<Wish[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function refresh() {
    setLoading(true)
    setError('')
    const [n, list] = await Promise.all([getRsvpCount(), loadWishes()])
    if (n === null) {
      setError('تعذر قراءة العدد. تأكد من إعداد Supabase وتشغيل SQL لجدول rsvps.')
      setCount(null)
    } else {
      setCount(n)
    }
    setWishes(list)
    setLoading(false)
  }

  useEffect(() => {
    void refresh()
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

      <section className="admin__wishes" aria-label="رسائل الدعاء">
        <h2 className="admin__wishes-title">رسائل الدعاء والتهاني</h2>
        {!loading && wishes.length === 0 ? (
          <p className="admin__meta">لا توجد رسائل بعد</p>
        ) : (
          <ul className="admin__wishes-list">
            {wishes.map((wish) => (
              <li
                key={`${wish.createdAt}-${wish.name}-${wish.message}`}
                className="admin__wish"
              >
                <strong>{wish.name}</strong>
                {wish.createdAt ? (
                  <time dateTime={wish.createdAt}>{formatWishDate(wish.createdAt)}</time>
                ) : null}
                <p>{wish.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button type="button" className="admin__refresh" onClick={() => void refresh()}>
        تحديث
      </button>
      <a className="admin__back" href="#/">
        العودة للدعوة
      </a>
    </main>
  )
}
