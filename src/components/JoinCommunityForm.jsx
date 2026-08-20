import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  CheckCircle2,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User,
} from 'lucide-react'
import { submitToSheets } from '../lib/formSubmit'
import { useJoinModal } from '../context/JoinModalContext'
import { useEvents } from '../context/EventsContext'
import {
  EventBanner,
  FormConsent,
  FormField,
  FormHeader,
  FormSection,
  FormSelect,
  FormShell,
  FormSubmitButton,
  FormSuccess,
  formControlClass,
} from './ui/FormUI'

const roles = ['Student', 'Graduate', 'Working Professional', 'Educator', 'Career Switcher', 'Other']
const years = ['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Passed Out', 'Not Applicable']
const skills = [
  'AI / GenAI',
  'Full Stack Development',
  'Cloud / DevOps',
  'Data / Analytics',
  'Cybersecurity',
  'UI / UX',
  'Career Guidance',
  'Not sure yet',
]
const participation = [
  'Attend events & workshops',
  'Join skill programs',
  'Work on community projects',
  'Become a Tech Ambassador',
  'Network with industry',
]

const initialForm = {
  name: '',
  email: '',
  mobile: '',
  city: '',
  role: '',
  college: '',
  year: '',
  skill: '',
  participation: '',
  eventId: '',
  linkedin: '',
  reason: '',
  consent: false,
}

export default function JoinCommunityForm() {
  const { selectedEventId } = useJoinModal()
  const { events } = useEvents()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setForm((f) => ({
      ...f,
      eventId: selectedEventId || '',
      participation: selectedEventId ? 'Attend events & workshops' : f.participation,
    }))
  }, [selectedEventId])

  const selectedEvent = events.find((e) => e.id === form.eventId)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.mobile.trim() || !/^[+\d\s-]{10,}$/.test(form.mobile)) e.mobile = 'Enter a valid WhatsApp number'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.role) e.role = 'Select who you are'
    if (!form.college.trim()) e.college = 'College / organization is required'
    if (!form.skill) e.skill = 'Select a skill interest'
    if (!form.participation) e.participation = 'Select how you want to participate'
    if (!form.consent) e.consent = 'Please accept to continue'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSending(true)
    try {
      await submitToSheets('join', {
        fullName: form.name,
        email: form.email,
        mobile: form.mobile,
        city: form.city,
        role: form.role,
        collegeOrOrganization: form.college,
        academicYear: form.year,
        skillInterest: form.skill,
        howToParticipate: form.participation,
        eventId: form.eventId || '',
        eventName: selectedEvent?.title || '',
        linkedin: form.linkedin,
        whyJoin: form.reason,
      })
      setSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  return (
    <FormShell accent="yellow">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <FormSuccess
              icon={CheckCircle2}
              title="You're in"
              message={
                selectedEvent
                  ? `Welcome aboard. We've noted your interest in ${selectedEvent.title}.`
                  : "Welcome to the FixityEdx community. We'll reach out with next steps."
              }
            />
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <FormHeader
              eyebrow="Community"
              title="Join the Community"
              titleId="join-modal-title"
              badge="Free"
              description="A few details help us connect you with the right events, mentors, and pathways."
            />

            {selectedEvent ? (
              <EventBanner title={selectedEvent.title} live={selectedEvent.live} />
            ) : null}

            {events.length > 0 && (
              <FormField id="join-event" label="Event" optional>
                <div className="relative">
                  <select
                    id="join-event"
                    value={form.eventId}
                    onChange={(e) => update('eventId', e.target.value)}
                    className={`${formControlClass(false)} appearance-none cursor-pointer pr-10`}
                  >
                    <option value="">No specific event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.live ? 'LIVE · ' : ''}
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>
              </FormField>
            )}

            <FormSection title="About you">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="join-name" label="Full name" error={errors.name} icon={User}>
                  <input
                    id="join-name"
                    type="text"
                    placeholder="Alex Kumar"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={formControlClass(Boolean(errors.name), true)}
                  />
                </FormField>
                <FormField id="join-email" label="Email" error={errors.email} icon={Mail}>
                  <input
                    id="join-email"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={formControlClass(Boolean(errors.email), true)}
                  />
                </FormField>
                <FormField id="join-mobile" label="WhatsApp" error={errors.mobile} icon={Phone}>
                  <input
                    id="join-mobile"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.mobile}
                    onChange={(e) => update('mobile', e.target.value)}
                    className={formControlClass(Boolean(errors.mobile), true)}
                  />
                </FormField>
                <FormField id="join-city" label="City" error={errors.city} icon={MapPin}>
                  <input
                    id="join-city"
                    type="text"
                    placeholder="Vijayawada"
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    className={formControlClass(Boolean(errors.city), true)}
                  />
                </FormField>
              </div>
            </FormSection>

            <FormSection title="Background">
              <div className="space-y-3">
                <FormSelect
                  id="join-role"
                  value={form.role}
                  onChange={(e) => update('role', e.target.value)}
                  options={roles}
                  placeholder="I am a…"
                  error={errors.role}
                  icon={GraduationCap}
                />
                <FormField id="join-college" label="College / organization" error={errors.college} icon={Building2}>
                  <input
                    id="join-college"
                    type="text"
                    placeholder="Your college or company"
                    value={form.college}
                    onChange={(e) => update('college', e.target.value)}
                    className={formControlClass(Boolean(errors.college), true)}
                  />
                </FormField>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormSelect
                    id="join-year"
                    value={form.year}
                    onChange={(e) => update('year', e.target.value)}
                    options={years}
                    placeholder="Year / status"
                    error={errors.year}
                  />
                  <FormSelect
                    id="join-skill"
                    value={form.skill}
                    onChange={(e) => update('skill', e.target.value)}
                    options={skills}
                    placeholder="What do you want to learn?"
                    error={errors.skill}
                    icon={Sparkles}
                  />
                </div>
                <FormSelect
                  id="join-participation"
                  value={form.participation}
                  onChange={(e) => update('participation', e.target.value)}
                  options={participation}
                  placeholder="How do you want to participate?"
                  error={errors.participation}
                />
              </div>
            </FormSection>

            <FormSection title="More (optional)">
              <div className="space-y-3">
                <FormField id="join-linkedin" label="LinkedIn" optional icon={Link2}>
                  <input
                    id="join-linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/…"
                    value={form.linkedin}
                    onChange={(e) => update('linkedin', e.target.value)}
                    className={formControlClass(false, true)}
                  />
                </FormField>
                <FormField id="join-reason" label="Why join?" optional>
                  <textarea
                    id="join-reason"
                    rows={2}
                    placeholder="What are you hoping to get from the community?"
                    value={form.reason}
                    onChange={(e) => update('reason', e.target.value)}
                    className={`${formControlClass(false)} resize-none min-h-[72px]`}
                  />
                </FormField>
              </div>
            </FormSection>

            <FormConsent
              checked={form.consent}
              onChange={(e) => update('consent', e.target.checked)}
              error={errors.consent}
            >
              I agree to join the FixityEdx community and receive updates about events and opportunities.
            </FormConsent>

            <FormSubmitButton sending={sending} accent="yellow">
              {selectedEvent ? 'Register & Join' : "Join Now — It's Free"}
            </FormSubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </FormShell>
  )
}
