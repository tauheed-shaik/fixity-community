import { motion } from 'framer-motion'
import { SectionHeading } from './ui/Shared'
import { UserPlus, Compass, BookOpen, Network, Hammer, Crown } from 'lucide-react'

const steps = [
  { num: '01', title: 'Join', icon: UserPlus, desc: 'Become part of our vibrant community.', color: 'bg-purple', ring: 'ring-purple/30' },
  { num: '02', title: 'Explore', icon: Compass, desc: 'Attend free sessions, events, workshops and challenges.', color: 'bg-magenta', ring: 'ring-magenta/30' },
  { num: '03', title: 'Learn', icon: BookOpen, desc: 'Follow structured learning pathways and skill programs.', color: 'bg-green', ring: 'ring-green/30' },
  { num: '04', title: 'Connect', icon: Network, desc: 'Meet industry experts, mentors & fellow learners.', color: 'bg-orange', ring: 'ring-orange/30' },
  { num: '05', title: 'Build', icon: Hammer, desc: 'Work on projects, solve real-world problems.', color: 'bg-electric-blue', ring: 'ring-electric-blue/30' },
  { num: '06', title: 'Lead', icon: Crown, desc: 'Become a Tech Ambassador and lead the community.', color: 'bg-cyan', ring: 'ring-cyan/30' },
]

export default function LearningJourney() {
  return (
    <section className="py-16 md:py-20 bg-light-bg">
      <div className="section-container">
        <SectionHeading>Your Learning Journey</SectionHeading>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-[2.25rem] left-[8%] right-[8%] h-px border-t-2 border-dashed border-border-light" />
          <div className="grid grid-cols-6 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileInView={{ boxShadow: '0 0 20px rgba(91,18,214,0.4)' }}
                  viewport={{ once: true }}
                  className={`relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full ${step.color} text-white ring-4 ${step.ring} mb-3`}
                >
                  <step.icon className="h-6 w-6" />
                </motion.div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-text-gray">{step.num}</span>
                  <h3 className="text-xs font-extrabold uppercase text-text-dark">{step.title}</h3>
                </div>
                <p className="text-text-gray text-[11px] leading-relaxed max-w-[140px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-[1.125rem] top-4 bottom-4 w-px border-l-2 border-dashed border-border-light" />
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative flex gap-4"
              >
                <div className={`absolute -left-8 w-9 h-9 rounded-full ${step.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="mb-1 flex items-center gap-2 font-extrabold text-sm uppercase text-text-dark">
                    <span className="text-[10px] text-text-gray">{step.num}</span>
                    {step.title}
                  </h3>
                  <p className="text-text-gray text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
