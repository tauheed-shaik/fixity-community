import { useMemo, useState } from 'react'
import { Radio } from 'lucide-react'
import { useEvents } from '../context/EventsContext'

export default function LiveEventsTicker() {
  const { liveEvents, focusEvent } = useEvents()
  const [paused, setPaused] = useState(false)

  const items = useMemo(
    () =>
      liveEvents.map((event) => ({
        ...event,
        label: `${event.title}  ·  ${event.time}  ·  ${event.location}`,
      })),
    [liveEvents]
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
      className="relative bg-gradient-to-r from-deep-navy via-[#0d0a4a] to-deep-navy border-y border-green/20 overflow-hidden"
    >
      <div className="section-container py-2.5">
        <div className="flex items-center gap-3 min-h-[40px]">
          <span className="inline-flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full bg-green/15 border border-green/40 text-green text-[10px] font-extrabold uppercase tracking-wider z-10">
            <Radio className="w-3 h-3 animate-pulse" />
            Live
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
                  onClick={() => focusEvent(event.id)}
                  className="inline-flex items-center gap-2 px-5 text-white/90 text-xs sm:text-sm font-medium hover:text-primary-yellow transition-colors"
                  data-cursor="link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0 animate-pulse" />
                  <span>{event.label}</span>
                  <span className="text-white/25 pl-5" aria-hidden>
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
