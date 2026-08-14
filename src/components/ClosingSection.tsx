import { content } from '../config/content'

export function ClosingSection() {
  return (
    <section className="section closing" id="closing">
      <p className="closing__mono">{content.monogram}</p>
      <h2 className="closing__title">{content.closingTitle}</h2>
      <p className="closing__line">{content.closingLine}</p>
      <p className="closing__names">
        {content.brideName} & {content.groomName}
      </p>
    </section>
  )
}
