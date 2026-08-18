import { motion } from 'framer-motion'
import { Ornament } from '../components/Ornament'
import { PageShell } from '../components/PageShell'
import { event } from '../config/event'

export function TimePage() {
  return (
    <PageShell>
      <motion.p
        className="soft"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        الوقت
      </motion.p>
      <Ornament />
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {event.timeLabel}
      </motion.h1>
    </PageShell>
  )
}
