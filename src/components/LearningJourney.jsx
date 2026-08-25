import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Award, BookOpen, BriefcaseBusiness, Code2, Globe2, Lightbulb, Presentation, Trophy, Users } from 'lucide-react'
import { SectionHeading } from './ui/Shared'

const pathways = [
  { title: 'Learn', subtitle: 'AI & Emerging Technologies', icon: BookOpen, color: 'text-green', bg: 'bg-green/10' },
  { title: 'Build', subtitle: 'Real Projects & Portfolios', icon: Code2, color: 'text-electric-blue', bg: 'bg-electric-blue/10' },
  { title: 'Attend', subtitle: 'Industry Masterclasses', icon: Presentation, color: 'text-orange', bg: 'bg-orange/10' },
  { title: 'Meet', subtitle: 'Working Professionals', icon: Users, color: 'text-purple', bg: 'bg-dark-navy/10' },
  { title: 'Participate', subtitle: 'In Hackathons & Competitions', icon: Trophy, color: 'text-primary-yellow', bg: 'bg-primary-yellow/10' },
  { title: 'Learn', subtitle: 'From Industry Experts', icon: Lightbulb, color: 'text-cyan', bg: 'bg-cyan/10' },
  { title: 'Discover', subtitle: 'Global Certifications', icon: Award, color: 'text-magenta', bg: 'bg-dark-navy/10' },
  { title: 'Build', subtitle: 'Skills Before Placement Season', icon: BriefcaseBusiness, color: 'text-electric-blue', bg: 'bg-electric-blue/10' },
]

const journey = [
  { title: 'Free Community', items: 'Workshops | Tech Games | Challenges | Events | Open Sessions', icon: Users, color: 'text-green', dotColor: '#27AE60' },
  { title: 'Skill Building', items: 'Structured Courses | Projects | Career Tracks | Mentorship', icon: Lightbulb, color: 'text-electric-blue', dotColor: '#087CFF' },
  { title: 'Global Certifications', items: 'AWS | SAP | Cisco | Microsoft & more', icon: Globe2, color: 'text-orange', dotColor: '#FF8A00' },
  { title: 'Career Ready', items: 'Projects | Industry | Interaction | Interview Prep | Tech Ambassador | Opportunities', icon: BriefcaseBusiness, color: 'text-cyan', dotColor: '#00E5FF' },
]

export default function LearningJourney() {
  const journeyRef = useRef(null)
  const [visibleSteps, setVisibleSteps] = useState(1)
  const visibleStepsRef = useRef(1)
  const lastWheelTime = useRef(0)
  const unlockAtRef = useRef(0)
  const touchStartYRef = useRef(null)

  useEffect(() => {
    const revealNextStep = () => {
      const now = Date.now()
      if (visibleStepsRef.current >= journey.length || now - lastWheelTime.current < 450) return false

      lastWheelTime.current = now
      visibleStepsRef.current = Math.min(journey.length, visibleStepsRef.current + 1)
      setVisibleSteps(visibleStepsRef.current)
      if (visibleStepsRef.current === journey.length) unlockAtRef.current = now + 1200
      return true
    }

    const journeyIsLocked = () => {
      const journeyBounds = journeyRef.current?.getBoundingClientRect()
      const lockPosition = 96
      return journeyBounds
        && journeyBounds.top <= lockPosition
        && journeyBounds.bottom > lockPosition
    }

    const handleWindowWheel = (event) => {
      if (event.deltaY <= 0 || !journeyIsLocked()) return

      const now = Date.now()
      if (visibleStepsRef.current >= journey.length) {
        if (now < unlockAtRef.current) event.preventDefault()
        return
      }

      event.preventDefault()
      revealNextStep()
    }

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null
    }

    const handleTouchMove = (event) => {
      const startY = touchStartYRef.current
      const currentY = event.touches[0]?.clientY
      if (startY === null || currentY === undefined || startY - currentY < 24 || !journeyIsLocked()) return

      if (visibleStepsRef.current < journey.length || Date.now() < unlockAtRef.current) {
        event.preventDefault()
        revealNextStep()
      }
      touchStartYRef.current = currentY
    }

    window.addEventListener('wheel', handleWindowWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWindowWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.06]" />
      <div className="section-container relative z-10">
        <SectionHeading>A Place Where Students Like You</SectionHeading>
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pathways.map(({ title, subtitle, icon: Icon, color, bg }, index) => (
              <motion.div
                key={`${title}-${subtitle}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex min-h-[175px] min-w-0 flex-col items-center justify-center rounded-xl border border-purple/10 bg-gradient-to-b from-purple/10 to-purple/5 px-3 py-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[190px]"
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${bg} ${color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="max-w-full text-sm font-extrabold uppercase tracking-wide text-dark-navy">{title}</h3>
                <p className="mt-1 max-w-[170px] text-xs font-medium leading-tight text-dark-navy">{subtitle}</p>
              </motion.div>
            ))}
          </div>
        <div className="relative z-10 mx-0 -mt-3 rounded-2xl bg-dark-navy px-4 py-4 text-center text-white shadow-lg sm:px-5 md:mx-8 md:-mt-5">
          <p className="text-xs font-semibold uppercase leading-snug tracking-wide text-white/90 sm:text-sm">No matter which year you&apos;re in. No matter which branch you&apos;re from.</p>
          <p className="mt-1 text-lg font-black uppercase leading-tight text-primary-yellow sm:text-2xl">Start learning. Start building. Start growing.</p>
        </div>

        <div ref={journeyRef} className="relative -mt-5 overflow-hidden rounded-3xl border border-purple/10 bg-gradient-to-b from-purple/10 to-purple/5 px-3 py-7 pt-12 shadow-sm sm:px-4 md:-mt-7 md:px-8 md:py-10 md:pt-14">
          <div>
          <SectionHeading className="mb-8">Your Journey</SectionHeading>
          <div className="relative mt-6 grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-9 z-0 hidden grid-cols-3 lg:grid">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.25, scaleX: 0.45 }}
                  animate={index < visibleSteps - 1 ? { opacity: 1, scaleX: 1 } : { opacity: 0.25, scaleX: 0.45 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex origin-center items-center px-1"
                >
                  <span className="h-px flex-1 border-t border-dashed border-border-light" />
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border-light bg-white text-text-gray shadow-sm">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span className="h-px flex-1 border-t border-dashed border-border-light" />
                </motion.div>
              ))}
            </div>
            {journey.map(({ title, items, icon: Icon, color, dotColor }, index) => (
              <motion.div
                key={title}
                initial={false}
                animate={index < visibleSteps ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className={`relative z-10 flex min-w-0 flex-col items-center text-center ${index >= visibleSteps ? 'hidden' : ''}`}
              >
                <motion.div
                  initial={false}
                  animate={index < visibleSteps ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.45, type: 'spring', stiffness: 220, damping: 15 }}
                  className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-4 border-white bg-white ${color} shadow-card ring-1 ring-border-light`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </motion.div>
                <motion.h3
                  initial={false}
                  animate={index < visibleSteps ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3 max-w-full text-base font-black uppercase leading-tight text-dark-navy"
                >
                  {title}
                </motion.h3>
                <div className="mt-3 flex min-h-[8.5rem] w-full max-w-[205px] flex-col gap-1.5">
                  {items.split(' | ').map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={index < visibleSteps ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                      transition={{ duration: 0.3, delay: index < visibleSteps ? itemIndex * 0.07 : 0 }}
                      className="flex min-w-0 items-center rounded-md border border-[#d9eee8] bg-white px-2.5 py-1 text-left text-xs font-semibold leading-tight text-text-gray shadow-sm"
                    >
                      <span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
