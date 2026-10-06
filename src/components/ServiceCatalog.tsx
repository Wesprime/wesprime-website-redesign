import { useState } from 'react'
import { getService, serviceGroups } from '../data/services'
import { serviceHref } from '../router'
import { Icon } from './Icon'

// One line per group, shown in the sticky intro beside its services.
const groupIntro: Record<string, string> = {
  'Odoo ERP': 'Plan, implement and tailor Odoo around the way your business runs.',
  'Data & Enablement': 'Move your data, connect your systems and get every team confident.',
  'Digital Solutions': 'Websites, software, automation and AI that extend your ERP.',
}

const total = serviceGroups.reduce((n, g) => n + g.slugs.length, 0)

/** Services page catalog: filter tabs, then one band per group with a sticky intro and service cards. */
export function ServiceCatalog() {
  const [filter, setFilter] = useState('All')
  // Service numbers run across all groups (01–13), whatever the filter.
  const numbered = serviceGroups.map((g, i) => ({
    ...g,
    index: i,
    start: serviceGroups.slice(0, i).reduce((n, x) => n + x.slugs.length, 0),
  }))

  return (
    <div className="sc">
      <div className="sc-tabs" role="tablist" aria-label="Filter services">
        {['All', ...serviceGroups.map((g) => g.title)].map((t) => {
          const count = t === 'All' ? total : serviceGroups.find((g) => g.title === t)!.slugs.length
          return (
            <button key={t} type="button" role="tab" aria-selected={filter === t} className={filter === t ? 'is-on' : ''} onClick={() => setFilter(t)}>
              {t}
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
              <h2>{g.title}</h2>
              <p>{groupIntro[g.title]}</p>
              <span className="sc-intro-count">{g.slugs.length} services</span>
            </div>
            <div className="sc-cards" key={filter}>
              {g.slugs.map((slug, i) => {
                const s = getService(slug)!
                return (
                  <a key={slug} className="sc-card" href={serviceHref(slug)}>
                    <span className="sc-num" aria-hidden="true">{String(g.start + i + 1).padStart(2, '0')}</span>
                    <span className="sc-icon"><Icon markup={s.icon} size={26} strokeWidth={1.7} /></span>
                    <h3>{s.title}</h3>
                    <p>{s.tagline}</p>
                    <ul className="sc-tags">
                      {s.included.slice(0, 3).map((t) => <li key={t}>{t}</li>)}
                    </ul>
                    <span className="sc-cta">
                      View details
                      <span className="sc-arrow" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                      </span>
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        ))}
    </div>
  )
}
