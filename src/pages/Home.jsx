import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LiveEventsTicker from '../components/LiveEventsTicker'
import CommunityBenefits from '../components/CommunityBenefits'
import LearningJourney from '../components/LearningJourney'
import LearningEcosystem from '../components/LearningEcosystem'
import EventsSection from '../components/EventsSection'
import IndustrySection from '../components/IndustrySection'
import CommunitySection from '../components/CommunitySection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <LiveEventsTicker />
        <CommunityBenefits />
        <LearningJourney />
        <LearningEcosystem />
        <EventsSection />
        <IndustrySection />
        <CommunitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
