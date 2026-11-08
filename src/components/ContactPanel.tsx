import { useEffect, useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { companySizes, contact, serviceOptions, whatsappHref } from '../data/content'
import { packages } from '../data/outcomes'
import { getService } from '../data/services'
import { contactContext, paths, serviceHref } from '../router'
import { CountrySelect } from './CountrySelect'
import { Icon, WhatsAppIcon } from './Icon'
import { useT } from '../i18n'
import { Headline } from './Headline'

// Contact page: info panel with contact methods and next steps, and a form with
// chip pickers. No backend yet, so the enquiry is handed to email or WhatsApp.

type Fields = {
  name: string; position: string; company: string; years: string; email: string; phone: string
  country: string; service: string; size: string; message: string
}

const empty: Fields = { name: '', position: '', company: '', years: '', email: '', phone: '', country: '', service: '', size: '', message: '' }

const labels: Record<keyof Fields, string> = {
  name: 'Name', position: 'Position', company: 'Company', years: 'Years in business', email: 'Email', phone: 'Phone',
  country: 'Country', service: 'Service', size: 'Company size', message: 'Message',
}

const yearOptions = ['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10–20 years', 'More than 20 years']

// The service page each form option's quick summary (points and modules) comes from.
const optionInfo: Record<string, { slug: string; tagline?: string; points?: string[]; modules?: string[] }> = {
  ExpertDesk: { slug: 'erp-consultation' },
  BusinessSuite: { slug: 'odoo-customization' },
  SalesConnect: { slug: 'crm' },
  FatooraCare: { slug: 'zatca-e-invoicing' },
  'Inventory Management': { slug: 'inventory-management' },
  Insight360: { slug: 'dashboards-reporting' },
  AutoFlow: { slug: 'business-automation' },
  'Migration Services': { slug: 'data-migration' },
  ManagedCare: { slug: 'support-maintenance' },
  Optimize360: { slug: 'erp-health-check' },
  'Training & Support': { slug: 'training-enablement' },
  'FinCore+': { slug: 'fincore-plus' },
  'CFO Partner Services': { slug: 'cfo-partner' },
  'Digital Solutions': {
    slug: 'custom-applications',
    tagline: 'Websites, software and AI that extend your business systems.',
    points: ['DigitalPresence', 'Software Development', 'Custom Applications', 'AI Solutions'],
    modules: ['Website', 'eCommerce', 'Studio', 'Discuss'],
  },
}

// Service page slug -> form option, so "#/contact/<slug>" arrives with the service picked.
const optionBySlug: Record<string, string> = {
  ...Object.fromEntries(Object.entries(optionInfo).filter(([o]) => o !== 'Digital Solutions').map(([o, i]) => [i.slug, o])),
  'system-integration': 'Migration Services',
  'go-live-hypercare': 'Training & Support',
  'web-development': 'Digital Solutions',
  'software-development': 'Digital Solutions',
  'ai-solutions': 'Digital Solutions',
  'custom-applications': 'Digital Solutions',
}

/** Empty form, prefilled from the service and package in the link that opened it. */
function initialFields(): Fields {
  const { service, pkg } = contactContext()
  const chosen = packages.find((p) => p.id === pkg)
  return {
    ...empty,
    service: optionBySlug[service] ?? '',
    message: chosen ? `I'd like to discuss the ${chosen.name} implementation package.

` : '',
  }
}

const summaryOf = (option: string) => {
  const info = optionInfo[option]
  const service = getService(info.slug)
  return {
    icon: service?.icon ?? '',
    tagline: info.tagline ?? service?.tagline ?? '',
    points: info.points ?? service?.included.slice(0, 4) ?? [],
    modules: info.modules ?? service?.modules ?? [],
    href: info.tagline ? paths.services : serviceHref(info.slug),
  }
}

function InfoIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 11v6" />
      <circle cx="12" cy="7.6" r=".6" fill="currentColor" />
    </svg>
  )
}

/** Service cards; hovering (or focusing, or tapping) the "i" shows that service's details beside it. */
function ServiceChips({ value, onPick }: { value: string; onPick: (v: string) => void }) {
  const t = useT()
  const id = useId()
  const [peek, setPeek] = useState<string | null>(null)

  // Escape closes the details.
  useEffect(() => {
    if (!peek) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPeek(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [peek])

  return (
    <div className="cp-svcs" role="radiogroup" aria-label={t(labels.service)}>
      {serviceOptions.map((o, n) => {
        const info = summaryOf(o)
        const open = peek === o
        const tipId = `${id}-tip-${n}`
        return (
          <div key={o} className={`cp-svc${value === o ? ' is-on' : ''}${open ? ' is-peek' : ''}`}>
            <label>
              <input type="radio" name="service" value={o} checked={value === o} onChange={() => onPick(o)} />
              <span className="cp-svc-icon"><Icon markup={info.icon} size={18} strokeWidth={1.9} /></span>
              <b className="cp-svc-name">{t(o)}</b>
            </label>
            <span
              className="cp-svc-info"
              onMouseEnter={() => setPeek(o)}
              onMouseLeave={() => setPeek((p) => (p === o ? null : p))}
              onFocus={() => setPeek(o)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPeek((p) => (p === o ? null : p)) }}
            >
              <button
                type="button"
                className="cp-peek"
                aria-label={`${t('Service details')}: ${t(o)}`}
                aria-expanded={open}
                aria-describedby={open ? tipId : undefined}
                onClick={() => setPeek(open ? null : o)}
              >
                <InfoIcon />
              </button>
              {open && (
                <span className="cp-tip" id={tipId} role="tooltip">
                  <b>{t(o)}</b>
                  <span className="cp-tip-text">{t(info.tagline)}</span>
                  <span className="cp-tip-list">{info.points.map((pt) => <span key={pt}>{t(pt)}</span>)}</span>
                  {info.modules.length > 0 && (
                    <span className="cp-peek-mods">
                      <span>{t('Odoo modules')}</span>
                      {info.modules.map((m) => <i key={m}>{t(m)}</i>)}
                    </span>
                  )}
                  <a href={info.href} target="_blank" rel="noopener noreferrer">{t('Full details')} ↗</a>
                </span>
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const icons: Record<string, ReactNode> = {
  mail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>,
  phone: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>,
  send: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>,
}

const nextSteps = [
  ['We review your enquiry', 'A consultant reads your message and your current setup.'],
  ['Discovery call', 'A short call to understand your processes and goals.'],
  ['Proposal & roadmap', 'A clear scope, plan and next steps for your project.'],
]

function Chips({ name, options, value, onPick }: { name: string; options: string[]; value: string; onPick: (v: string) => void }) {
  const t = useT()
  return (
    <div className="cp-chips" role="radiogroup" aria-label={t(labels[name as keyof Fields])}>
      {options.map((o) => (
        <label key={o} className={`cp-chip${value === o ? ' is-on' : ''}`}>
          <input type="radio" name={name} value={o} checked={value === o} onChange={() => onPick(o)} />
          {t(o)}
        </label>
      ))}
    </div>
  )
}

export function ContactPanel() {
  const t = useT()
  const id = useId()
  const [fields, setFields] = useState<Fields>(initialFields)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [sent, setSent] = useState<'email' | 'whatsapp' | null>(null)

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }
  const pick = (k: keyof Fields) => (v: string) => setFields((f) => ({ ...f, [k]: v }))

  const filled = Object.values(fields).filter((v) => v.trim()).length
  const progress = Math.round((filled / Object.keys(fields).length) * 100)

  const validate = () => {
    const er: typeof errors = {}
    if (!fields.name.trim()) er.name = 'Please enter your name.'
    if (!isEmail(fields.email.trim())) er.email = 'Please enter a valid email address.'
    if (!fields.message.trim()) er.message = 'Please tell us a little about your project.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const summary = () =>
    (Object.keys(fields) as (keyof Fields)[])
      .filter((k) => k !== 'message' && fields[k].trim())
      .map((k) => `${labels[k]}: ${fields[k].trim()}`)
      .concat(['', fields.message.trim()])
      .join('\n')

  const sendEmail = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const subject = `Website enquiry: ${fields.service || 'General'} — ${fields.company || fields.name}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary())}`
    setSent('email')
  }

  const sendWhatsApp = () => {
    if (!validate()) return
    window.open(`${whatsappHref}?text=${encodeURIComponent(`Hello Wesprime, I'm ${fields.name.trim()}.\n\n${summary()}`)}`, '_blank', 'noopener')
    setSent('whatsapp')
  }

  const reset = () => {
    setFields(empty)
    setSent(null)
  }

  const field = (k: keyof Fields, props: { type?: string; autoComplete?: string; inputMode?: 'tel' | 'email' } = {}) => (
    <div className={`cp-fl${errors[k] ? ' has-error' : ''}`}>
      <input
        id={`${id}-${k}`}
        name={k}
        placeholder=" "
        value={fields[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}
        {...props}
      />
      <label htmlFor={`${id}-${k}`}>{t(labels[k])}{['name', 'email'].includes(k) && <span aria-hidden="true"> *</span>}</label>
      {errors[k] && <span className="cp-err" id={`${id}-${k}-err`}>{t(errors[k]!)}</span>}
    </div>
  )

  return (
    <div className="cp-grid">
      <aside className="cp-info">
        <div className="eyebrow eyebrow-light">{t("GET IN TOUCH")}</div>
        <Headline text="Let's build your Odoo together" />
        <p className="cp-lead">{t("Share a few details and we'll come back with the right next step for your business.")}</p>

        <div className="cp-methods">
          <a className="cp-method" href={`mailto:${contact.email}`}>
            <span className="cp-method-icon">{icons.mail}</span>
            <span><small>{t("Email us")}</small><b>{contact.email}</b></span>
          </a>
          <a className="cp-method" href={contact.phoneHref}>
            <span className="cp-method-icon">{icons.phone}</span>
            <span><small>{t("Call us")}</small><b>{contact.phone}</b></span>
          </a>
          <a className="cp-method" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <span className="cp-method-icon is-wa"><WhatsAppIcon /></span>
            <span><small>{t("Chat with us")}</small><b>{t("WhatsApp")}</b></span>
          </a>
        </div>

        <div className="cp-next">
          <span className="cp-next-title">{t("What happens next")}</span>
          <ol>
            {nextSteps.map(([title, d], i) => (
              <li key={title}>
                <span className="cp-next-num">{i + 1}</span>
                <span><b>{t(title)}</b>{t(d)}</span>
              </li>
            ))}
          </ol>
        </div>

      </aside>

      <div className="cp-card">
        {sent ? (
          <div className="cp-sent" role="status">
            <span className="cp-sent-icon" aria-hidden="true">✓</span>
            <h3>{fields.name.trim() ? t('Thank you, {name}!', { name: fields.name.trim() }) : t('Thank you!')}</h3>
            <p>
              {sent === 'email'
                ? t('Your email app should now be open with your enquiry filled in — just press send.')
                : t('WhatsApp should now be open with your enquiry filled in — just press send.')}
              {' '}{t('If nothing opened, write to')} <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
            <button type="button" className="btn btn-accent btn-lg cp-submit" onClick={reset}>{t("Start a new enquiry")}</button>
          </div>
        ) : (
          <form onSubmit={sendEmail} noValidate>
            <div className="cp-card-head">
              <div>
                <h3>{t("Project enquiry")}</h3>
                <p>{t("Fields marked * are required.")}</p>
              </div>
              <div className="cp-progress" aria-label={`Form ${progress}% complete`}>
                <span className="cp-progress-num">{progress}%</span>
                <span className="cp-progress-bar"><i style={{ width: `${progress}%` }} /></span>
              </div>
            </div>

            <fieldset className="cp-group">
              <legend><span>01</span> {t("About you")}</legend>
              <div className="cp-fields">
                <div className="cp-row">
                  {field('name', { autoComplete: 'name' })}
                  {field('position', { autoComplete: 'organization-title' })}
                </div>
                <div className="cp-row">
                  {field('company', { autoComplete: 'organization' })}
                  <div className="cp-fl cp-fl-select">
                    <select id={`${id}-years`} name="years" value={fields.years} onChange={set('years')} className={fields.years ? 'has-value' : ''}>
                      <option value="" disabled hidden />
                      {yearOptions.map((o) => <option key={o} value={o}>{t(o)}</option>)}
                    </select>
                    <label htmlFor={`${id}-years`}>{t(labels.years)}</label>
                    <svg className="cp-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>
                <div className="cp-row">
                  {field('email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
                  {field('phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
                </div>
                <CountrySelect value={fields.country} onChange={pick('country')} label={t(labels.country)} />
              </div>
            </fieldset>

            <fieldset className="cp-group">
              <legend><span>02</span> {t("Service you're interested in")}</legend>
              <ServiceChips value={fields.service} onPick={pick('service')} />
            </fieldset>

            <fieldset className="cp-group">
              <legend><span>03</span> {t("Company size")}</legend>
              <Chips name="size" options={companySizes} value={fields.size} onPick={pick('size')} />
            </fieldset>

            <fieldset className="cp-group">
              <legend><span>04</span> {t("Your project")}</legend>
              <div className={`cp-fl cp-fl-area${errors.message ? ' has-error' : ''}`}>
                <textarea
                  id={`${id}-message`}
                  name="message"
                  rows={4}
                  placeholder=" "
                  value={fields.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? `${id}-message-err` : undefined}
                />
                <label htmlFor={`${id}-message`}>{t("Tell us about your processes and goals")}<span aria-hidden="true"> *</span></label>
                {errors.message && <span className="cp-err" id={`${id}-message-err`}>{t(errors.message)}</span>}
              </div>
            </fieldset>

            <div className="cp-actions">
              <button type="submit" className="btn btn-accent btn-lg cp-submit">{icons.send} {t("Send enquiry")}</button>
              <button type="button" className="btn btn-dark btn-lg cp-wa" onClick={sendWhatsApp}><span className="cp-wa-icon" aria-hidden="true"><WhatsAppIcon /></span> {t("Send via WhatsApp")}</button>
            </div>
            <p className="cp-fine">{t("Sending opens your email app (or WhatsApp) with the details filled in. Your details are shared only with Wesprime.")}</p>
          </form>
        )}
      </div>
    </div>
  )
}
