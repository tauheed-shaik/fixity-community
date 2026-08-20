import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Mail, MapPin, Phone, User, MessageSquare } from 'lucide-react'
import { submitToSheets } from '../lib/formSubmit'
import {
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

const interests = ['Workshops', 'Skill Programs', 'Certifications', 'Career Opportunities', 'Tech Ambassador Program']
const qualifications = ['Student', 'Graduate', 'Working Professional', 'Career Switcher', 'Other']
const sources = ['Social Media', 'Friend / Referral', 'College / University', 'Event', 'Search Engine', 'Other']

const initialForm = {
  name: '',
  email: '',
  mobile: '',
  city: '',
  interest: '',
  qualification: '',
  source: '',
  message: '',
  consent: false,
}

export default function EnquiryForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.mobile.trim() || !/^[+\d\s-]{10,}$/.test(form.mobile)) e.mobile = 'Enter a valid mobile number'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.interest) e.interest = 'Select an interest'
    if (!form.qualification) e.qualification = 'Select your status'
    if (!form.source) e.source = 'Tell us how you found us'
    if (!form.consent) e.consent = 'Please accept to continue'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSending(true)
    try {
      await submitToSheets('enquire', {
        fullName: form.name,
        email: form.email,
        mobile: form.mobile,
        city: form.city,
        interest: form.interest,
        qualification: form.qualification,
        source: form.source,
        message: form.message,
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
    <FormShell accent="purple">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <FormSuccess
              icon={CheckCircle2}
              title="Enquiry received"
              message="Thank you! Our team will get in touch with you shortly."
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
              eyebrow="Contact"
              title="Enquire Now"
              titleId="enquire-modal-title"
              description="Share a few details and we’ll help you find the right learning path."
            />

            <FormSection title="Your details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="enquire-name" label="Full name" error={errors.name} icon={User}>
                  <input
                    id="enquire-name"
                    type="text"
                    placeholder="Alex Kumar"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={formControlClass(Boolean(errors.name), true)}
                  />
                </FormField>
                <FormField id="enquire-email" label="Email" error={errors.email} icon={Mail}>
                  <input
                    id="enquire-email"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={formControlClass(Boolean(errors.email), true)}
                  />
                </FormField>
                <FormField id="enquire-mobile" label="Mobile" error={errors.mobile} icon={Phone}>
                  <input
                    id="enquire-mobile"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.mobile}
                    onChange={(e) => update('mobile', e.target.value)}
                    className={formControlClass(Boolean(errors.mobile), true)}
                  />
                </FormField>
                <FormField id="enquire-city" label="City" error={errors.city} icon={MapPin}>
                  <input
                    id="enquire-city"
                    type="text"
                    placeholder="Vijayawada"
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    className={formControlClass(Boolean(errors.city), true)}
                  />
                </FormField>
              </div>
            </FormSection>

            <FormSection title="Preferences">
              <div className="space-y-3">
                <FormSelect
                  id="enquire-interest"
                  value={form.interest}
                  onChange={(e) => update('interest', e.target.value)}
                  options={interests}
                  placeholder="What are you interested in?"
                  error={errors.interest}
                />
                <FormSelect
                  id="enquire-qualification"
                  value={form.qualification}
                  onChange={(e) => update('qualification', e.target.value)}
                  options={qualifications}
                  placeholder="Current qualification / status"
                  error={errors.qualification}
                />
                <FormSelect
                  id="enquire-source"
                  value={form.source}
                  onChange={(e) => update('source', e.target.value)}
                  options={sources}
                  placeholder="How did you hear about us?"
                  error={errors.source}
                />
                <FormField id="enquire-message" label="Message" optional icon={MessageSquare}>
                  <textarea
                    id="enquire-message"
                    rows={3}
                    placeholder="Anything you'd like us to know…"
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className={`${formControlClass(false, true)} resize-none min-h-[88px] pt-2.5`}
                  />
                </FormField>
              </div>
            </FormSection>

            <FormConsent
              checked={form.consent}
              onChange={(e) => update('consent', e.target.checked)}
              error={errors.consent}
            >
              I agree to receive updates from FixityEdx about programs and events.
            </FormConsent>

            <FormSubmitButton sending={sending} accent="purple">
              Submit Enquiry
            </FormSubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </FormShell>
  )
}
