import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Crown } from 'lucide-react'
import { useJoinModal } from '../context/JoinModalContext'

const galleryImages = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=300&h=200&fit=crop',
]

const testimonials = [
  {
    quote: 'I joined for the workshops but stayed because of the people I met and the opportunities I discovered.',
    name: 'Sai Kiran',
    role: 'Student, Vijayawada',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: 'The industry sessions gave me clarity on my career path. FixityEdx is more than a learning platform.',
    name: 'Priya Sharma',
    role: 'Graduate, Vijayawada',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: 'Being a Tech Ambassador opened doors I never imagined. The community truly supports your growth.',
    name: 'Rahul Reddy',
    role: 'Tech Ambassador',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  },
]

export default function CommunitySection() {
  const [current, setCurrent] = useState(0)
  const { openJoin } = useJoinModal()

  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="ambassadors" className="py-16 md:py-20 bg-gradient-to-br from-[#0a0845] via-purple/40 to-dark-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-magenta/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan/10 rounded-full blur-[80px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {/* Moments That Matter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5">Moments That Matter</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-lg overflow-hidden aspect-[4/3] group"
                  data-cursor="image"
                  data-cursor-label="VIEW"
                >
                  <img src={src} alt={`Community event ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/70 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </motion.div>
              ))}
            </div>
            <button
              data-cursor="button"
              className="group flex items-center gap-2 text-primary-yellow text-xs font-bold uppercase hover:gap-3 transition-all"
            >
              View Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Community Speaks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5 text-center">Community Speaks</h3>
            <div className="flex-1 flex flex-col justify-center relative px-2">
              <span className="text-6xl text-primary-yellow/30 font-serif leading-none mb-2">&ldquo;</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-white/90 text-sm md:text-base leading-relaxed italic mb-6">
                    {testimonials[current].quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary-yellow"
                    />
                    <div>
                      <p className="text-white font-bold text-sm">– {testimonials[current].name}</p>
                      <p className="text-white/50 text-xs">{testimonials[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button onClick={prev} aria-label="Previous" className="text-white/50 hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary-yellow w-6' : 'bg-white/30'}`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button onClick={next} aria-label="Next" className="text-white/50 hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tech Ambassador */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-purple/40 bg-white/5 backdrop-blur-sm p-6 flex flex-col items-center text-center"
            data-cursor="card"
          >
            <div className="absolute -top-6">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-yellow to-orange flex items-center justify-center shadow-glow-yellow"
              >
                <Crown className="w-7 h-7 text-dark-navy" />
              </motion.div>
            </div>
            <div className="mt-6">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-3">Become a Tech Ambassador</h3>
              <p className="text-primary-yellow font-bold text-lg mb-2">Lead. Inspire. Grow.</p>
              <p className="text-white/60 text-sm mb-6">Join our ambassador program and make an impact.</p>
              <button
                type="button"
                onClick={openJoin}
                data-cursor="button"
                className="group flex items-center gap-2 mx-auto px-6 py-2.5 bg-primary-yellow text-dark-navy text-xs font-bold uppercase rounded-lg hover:scale-[1.03] transition-transform"
              >
                Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
