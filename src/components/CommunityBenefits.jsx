import { motion } from 'framer-motion'
import { Mic, Gift, Target, Rocket, Flame, Users } from 'lucide-react'
import { SectionHeading, fadeUp } from './ui/Shared'

const benefits = [
  {
    icon: Mic,
    title: 'Exclusive Industry Sessions',
    desc: 'Meet & interact with professionals from Amazon, Microsoft & leading companies.',
    color: 'from-purple to-purple-bright',
    glow: 'shadow-[0_0_20px_rgba(91,18,214,0.3)]',
  },
  {
    icon: Gift,
    title: 'Free Goodies & Community Perks',
    desc: 'Get access to events, goodies, challenges and exclusive community activities.',
    color: 'from-magenta to-pink-500',
    glow: 'shadow-[0_0_20px_rgba(212,20,255,0.3)]',
  },
  {
    icon: Target,
    title: 'Personalised Learning Pathways',
    desc: 'Know what to learn, when to learn and what comes next – tailored to your goals.',
    color: 'from-green to-emerald-400',
    glow: 'shadow-[0_0_20px_rgba(39,174,96,0.3)]',
  },
  {
    icon: Rocket,
    title: 'Become a Tech Ambassador',
    desc: 'Lead initiatives, earn recognition and get opportunities to grow with the community.',
    color: 'from-orange to-amber-400',
    glow: 'shadow-[0_0_20px_rgba(255,138,0,0.3)]',
  },
  {
    icon: Flame,
    title: 'Stay Ahead of Technology',
    desc: 'AI · GenAI · Cloud · Data · Cybersecurity · Full Stack · DevOps and more.',
    color: 'from-electric-blue to-cyan',
    glow: 'shadow-[0_0_20px_rgba(8,124,255,0.3)]',
  },
  {
    icon: Users,
    title: 'Learn with People, Not Alone',
    desc: 'Connect with learners, developers, creators and tech enthusiasts. Grow together.',
    color: 'from-cyan to-teal-400',
    glow: 'shadow-[0_0_20px_rgba(0,229,255,0.3)]',
  },
]

export default function CommunityBenefits() {
  return (
    <section id="community" className="relative overflow-hidden bg-dark-navy py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-20" />
      <div className="section-container relative z-10">
        <SectionHeading light>Why Our Community is Different</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-5">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              data-cursor="card"
              className="group relative flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-border-light shadow-card hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} ${item.glow} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-wide text-text-dark leading-snug mb-2 min-h-[2.5rem]">
                {item.title}
              </h3>
              <p className="text-text-gray text-[11px] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
