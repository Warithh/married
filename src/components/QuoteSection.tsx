import { content } from '../config/content'

export function QuoteSection() {
  return (
    <section className="section quote" id="quote">
      <p className="quote__label">{content.quoteLabel}</p>
      <p className="quote__text">{content.quote}</p>
      <p className="quote__invite">{content.inviteText}</p>
    </section>
  )
}
