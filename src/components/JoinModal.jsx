import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import EnquiryForm from './EnquiryForm'
import JoinCommunityForm from './JoinCommunityForm'
import EventPreview from './EventPreview'
import EventRegistration from './EventRegistration'
import { useJoinModal } from '../context/JoinModalContext'

export default function JoinModal() {
  const { mode, open, closeJoin } = useJoinModal()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeJoin()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeJoin])

  const labelledBy = mode === 'enquire' ? 'enquire-modal-title' : mode === 'event' ? 'event-modal-title' : mode === 'events' ? 'events-modal-title' : 'join-modal-title'
  const closeLabel = mode === 'enquire' ? 'Close enquiry form' : mode === 'event' || mode === 'events' ? 'Close event details' : 'Close join community form'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label={closeLabel}
            className="absolute inset-0 bg-[#05052B]/70 backdrop-blur-md"
            onClick={closeJoin}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className={`relative z-10 w-full max-h-[92vh] overflow-hidden rounded-2xl ${
              mode === 'event' || mode === 'events' || mode === 'join' ? 'max-w-[960px]' : 'max-w-[480px]'
            }`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <button
              type="button"
              onClick={closeJoin}
              data-cursor="button"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 border border-[#E8E8F0] text-text-dark shadow-sm flex items-center justify-center hover:bg-white hover:scale-105 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            {mode === 'enquire' ? <EnquiryForm /> : mode === 'event' || mode === 'events' ? <EventPreview /> : <EventRegistration />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
