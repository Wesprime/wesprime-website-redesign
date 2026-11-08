import { contact, whatsappHref } from '../data/content'
import { paths, serviceHref } from '../router'
import { useT } from '../i18n'
import { BrandLogo, WhatsAppIcon } from './Icon'

const year = new Date().getFullYear()

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: 'Services',
    links: [
      ['SalesConnect', serviceHref('crm')],
      ['BusinessSuite', serviceHref('odoo-customization')],
      ['FatooraCare', serviceHref('zatca-e-invoicing')],
      ['Migration Services', serviceHref('data-migration')],
      ['ManagedCare', serviceHref('support-maintenance')],
      ['Training & Support', serviceHref('training-enablement')],
    ],
  },
  {
    title: 'Solutions',
    links: [
      ['Odoo ERP', paths.solutions],
      ['AutoFlow', serviceHref('business-automation')],
      ['Insight360', serviceHref('dashboards-reporting')],
      ['FinCore+', serviceHref('fincore-plus')],
      ['Industries', paths.industries],
      ['CFO Partner Services', serviceHref('cfo-partner')],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', paths.about],
      ['Case Studies', paths.cases],
      ['Blog', paths.blog],
      ['Careers', paths.careers],
      ['FAQ', paths.faq],
      ['Contact', paths.contact],
    ],
  },
]

const icon = {
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>,
  phone: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>,
}

export function Footer() {
  const t = useT()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-about">
            <a className="footer-logo" href={paths.home} aria-label={t('Wesprime home')}>
              <BrandLogo className="footer-logo-img" />
              <span>Wesprime</span>
            </a>
            <p>{t('Odoo ERP consulting and digital transformation — from process analysis to long-term support.')}</p>
            <div className="footer-contact">
              <a href={`mailto:${contact.email}`}>{icon.mail}{contact.email}</a>
              <a href={contact.phoneHref}>{icon.phone}{contact.phone}</a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} />{t('WhatsApp')}</a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} className="footer-col" aria-label={t(col.title)}>
              <span className="footer-heading">{t(col.title)}</span>
              {col.links.map(([label, href]) => (
                <a key={label} className="footer-link" href={href}>{t(label)}</a>
              ))}
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {year} {t('Wesprime Business Solutions Private Limited. All rights reserved.')}</span>
          <div className="footer-legal">
            <a href={paths.home}>{t('Privacy Policy')}</a>
            <a href={paths.home}>{t('Terms of Use')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
