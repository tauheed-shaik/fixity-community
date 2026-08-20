import { Linkedin, Instagram, Youtube, Github } from 'lucide-react'
import { scrollToSection } from './ui/Shared'
import { useJoinModal } from '../context/JoinModalContext'

const navLinks = [
  'Home', 'Community', 'Programs', 'Events', 'Industry Connect', 'Ambassadors', 'About Us',
]

const supportLinks = ['Contact Us', 'FAQs', 'Privacy Policy', 'Terms & Conditions']

const sectionIds = {
  Home: 'home',
  Community: 'community',
  Programs: 'programs',
  Events: 'events',
  'Industry Connect': 'industry',
  Ambassadors: 'ambassadors',
  'About Us': 'about',
}

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
]

export default function Footer() {
  const { openEnquire } = useJoinModal()

  return (
    <footer id="about" className="bg-dark-navy border-t border-white/10 pt-12 pb-6">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img src="/Fixity-Logo.png" alt="FixityEdx" className="h-10 mb-3" />
            <p className="text-white/50 text-sm">Learn · Connect · Build · Grow</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(sectionIds[link])}
                    className="text-white/50 text-sm hover:text-primary-yellow transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link}>
                  {link === 'Contact Us' ? (
                    <button
                      type="button"
                      onClick={openEnquire}
                      className="text-white/50 text-sm hover:text-primary-yellow transition-colors"
                    >
                      {link}
                    </button>
                  ) : (
                    <a href="#" className="text-white/50 text-sm hover:text-primary-yellow transition-colors">
                      {link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary-yellow hover:border-primary-yellow/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center space-y-2">
          <p className="text-white/40 text-xs">© 2026 FixityEdx. All Rights Reserved.</p>
          <a href="/admin" className="text-white/20 text-[10px] hover:text-white/40 transition-colors">
            Admin
          </a>
        </div>
      </div>
    </footer>
  )
}
