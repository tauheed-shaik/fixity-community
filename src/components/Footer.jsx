import { Linkedin, Instagram, Youtube, Github, MapPin } from 'lucide-react'
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
        <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-2 lg:grid-cols-5">
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
            <a
              href="https://maps.app.goo.gl/NABkCD7qESygpQ5q8"
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex max-w-xs items-start gap-2 text-sm leading-relaxed text-white/55 transition-colors hover:text-primary-yellow"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-yellow" />
              <span>Fixity Edx, Shanthi Plaza, 4th Floor, Skillza Global, opp. STELLA CO, SBI RACPC, Benz Circle, Vijayawada, Andhra Pradesh 520008.</span>
            </a>
          </div>

          {/* Location */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Find Us</h4>
            <a
              href="https://maps.app.goo.gl/NABkCD7qESygpQ5q8"
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-lg border border-white/10 bg-white/5"
              aria-label="Open FixityEdx location in Google Maps"
            >
              <div className="aspect-[16/10] w-full">
                <iframe
                  title="FixityEdx location map"
                  src="https://www.google.com/maps?q=Fixity+Edx,+Shanthi+Plaza,+Benz+Circle,+Vijayawada,+Andhra+Pradesh+520008&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 opacity-85 transition-opacity group-hover:opacity-100"
                />
              </div>
            </a>
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
