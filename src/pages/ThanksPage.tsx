import { motion } from 'framer-motion'
import { Ornament } from '../components/Ornament'
import { PageShell } from '../components/PageShell'
import { event } from '../config/event'

const ease = [0.22, 1, 0.36, 1] as const

export function ThanksPage() {
  return (
    <PageShell showNext={false}>
      <Ornament />
      <motion.h1
        className="display"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        {event.thanksLine}
      </motion.h1>
      <Ornament />
    </PageShell>
  )
}
