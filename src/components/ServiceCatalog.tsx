import { useCallback, useEffect, useRef, useState } from 'react'
import { getService, serviceGroups, type Service } from '../data/services'
import { contactHref, serviceHref } from '../router'
import { Check, Icon } from './Icon'
import { useT } from '../i18n'
import { Headline } from './Headline'

// One line per group, shown in the sticky intro beside its services.
const groupIntro: Record<string, string> = {
  'Odoo ERP': 'Plan, implement and tailor Odoo around the way your business runs.',
  'Data & Enablement': 'Move your data, connect your systems and get every team confident.',
  'Digital Solutions': 'Websites, software, automation and AI that extend your ERP.',
}

const total = serviceGroups.reduce((n, g) => n + g.slugs.length, 0)

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      {open ? <path d="M4 4l16 16" /> : <circle cx="12" cy="12" r="3" />}
    </svg>
  )
}

/** Short summary of a service, opened in place below its card. */
function QuickView({ service, onClose }: { service: Service; onClose: () => void }) {
  const t = useT()
  const ref = useRef<HTMLDivElement>(null)

  // Bring the summary into view and let Escape close it.
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [service, onClose])

  return (
    <div className="sc-quick" id={`sc-quick-${service.slug}`} ref={ref} role="region" aria-label={t(service.title)}>
      <div className="sc-quick-head">
        <span className="sc-icon"><Icon markup={service.icon} size={26} strokeWidth={1.7} /></span>
        <div>
          <h3>{t(service.title)}</h3>
          <p>{t(service.tagline)}</p>
        </div>
        <button type="button" className="sc-quick-close" aria-label={t('Close')} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <p className="sc-quick-overview">{t(service.overview)}</p>
      <div className="sc-quick-cols">
        <div>
          <span className="sc-quick-label">{t("What's included")}</span>
          <ul className="sc-quick-list">
            {service.included.map((item) => <li key={item}><Check />{t(item)}</li>)}
          </ul>
        </div>
        <div>
          <span className="sc-quick-label">{t('Related Odoo modules')}</span>
          <ul className="sc-tags">
            {service.modules.map((m) => <li key={m}>{t(m)}</li>)}
          </ul>
        </div>
      </div>
      <div className="sc-quick-foot">
        <a className="btn btn-accent" href={contactHref(service.slug)}>{t('Talk to an Expert')}</a>
        <a className="text-link" href={serviceHref(service.slug)}>{t('Full service page')} <span className="arrow" aria-hidden="true">→</span></a>
      </div>
    </div>
  )
}

/** Services page catalog: filter tabs, then one band per group with a sticky intro and service cards. */
export function ServiceCatalog() {
  const t = useT()
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState<string | null>(null)
  const close = useCallback(() => setOpen(null), [])
  // Service numbers run across all groups, whatever the filter.
  const numbered = serviceGroups.map((g, i) => ({
    ...g,
    index: i,
    start: serviceGroups.slice(0, i).reduce((n, x) => n + x.slugs.length, 0),
  }))

  return (
    <div className="sc">
      <div className="sc-tabs" role="tablist" aria-label={t("Filter services")}>
        {['All', ...serviceGroups.map((g) => g.title)].map((name) => {
          const count = name === 'All' ? total : serviceGroups.find((g) => g.title === name)!.slugs.length
          return (
            <button key={name} type="button" role="tab" aria-selected={filter === name} className={filter === name ? 'is-on' : ''} onClick={() => { setFilter(name); setOpen(null) }}>
              {t(name)}
              <span>{count}</span>
            </button>
          )
        })}
      </div>

      {numbered
        .filter((g) => filter === 'All' || g.title === filter)
        .map((g) => (
          <div key={g.title} className="sc-band">
            <div className="sc-intro">
              <span className="sc-intro-num">{String(g.index + 1).padStart(2, '0')}</span>
              <Headline text={g.title} />
              <p>{t(groupIntro[g.title])}</p>
              <span className="sc-intro-count">{t('{n} services', { n: g.slugs.length })}</span>
            </div>
            <div className="sc-cards" key={filter}>
              {g.slugs.map((slug, i) => {
                const s = getService(slug)!
                const isOpen = open === slug
                return [
                  <div key={slug} className={`sc-card${isOpen ? ' is-open' : ''}`} onClick={() => setOpen(isOpen ? null : slug)}>
                    <span className="sc-num" aria-hidden="true">{String(g.start + i + 1).padStart(2, '0')}</span>
                    <span className="sc-icon"><Icon markup={s.icon} size={26} strokeWidth={1.7} /></span>
                    <h3>{t(s.title)}</h3>
                    <p>{t(s.tagline)}</p>
                    <ul className="sc-tags">
                      {s.included.slice(0, 3).map((item) => <li key={item}>{t(item)}</li>)}
                    </ul>
                    {/* The card itself also toggles; the button is the keyboard and screen-reader control. */}
                    <button
                      type="button"
                      className="sc-cta"
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? `sc-quick-${slug}` : undefined}
                      onClick={(e) => { e.stopPropagation(); setOpen(isOpen ? null : slug) }}
                    >
                      {isOpen ? t('Hide details') : t('Quick view')}
                      <span className="sc-eye"><EyeIcon open={isOpen} /></span>
                    </button>
                  </div>,
                  isOpen && <QuickView key={`${slug}-quick`} service={s} onClose={close} />,
                ]
              })}
            </div>
          </div>
        ))}
    </div>
  )
}
