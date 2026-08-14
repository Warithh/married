import { useState } from 'react'
import { content } from '../config/content'
import { confirmAttendance, hasConfirmedLocally } from '../lib/rsvp'

const ERROR_COPY: Record<string, string> = {
  network: 'تعذر التأكيد — تحقق من الاتصال وحاول مجدداً',
  config: 'خدمة التأكيد غير جاهزة حالياً',
}

export function RsvpSection() {
  const [confirmed, setConfirmed] = useState(() => hasConfirmedLocally())
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onConfirm() {
    if (confirmed || busy) return
    setBusy(true)
    setError('')
    const result = await confirmAttendance()
    setBusy(false)
    if (!result.ok) {
      setError(ERROR_COPY[result.message] ?? ERROR_COPY.network)
      return
    }
    setConfirmed(true)
  }

  return (
    <section className="section rsvp" id="rsvp">
      <h2 className="section__title">{content.rsvpTitle}</h2>
      <p className="section__sub">{content.rsvpHint}</p>
      <button
        type="button"
        className={`rsvp__btn${confirmed ? ' rsvp__btn--done' : ''}`}
        onClick={() => void onConfirm()}
        disabled={confirmed || busy}
        aria-live="polite"
      >
        {busy ? 'جاري التأكيد…' : confirmed ? `✓ ${content.rsvpDone}` : content.rsvpLabel}
      </button>
      {error ? (
        <p className="rsvp__error" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  )
}
