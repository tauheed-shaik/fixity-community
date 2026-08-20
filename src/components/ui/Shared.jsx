import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function SectionHeading({ children, light = false, className = '' }) {
  return (
    <div className={`text-center mb-10 md:mb-14 ${className}`}>
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className={`h-px w-8 md:w-12 ${light ? 'bg-primary-yellow/60' : 'bg-primary-yellow'}`} />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className={`text-xl md:text-2xl lg:text-[1.65rem] font-extrabold tracking-wide uppercase ${
            light ? 'text-white' : 'text-text-dark'
          }`}
        >
          {children}
        </motion.h2>
        <span className={`h-px w-8 md:w-12 ${light ? 'bg-primary-yellow/60' : 'bg-primary-yellow'}`} />
      </div>
    </div>
  )
}

export function PrimaryButton({ children, className = '', onClick, type = 'button', href }) {
  const classes = `group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-yellow text-dark-navy font-bold text-sm uppercase tracking-wide rounded-lg shadow-glow-yellow transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 focus:ring-offset-dark-navy ${className}`

  const content = (
    <>
      {children}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <motion.button whileTap={{ scale: 0.98 }} type={type} onClick={onClick} className={classes}>
      {content}
    </motion.button>
  )
}

export function SecondaryButton({ children, className = '', onClick, href }) {
  const classes = `group inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/40 text-white font-semibold text-sm uppercase tracking-wide rounded-lg transition-all duration-300 hover:border-purple hover:shadow-glow hover:scale-[1.03] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple ${className}`

  const content = (
    <>
      {children}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <motion.button whileTap={{ scale: 0.98 }} onClick={onClick} className={classes}>
      {content}
    </motion.button>
  )
}

export function GradientButton({ children, className = '', onClick, type = 'button' }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-lg px-6 py-3 font-bold text-sm uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-magenta ${className}`}
      style={{
        background: 'linear-gradient(135deg, #5B12D6 0%, #D414FF 50%, #FF8A00 100%)',
        backgroundSize: '200% 200%',
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const sectionReveal = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}
