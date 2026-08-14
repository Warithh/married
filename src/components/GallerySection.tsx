import { content, img } from '../config/content'

export function GallerySection() {
  return (
    <section className="section gallery">
      <h2 className="section__title">{content.galleryTitle}</h2>
      <p className="section__sub">{content.gallerySubtitle}</p>
      <div className="gallery__grid">
        {img.gallery.map((src, i) => (
          <div
            key={src}
            className="gallery__item"
            style={{ backgroundImage: `url(${src})` }}
            role="img"
            aria-label={`تفاصيل زفاف ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
