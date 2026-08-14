import { content } from '../config/content'

export function FamilySection() {
  return (
    <section className="section family">
      <h2 className="section__title">{content.familyTitle}</h2>
      <p className="section__sub">{content.familySubtitle}</p>
      <div className="family__grid">
        <article className="family__card">
          <h3>{content.brideSide}</h3>
          <p>{content.brideParents}</p>
        </article>
        <article className="family__card">
          <h3>{content.groomSide}</h3>
          <p>{content.groomParents}</p>
        </article>
      </div>
    </section>
  )
}
