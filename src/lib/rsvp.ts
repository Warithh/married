import { getSupabase, isSupabaseConfigured } from './supabase'

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

  if (!isSupabaseConfigured()) {
    return { ok: false, message: 'config' }
  }

  const supabase = getSupabase()
  if (!supabase) {
    return { ok: false, message: 'config' }
  }

  try {
    const { error } = await supabase.from('rsvps').insert({})
    if (error) {
      console.error('RSVP insert failed', error)
      return { ok: false, message: 'network' }
    }
  } catch (err) {
    console.error('RSVP insert failed', err)
    return { ok: false, message: 'network' }
  }

  markConfirmedLocally()
  return { ok: true, message: 'saved' }
}

export async function getRsvpCount(): Promise<number | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = getSupabase()
  if (!supabase) return null

  try {
    const { count, error } = await supabase
      .from('rsvps')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('RSVP count failed', error)
      return null
    }
    return count ?? 0
  } catch (err) {
    console.error('RSVP count failed', err)
    return null
  }
}
