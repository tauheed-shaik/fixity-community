import { motion } from 'framer-motion'
import { PrimaryButton } from './ui/Shared'
import { useJoinModal } from '../context/JoinModalContext'

export default function CTASection() {
  const { openJoin } = useJoinModal()

  return (
    <section className="relative overflow-hidden">
      <div
        className="relative py-12 md:py-16"
        style={{
          background: 'linear-gradient(135deg, #5B12D6 0%, #D414FF 40%, #087CFF 70%, #05052B 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-yellow/30 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-cyan/20 rounded-full blur-[60px]" />
        </div>

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 hidden md:block"
            >
              <img
                src="/hero-image.jpg"
                alt="FixityEdx community"
                className="w-full max-w-[280px] rounded-xl object-cover shadow-2xl"
                style={{ maskImage: 'linear-gradient(to right, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 100%)' }}
                data-cursor="image"
                data-cursor-label="VIEW"
              />
            </motion.div>

            {/* Center content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase leading-tight mb-3">
                Learn Today.<br />Stay Curious Tomorrow.
              </h2>
              <p className="text-white/75 text-sm md:text-base mb-6 max-w-md mx-auto lg:mx-0">
                Be part of a community that never stops learning.
              </p>
              <PrimaryButton onClick={openJoin} data-cursor="button">Join the Community</PrimaryButton>
            </motion.div>

            {/*
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 flex flex-col items-center lg:items-end"
            >
              <div className="bg-white rounded-xl p-4 shadow-2xl">
                <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-28 md:h-28" aria-label="QR code to join community">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="#05052B" />
                  <rect x="65" y="10" width="25" height="25" fill="#05052B" />
                  <rect x="10" y="65" width="25" height="25" fill="#05052B" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#05052B" />
                  <rect x="73" y="18" width="9" height="9" fill="#05052B" />
                  <rect x="18" y="73" width="9" height="9" fill="#05052B" />
                  {Array.from({ length: 20 }).map((_, i) => (
                    <rect
                      key={i}
                      x={40 + (i % 5) * 4}
                      y={40 + Math.floor(i / 5) * 4}
                      width="3"
                      height="3"
                      fill="#05052B"
                      opacity={Math.random() > 0.3 ? 1 : 0}
                    />
                  ))}
                </svg>
              </div>
            </motion.div>
            */}
          </div>
        </div>
      </div>
    </section>
  )
}
