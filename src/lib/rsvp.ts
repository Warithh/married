import { getSupabase, isSupabaseConfigured } from './supabase'

const RSVP_KEY = 'wedding-rsvp-confirmed'
const WISHES_KEY = 'wedding-local-wishes'

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
    /* ignore */
  }
}

export type RsvpPayload = {
  guestName: string
  attending: boolean
}

export async function confirmAttendance(
  payload: RsvpPayload,
): Promise<{ ok: boolean; message: string }> {
  if (hasConfirmedLocally()) return { ok: true, message: 'already' }
  if (!isSupabaseConfigured()) return { ok: false, message: 'config' }

  const supabase = getSupabase()
  if (!supabase) return { ok: false, message: 'config' }

  try {
    const { error } = await supabase.from('rsvps').insert({
      guest_name: payload.guestName,
      attending: payload.attending,
    })
    if (error) {
      // Fallback if columns not added yet
      const fallback = await supabase.from('rsvps').insert({})
      if (fallback.error) {
        console.error(fallback.error)
        return { ok: false, message: 'network' }
      }
    }
  } catch (err) {
    console.error(err)
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
    if (error) return null
    return count ?? 0
  } catch {
    return null
  }
}

export type Wish = { name: string; message: string; createdAt: string }

function readLocalWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(WISHES_KEY)
    return raw ? (JSON.parse(raw) as Wish[]) : []
  } catch {
    return []
  }
}

function writeLocalWish(wish: Wish) {
  const list = [wish, ...readLocalWishes()].slice(0, 40)
  try {
    localStorage.setItem(WISHES_KEY, JSON.stringify(list))
  } catch {
    /* ignore */
  }
  return list
}

export async function submitWish(name: string, message: string): Promise<Wish[]> {
  const wish: Wish = {
    name,
    message,
    createdAt: new Date().toISOString(),
  }

  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    if (supabase) {
      const { error } = await supabase.from('wishes').insert({
        guest_name: name,
        message,
      })
      if (!error) {
        return loadWishes()
      }
    }
  }

  return writeLocalWish(wish)
}

export async function loadWishes(): Promise<Wish[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    if (supabase) {
      const { data, error } = await supabase
        .from('wishes')
        .select('guest_name, message, created_at')
        .order('created_at', { ascending: false })
        .limit(40)
      if (!error && data) {
        return data.map((row) => ({
          name: String(row.guest_name ?? ''),
          message: String(row.message ?? ''),
          createdAt: String(row.created_at ?? ''),
        }))
      }
    }
  }
  return readLocalWishes()
}
