import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
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

const heroMessages = ["Don't Just Follow Tech Trends.", 'Be Part of Them.']

export default function Hero() {
  const ref = useRef(null)
  const [messageIndex, setMessageIndex] = useState(0)
  const { openJoin } = useJoinModal()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  useEffect(() => {
    const timer = setInterval(() => setMessageIndex((index) => (index + 1) % heroMessages.length), 3200)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-screen bg-dark-navy overflow-hidden">
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

      <div className="section-container relative z-10 pt-4 pb-10 lg:pt-8 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative mb-5 max-w-full text-2xl font-black leading-tight text-primary-yellow sm:text-3xl md:text-4xl"
            >
              Vijayawada&apos;s Tech &<br /> Career Community
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-5 min-h-[2.25rem] max-w-xl text-2xl font-semibold leading-[1.12] text-white sm:min-h-[2.7rem] sm:text-3xl lg:min-h-[3.1rem] lg:text-4xl"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroMessages[messageIndex]}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="inline-block text-white"
                >
                  {heroMessages[messageIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan sm:text-sm"
            >
              <span>Learn</span><span className="text-white/30">·</span><span>Connect</span><span className="text-white/30">·</span><span>Build</span><span className="text-white/30">·</span><span>Grow</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-7 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg"
            >
              A community that keeps you learning today, connected always and ahead tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mb-8 flex w-full max-w-xl flex-nowrap items-center justify-between gap-3 overflow-x-auto py-1"
            >
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex shrink-0 items-center gap-1.5 whitespace-nowrap"
                >
                  <Icon className={`w-4 h-4 shrink-0 ${['text-cyan', 'text-primary-yellow', 'text-magenta', 'text-orange'][features.findIndex((feature) => feature.label === label)]}`} />
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
                src="/hero-image.png"
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
                <div className="rounded-xl border border-primary-yellow/30 bg-primary-yellow/10 px-5 py-4 text-center shadow-[0_0_28px_rgba(255,196,0,0.12)]">
                  <p className="text-primary-yellow text-[11px] uppercase tracking-widest mb-3">Exclusive Sessions With Professionals From</p>
                  <div className="flex items-center justify-center gap-5">
                  {[
                    { name: 'AWS', image: '/industry/aws.png' },
                    { name: 'Microsoft', image: '/industry/microsoft.png' },
                    { name: 'Google', image: '/industry/google.png' },
                  ].map((company) => (
                    <img
                      key={company.name}
                      src={company.image}
                      alt={company.name}
                      loading="lazy"
                      className={`object-contain opacity-75 ${company.name === 'Amazon' ? 'max-h-7 w-24' : 'max-h-9 w-32'}`}
                    />
                  ))}
                  </div>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest mt-3">&amp; leading Tech Companies</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
