import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Users, MapPin, Calendar, Briefcase, Building2, GraduationCap, Globe } from 'lucide-react'
import { PrimaryButton, SecondaryButton, scrollToSection } from './ui/Shared'
import { useJoinModal } from '../context/JoinModalContext'

const features = [
  { icon: Users, label: 'Industry Experts' },
  { icon: MapPin, label: 'Offline Sessions' },
  { icon: Calendar, label: 'Community Events' },
  { icon: Briefcase, label: 'Real Opportunities' },
]

const bottomFeatures = [
  { icon: Building2, label: 'Offline at Vijayawada Office' },
  { icon: GraduationCap, label: 'Free & Paid Learning' },
  { icon: Globe, label: 'Open for All Learners' },
]

const floatingIcons = [
  { label: '</>', x: '4%', y: '12%', delay: 0, color: 'text-cyan' },
  { label: 'AI', x: '88%', y: '10%', delay: 0.5, color: 'text-magenta' },
  { label: '🚀', x: '90%', y: '48%', delay: 1, color: 'text-orange' },
  { label: '☁', x: '2%', y: '52%', delay: 1.5, color: 'text-electric-blue' },
  { label: '{ }', x: '82%', y: '74%', delay: 0.8, color: 'text-purple-bright' },
]

export default function Hero() {
  const ref = useRef(null)
  const { openJoin } = useJoinModal()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section id="home" ref={ref} className="relative min-h-screen bg-dark-navy overflow-hidden pt-[72px]">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan/10 rounded-full blur-[100px]" />
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40"
            style={{ top: `${(i * 17) % 100}%`, left: `${(i * 29) % 100}%` }}
          />
        ))}
      </motion.div>

      <div className="section-container relative z-10 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-purple-bright text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              Vijayawada&apos;s Tech & Career Community
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-[3.15rem] xl:text-[3.4rem] font-black leading-[1.05] tracking-tight uppercase mb-5"
            >
              <span className="text-white">Don&apos;t Just &nbsp;Follow Tech Trends.</span>
              <br />
              <span className="text-primary-yellow">Be Part of Them.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-xl md:text-2xl font-bold gradient-text mb-4"
            >
              Learn. Connect. Build. Grow.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-base leading-relaxed mb-7 max-w-md"
            >
              A community that keeps you learning today, connected always and ahead tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="grid grid-cols-2 gap-2.5 mb-8 max-w-md"
            >
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-cyan/20 bg-white/5 backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4 text-cyan shrink-0" />
                  <span className="text-white/80 text-xs font-medium">{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <PrimaryButton onClick={openJoin} data-cursor="button">Join the Community</PrimaryButton>
              <SecondaryButton onClick={() => scrollToSection('programs')} data-cursor="button">
                Explore Pathways
              </SecondaryButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {bottomFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-white/50 text-[11px]">
                  <Icon className="w-3.5 h-3.5 text-cyan/70" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div style={{ y: imageY }} className="relative flex items-center justify-center min-h-[340px] md:min-h-[480px]">
            <div className="relative w-full max-w-[560px]">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[92%] aspect-square rounded-full border border-cyan/20 shadow-[0_0_80px_rgba(0,229,255,0.18)] animate-pulse-glow" />
                <div className="absolute w-[76%] aspect-square rounded-full border border-purple/30 shadow-[0_0_50px_rgba(91,18,214,0.25)]" />
              </div>

              {floatingIcons.map(({ label, x, y, delay, color }) => (
                <motion.div
                  key={label}
                  className={`absolute z-20 ${color} text-xs font-bold px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 backdrop-blur-sm shadow-glow-cyan`}
                  style={{ left: x, top: y }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
                >
                  {label}
                </motion.div>
              ))}

              <motion.img
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                src="/hero-image.jpg"
                alt="FixityEdx community learners collaborating"
                className="relative z-10 w-full h-auto object-cover rounded-2xl"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                }}
                data-cursor="image"
                data-cursor-label="VIEW"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="relative z-10 mt-5 text-center"
              >
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Exclusive Sessions</p>
                <div className="flex items-center justify-center gap-7">
                  {[
                    { name: 'Amazon', image: '/industry/amazon-white.png' },
                    { name: 'Microsoft', image: '/industry/microsoft.webp' },
                    { name: 'Google', image: '/industry/google.png' },
                  ].map((company) => (
                    <img
                      key={company.name}
                      src={company.image}
                      alt={company.name}
                      loading="lazy"
                      className="max-h-7 w-24 object-contain opacity-75"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
