import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { companySizes, contact, serviceOptions, whatsappHref } from '../data/content'

// Contact page: info panel with a live "enquiry.json" preview, and a form with
// chip pickers. No backend yet, so the enquiry is handed to email or WhatsApp.

type Fields = {
  name: string; company: string; email: string; phone: string
  country: string; service: string; size: string; message: string
}

const empty: Fields = { name: '', company: '', email: '', phone: '', country: '', service: '', size: '', message: '' }

const labels: Record<keyof Fields, string> = {
  name: 'Name', company: 'Company', email: 'Email', phone: 'Phone',
  country: 'Country', service: 'Service', size: 'Company size', message: 'Message',
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const icons: Record<string, ReactNode> = {
  mail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>,
  phone: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>,
  chat: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" /></svg>,
  send: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>,
}

const nextSteps = [
  ['We review your enquiry', 'A consultant reads your message and your current setup.'],
  ['Discovery call', 'A short call to understand your processes and goals.'],
  ['Proposal & roadmap', 'A clear scope, plan and next steps for your project.'],
]

/** The enquiry rendered as syntax-coloured JSON, filled in as the visitor types. */
function JsonPreview({ fields }: { fields: Fields }) {
  const entries = (Object.keys(fields) as (keyof Fields)[]).filter((k) => fields[k].trim())
  return (
    <div className="code-window cp-json" aria-hidden="true">
      <div className="code-bar">
        <span className="code-dots"><i /><i /><i /></span>
        <span className="cp-json-file">enquiry.json</span>
        <span className={`cp-json-status${entries.length ? ' is-live' : ''}`}>{entries.length ? '● live' : 'waiting…'}</span>
      </div>
      <pre className="code-body">
        <code>
          {'{\n'}
          {entries.length === 0 && <span className="tk-com">{'  // start typing in the form →\n'}</span>}
          {entries.map((k, i) => {
            const v = fields[k].trim()
            const shown = v.length > 34 ? `${v.slice(0, 34)}…` : v
            return (
              <span key={k}>
                {'  '}<span className="tk-tag">"{k}"</span>: <span className="tk-str">"{shown}"</span>{i < entries.length - 1 ? ',' : ''}{'\n'}
              </span>
            )
          })}
          {'}'}
        </code>
      </pre>
    </div>
  )
}

function Chips({ name, options, value, onPick }: { name: string; options: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="cp-chips" role="radiogroup" aria-label={labels[name as keyof Fields]}>
      {options.map((o) => (
        <label key={o} className={`cp-chip${value === o ? ' is-on' : ''}`}>
          <input type="radio" name={name} value={o} checked={value === o} onChange={() => onPick(o)} />
          {o}
        </label>
      ))}
    </div>
  )
}

export function ContactPanel() {
  const id = useId()
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [sent, setSent] = useState<'email' | 'whatsapp' | null>(null)

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <label htmlFor={`${id}-${k}`}>{labels[k]}{['name', 'email'].includes(k) && <span aria-hidden="true"> *</span>}</label>
      {errors[k] && <span className="cp-err" id={`${id}-${k}-err`}>{errors[k]}</span>}
    </div>
  )

  return (
    <div className="cp-grid">
      <aside className="cp-info">
        <div className="eyebrow eyebrow-light">GET IN TOUCH</div>
        <h2>Talk to an Odoo expert</h2>
        <p className="cp-lead">Share a few details and we'll come back with the right next step for your business.</p>

        <div className="cp-methods">
          <a className="cp-method" href={`mailto:${contact.email}`}>
            <span className="cp-method-icon">{icons.mail}</span>
            <span><small>Email us</small><b>{contact.email}</b></span>
          </a>
          <a className="cp-method" href={contact.phoneHref}>
            <span className="cp-method-icon">{icons.phone}</span>
            <span><small>Call us</small><b>{contact.phone}</b></span>
          </a>
          <a className="cp-method" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <span className="cp-method-icon is-wa">{icons.chat}</span>
            <span><small>Chat with us</small><b>WhatsApp</b></span>
          </a>
        </div>

        <div className="cp-next">
          <span className="cp-next-title">What happens next</span>
          <ol>
            {nextSteps.map(([t, d], i) => (
              <li key={t}>
                <span className="cp-next-num">{i + 1}</span>
                <span><b>{t}</b>{d}</span>
              </li>
            ))}
          </ol>
        </div>

        <JsonPreview fields={fields} />
      </aside>

      <div className="cp-card">
        {sent ? (
          <div className="cp-sent" role="status">
            <span className="cp-sent-icon" aria-hidden="true">✓</span>
            <h3>Thank you, {fields.name.trim() || 'there'}!</h3>
            <p>
              {sent === 'email'
                ? 'Your email app should now be open with your enquiry filled in — just press send.'
                : 'WhatsApp should now be open with your enquiry filled in — just press send.'}
              {' '}If nothing opened, write to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
            <button type="button" className="cp-submit" onClick={reset}>Start a new enquiry</button>
          </div>
        ) : (
          <form onSubmit={sendEmail} noValidate>
            <div className="cp-card-head">
              <div>
                <h3>Project enquiry</h3>
                <p>Fields marked * are required.</p>
              </div>
              <div className="cp-progress" aria-label={`Form ${progress}% complete`}>
                <span className="cp-progress-num">{progress}%</span>
                <span className="cp-progress-bar"><i style={{ width: `${progress}%` }} /></span>
              </div>
            </div>

            <fieldset className="cp-group">
              <legend><span>01</span> About you</legend>
              <div className="cp-row">
                {field('name', { autoComplete: 'name' })}
                {field('company', { autoComplete: 'organization' })}
              </div>
              <div className="cp-row">
                {field('email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
                {field('phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
              </div>
              {field('country', { autoComplete: 'country-name' })}
            </fieldset>

            <fieldset className="cp-group">
              <legend><span>02</span> Service you're interested in</legend>
              <Chips name="service" options={serviceOptions} value={fields.service} onPick={pick('service')} />
            </fieldset>

            <fieldset className="cp-group">
              <legend><span>03</span> Company size</legend>
              <Chips name="size" options={companySizes} value={fields.size} onPick={pick('size')} />
            </fieldset>

            <fieldset className="cp-group">
              <legend><span>04</span> Your project</legend>
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
                <label htmlFor={`${id}-message`}>Tell us about your processes and goals<span aria-hidden="true"> *</span></label>
                {errors.message && <span className="cp-err" id={`${id}-message-err`}>{errors.message}</span>}
              </div>
            </fieldset>

            <div className="cp-actions">
              <button type="submit" className="cp-submit">{icons.send} Send enquiry</button>
              <button type="button" className="cp-wa" onClick={sendWhatsApp}>{icons.chat} Send via WhatsApp</button>
            </div>
            <p className="cp-fine">Sending opens your email app (or WhatsApp) with the details filled in. Your details are shared only with Wesprime.</p>
          </form>
        )}
      </div>
    </div>
  )
}
