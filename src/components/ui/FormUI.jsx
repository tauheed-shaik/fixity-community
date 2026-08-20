import { ChevronDown } from 'lucide-react'

export function FormShell({ children, accent = 'yellow' }) {
  const accentBar =
    accent === 'purple'
      ? 'from-purple via-magenta to-orange'
      : 'from-primary-yellow via-orange to-magenta'

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(5,5,43,0.45)]">
      <div className={`h-1.5 w-full bg-gradient-to-r ${accentBar}`} />
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative p-6 sm:p-7">{children}</div>
    </div>
  )
}

export function FormHeader({ eyebrow, title, titleId, description, badge }) {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-purple mb-1.5">{eyebrow}</p>
          <h3 id={titleId} className="text-text-dark text-xl sm:text-2xl font-extrabold tracking-tight">
            {title}
          </h3>
        </div>
        {badge ? (
          <span className="shrink-0 mt-1 px-2.5 py-1 rounded-full bg-primary-yellow/15 text-dark-navy text-[10px] font-extrabold uppercase tracking-wide">
            {badge}
          </span>
        ) : null}
      </div>
      {description ? <p className="text-text-gray text-sm leading-relaxed">{description}</p> : null}
    </div>
  )
}

export function FormField({
  id,
  label,
  error,
  icon: Icon,
  optional,
  children,
  className = '',
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-dark/70">{label}</span>
        {optional ? <span className="text-[10px] text-text-gray/70">Optional</span> : null}
      </label>
      <div className="relative">
        {Icon ? (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-gray/50 pointer-events-none" />
        ) : null}
        {children}
      </div>
      {error ? <p className="mt-1 text-[11px] text-red-500 font-medium">{error}</p> : null}
    </div>
  )
}

export function formControlClass(hasError, hasIcon = false) {
  return [
    'w-full rounded-xl border bg-[#F7F8FC] text-text-dark text-sm transition-all duration-200',
    'placeholder:text-text-gray/45',
    'focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple/20 focus:border-purple',
    hasError ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : 'border-[#E8E8F0] hover:border-[#D5D5E4]',
    hasIcon ? 'pl-10 pr-3 py-2.5' : 'px-3.5 py-2.5',
  ].join(' ')
}

export function FormSelect({ id, value, onChange, options, placeholder, error, icon: Icon }) {
  return (
    <FormField id={id} label={placeholder} error={error} icon={Icon}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`${formControlClass(Boolean(error), Boolean(Icon))} appearance-none cursor-pointer pr-10`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-gray/50 pointer-events-none" />
      </div>
    </FormField>
  )
}

export function FormSection({ title, children }) {
  return (
    <div className="space-y-3">
      {title ? (
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-gray/80 pt-1">{title}</p>
      ) : null}
      {children}
    </div>
  )
}

export function FormSubmitButton({ children, sending, accent = 'yellow' }) {
  const styles =
    accent === 'purple'
      ? 'bg-gradient-to-r from-purple via-magenta to-orange shadow-[0_10px_28px_rgba(91,18,214,0.35)]'
      : 'bg-primary-yellow text-dark-navy shadow-[0_10px_28px_rgba(255,196,0,0.35)] hover:bg-bright-yellow'

  return (
    <button
      type="submit"
      disabled={sending}
      data-cursor="button"
      className={`group w-full mt-1 rounded-xl px-5 py-3.5 font-extrabold text-sm uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 ${styles} ${
        accent === 'purple' ? 'text-white' : ''
      }`}
    >
      {sending ? 'Submitting…' : children}
    </button>
  )
}

export function FormSuccess({ title, message, icon: Icon }) {
  return (
    <div className="py-10 px-2 text-center">
      <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-green/10 flex items-center justify-center">
        <Icon className="w-8 h-8 text-green" />
      </div>
      <h3 className="text-text-dark text-xl font-extrabold mb-2">{title}</h3>
      <p className="text-text-gray text-sm leading-relaxed max-w-xs mx-auto">{message}</p>
    </div>
  )
}

export function FormConsent({ checked, onChange, error, children }) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer rounded-xl border border-[#E8E8F0] bg-[#F7F8FC] px-3.5 py-3 hover:border-purple/30 transition-colors">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mt-0.5 w-4 h-4 rounded border-border-light accent-purple shrink-0"
        />
        <span className="text-text-gray text-xs leading-relaxed">{children}</span>
      </label>
      {error ? <p className="mt-1 text-[11px] text-red-500 font-medium">{error}</p> : null}
    </div>
  )
}

export function EventBanner({ title, live }) {
  return (
    <div className="mb-5 rounded-xl border border-purple/15 bg-gradient-to-r from-purple/5 to-cyan/5 px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-purple mb-0.5">Registering for</p>
      <div className="flex items-center gap-2">
        {live ? (
          <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase text-green">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            Live
          </span>
        ) : null}
        <p className="text-text-dark text-sm font-bold truncate">{title}</p>
      </div>
    </div>
  )
}
