const RSVP_KEY = 'wedding-rsvp-confirmed'

export function hasConfirmedLocally(): boolean {
  try {
    return localStorage.getItem(RSVP_KEY) === '1'
  } catch {
    return false
  }
}

function markConfirmedLocally() {
  try {
    localStorage.setItem(RSVP_KEY, '1')
  } catch {
    /* ignore private mode */
  }
}

export async function confirmAttendance(): Promise<{ ok: boolean; message: string }> {
  if (hasConfirmedLocally()) {
    return { ok: true, message: 'already' }
  }

  const { getDb, isFirebaseConfigured } = await import('./firebase')

  if (isFirebaseConfigured()) {
    try {
      const db = await getDb()
      if (!db) throw new Error('no db')
      const { addDoc, collection, serverTimestamp } = await import('firebase/firestore')
      await addDoc(collection(db, 'rsvps'), {
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
        userAgent:
          typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 120) : '',
      })
    } catch (err) {
      console.error('RSVP write failed', err)
      return { ok: false, message: 'network' }
    }
  } else {
    console.warn(
      'Firebase is not configured. RSVP saved locally only. Add VITE_FIREBASE_* keys to .env',
    )
  }

  markConfirmedLocally()
  return { ok: true, message: 'saved' }
}

export async function getRsvpCount(): Promise<number | null> {
  const { getDb, isFirebaseConfigured } = await import('./firebase')
  if (!isFirebaseConfigured()) return null
  try {
    const db = await getDb()
    if (!db) return null
    const { collection, getCountFromServer } = await import('firebase/firestore')
    const snap = await getCountFromServer(collection(db, 'rsvps'))
    return snap.data().count
  } catch (err) {
    console.error('RSVP count failed', err)
    return null
  }
}
