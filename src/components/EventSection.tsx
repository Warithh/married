import {
  content,
  formatDateAr,
  formatTimeAr,
  img,
  weddingDate,
} from '../config/content'

export function EventSection() {
  return (
    <section className="section event" id="event">
      <h2 className="section__title">{content.eventTitle}</h2>
      <p className="section__sub">{content.eventSubtitle}</p>
      <article className="event__card">
        <div
          className="event__photo"
          style={{ backgroundImage: `url(${img.event})` }}
        />
        <div className="event__body">
          <span className="event__badge">{formatTimeAr(weddingDate)}</span>
          <h3>{content.eventName}</h3>
          <div className="event__row">
            <span>التاريخ</span>
            <strong>{formatDateAr(weddingDate)}</strong>
          </div>
          <div className="event__row">
            <span>القاعة</span>
            <strong>{content.venueName}</strong>
          </div>
          <div className="event__row">
            <span>العنوان</span>
            <strong>{content.venueAddress}</strong>
          </div>
          <a
            className="event__map"
            href={content.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.mapsLabel}
          </a>
        </div>
      </article>
    </section>
  )
}
