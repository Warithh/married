import { content, downloadCalendarEvent, weddingDate } from '../config/content'
import { LogoMark } from './LogoMark'

export function GiftSection() {
  return (
    <section className="section gift">
      <h2 className="section__title">{content.giftTitle}</h2>
      <p className="section__sub">{content.giftText}</p>
    </section>
  )
}

export function ReminderSection() {
  return (
    <section className="section reminder">
      <h2 className="section__title">{content.reminderTitle}</h2>
      <p className="section__sub">{content.reminderText}</p>
      <button
        type="button"
        className="reminder__btn"
        onClick={() => downloadCalendarEvent(weddingDate)}
      >
        {content.calendarLabel}
      </button>
    </section>
  )
}

export function ClosingSection() {
  return (
    <section className="section closing">
      <LogoMark className="closing__logo" contrast />
      <h2 className="closing__title">{content.closingTitle}</h2>
      <p className="closing__line">{content.closingLine}</p>
      <p className="closing__names">
        {content.brideName} & {content.groomName}
      </p>
    </section>
  )
}
