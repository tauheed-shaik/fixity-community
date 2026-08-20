import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './ui/Shared'

const cards = [
  {
    title: 'Free Fun Learning',
    items: ['Workshops', 'Tech Games', 'Tech Challenges', 'Open Sessions', 'Community Events'],
    btn: 'Explore Free Events',
    titleColor: 'text-green',
    gradient: 'from-green/10 to-green/5',
    btnBg: 'bg-green hover:bg-green/90',
    dotColor: '#27AE60',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=200&fit=crop',
  },
  {
    title: 'Skill Programs',
    items: ['Career-focused Courses', 'Hands-on Projects', 'Mentorship', 'Interview Preparation', 'Industry-ready Skills'],
    btn: 'Explore Courses',
    titleColor: 'text-electric-blue',
    gradient: 'from-electric-blue/10 to-electric-blue/5',
    btnBg: 'bg-electric-blue hover:bg-electric-blue/90',
    dotColor: '#087CFF',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
  },
  {
    title: 'Global Certifications',
    items: ['AWS', 'Microsoft', 'SAP', 'Cisco', 'and more'],
    btn: 'View Certifications',
    titleColor: 'text-orange',
    gradient: 'from-orange/10 to-orange/5',
    btnBg: 'bg-orange hover:bg-orange/90',
    dotColor: '#FF8A00',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop',
  },
  {
    title: 'Career Ready',
    items: ['Projects', 'Industry Interaction', 'Interview Prep', 'Tech Ambassador', 'Opportunities'],
    btn: 'View Opportunities',
    titleColor: 'text-purple',
    gradient: 'from-purple/10 to-purple/5',
    btnBg: 'bg-purple hover:bg-purple-bright',
    dotColor: '#5B12D6',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop',
  },
]

export default function LearningEcosystem() {
  return (
    <section id="programs" className="py-16 md:py-20 bg-white">
      <div className="section-container">
        <SectionHeading>Your Learning Ecosystem</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              data-cursor="card"
              className={`flex flex-col rounded-xl border border-border-light overflow-hidden shadow-card bg-gradient-to-b ${card.gradient}`}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  data-cursor="image"
                  data-cursor-label="VIEW"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className={`text-sm font-extrabold uppercase tracking-wide ${card.titleColor} mb-3`}>
                  {card.title}
                </h3>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {card.items.map((item) => (
                    <li key={item} className="text-text-gray text-xs flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: card.dotColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  data-cursor="button"
                  className={`group flex items-center justify-center gap-2 w-full py-2.5 ${card.btnBg} text-white text-xs font-bold uppercase rounded-lg transition-all hover:scale-[1.02]`}
                >
                  {card.btn}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
