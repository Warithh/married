import { motion } from 'framer-motion'
import { Ornament } from '../components/Ornament'
import { PageShell } from '../components/PageShell'
import { event } from '../config/event'

const ease = [0.22, 1, 0.36, 1] as const

export function InvitePage() {
  return (
    <PageShell nextLabel="ابدأ">
      <motion.p
        className="kicker"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.55, ease }}
      >
        {event.bismillah}
      </motion.p>
      <Ornament />
      <motion.p
        className="soft"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55, ease }}
      >
        {event.inviteLine}
      </motion.p>
      <motion.h1
        className="display"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.55, ease }}
      >
        {event.hostName}
      </motion.h1>
      <motion.p
        className="lead"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36, duration: 0.55, ease }}
      >
        {event.occasionLine}
      </motion.p>
    </PageShell>
  )
}
