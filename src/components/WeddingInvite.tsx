import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WelcomeCover } from './WelcomeCover'
import { MusicPlayer } from './MusicPlayer'
import { HeroSection } from './HeroSection'
import { QuoteSection } from './QuoteSection'
import { StorySection } from './StorySection'
import { EventSection } from './EventSection'
import { RsvpSection } from './RsvpSection'
import { WishesSection } from './WishesSection'
import { ClosingSection, GiftSection, ReminderSection } from './ClosingExtras'
import { useWeddingMusic } from '../hooks/useWeddingMusic'
import { prefersReducedMotion } from '../lib/splitText'

gsap.registerPlugin(ScrollTrigger)

export function WeddingInvite() {
  const music = useWeddingMusic()

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', !music.hasOpened)
    return () => document.documentElement.classList.remove('is-locked')
  }, [music.hasOpened])

  useEffect(() => {
    if (!music.hasOpened || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.section').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
      })
    })
    return () => ctx.revert()
  }, [music.hasOpened])

  return (
    <div className="invite">
      {!music.hasOpened && <WelcomeCover onOpen={music.openInvite} />}

      {music.hasOpened && (
        <MusicPlayer playing={music.isPlaying} onToggle={music.toggle} />
      )}

      <main className={`invite__main${music.hasOpened ? ' invite__main--open' : ''}`}>
        <HeroSection />
        <QuoteSection />
        <StorySection />
        <EventSection />
        <RsvpSection />
        <WishesSection />
        <GiftSection />
        <ReminderSection />
        <ClosingSection />
      </main>
    </div>
  )
}
