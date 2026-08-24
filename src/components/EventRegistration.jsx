import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { useEvents } from '../context/EventsContext'
import { useJoinModal } from '../context/JoinModalContext'
import { formatEventTimeRange, getEventPricing } from '../lib/events'
import JoinCommunityForm from './JoinCommunityForm'

function EventDetails({ event }) {
  const pricing = getEventPricing(event)
  const date = new Date(event.startAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="relative flex flex-col justify-between overflow-hidden bg-dark-navy p-7 text-white sm:p-10">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(91,18,214,.95),rgba(5,5,43,.98))]" />
      <div className="relative z-10">
        <span className="inline-flex rounded-full border border-primary-yellow/40 bg-primary-yellow/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-primary-yellow">
          {event.live ? 'Live now' : 'Upcoming event'}
        </span>
        <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">{event.title}</h2>
        {event.speaker ? <p className="mt-3 text-sm text-white/70">{event.speaker}</p> : null}
        <p className="mt-5 text-sm leading-relaxed text-white/75">{event.description || 'Join us for an engaging community session designed to help you learn, connect, and grow.'}</p>
      </div>
      <div className="relative z-10 mt-10 space-y-4 border-t border-white/15 pt-6 text-sm text-white/75">
        <p className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-primary-yellow" />{date}</p>
        <p className="flex items-center gap-3"><Clock className="h-4 w-4 text-cyan" />{formatEventTimeRange(event)}</p>
        <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-orange" />{event.location}</p>
        <p className="flex items-center gap-3"><span className="w-4 text-center text-primary-yellow">₹</span>{pricing.price === 0 ? 'Free event' : `Price to pay: INR ${pricing.finalPrice.toLocaleString()}`}</p>
        {pricing.hasCoupon ? <p className="ml-7 text-xs font-semibold text-green">Use {event.couponCode} to get {event.couponDiscount}% discount while registering</p> : null}
      </div>
    </div>
  )
}

export default function EventRegistration() {
  const { selectedEventId } = useJoinModal()
  const { events } = useEvents()
  const event = events.find((item) => item.id === selectedEventId)

  if (!event) return <JoinCommunityForm />

  return (
    <div className="grid min-h-[560px] grid-cols-1 overflow-hidden rounded-2xl bg-white md:grid-cols-2">
      <EventDetails event={event} />
      <div className="max-h-[86vh] overflow-y-auto"><JoinCommunityForm /></div>
    </div>
  )
}

export { EventDetails }
