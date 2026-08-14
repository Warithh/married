import { useState, type FormEvent } from 'react'
import { content } from '../config/content'
import { confirmAttendance, hasConfirmedLocally } from '../lib/rsvp'

const ERRORS: Record<string, string> = {
  network: 'تعذر إرسال التأكيد، حاول مرة أخرى',
  config: 'خدمة التأكيد غير جاهزة حالياً',
  validation: 'يرجى إدخال الاسم واختيار الحضور',
}

export function RsvpSection() {
  const [name, setName] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(() => hasConfirmedLocally())

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (done || busy) return
    if (!name.trim() || !attending) {
      setError(ERRORS.validation)
      return
    }
    setBusy(true)
    setError('')
    const result = await confirmAttendance({
      guestName: name.trim(),
      attending: attending === 'yes',
    })
    setBusy(false)
    if (!result.ok) {
      setError(ERRORS[result.message] ?? ERRORS.network)
      return
    }
    setDone(true)
  }

  return (
    <section className="section rsvp" id="rsvp">
      <h2 className="section__title">{content.rsvpTitle}</h2>
      <p className="section__sub">{content.rsvpSubtitle}</p>

      {done ? (
        <p className="rsvp__done">✓ {content.rsvpDone}</p>
      ) : (
        <form className="rsvp__form" onSubmit={(e) => void onSubmit(e)}>
          <label className="rsvp__field">
            <span>{content.rsvpNamePlaceholder}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              required
              autoComplete="name"
            />
          </label>

          <div className="rsvp__choices" role="radiogroup" aria-label="تأكيد الحضور">
            <label className={`rsvp__choice${attending === 'yes' ? ' is-on' : ''}`}>
              <input
                type="radio"
                name="attend"
                checked={attending === 'yes'}
                onChange={() => setAttending('yes')}
              />
              {content.rsvpAttend}
            </label>
            <label className={`rsvp__choice${attending === 'no' ? ' is-on' : ''}`}>
              <input
                type="radio"
                name="attend"
                checked={attending === 'no'}
                onChange={() => setAttending('no')}
              />
              {content.rsvpAbsent}
            </label>
          </div>

          <button type="submit" className="rsvp__btn" disabled={busy}>
            {busy ? 'جاري الإرسال…' : content.rsvpSubmit}
          </button>
          <p className="rsvp__hint">{content.rsvpHint}</p>
          {error ? (
            <p className="rsvp__error" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      )}
    </section>
  )
}
