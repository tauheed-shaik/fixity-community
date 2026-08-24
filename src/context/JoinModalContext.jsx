import { createContext, useContext, useState } from 'react'

const JoinModalContext = createContext(null)

export function JoinModalProvider({ children }) {
  const [mode, setMode] = useState(null)
  const [selectedEventId, setSelectedEventId] = useState(null)

  const closeJoin = () => {
    setMode(null)
    setSelectedEventId(null)
  }

  return (
    <JoinModalContext.Provider
      value={{
        mode,
        open: Boolean(mode),
        selectedEventId,
        openEvents: () => {
          setSelectedEventId(null)
          setMode('events')
        },
        openEvent: (eventId) => {
          setSelectedEventId(eventId)
          setMode('event')
        },
        openJoin: (eventId = null) => {
          setSelectedEventId(eventId || null)
          setMode('join')
        },
        openEnquire: () => {
          setSelectedEventId(null)
          setMode('enquire')
        },
        closeJoin,
      }}
    >
      {children}
    </JoinModalContext.Provider>
  )
}

export function useJoinModal() {
  const ctx = useContext(JoinModalContext)
  if (!ctx) throw new Error('useJoinModal must be used within JoinModalProvider')
  return ctx
}
