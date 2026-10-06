import { useState } from 'react'
import { appIcons } from '../data/appIcons'
import { odooAppCategories } from '../data/content'
import { migrationSources } from '../data/saudi'
import { guideHref, paths } from '../router'
import { Icon } from './Icon'

const benefits = [
  {
    title: 'One database, every team',
    text: 'Finance, sales, stock and HR share the same records, so nothing is re-keyed and reports are always current.',
    icon: '<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
  },
  {
    title: 'Start small, grow later',
    text: 'Begin with the apps you need today and add more as the business grows — no re-implementation.',
    icon: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><path d="M17.25 13.5v7.5M13.5 17.25H21"/>',
  },
  {
    title: 'Open source, no lock-in',
    text: 'Built on Python and PostgreSQL. Your data and customizations stay yours, wherever Odoo is hosted.',
    icon: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16"/>',
  },
  {
    title: 'Ready for Saudi business',
    text: 'Arabic interface, bilingual documents and Odoo\'s Saudi localization for VAT and ZATCA e-invoicing.',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
  },
]

export function WhyOdooSection() {
  return (
    <section className="section">
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <div className="eyebrow">WHY ODOO</div>
            <h2>One platform instead of ten disconnected tools</h2>
          </div>
          <p className="muted head-note">Odoo replaces spreadsheets and separate systems with integrated apps — and we shape it around the way you work.</p>
        </div>
        <div className="wo-grid">
          {benefits.map((b, i) => (
            <article key={b.title} className="wo-card">
              <span className="wo-icon"><Icon markup={b.icon} size={26} strokeWidth={1.7} /></span>
              <span className="wo-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Category icons for the app launcher tabs and tiles.
const categoryIcons: Record<string, string> = {
  Finance: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M8 15h2M12 15h2M8 18h8"/>',
  Sales: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  Websites: '<rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="M2.5 8.5h19"/>',
  'Supply Chain': '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  'Human Resources': '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 15.5c.9-.6 1.9-1 3-1 2.8 0 4.5 2 4.5 5"/>',
  Marketing: '<path d="M3 11v2a1 1 0 001 1h3l6 4V6L7 10H4a1 1 0 00-1 1z"/><path d="M17 9a4 4 0 010 6"/>',
  Services: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  Productivity: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
}

export function AppLauncherSection() {
  const [cat, setCat] = useState(0)
  const current = odooAppCategories[cat]
  return (
    <section className="section">
      <div className="container stack-xl">
        <div className="section-head center">
          <div className="eyebrow">THE APPS</div>
          <h2>Every Odoo app, one database</h2>
          <p className="muted">Pick a category to see the apps we implement and connect.</p>
        </div>
        <div className="al">
          <div className="al-tabs" role="tablist" aria-label="App categories">
            {odooAppCategories.map((c, i) => (
              <button key={c.name} type="button" role="tab" aria-selected={cat === i} className={cat === i ? 'is-on' : ''} onClick={() => setCat(i)}>
                <Icon markup={categoryIcons[c.name] ?? categoryIcons.Productivity} size={18} strokeWidth={1.8} />
                {c.name}
              </button>
            ))}
          </div>
          <div className="al-screen" role="tabpanel" aria-label={current.name}>
            <div className="al-bar" aria-hidden="true">
              <span className="code-dots"><i /><i /><i /></span>
              <span>odoo / {current.name.toLowerCase()}</span>
            </div>
            <div className="al-grid" key={cat}>
              {current.apps.map((a) => (
                <div key={a} className="al-app">
                  <span className="al-app-icon"><Icon markup={appIcons[a] ?? categoryIcons[current.name] ?? categoryIcons.Productivity} size={24} strokeWidth={1.7} /></span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Integration hub: nodes placed on an ellipse around Odoo (positions in % of the box).
const hubNodes = ['Payment gateways', 'E-commerce', 'Banks & statements', 'Shipping carriers', 'Biometric attendance', 'BI & reporting', 'Email & WhatsApp', 'REST APIs & webhooks']

export function EcosystemSection() {
  const points = hubNodes.map((label, i) => {
    const a = ((-90 + (360 / hubNodes.length) * i) * Math.PI) / 180
    return { label, x: 50 + 40 * Math.cos(a), y: 50 + 38 * Math.sin(a) }
  })
  return (
    <section className="section dark eco">
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <div className="eyebrow eyebrow-light">CONNECTED ECOSYSTEM</div>
            <h2>Odoo at the centre of your systems</h2>
          </div>
          <p className="lead head-note">We connect Odoo to the platforms you already rely on, so data flows automatically instead of being copied between tools.</p>
        </div>

        <div className="eco-hub" aria-label="Systems Odoo connects with">
          <svg className="eco-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {points.map((p, i) => (
              <line key={p.label} x1="50" y1="50" x2={p.x} y2={p.y} className="eco-line" style={{ animationDelay: `${i * 0.35}s` }} />
            ))}
          </svg>
          <div className="eco-core">
            <span>Odoo</span>
            <small>ERP core</small>
          </div>
          {points.map((p) => (
            <span key={p.label} className="eco-node" style={{ left: `${p.x}%`, top: `${p.y}%` }}>{p.label}</span>
          ))}
        </div>

        <div className="eco-migrate">
          <div className="eco-migrate-from">
            <span className="field-label">MOVING FROM</span>
            <div className="eco-chips">{migrationSources.map((m) => <span key={m}>{m}</span>)}</div>
          </div>
          <span className="eco-arrow" aria-hidden="true">
            <i /><i /><i />
          </span>
          <div className="eco-migrate-to">
            <b>Odoo</b>
            <span>Mapped, validated and reconciled</span>
            <a href={guideHref('migrating-to-odoo')}>How we migrate →</a>
          </div>
        </div>
      </div>
    </section>
  )
}

const deployments = [
  {
    name: 'Odoo Online',
    tag: 'Fastest start',
    text: 'Odoo\'s own cloud (SaaS). Ready in days with standard apps and automatic upgrades.',
    points: ['Standard apps & configuration', 'Hosting and upgrades by Odoo', 'No custom code modules'],
  },
  {
    name: 'Odoo.sh',
    tag: 'Most flexible',
    text: 'Odoo\'s managed cloud platform with staging environments and support for custom modules.',
    points: ['Custom modules & integrations', 'Staging and production branches', 'Managed backups and monitoring'],
    featured: true,
  },
  {
    name: 'On-premise / private cloud',
    tag: 'Full control',
    text: 'Odoo on your own servers or a cloud region you choose — including inside Saudi Arabia.',
    points: ['Choose where your data lives', 'Full control of the stack', 'Your team or ours manages it'],
  },
]

export function DeploySection({ tint = false }: { tint?: boolean }) {
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head center">
          <div className="eyebrow">DEPLOYMENT</div>
          <h2>Run Odoo where it suits you</h2>
          <p className="muted">We help you choose the right setup for your data, budget and customizations.</p>
        </div>
        <div className="dp-grid">
          {deployments.map((d) => (
            <article key={d.name} className={`dp-card${d.featured ? ' is-featured' : ''}`}>
              <span className="dp-tag">{d.tag}</span>
              <h3>{d.name}</h3>
              <p>{d.text}</p>
              <ul>{d.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <a className={d.featured ? 'btn btn-accent' : 'btn btn-outline'} href={paths.contact}>Discuss this option</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
