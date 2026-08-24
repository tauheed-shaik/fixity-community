import { motion } from 'framer-motion'
import { ArrowRight, Award, BookOpen, BriefcaseBusiness, Code2, Compass, Globe2, Handshake, Lightbulb, Presentation, Trophy, Users } from 'lucide-react'

const pathways = [
  { title: 'Learn', subtitle: 'AI & Emerging Technologies', icon: BookOpen },
  { title: 'Build', subtitle: 'Real Projects & Portfolios', icon: Code2 },
  { title: 'Attend', subtitle: 'Industry Masterclasses', icon: Presentation },
  { title: 'Meet', subtitle: 'Working Professionals', icon: Users },
  { title: 'Participate', subtitle: 'In Hackathons & Competitions', icon: Trophy },
  { title: 'Learn', subtitle: 'From Industry Experts', icon: Lightbulb },
  { title: 'Discover', subtitle: 'Global Certifications', icon: Award },
  { title: 'Build', subtitle: 'Skills Before Placement Season', icon: BriefcaseBusiness },
]

const journey = [
  { title: 'Free Community', items: 'Workshops | Tech Games | Challenges | Events | Open Sessions', icon: Users },
  { title: 'Skill Building', items: 'Structured Courses | Projects | Career Tracks | Mentorship', icon: Lightbulb },
  { title: 'Global Certifications', items: 'AWS | SAP | Cisco | Microsoft & more', icon: Globe2 },
  { title: 'Career Ready', items: 'Projects | Industry | Interaction | Interview Prep | Tech Ambassador | Opportunities', icon: BriefcaseBusiness },
]

export default function LearningJourney() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <div className="section-container">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[1.4rem] border-2 border-primary-yellow/80 bg-white">
          <div className="border-b border-text-gray/60 px-4 pb-4 pt-2 text-center">
            <h2 className="text-xl font-black uppercase text-text-dark sm:text-2xl">A Place Where Students Like You</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {pathways.map(({ title, subtitle, icon: Icon }, index) => (
              <motion.div
                key={`${title}-${subtitle}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex min-h-[178px] flex-col items-center justify-center border-b border-r border-text-gray/60 px-3 py-6 text-center last:border-r-0 md:min-h-[190px] md:nth-[4n]:border-r-0"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-dark-navy text-white shadow-[0_4px_0_rgba(255,196,0,1)]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-black uppercase text-primary-yellow">{title}</h3>
                <p className="mt-1 max-w-[170px] text-xs font-semibold leading-tight text-text-dark">{subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-0 -mt-3 rounded-2xl bg-dark-navy px-5 py-4 text-center text-white shadow-lg md:mx-8 md:-mt-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/90">No matter which year you&apos;re in. No matter which branch you&apos;re from.</p>
          <p className="mt-1 text-xl font-black uppercase text-primary-yellow sm:text-2xl">Start learning. Start building. Start growing.</p>
        </div>

        <div className="mt-8">
          <h2 className="text-center text-2xl font-black uppercase text-text-dark sm:text-3xl">Your Journey</h2>
          <div className="relative mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            <div className="absolute left-[12%] right-[12%] top-9 hidden border-t-2 border-dashed border-text-gray/50 lg:block" />
            {journey.map(({ title, items, icon: Icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-dark-navy text-white ring-4 ring-dark-navy/10">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-3 text-base font-black uppercase text-primary-yellow">{title}</h3>
                <p className="mt-1 max-w-[190px] text-xs font-semibold leading-tight text-text-dark">{items.split(' | ').map((item) => <span key={item} className="block">{item}</span>)}</p>
                {index < journey.length - 1 ? <ArrowRight className="absolute -right-5 top-7 hidden h-7 w-7 text-text-gray/60 lg:block" /> : null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
