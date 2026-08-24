const STORAGE_KEY = 'fixity_community_events'
const AUTH_KEY = 'fixity_admin_auth'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

function makeDefaultEvents() {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const d = now.getDate()

  const at = (hour, minute = 0, dayOffset = 0) => {
    const date = new Date(y, m, d + dayOffset, hour, minute, 0, 0)
    return date.toISOString()
  }

  return [
    {
      id: 'evt-1',
      title: 'AI in Action Workshop',
      subtitle: 'By Amazon Tech Lead',
      startAt: at(14, 0, 0),
      endAt: at(17, 0, 0),
      address: 'FixityEdx Office, Vijayawada',
    },
    {
      id: 'evt-2',
      title: 'Cloud Career Roadmap',
      subtitle: 'By Microsoft Expert',
      startAt: at(11, 0, 7),
      endAt: at(13, 0, 7),
      address: 'FixityEdx Office, Vijayawada',
    },
    {
      id: 'evt-3',
      title: 'Build with GenAI',
      subtitle: 'Hands-on Workshop',
      startAt: at(14, 0, 14),
      endAt: at(17, 0, 14),
      address: 'FixityEdx Office, Vijayawada',
    },
    {
      id: 'evt-4',
      title: 'Tech Networking Meet',
      subtitle: 'Connect. Collaborate. Grow.',
      startAt: at(17, 0, 21),
      endAt: at(19, 0, 21),
      address: 'FixityEdx Office, Vijayawada',
    },
  ]
}

export function loadEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length) return parsed
    }
  } catch {
    /* ignore */
  }
  const defaults = makeDefaultEvents()
  saveEvents(defaults)
  return defaults
}

export function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

export function isEventLive(event, now = new Date()) {
  if (!event?.startAt || !event?.endAt) return false
  const start = new Date(event.startAt).getTime()
  const end = new Date(event.endAt).getTime()
  const t = now.getTime()
  return t >= start && t <= end
}

export function formatEventDay(event) {
  const d = new Date(event.startAt)
  return String(d.getDate()).padStart(2, '0')
}

export function formatEventMonth(event) {
  return MONTHS[new Date(event.startAt).getMonth()]
}

export function formatEventTimeRange(event) {
  const fmt = (iso) =>
    new Date(iso).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  return `${fmt(event.startAt)} – ${fmt(event.endAt)}`
}

export function getEventPricing(event, couponCode = '') {
  const price = Math.max(0, Number(event?.price) || 0)
  const configuredDiscount = Math.min(100, Math.max(0, Number(event?.couponDiscount) || 0))
  const configuredCode = String(event?.couponCode || '').trim().toUpperCase()
  const enteredCode = String(couponCode || '').trim().toUpperCase()
  const couponApplied = Boolean(configuredCode && enteredCode && configuredCode === enteredCode)
  const discountPercent = couponApplied ? configuredDiscount : 0
  const discountAmount = Math.round((price * discountPercent) / 100)
  const finalPrice = Math.max(0, price - discountAmount)

  return {
    price,
    discountPercent,
    discountAmount,
    finalPrice,
    couponApplied,
    hasCoupon: Boolean(configuredCode && configuredDiscount > 0),
    hasFreeCoupon: Boolean(configuredCode && configuredDiscount === 100),
    isFree: price === 0 || Boolean(couponApplied && configuredDiscount === 100),
  }
}

export function toDatetimeLocalValue(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function fromDatetimeLocalValue(value) {
  if (!value) return ''
  return new Date(value).toISOString()
}

export function isAdminLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

export function setAdminLoggedIn(on) {
  if (on) sessionStorage.setItem(AUTH_KEY, '1')
  else sessionStorage.removeItem(AUTH_KEY)
}

export function validateAdmin(username, password) {
  return username === 'admin' && password === 'System@123'
}

export { STORAGE_KEY }
