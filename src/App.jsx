import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import JoinModal from './components/JoinModal'
import { JoinModalProvider } from './context/JoinModalContext'
import { EventsProvider } from './context/EventsContext'

export default function App() {
  return (
    <BrowserRouter>
      <EventsProvider>
        <JoinModalProvider>
          <ScrollProgress />
          <CustomCursor />
          <JoinModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </JoinModalProvider>
      </EventsProvider>
    </BrowserRouter>
  )
}
