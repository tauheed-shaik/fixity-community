import { CalendarDays, Clock, MapPin, UserRound } from 'lucide-react'
import { useEvents } from '../context/EventsContext'
import { useJoinModal } from '../context/JoinModalContext'
import { formatEventTimeRange, getEventPricing } from '../lib/events'
import CouponCode from './CouponCode'

function EventCalendarCard({ item, onView, onRegister }) {
  const pricing = getEventPricing(item)

  return (
    <article className="group rounded-xl border border-border-light bg-light-bg p-4 transition-all hover:-translate-y-0.5 hover:border-purple/40 hover:shadow-card">
      <div className="flex items-start gap-4 text-left">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-dark-navy text-white">
          <span className="text-lg font-black leading-none">{item.day}</span>
          <span className="mt-1 text-[9px] font-bold uppercase text-primary-yellow">{item.month}</span>
        </div>
        <div className="min-w-0 flex-1">
          <span className={`text-[9px] font-extrabold uppercase tracking-wider ${item.live ? 'text-green' : 'text-orange'}`}>
            {item.live ? 'Live now' : 'Upcoming'}
          </span>
          <h3 className="mt-1 truncate text-sm font-bold text-text-dark group-hover:text-purple">{item.title}</h3>
          <p className="mt-1 text-[11px] text-text-gray">{item.time}</p>
          <p className="mt-1 text-[10px] font-bold text-purple">
                    {pricing.price === 0 ? 'FREE' : `INR ${pricing.price.toLocaleString()}`}
          </p>
                  {pricing.hasCoupon ? <CouponCode code={item.couponCode} discount={item.couponDiscount} /> : null}
        </div>
      </div>
      <div className="mt-4 flex gap-2 border-t border-border-light pt-3">
        <button type="button" onClick={() => onView(item.id)} data-cursor="button" className="flex-1 rounded-md border border-purple px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-purple transition-colors hover:bg-purple hover:text-white">
          View Event
        </button>
        <button type="button" onClick={() => onRegister(item.id)} data-cursor="button" className="flex-1 rounded-md bg-primary-yellow px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-dark-navy transition-colors hover:bg-bright-yellow">
          Register Now
        </button>
      </div>
    </article>
  )
}

export default function EventPreview() {
  const { selectedEventId, openEvents, openEvent, openJoin, closeJoin } = useJoinModal()
  const { events } = useEvents()
  const event = events.find((item) => item.id === selectedEventId)

  if (!event) {
    return (
      <div className="rounded-2xl bg-white p-6 sm:p-8">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-border-light pb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple">FixityEdx calendar</p>
            <h2 id="events-modal-title" className="mt-2 text-2xl font-black text-text-dark sm:text-3xl">Live &amp; Upcoming Events</h2>
          </div>
          <span className="hidden text-xs font-semibold text-text-gray sm:block">{events.length} events</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {events.map((item) => <EventCalendarCard key={item.id} item={item} onView={openEvent} onRegister={openJoin} />)}
        </div>
        <button type="button" onClick={closeJoin} className="mx-auto mt-6 block text-xs font-bold uppercase tracking-wide text-text-gray hover:text-purple">
          Maybe later
        </button>
      </div>
    )
  }

  const pricing = getEventPricing(event)
  const date = new Date(event.startAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="grid min-h-[560px] grid-cols-1 overflow-hidden rounded-2xl bg-white md:grid-cols-2">
      <div className="relative flex flex-col justify-between overflow-hidden bg-dark-navy p-7 sm:p-10 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(91,18,214,.95),rgba(5,5,43,.98))]" />
        <div className="relative z-10">
          <span className="inline-flex rounded-full border border-primary-yellow/40 bg-primary-yellow/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-primary-yellow">
            {event.live ? 'Live now' : 'Upcoming event'}
          </span>
          <h2 id="event-modal-title" className="mt-6 max-w-md text-3xl font-black leading-tight sm:text-4xl">
            {event.title}
          </h2>
          {event.speaker ? <p className="mt-3 text-sm text-white/70">{event.speaker}</p> : null}
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">{event.description || 'Join us for an engaging community session designed to help you learn, connect, and grow.'}</p>
        </div>
        <div className="relative z-10 space-y-4 border-t border-white/15 pt-6 text-sm text-white/75">
          <p className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-primary-yellow" />{date}</p>
          <p className="flex items-center gap-3"><Clock className="h-4 w-4 text-cyan" />{formatEventTimeRange(event)}</p>
          <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-orange" />{event.location}</p>
          <p className="flex items-center gap-3"><span className="w-4 text-center text-primary-yellow">₹</span>{pricing.price === 0 ? 'Free event' : `Price: INR ${pricing.price.toLocaleString()}`}</p>
          {pricing.hasCoupon ? <div className="ml-7"><CouponCode code={event.couponCode} discount={event.couponDiscount} /></div> : null}
          <p className="flex items-center gap-3"><span className="w-4 text-center text-primary-yellow">₹</span>{pricing.price === 0 ? 'Free event' : `Price: INR ${pricing.price.toLocaleString()}`}</p>
        </div>
      </div>
      <div className="relative flex items-center justify-center overflow-hidden p-7 sm:p-10">
        <img src="/hero-image.png" alt="" className="absolute inset-0 h-full w-full object-cover blur-xl scale-110 opacity-30" />
        <div className="absolute inset-0 bg-white/75 backdrop-blur-md" />
        <div className="relative z-10 max-w-xs text-center">
          <UserRound className="mx-auto mb-5 h-10 w-10 text-purple" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple">Reserve your place</p>
          <h3 className="mt-3 text-2xl font-black text-text-dark">Ready to join the room?</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-gray">Register now and we&apos;ll send the event details and updates to your inbox.</p>
          <button type="button" onClick={() => openJoin(event.id)} data-cursor="button" className="mt-7 w-full rounded-xl bg-primary-yellow px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-dark-navy shadow-[0_10px_28px_rgba(255,196,0,0.35)] transition-transform hover:-translate-y-0.5">
            Register Now
          </button>
          <button type="button" onClick={openEvents} className="mt-4 text-xs font-bold uppercase tracking-wide text-text-gray hover:text-purple">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}

