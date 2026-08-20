import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Pencil, Plus, Trash2, Radio, ArrowLeft } from 'lucide-react'
import { useEvents } from '../context/EventsContext'
import {
  fromDatetimeLocalValue,
  isAdminLoggedIn,
  isEventLive,
  setAdminLoggedIn,
  toDatetimeLocalValue,
  validateAdmin,
} from '../lib/events'

const emptyForm = {
  title: '',
  subtitle: '',
  startAt: '',
  endAt: '',
  address: '',
}

export default function Admin() {
  const { rawEvents, addEvent, updateEvent, deleteEvent } = useEvents()
  const [authed, setAuthed] = useState(() => isAdminLoggedIn())
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [formError, setFormError] = useState('')
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(tick)
  }, [])

  const sorted = useMemo(
    () => [...rawEvents].sort((a, b) => new Date(a.startAt) - new Date(b.startAt)),
    [rawEvents]
  )

  const handleLogin = (e) => {
    e.preventDefault()
    if (validateAdmin(username.trim(), password)) {
      setAdminLoggedIn(true)
      setAuthed(true)
      setLoginError('')
      setPassword('')
    } else {
      setLoginError('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setAdminLoggedIn(false)
    setAuthed(false)
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setFormError('')
  }

  const startEdit = (event) => {
    setEditingId(event.id)
    setForm({
      title: event.title,
      subtitle: event.subtitle || '',
      startAt: toDatetimeLocalValue(event.startAt),
      endAt: toDatetimeLocalValue(event.endAt),
      address: event.address || '',
    })
    setFormError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return setFormError('Event name is required')
    if (!form.startAt || !form.endAt) return setFormError('Start and end time are required')
    if (new Date(form.endAt) <= new Date(form.startAt)) {
      return setFormError('End time must be after start time')
    }
    if (!form.address.trim()) return setFormError('Address is required')

    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      startAt: fromDatetimeLocalValue(form.startAt),
      endAt: fromDatetimeLocalValue(form.endAt),
      address: form.address.trim(),
    }

    if (editingId) updateEvent(editingId, payload)
    else addEvent(payload)

    resetForm()
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-dark-navy flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-purple/40 bg-deep-navy p-8 shadow-glow">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 text-xs hover:text-primary-yellow mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to site
          </Link>
          <h1 className="text-white font-extrabold text-xl uppercase tracking-wide mb-1">Admin Login</h1>
          <p className="text-white/50 text-sm mb-6">Manage community events</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-user" className="block text-white/60 text-xs mb-1.5">Username</label>
              <input
                id="admin-user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white focus:outline-none focus:border-primary-yellow"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="admin-pass" className="block text-white/60 text-xs mb-1.5">Password</label>
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white focus:outline-none focus:border-primary-yellow"
                autoComplete="current-password"
              />
            </div>
            {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary-yellow text-dark-navy font-bold uppercase text-sm hover:scale-[1.01] transition-transform"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-bg">
      <header className="bg-dark-navy text-white border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-primary-yellow text-[10px] font-bold uppercase tracking-widest">FixityEdx</p>
            <h1 className="font-extrabold text-lg">Events Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-white/60 hover:text-white">View site</Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/20 text-xs font-semibold hover:border-primary-yellow hover:text-primary-yellow"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-2xl border border-border-light shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="w-4 h-4 text-purple" />
            <h2 className="font-extrabold text-text-dark uppercase text-sm tracking-wide">
              {editingId ? 'Edit Event' : 'Add Event'}
            </h2>
          </div>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-text-gray text-xs mb-1">Event name</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border border-border-light focus:outline-none focus:border-purple"
                placeholder="e.g. AI in Action Workshop"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-text-gray text-xs mb-1">Subtitle / Speaker (optional)</label>
              <input
                value={form.subtitle}
                onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border border-border-light focus:outline-none focus:border-purple"
                placeholder="e.g. By Amazon Tech Lead"
              />
            </div>
            <div>
              <label className="block text-text-gray text-xs mb-1">Start (date & time)</label>
              <input
                type="datetime-local"
                value={form.startAt}
                onChange={(e) => setForm((f) => ({ ...f, startAt: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border border-border-light focus:outline-none focus:border-purple"
              />
            </div>
            <div>
              <label className="block text-text-gray text-xs mb-1">End (date & time)</label>
              <input
                type="datetime-local"
                value={form.endAt}
                onChange={(e) => setForm((f) => ({ ...f, endAt: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border border-border-light focus:outline-none focus:border-purple"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-text-gray text-xs mb-1">Address</label>
              <input
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border border-border-light focus:outline-none focus:border-purple"
                placeholder="FixityEdx Office, Vijayawada"
              />
            </div>
            <p className="md:col-span-2 text-text-gray text-xs">
              Live status is automatic: an event shows as <span className="text-green font-semibold">LIVE</span> when the current time is between start and end.
            </p>
            {formError && <p className="md:col-span-2 text-red-500 text-xs">{formError}</p>}
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-purple text-white text-xs font-bold uppercase hover:bg-purple-bright"
              >
                {editingId ? 'Update Event' : 'Add Event'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-lg border border-border-light text-text-gray text-xs font-bold uppercase"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="bg-white rounded-2xl border border-border-light shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border-light">
            <h2 className="font-extrabold text-text-dark uppercase text-sm tracking-wide">
              All Events ({sorted.length})
            </h2>
          </div>
          {!sorted.length ? (
            <p className="p-8 text-center text-text-gray text-sm">No events yet. Add your first event above.</p>
          ) : (
            <ul className="divide-y divide-border-light">
              {sorted.map((event) => {
                const live = isEventLive(event, now)
                return (
                  <li key={event.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-text-dark truncate">{event.title}</h3>
                        {live ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-green bg-green/10 px-2 py-0.5 rounded-full">
                            <Radio className="w-3 h-3" /> Live
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase text-text-gray bg-light-bg px-2 py-0.5 rounded-full">
                            {new Date(event.startAt) > now ? 'Upcoming' : 'Ended'}
                          </span>
                        )}
                      </div>
                      {event.subtitle && <p className="text-text-gray text-xs mb-1">{event.subtitle}</p>}
                      <p className="text-text-gray text-xs">
                        {new Date(event.startAt).toLocaleString()} → {new Date(event.endAt).toLocaleString()}
                      </p>
                      <p className="text-text-gray text-xs">{event.address}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => startEdit(event)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border-light text-xs font-semibold text-text-dark hover:border-purple"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete “${event.title}”?`)) deleteEvent(event.id)
                        }}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 text-xs font-semibold text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
