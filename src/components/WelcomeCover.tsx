import { content, formatDateAr, weddingDate, img } from '../config/content'

type Props = {
  onOpenMusic: () => void
  onOpenSilent: () => void
}

export function WelcomeCover({ onOpenMusic, onOpenSilent }: Props) {
  return (
    <div className="cover">
      <div
        className="cover__bg"
        style={{ backgroundImage: `url(${img.cover})` }}
      />
      <div className="cover__shade" />
      <div className="cover__card">
        <p className="cover__heart" aria-hidden="true">
          ❤
        </p>
        <h1 className="cover__title">{content.coverTitle}</h1>
        <p className="cover__names">
          {content.brideName} & {content.groomName}
        </p>
        <div className="cover__rule" />
        <p className="cover__to">{content.coverTo}</p>
        <p className="cover__guest">{content.coverGuest}</p>
        <p className="cover__message">{content.coverMessage}</p>
        <p className="cover__date">{formatDateAr(weddingDate)}</p>
        <div className="cover__actions">
          <button type="button" className="cover__btn cover__btn--solid" onClick={onOpenMusic}>
            {content.openWithMusic}
          </button>
          <button type="button" className="cover__btn cover__btn--ghost" onClick={onOpenSilent}>
            {content.openSilent}
          </button>
        </div>
      </div>
    </div>
  )
}
