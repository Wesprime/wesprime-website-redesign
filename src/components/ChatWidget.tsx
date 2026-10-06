import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { contact, whatsappHref } from '../data/content'
import { CountryPicker } from './CountryPicker'

// Floating "Let's talk" widget. The site has no backend, so the enquiry is
// handed to WhatsApp (or email) with the visitor's details already filled in.

const GREETING_KEY = 'wesprime-chat-greeting-dismissed'

const readFlag = () => {
  try {
    return localStorage.getItem(GREETING_KEY) === '1'
  } catch {
    return false
  }
}

const writeFlag = () => {
  try {
    localStorage.setItem(GREETING_KEY, '1')
  } catch {
    // Storage blocked: the greeting simply shows again next visit.
  }
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth="2.6" />
    </svg>
  )
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [greeting, setGreeting] = useState(false)
  const [sent, setSent] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [country, setCountry] = useState({ iso: 'SA', code: '+966' })
  const formRef = useRef<HTMLFormElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  // The launcher is hidden while the panel is open, so focus returns to it after it reappears.
  const returnFocus = useRef(false)
  const id = useId()

  // Show the "We're here" bubble a few seconds after load, once per visitor.
  useEffect(() => {
    if (readFlag()) return
    const t = window.setTimeout(() => setGreeting(true), 4000)
    return () => window.clearTimeout(t)
  }, [])

  // Escape closes the panel and returns focus to the launcher.
  useEffect(() => {
    if (!open) return
    formRef.current?.querySelector<HTMLInputElement>('input')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      returnFocus.current = true
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const dismissGreeting = () => {
    setGreeting(false)
    writeFlag()
  }

  const toggle = () => {
    dismissGreeting()
    setOpen((o) => !o)
  }

  const compose = (form: HTMLFormElement) => {
    const f = new FormData(form)
    const get = (k: string) => String(f.get(k) ?? '').trim()
    const phone = get('phone') ? `${get('code')} ${get('phone')}` : ''
    return {
      name: get('name'),
      valid: get('name') && (get('phone') || get('email')) && get('message'),
      // Greeting, message and contact details as separate paragraphs.
      text: [
        `Hello Wesprime, I'm ${get('name')}.`,
        get('message'),
        [phone && `Phone: ${phone}`, get('email') && `Email: ${get('email')}`].filter(Boolean).join('\n'),
      ].join('\n\n'),
    }
  }

  const submit = (via: 'whatsapp' | 'email') => (e?: FormEvent) => {
    e?.preventDefault()
    const form = formRef.current
    if (!form) return
    const msg = compose(form)
    if (!msg.valid) {
      setError('Please add your name, a phone number or email, and a short message.')
      return
    }
    setError('')
    if (via === 'whatsapp') {
      window.open(`${whatsappHref}?text=${encodeURIComponent(msg.text)}`, '_blank', 'noopener')
    } else {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Website enquiry from ${msg.name}`)}&body=${encodeURIComponent(msg.text)}`
    }
    setSent(msg.name)
    form.reset()
  }

  const close = () => {
    returnFocus.current = true
    setOpen(false)
  }

  useEffect(() => {
    if (open || !returnFocus.current) return
    returnFocus.current = false
    launcherRef.current?.focus()
  }, [open])

  return (
    <div className="chat">
      {greeting && !open && (
        <div className="chat-greeting" role="status">
          <button type="button" className="chat-greeting-close" aria-label="Dismiss" onClick={dismissGreeting}>×</button>
          <b>We're here to help!</b>
          <span>Questions about Odoo? Talk to our team.</span>
        </div>
      )}

      {open && (
        <div className="chat-panel" role="dialog" aria-modal="false" aria-labelledby={`${id}-title`}>
          <div className="chat-top">
            <button type="button" className="chat-icon-btn" aria-label="Back" onClick={close}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="chat-icon-btn" aria-label="Close chat" onClick={close}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <div className="chat-scroll">
            <p className="chat-intro" id={`${id}-title`}>
              Please provide your details below. We're ready to assist you.
              <span lang="ar" dir="rtl">يرجى تزويدنا ببياناتك أدناه، ونحن جاهزون لمساعدتك.</span>
            </p>

            {sent ? (
              <div className="chat-card chat-sent" role="status">
                <span className="chat-sent-icon" aria-hidden="true">✓</span>
                <b>Thank you, {sent}!</b>
                <p>Your message is ready to send. If nothing opened, contact us at <a href={`mailto:${contact.email}`}>{contact.email}</a> or <a href={contact.phoneHref}>{contact.phone}</a>.</p>
                <button type="button" className="chat-start" onClick={() => setSent(null)}>Send another message</button>
              </div>
            ) : (
              <form ref={formRef} className="chat-card chat-form" onSubmit={submit('whatsapp')} noValidate>
                <input className="chat-field" name="name" autoComplete="name" placeholder="Name" aria-label="Name" required />
                <div className="chat-phone">
                  <span className="chat-phone-label">Phone</span>
                  <CountryPicker value={country.iso} onChange={(iso, code) => setCountry({ iso, code })} />
                  <span className="chat-phone-code">{country.code.replace('+', '+ ')}</span>
                  <input type="hidden" name="code" value={country.code} />
                  <input name="phone" type="tel" inputMode="tel" autoComplete="tel-national" aria-label="Phone number" />
                </div>
                <input className="chat-field" name="email" type="email" autoComplete="email" placeholder="Email" aria-label="Email" />
                <textarea className="chat-field" name="message" rows={3} placeholder="Enter your Message / أدخل رسالتك" aria-label="Message" required />
                {error && <p className="chat-error" role="alert">{error}</p>}
                <button type="submit" className="chat-start">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                  Start Chat
                </button>
                <button type="button" className="chat-alt" onClick={() => submit('email')()}>or send by email</button>
              </form>
            )}
          </div>

          <p className="chat-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
            Your details are shared only with Wesprime
          </p>
        </div>
      )}

      {!open && (
        <button
          ref={launcherRef}
          type="button"
          className="chat-launcher"
          aria-haspopup="dialog"
          aria-label="Let's talk"
          onClick={toggle}
        >
          <ChatIcon />
          <span className="chat-launcher-text">
            Let's talk <span lang="ar" dir="rtl">/ لنتحدث</span>
          </span>
        </button>
      )}
    </div>
  )
}
