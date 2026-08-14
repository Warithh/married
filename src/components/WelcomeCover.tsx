import { useEffect, useState } from 'react'
import { content, formatDateAr, weddingDate } from '../config/content'

type Props = {
  onOpen: () => void
}

export function WelcomeCover({ onOpen }: Props) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('is-locked')
    return () => document.documentElement.classList.remove('is-locked')
  }, [])

  function open() {
    setVisible(false)
    window.setTimeout(onOpen, 420)
  }

  if (!visible) {
    return <div className="cover cover--exit" aria-hidden="true" />
  }

  return (
    <div className="cover">
      <div className="cover__bg" />
      <div className="cover__glow" />
      <div className="cover__card">
        <p className="cover__heart" aria-hidden="true">
          ❤
        </p>
        <h1 className="cover__title">{content.coverTitle}</h1>
        <p className="cover__names">
          {content.brideName} & {content.groomName}
        </p>
        <div className="cover__rule" aria-hidden="true" />
        <p className="cover__to">{content.coverTo}</p>
        <p className="cover__guest">{content.coverGuest}</p>
        <p className="cover__message">{content.coverMessage}</p>
        <p className="cover__date">{formatDateAr(weddingDate)}</p>
        <button type="button" className="cover__btn" onClick={open}>
          {content.openInvite}
        </button>
      </div>
    </div>
  )
}
