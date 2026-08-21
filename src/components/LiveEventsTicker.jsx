import { useMemo, useState } from 'react'
import { CalendarDays, MapPin, Radio, X } from 'lucide-react'
import { useEvents } from '../context/EventsContext'
import { useJoinModal } from '../context/JoinModalContext'

export default function LiveEventsTicker() {
  const { events, liveEvents, focusEvent } = useEvents()
  const { openJoin } = useJoinModal()
  const [paused, setPaused] = useState(false)
  const [dismissed, setDismissed] = useState([])

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

  const activeEvent = events.find(
    (event) => !dismissed.includes(event.id) && (event.live || new Date(event.startAt) > new Date())
  )

  const duration = Math.max(20, half.length * 6)

  return (
    <>
      {activeEvent && (
        <aside
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px] sm:p-6"
          aria-label="Live event notification"
          role="dialog"
          aria-modal="true"
          onClick={() => setDismissed((current) => [...current, activeEvent.id])}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-green/40 bg-deep-navy text-white shadow-2xl shadow-black/40"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="h-1.5 bg-green" />
            <div className="p-6 sm:p-8">
              <button
                type="button"
                aria-label={`Dismiss ${activeEvent.title} notification`}
                onClick={() => setDismissed((current) => [...current, activeEvent.id])}
                className="absolute right-4 top-4 rounded-full p-1.5 text-white/55 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-green/15 p-3 text-green">
                  <Radio className="h-6 w-6 animate-pulse" />
                </div>
                <p className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${activeEvent.live ? 'text-green' : 'text-primary-yellow'}`}>
                  {activeEvent.live ? 'Live event now' : 'Upcoming event'}
                </p>
                <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">{activeEvent.title}</h2>
                {activeEvent.speaker && <p className="mt-2 text-sm text-white/60">{activeEvent.speaker}</p>}
                <div className="mt-5 grid w-full gap-2 border-y border-white/10 py-4 text-left text-xs text-white/65 sm:grid-cols-2 sm:gap-4">
                  <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 shrink-0 text-green" />{activeEvent.time}</p>
                  <p className="flex items-center gap-2 truncate"><MapPin className="h-4 w-4 shrink-0 text-green" />{activeEvent.location}</p>
                </div>
                <div className="mt-6 grid w-full gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDismissed((current) => [...current, activeEvent.id])
                      focusEvent(activeEvent.id)
                    }}
                    className="w-full rounded-lg border border-white/20 px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white transition-colors hover:border-white/50 hover:bg-white/10"
                  >
                    View details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDismissed((current) => [...current, activeEvent.id])
                      openJoin(activeEvent.id)
                    }}
                    className="w-full rounded-lg bg-primary-yellow px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-dark-navy transition-transform hover:scale-[1.02]"
                  >
                    Register now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {items.length > 0 && (
        <section
          aria-label="Live events ticker"
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
      )}
    </>
  )
}
