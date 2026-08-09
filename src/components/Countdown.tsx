import { event } from '../config/event'
import { useCountdown } from '../hooks/useCountdown'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function Countdown() {
  const parts = useCountdown(event.startsAt)

  if (parts.done) {
    return <p className="countdown-done">بدأ الحفل… أهلاً بكم</p>
  }

  const units = [
    { value: parts.days, label: 'يوم' },
    { value: parts.hours, label: 'ساعة' },
    { value: parts.minutes, label: 'دقيقة' },
    { value: parts.seconds, label: 'ثانية' },
  ]

  return (
    <div className="countdown" dir="ltr" aria-live="polite">
      {units.map((unit) => (
        <div className="countdown__unit" key={unit.label}>
          <span className="countdown__value">{pad(unit.value)}</span>
          <span className="countdown__label">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}
