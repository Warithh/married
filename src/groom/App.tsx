import { AnimatePresence, motion } from 'framer-motion'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { DatePage } from './pages/DatePage'
import { InvitePage } from './pages/InvitePage'
import { MapPage } from './pages/MapPage'
import { NamePage } from './pages/NamePage'
import { ThanksPage } from './pages/ThanksPage'
import { TimePage } from './pages/TimePage'
import { VenuePage } from './pages/VenuePage'

const pageVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? -56 : 56,
    filter: 'blur(8px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? 48 : -48,
    filter: 'blur(6px)',
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
  }),
}

function AnimatedRoutes() {
  const location = useLocation()
  const dir = (location.state as { dir?: number } | null)?.dir ?? 1

  return (
    <AnimatePresence mode="wait" custom={dir} initial={false}>
      <motion.div
        key={location.pathname}
        className="route-frame"
        custom={dir}
        variants={pageVariants}
        initial="enter"
        animate="center"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<InvitePage />} />
          <Route path="/name" element={<NamePage />} />
          <Route path="/date" element={<DatePage />} />
          <Route path="/time" element={<TimePage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/thanks" element={<ThanksPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="backdrop" aria-hidden="true">
        <div
          className="backdrop__photo"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}bg-light.png)`,
          }}
        />
        <div className="backdrop__veil" />
      </div>
      <AnimatedRoutes />
    </HashRouter>
  )
}
