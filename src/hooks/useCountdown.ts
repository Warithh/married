import { useEffect, useState } from 'react'

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function getParts(target: Date): CountdownParts {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }

  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: false,
  }
}

export function useCountdown(target: Date): CountdownParts {
  const [parts, setParts] = useState(() => getParts(target))

  useEffect(() => {
    setParts(getParts(target))
    const id = window.setInterval(() => setParts(getParts(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return parts
}
