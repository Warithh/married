import { useEffect, useState, type FormEvent } from 'react'
import { content } from '../config/content'
import { loadWishes, submitWish, type Wish } from '../lib/rsvp'

export function WishesSection() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [list, setList] = useState<Wish[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    void loadWishes().then(setList)
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim() || busy) return
    setBusy(true)
    setError('')
    try {
      const next = await submitWish(name.trim(), message.trim())
      setList(next)
      setName('')
      setMessage('')
    } catch {
      setError('تعذر إرسال الرسالة')
    }
    setBusy(false)
  }

  return (
    <section className="section wishes">
      <h2 className="section__title">{content.wishesTitle}</h2>
      <p className="section__sub">{content.wishesSubtitle}</p>

      <form className="wishes__form" onSubmit={(e) => void onSubmit(e)}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={content.wishesNamePlaceholder}
          maxLength={60}
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={content.wishesTextPlaceholder}
          rows={4}
          maxLength={400}
          required
        />
        <button type="submit" disabled={busy}>
          {busy ? '...' : content.wishesSubmit}
        </button>
        {error ? <p className="rsvp__error">{error}</p> : null}
      </form>

      <div className="wishes__list">
        {list.map((w) => (
          <article key={`${w.createdAt}-${w.name}`} className="wishes__item">
            <h3>{w.name}</h3>
            <p>{w.message}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
