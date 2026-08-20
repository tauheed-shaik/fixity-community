import { motion } from 'framer-motion'
import { SectionHeading } from './ui/Shared'

const companies = [
  { name: 'Amazon', image: '/industry/amazon.webp' },
  { name: 'Microsoft', image: '/industry/microsoft.webp' },
  { name: 'Google', image: '/industry/google.png' },
  { name: 'AWS', image: '/industry/aws.webp' },
  { name: 'Infosys', image: '/industry/infosys.webp' },
  { name: 'Dell Technologies', image: '/industry/dell_technologies.png' },
  { name: 'Accenture', image: '/industry/Accenture.png' },
  { name: 'Cisco', image: '/industry/Cisco.png' },
]

export default function IndustrySection() {
  return (
    <section id="industry" className="py-16 md:py-20 bg-white">
      <div className="section-container">
        <SectionHeading>Learn From The Industry</SectionHeading>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-8">
          {companies.map((co, i) => (
            <motion.div
              key={co.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.08 }}
              className="flex h-12 w-32 items-center justify-center grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 md:w-36"
            >
              <img src={co.image} alt={co.name} loading="lazy" className="max-h-10 max-w-full object-contain" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-text-gray text-sm"
        >
          Industry Professionals &nbsp;•&nbsp; Tech Leads &nbsp;•&nbsp; Entrepreneurs &nbsp;•&nbsp; Founders &nbsp;•&nbsp; Mentors
        </motion.p>
      </div>
    </section>
  )
}
