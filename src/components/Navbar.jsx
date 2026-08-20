import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from './ui/Shared'
import { useJoinModal } from '../context/JoinModalContext'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Community', id: 'community' },
  { label: 'Programs', id: 'programs' },
  { label: 'Events', id: 'events' },
  { label: 'Industry Connect', id: 'industry' },
  { label: 'Ambassadors', id: 'ambassadors' },
  // { label: 'About Us', id: 'about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openJoin, openEnquire } = useJoinModal()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = navLinks.map((l) => l.id)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    scrollToSection(id)
    setMobileOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-navy/90 backdrop-blur-[18px] border-b border-white/10 shadow-[0_4px_30px_rgba(5,5,43,0.5)]'
          : 'bg-dark-navy/70 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 shrink-0 text-left"
            data-cursor="link"
          >
            <img src="/Fixity-Logo.png" alt="FixityEdx" className="h-9 md:h-10 w-auto" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                data-cursor="link"
                className={`relative px-3 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  active === link.id ? 'text-primary-yellow' : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary-yellow rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={openJoin}
              data-cursor="button"
              className="px-4 py-2 bg-primary-yellow text-dark-navy text-xs font-bold uppercase tracking-wide rounded-md hover:scale-[1.03] hover:-translate-y-0.5 transition-all shadow-glow-yellow"
            >
              Join Community
            </button>
            <button
              onClick={openEnquire}
              data-cursor="button"
              className="px-4 py-2 border border-white/30 text-white text-xs font-semibold uppercase tracking-wide rounded-md hover:border-primary-yellow hover:text-primary-yellow transition-colors"
            >
              Enquire Us
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-deep-navy/95 border-t border-white/10 overflow-hidden"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-left py-3 px-2 text-sm font-semibold uppercase ${
                    active === link.id ? 'text-primary-yellow' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    openJoin()
                  }}
                  className="flex-1 py-2.5 bg-primary-yellow text-dark-navy text-xs font-bold uppercase rounded-md"
                >
                  Join Community
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    openEnquire()
                  }}
                  className="flex-1 py-2.5 border border-white/30 text-white text-xs font-semibold uppercase rounded-md"
                >
                  Enquire Us
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
