import { content } from '../config/content'

export function StorySection() {
  return (
    <section className="section story">
      <h2 className="section__title">{content.storyTitle}</h2>
      <p className="section__sub">{content.storySubtitle}</p>
      <div className="story__list">
        {content.stories.map((item) => (
          <article className="story__card" key={item.title}>
            <div
              className="story__img"
              style={{ backgroundImage: `url(${item.image})` }}
              role="img"
              aria-label={item.title}
            />
            <p className="story__date">{item.date}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
