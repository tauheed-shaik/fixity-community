import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  formatEventDay,
  formatEventMonth,
  formatEventTimeRange,
  isEventLive,
  loadEvents,
  saveEvents,
} from '../lib/events'

const EventsContext = createContext(null)

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(() => loadEvents())
  const [now, setNow] = useState(() => new Date())
  const [focusEventId, setFocusEventId] = useState(null)

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    saveEvents(events)
  }, [events])

  useEffect(() => {
    const syncEvents = (event) => {
      if (event.key !== 'fixity_community_events' || !event.newValue) return
      try {
        const parsed = JSON.parse(event.newValue)
        if (Array.isArray(parsed)) setEvents(parsed)
      } catch {
        /* ignore malformed external storage updates */
      }
    }

    window.addEventListener('storage', syncEvents)
    return () => window.removeEventListener('storage', syncEvents)
  }, [])

  const enriched = useMemo(
    () =>
      events
        .map((event) => ({
          ...event,
          live: isEventLive(event, now),
          day: formatEventDay(event),
          month: formatEventMonth(event),
          time: formatEventTimeRange(event),
          location: event.address,
          speaker: event.subtitle || '',
          description: event.description || '',
          price: Math.max(0, Number(event.price) || 0),
          couponCode: event.couponCode || '',
          couponDiscount: Math.min(100, Math.max(0, Number(event.couponDiscount) || 0)),
        }))
        .sort((a, b) => new Date(a.startAt) - new Date(b.startAt)),
    [events, now]
  )

  const liveEvents = useMemo(() => enriched.filter((e) => e.live), [enriched])

  const addEvent = useCallback((event) => {
    setEvents((prev) => [
      ...prev,
      {
        ...event,
        id: event.id || `evt-${Date.now()}`,
      },
    ])
  }, [])

  const updateEvent = useCallback((id, patch) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }, [])

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const focusEvent = useCallback((id) => {
    setFocusEventId(id)
    const section = document.getElementById('events')
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  const clearFocusEvent = useCallback(() => setFocusEventId(null), [])

  return (
    <EventsContext.Provider
      value={{
        events: enriched,
        rawEvents: events,
        liveEvents,
        addEvent,
        updateEvent,
        deleteEvent,
        focusEventId,
        focusEvent,
        clearFocusEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const ctx = useContext(EventsContext)
  if (!ctx) throw new Error('useEvents must be used within EventsProvider')
  return ctx
}
