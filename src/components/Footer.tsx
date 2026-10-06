import { contact, whatsappHref } from '../data/content'
import { guideHref, paths, serviceHref } from '../router'
import { Logo } from './Icon'

const year = new Date().getFullYear()

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: 'Services',
    links: [
      ['ERP Consultation', serviceHref('erp-consultation')],
      ['Odoo Implementation', serviceHref('odoo-implementation')],
      ['Custom Development', serviceHref('custom-odoo-development')],
      ['Data Migration', serviceHref('data-migration')],
      ['System Integration', serviceHref('system-integration')],
      ['Training & Support', serviceHref('training-enablement')],
    ],
  },
  {
    title: 'Solutions',
    links: [
      ['Odoo ERP', paths.solutions],
      ['Business Automation', serviceHref('business-automation')],
      ['AI Solutions', serviceHref('ai-solutions')],
      ['Custom Software', serviceHref('software-development')],
      ['Industries', paths.industries],
      ['ZATCA guide', guideHref('zatca-phase-2-e-invoicing')],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', paths.about],
      ['Case Studies', paths.cases],
      ['Resources', paths.resources],
      ['FAQ', paths.faq],
      ['Contact', paths.contact],
    ],
  },
]

const icon = {
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>,
  phone: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>,
  chat: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" /></svg>,
}

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-about">
            <a className="footer-logo" href={paths.home} aria-label="Wesprime home">
              <Logo size={40} />
              <span>wesprime</span>
            </a>
            <p>Odoo ERP consulting and digital transformation — from process analysis to long-term support.</p>
            <div className="footer-contact">
              <a href={`mailto:${contact.email}`}>{icon.mail}{contact.email}</a>
              <a href={contact.phoneHref}>{icon.phone}{contact.phone}</a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">{icon.chat}WhatsApp</a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} className="footer-col" aria-label={col.title}>
              <span className="footer-heading">{col.title}</span>
              {col.links.map(([label, href]) => (
                <a key={label} className="footer-link" href={href}>{label}</a>
              ))}
            </nav>
          ))}
        </div>

        <div className="footer-watermark" aria-hidden="true">wesprime</div>

        <div className="footer-bottom">
          <span>© {year} Wesprime Business Solutions Private Limited. All rights reserved.</span>
          <div className="footer-legal">
            <a href={paths.home}>Privacy Policy</a>
            <a href={paths.home}>Terms of Use</a>
            <button type="button" className="to-top" onClick={toTop}>
              Back to top
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
