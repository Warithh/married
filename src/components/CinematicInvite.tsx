import { useCallback, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { OpeningCard } from './OpeningCard'
import { ParticleBackground } from './ParticleBackground'
import { Hero } from './Hero'
import { LoveStory } from './LoveStory'
import { EventDetails } from './EventDetails'
import { Countdown } from './Countdown'
import { Rsvp } from './Rsvp'
import { ClosingCard } from './ClosingCard'
import { prefersReducedMotion } from '../lib/splitText'

gsap.registerPlugin(ScrollTrigger)

export function CinematicInvite() {
  const [introDone, setIntroDone] = useState(false)
  const [particlesOn, setParticlesOn] = useState(false)

  const finishIntro = useCallback(() => {
    setIntroDone(true)
    // Defer Three.js until the opening wipe finishes
    window.setTimeout(() => setParticlesOn(true), 120)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', !introDone)
    return () => document.documentElement.classList.remove('is-locked')
  }, [introDone])

  useEffect(() => {
    if (!introDone) return

    const reduced = prefersReducedMotion()
    if (reduced) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.35,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [introDone])

  return (
    <div className={`film${introDone ? ' film--ready' : ''}`}>
      <OpeningCard onComplete={finishIntro} />
      <ParticleBackground active={particlesOn} />
      <div className="film__veil" aria-hidden="true" />
      <main className="film__reel">
        <Hero />
        <LoveStory />
        <EventDetails />
        <Countdown />
        <Rsvp />
        <ClosingCard />
      </main>
    </div>
  )
}
