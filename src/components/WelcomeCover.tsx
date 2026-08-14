import { content, formatDateAr, weddingDate, img } from '../config/content'
import { LogoMark } from './LogoMark'

type Props = {
  onOpen: () => void
}

export function WelcomeCover({ onOpen }: Props) {
  return (
    <div className="cover">
      <div className="cover__bg" style={{ backgroundImage: `url(${img.cover})` }} />
      <div className="cover__shade" />
      <div className="cover__card">
        <LogoMark className="cover__logo" />
        <p className="cover__kicker">{content.coverTitle}</p>
        <p className="cover__names">
          <span>{content.brideName}</span>
          <span className="cover__amp">&</span>
          <span>{content.groomName}</span>
        </p>
        <div className="cover__rule" />
        <p className="cover__guest">{content.coverGuest}</p>
        <p className="cover__message">{content.coverMessage}</p>
        <p className="cover__date">{formatDateAr(weddingDate)}</p>
        <button type="button" className="cover__btn" onClick={onOpen}>
          {content.openInvite}
        </button>
      </div>
    </div>
  )
}
