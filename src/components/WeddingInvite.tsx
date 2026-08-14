import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WelcomeCover } from './WelcomeCover'
import { HeroSection } from './HeroSection'
import { QuoteSection } from './QuoteSection'
import { EventSection } from './EventSection'
import { RsvpSection } from './RsvpSection'
import { ClosingSection } from './ClosingSection'
import { prefersReducedMotion } from '../lib/splitText'

gsap.registerPlugin(ScrollTrigger)

const OPEN_KEY = 'wedding-invite-opened'

export function WeddingInvite() {
  const [opened, setOpened] = useState(() => {
    try {
      return sessionStorage.getItem(OPEN_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!opened || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.section').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          },
        )
      })
    })
    return () => ctx.revert()
  }, [opened])

  function handleOpen() {
    try {
      sessionStorage.setItem(OPEN_KEY, '1')
    } catch {
      /* ignore */
    }
    setOpened(true)
  }

  return (
    <div className="invite">
      {!opened && <WelcomeCover onOpen={handleOpen} />}
      <main className={`invite__main${opened ? ' invite__main--open' : ''}`}>
        <HeroSection />
        <QuoteSection />
        <EventSection />
        <RsvpSection />
        <ClosingSection />
      </main>
    </div>
  )
}
