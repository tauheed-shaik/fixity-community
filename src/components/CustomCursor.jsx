import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')
  const [variant, setVariant] = useState('default')

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024
    if (isTouch) return

    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const enter = () => setVisible(true)
    const leave = () => {
      setVisible(false)
      setLabel('')
      setVariant('default')
    }

    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (!t || t.dataset.cursor === 'image') {
        setLabel('')
        setVariant('default')
        return
      }
      setVariant(t.dataset.cursor || 'default')
      setLabel(t.dataset.cursorLabel || '')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseenter', enter)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseenter', enter)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  const colors = {
    default: 'bg-cyan/80 shadow-glow-cyan',
    button: 'bg-primary-yellow shadow-glow-yellow scale-[2]',
    link: 'bg-white/90 scale-150',
    card: 'bg-purple/70 shadow-glow scale-[1.8]',
    image: 'bg-transparent border-2 border-cyan scale-[3]',
  }

  if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024)) {
    return null
  }

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block ${colors[variant]}`}
        animate={{
          x: pos.x - (label ? 24 : 6),
          y: pos.y - (label ? 24 : 6),
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {label && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-cyan/20 border border-cyan text-[10px] font-bold text-cyan uppercase"
          animate={{ x: pos.x - 24, y: pos.y - 24, opacity: visible ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        >
          {label}
        </motion.div>
      )}
    </>
  )
}
