import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, MapPin, Mic, Calendar, Users, Building2, Heart } from 'lucide-react'
import { SectionHeading } from './ui/Shared'
import { useJoinModal } from '../context/JoinModalContext'
import { useEvents } from '../context/EventsContext'

const stats = [
  { value: 100, suffix: '+', label: 'Industry Sessions', icon: Mic },
  { value: 50, suffix: '+', label: 'Events Conducted', icon: Calendar },
  { value: 5000, suffix: '+', label: 'Active Members', icon: Users },
  { value: 25, suffix: '+', label: 'Top Companies', icon: Building2 },
  { value: 1, suffix: '', label: 'Vibrant Community', icon: Heart },
]

function StatCounter({ value, suffix, label, icon: Icon, index }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center text-center"
    >
      <Icon className="w-5 h-5 text-cyan mb-2" />
      <span className="text-2xl md:text-3xl font-black text-primary-yellow">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-white/60 text-[11px] uppercase tracking-wide mt-1">{label}</span>
    </motion.div>
  )
}

function EventCard({ event, onRegister, focused }) {
  return (
    <article
      id={`event-card-${event.id}`}
      data-cursor="card"
      className={`h-full flex rounded-xl bg-white/5 border overflow-hidden backdrop-blur-sm transition-all duration-300 ${
        focused
          ? 'border-primary-yellow shadow-[0_0_28px_rgba(255,196,0,0.35)] scale-[1.02]'
          : 'border-white/10 hover:border-purple/50 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(91,18,214,0.25)]'
      }`}
    >
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-purple to-purple-bright px-4 py-5 min-w-[76px]">
        <span className="text-2xl font-black text-white leading-none">{event.day}</span>
        <span className="text-[10px] font-bold text-primary-yellow uppercase mt-1">{event.month}</span>
      </div>
      <div className="flex-1 p-4 flex flex-col min-w-0">
        {event.live && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            Live Now
          </span>
        )}
        <h3 className="text-white font-bold text-sm mb-1 truncate">{event.title}</h3>
        {event.speaker ? <p className="text-white/55 text-[11px] mb-2">{event.speaker}</p> : null}
        <p className="text-white/40 text-[10px] flex items-center gap-1.5">
          <Clock className="w-3 h-3 shrink-0" /> {event.time}
        </p>
        <p className="text-white/40 text-[10px] flex items-center gap-1.5 mb-3">
          <MapPin className="w-3 h-3 shrink-0" /> {event.location}
        </p>
        <button
          type="button"
          onClick={() => onRegister(event.id)}
          data-cursor="button"
          className="mt-auto self-start px-4 py-1.5 border border-purple text-white text-[10px] font-bold uppercase rounded-md hover:bg-purple transition-colors"
        >
          Register Now
        </button>
      </div>
    </article>
  )
}

export default function EventsSection() {
  const { openJoin } = useJoinModal()
  const { events, focusEventId, clearFocusEvent } = useEvents()
  const start = Math.max(events.length, 1)
  const [index, setIndex] = useState(start)
  const [paused, setPaused] = useState(false)
  const [perView, setPerView] = useState(3)
  const [animating, setAnimating] = useState(true)
  const trackRef = useRef(null)

  const looped = events.length ? [...events, ...events, ...events] : []

  useEffect(() => {
    setIndex(start)
  }, [start, events.length])

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setPerView(1)
      else if (window.innerWidth < 1100) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const go = useCallback((dir) => {
    if (!events.length) return
    setAnimating(true)
    setIndex((i) => i + dir)
  }, [events.length])

  useEffect(() => {
    if (!events.length || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => go(1), 4200)
    return () => clearInterval(timer)
  }, [paused, go, events.length])

  useEffect(() => {
    if (!events.length) return
    if (index >= start * 2) {
      const t = setTimeout(() => {
        setAnimating(false)
        setIndex(start)
      }, 620)
      return () => clearTimeout(t)
    }
    if (index < start) {
      const t = setTimeout(() => {
        setAnimating(false)
        setIndex(start + ((index % events.length) + events.length) % events.length)
      }, 620)
      return () => clearTimeout(t)
    }
  }, [index, start, events.length])

  useEffect(() => {
    if (!focusEventId || !events.length) return
    const target = events.findIndex((e) => e.id === focusEventId)
    if (target >= 0) {
      setPaused(true)
      setAnimating(true)
      setIndex(start + target)
      const timer = setTimeout(() => {
        clearFocusEvent()
        setPaused(false)
      }, 4500)
      return () => clearTimeout(timer)
    }
  }, [focusEventId, events, start, clearFocusEvent])

  const gapPct = 1.2
  const logicalIndex = events.length
    ? ((index % events.length) + events.length) % events.length
    : 0

  return (
    <section id="events" className="py-16 md:py-20 bg-gradient-to-b from-dark-navy to-deep-navy relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
      <div className="section-container relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="flex-1">
            <SectionHeading light className="mb-0">Current & Upcoming Events</SectionHeading>
          </div>
          {events.length > 0 && (
            <div className="flex items-center justify-center gap-3 sm:mb-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous events"
                data-cursor="button"
                className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-primary-yellow hover:text-primary-yellow hover:bg-white/5 transition-all flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next events"
                data-cursor="button"
                className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-primary-yellow hover:text-primary-yellow hover:bg-white/5 transition-all flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {!events.length ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/60 text-sm mb-12">
            No upcoming events yet. Check back soon.
          </div>
        ) : (
          <>
            <div
              className="overflow-hidden mb-8"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
            >
              <div
                ref={trackRef}
                className="flex"
                style={{
                  gap: `${gapPct}%`,
                  transform: `translateX(calc(-${index} * ((100% - ${(perView - 1) * gapPct}%) / ${perView} + ${gapPct}%)))`,
                  transition: animating ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                }}
              >
                {looped.map((event, i) => (
                  <div
                    key={`${event.id}-${i}`}
                    className="shrink-0"
                    style={{ width: `calc((100% - ${(perView - 1) * gapPct}%) / ${perView})` }}
                  >
                    <EventCard
                      event={event}
                      onRegister={openJoin}
                      focused={focusEventId === event.id}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-12">
              {events.map((event, i) => (
                <button
                  key={event.id}
                  type="button"
                  aria-label={`Go to event ${i + 1}`}
                  onClick={() => {
                    setAnimating(true)
                    setIndex(start + i)
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === logicalIndex ? 'w-7 bg-primary-yellow' : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
