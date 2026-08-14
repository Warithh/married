import { content, formatDateAr, formatTimeAr, weddingDate } from '../config/content'

export function EventSection() {
  return (
    <section className="section event" id="event">
      <h2 className="section__title">{content.eventTitle}</h2>
      <p className="section__sub">{content.eventSubtitle}</p>
      <div className="event__card">
        <div className="event__badge">{formatTimeAr(weddingDate)}</div>
        <h3 className="event__name">حفل الزفاف</h3>
        <div className="event__row">
          <span className="event__k">التاريخ</span>
          <span className="event__v">{formatDateAr(weddingDate)}</span>
        </div>
        <div className="event__row">
          <span className="event__k">القاعة</span>
          <span className="event__v">{content.venueName}</span>
        </div>
        <div className="event__row">
          <span className="event__k">الموقع</span>
          <span className="event__v">{content.venueAddress}</span>
        </div>
      </div>
    </section>
  )
}
