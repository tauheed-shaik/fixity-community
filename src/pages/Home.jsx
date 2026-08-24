import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LiveEventsTicker from '../components/LiveEventsTicker'
import CommunityBenefits from '../components/CommunityBenefits'
import LearningJourney from '../components/LearningJourney'
import LearningEcosystem from '../components/LearningEcosystem'
import EventsSection from '../components/EventsSection'
import CommunitySection from '../components/CommunitySection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import { useEffect, useRef } from 'react'
import { useEvents } from '../context/EventsContext'
import { useJoinModal } from '../context/JoinModalContext'

export default function Home() {
  const { events } = useEvents()
  const { openEvents } = useJoinModal()
  const openedInitialEvent = useRef(false)

  useEffect(() => {
    if (openedInitialEvent.current || !events.length) return
    openedInitialEvent.current = true
    openEvents()
  }, [events, openEvents])

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="pt-[72px]">
          <LiveEventsTicker />
        </div>
        <Hero />
        <LearningJourney />
        <CommunityBenefits />
        <LearningEcosystem />
        <EventsSection />
        <CommunitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
