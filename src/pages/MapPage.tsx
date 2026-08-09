import { motion } from 'framer-motion'
import { Ornament } from '../components/Ornament'
import { PageShell } from '../components/PageShell'
import { event } from '../config/event'

const ease = [0.22, 1, 0.36, 1] as const

export function MapPage() {
  return (
    <PageShell>
      <motion.p
        className="soft"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        الموقع
      </motion.p>
      <Ornament />
      <motion.p
        className="lead"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease }}
      >
        {event.venue} — {event.district}
      </motion.p>
      <motion.a
        className="btn btn--solid btn--cta"
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.55, ease }}
      >
        افتح في خرائط Google
      </motion.a>
    </PageShell>
  )
}
