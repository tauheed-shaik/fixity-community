import { motion } from 'framer-motion'
import { ArrowRight, Award, BookOpen, BriefcaseBusiness, ChevronDown, Code2, Globe2, Lightbulb, Presentation, Trophy, Users } from 'lucide-react'
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
  { title: 'Free Community', items: 'Workshops | Tech Games | Challenges | Events | Open Sessions', icon: Users, color: 'text-green', dotColor: '#27AE60', wash: 'rgba(39,174,96,0.16)' },
  { title: 'Skill Building', items: 'Structured Courses | Projects | Career Tracks | Mentorship', icon: Lightbulb, color: 'text-electric-blue', dotColor: '#087CFF', wash: 'rgba(8,124,255,0.15)' },
  { title: 'Global Certifications', items: 'AWS | SAP | Cisco | Microsoft & more', icon: Globe2, color: 'text-orange', dotColor: '#FF8A00', wash: 'rgba(255,138,0,0.16)' },
  { title: 'Career Ready', items: 'Projects | Industry | Interaction | Interview Prep | Tech Ambassador | Opportunities', icon: BriefcaseBusiness, color: 'text-cyan', dotColor: '#00E5FF', wash: 'rgba(0,229,255,0.17)' },
]

export default function LearningJourney() {
  return (
    <section id="journey" className="relative overflow-hidden bg-white py-16 md:py-20">
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
        <div className="relative z-10 mx-auto my-10 max-w-[1120px] rounded-2xl bg-gradient-to-r from-dark-navy via-deep-navy to-purple px-4 py-5 text-center text-white shadow-lg sm:px-5 md:my-12">
          <p className="text-xs font-semibold uppercase leading-snug tracking-wide text-white/90 sm:text-sm">No matter which year you&apos;re in. No matter which branch you&apos;re from.</p>
          <p className="mt-1 text-lg font-black uppercase leading-tight text-primary-yellow sm:text-2xl">Start learning. Start building. Start growing.</p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-purple/10 bg-gradient-to-b from-purple/10 to-purple/5 px-3 py-7 shadow-sm sm:px-4 md:px-8 md:py-10">
          <SectionHeading className="mb-8">Your Journey</SectionHeading>
          <div className="relative mt-6 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 w-px origin-top border-l border-dashed border-purple/25 sm:block lg:hidden"
            >
              <ChevronDown className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 text-purple/50" strokeWidth={2.4} />
            </motion.div>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="pointer-events-none absolute left-[12%] right-[12%] top-[4.25rem] z-0 hidden origin-left items-center lg:flex"
            >
              {[0, 1, 2].map((connector) => (
                <span key={connector} className="flex flex-1 items-center">
                  <span className="h-px flex-1 border-t border-dashed border-purple/35" />
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-purple/20 bg-white text-purple/70 shadow-sm">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="h-px flex-1 border-t border-dashed border-purple/35" />
                </span>
              ))}
            </motion.div>
            {journey.map(({ title, items, icon: Icon, color, dotColor, wash }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.035 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundImage: `linear-gradient(145deg, ${wash}, rgba(255,255,255,0.9) 55%)` }}
                className="group relative z-10 flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/90 p-4 text-center shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-card sm:p-5"
              >
                <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: dotColor }} />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-[0.2em] text-dark-navy/40">0{index + 1}</span>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: dotColor }} />
                </div>
                <motion.div
                  initial={{ scale: 0.75, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.12 + 0.15, type: 'spring', stiffness: 220, damping: 16 }}
                  className={`mx-auto mt-2 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white ${color} bg-white shadow-card ring-1 ring-border-light transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </motion.div>
                <h3 className="mt-4 min-h-[2.5rem] text-sm font-black uppercase leading-tight text-dark-navy sm:text-base">{title}</h3>
                <div className="mt-3 flex min-h-[8.5rem] w-full flex-col gap-1.5">
                  {items.split(' | ').map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.3, delay: index * 0.12 + itemIndex * 0.06 + 0.2 }}
                      className="flex min-w-0 items-center rounded-md border border-[#d9eee8] bg-white px-2.5 py-1 text-left text-xs font-semibold leading-tight text-text-gray shadow-sm"
                    >
                      <span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
