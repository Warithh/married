import { content } from '../config/content'

export function QuoteSection() {
  return (
    <section className="section quote">
      <p className="quote__label">{content.quoteLabel}</p>
      <blockquote className="quote__text">{content.quote}</blockquote>
      <p className="quote__source">{content.quoteSource}</p>
      <p className="quote__invite">{content.inviteText}</p>
    </section>
  )
}
