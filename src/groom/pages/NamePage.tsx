import { motion } from 'framer-motion'
import { Ornament } from '../components/Ornament'
import { PageShell } from '../components/PageShell'
import { event } from '../config/event'

export function NamePage() {
  return (
    <PageShell>
      <motion.p
        className="soft"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {event.groomLabel}
      </motion.p>
      <Ornament />
      <motion.h1
        className="display display--xl"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {event.groomName}
      </motion.h1>
    </PageShell>
  )
}
