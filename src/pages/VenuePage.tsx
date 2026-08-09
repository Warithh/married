import { motion } from 'framer-motion'
import { Ornament } from '../components/Ornament'
import { PageShell } from '../components/PageShell'
import { event } from '../config/event'

export function VenuePage() {
  return (
    <PageShell>
      <motion.p
        className="soft"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        المكان
      </motion.p>
      <Ornament />
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {event.venue}
      </motion.h1>
      <motion.p
        className="lead"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {event.district}
      </motion.p>
    </PageShell>
  )
}
