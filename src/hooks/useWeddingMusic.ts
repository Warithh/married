import { useCallback, useEffect, useRef, useState } from 'react'
import { audioUrl } from '../config/content'

type MusicApi = {
  isPlaying: boolean
  hasOpened: boolean
  openWithMusic: () => void
  openSilent: () => void
  toggle: () => void
}

export function useWeddingMusic(): MusicApi {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    const audio = new Audio(audioUrl)
    audio.loop = true
    audio.volume = 0.45
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const openWithMusic = useCallback(() => {
    setHasOpened(true)
    play()
  }, [play])

  const openSilent = useCallback(() => {
    setHasOpened(true)
    pause()
  }, [pause])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, pause, play])

  return { isPlaying, hasOpened, openWithMusic, openSilent, toggle }
}
