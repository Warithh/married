import { motion } from 'framer-motion'
import { Countdown } from '../components/Countdown'
import { Ornament } from '../components/Ornament'
import { PageShell } from '../components/PageShell'
import { event } from '../config/event'

const ease = [0.22, 1, 0.36, 1] as const

export function DatePage() {
  return (
    <PageShell>
      <motion.p
        className="blessing"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        {event.willOfGodLine}
      </motion.p>
      <Ornament />
      <motion.p
        className="soft"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease }}
      >
        التاريخ
      </motion.p>
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.6, ease }}
      >
        {event.dateLabel}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.55, ease }}
      >
        <Countdown />
      </motion.div>
    </PageShell>
  )
}
