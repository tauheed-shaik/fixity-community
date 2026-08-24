import { useMemo, useState } from 'react'
import { Radio } from 'lucide-react'
import { useEvents } from '../context/EventsContext'
import { useJoinModal } from '../context/JoinModalContext'

export default function LiveEventsTicker() {
  const { events } = useEvents()
  const { openEvent } = useJoinModal()
  const [paused, setPaused] = useState(false)

  const items = useMemo(
    () =>
      events.map((event) => ({
        ...event,
        label: `${event.title}  ·  ${event.day} ${event.month}  ·  ${event.time}`,
      })),
    [events]
  )

  // Build one half wide enough, then duplicate for a seamless -50% scroll loop
  const half = useMemo(() => {
    if (!items.length) return []
    const repeats = Math.max(3, Math.ceil(6 / items.length))
    return Array.from({ length: repeats }, () => items).flat()
  }, [items])

  const track = useMemo(() => [...half, ...half], [half])

  if (!items.length) return null

  const duration = Math.max(20, half.length * 6)

  return (
    <section
      aria-label="Live events notifications"
      className="relative overflow-hidden border-y border-white/10 bg-dark-navy"
    >
      <div className="section-container py-1.5">
        <div className="flex min-h-[32px] items-center gap-3">
          <span className="inline-flex items-center gap-1.5 shrink-0 rounded-full border border-primary-yellow/60 bg-primary-yellow px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-dark-navy shadow-glow-yellow z-10">
            <Radio className="w-3 h-3 animate-pulse" />
            Events
          </span>

          <div
            className="relative flex-1 min-w-0 overflow-hidden mask-ticker"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div
              className="flex w-max items-center whitespace-nowrap"
              style={{
                animation: `ticker-scroll ${duration}s linear infinite`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
            >
              {track.map((event, i) => (
                <button
                  key={`${event.id}-${i}`}
                  type="button"
                  onClick={() => openEvent(event.id)}
                  className="inline-flex items-center gap-2 px-5 text-xs font-medium text-white/90 transition-colors hover:text-white sm:text-sm"
                  data-cursor="link"
                >
                  <span className={`w-1.5 h-1.5 shrink-0 rounded-full ${event.live ? 'bg-green animate-pulse' : 'bg-primary-yellow'}`} />
                  <span className={event.live ? 'text-green' : 'text-primary-yellow'}>{event.live ? 'Live' : 'Upcoming'}</span>
                  <span>{event.label}</span>
                  <span className="pl-5 text-white/25" aria-hidden>
                    •
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
