import { useEffect, useState } from 'react'
import { WeddingInvite } from './components/WeddingInvite'
import { AdminPage } from './pages/AdminPage'

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return hash.replace(/^#/, '') || '/'
}

export default function App() {
  const path = useHashRoute()
  if (path.startsWith('/admin')) return <AdminPage />
  return <WeddingInvite />
}
