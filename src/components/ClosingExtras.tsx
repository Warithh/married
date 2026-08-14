import { calendarUrl, content, weddingDate } from '../config/content'

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
      <a
        className="reminder__btn"
        href={calendarUrl(weddingDate)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.calendarLabel}
      </a>
    </section>
  )
}

export function ClosingSection() {
  return (
    <section className="section closing">
      <p className="closing__mono">{content.monogram}</p>
      <h2 className="closing__title">{content.closingTitle}</h2>
      <p className="closing__line">{content.closingLine}</p>
      <p className="closing__names">
        {content.brideName} & {content.groomName}
      </p>
    </section>
  )
}
