import { useState } from 'react'
import { FeatureBuilder } from './FeatureBuilder'
import { integrationTypes, pillars, stackLayers } from '../data/content'
import { paths } from '../router'

/** Line icon drawn with a blue-to-teal gradient stroke, like iwesabe's pillar icons. */
export function GradientIcon({ id, markup, size = 88 }: { id: string; markup: string; size?: number }) {
  return (
    <svg className="pillar-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`pg-${id}`} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1D5FD6" />
          <stop offset="1" stopColor="#0B3FA0" />
        </linearGradient>
      </defs>
      <g stroke={`url(#pg-${id})`} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: markup }} />
    </svg>
  )
}

export function PillarsSection({ tint = false }: { tint?: boolean }) {
  return (
    <section id="pillars" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head stack-sm">
          <div className="eyebrow">OUR PILLARS</div>
          <h2>What every Wesprime project stands on</h2>
          <p className="muted">Four commitments that shape how we consult, build and support.</p>
        </div>
        <div className="pillars">
          {pillars.map((p, i) => (
            <article key={p.title} className="pillar">
              <GradientIcon id={String(i)} markup={p.icon} />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechStackSection() {
  const [active, setActive] = useState(2)
  const layer = stackLayers[active]
  return (
    <section className="section dark tech-stack">
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <div className="eyebrow eyebrow-light">TECHNOLOGY</div>
            <h2>Built on an open, modern stack</h2>
          </div>
          <p className="lead head-note">Odoo is open source: Python and PostgreSQL underneath, with a framework we extend to fit your processes — no black boxes, no lock-in.</p>
        </div>

        <div className="stack-explorer">
          <div className="stack-layers" role="tablist" aria-label="Architecture layers">
            {stackLayers.map((l, i) => (
              <button
                key={l.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`stack-layer${active === i ? ' is-on' : ''}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="layer-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="layer-name">{l.name}</span>
                <span className="layer-items">{l.items.slice(0, 3).join(' · ')}</span>
              </button>
            ))}
          </div>
          <div className="stack-detail" key={layer.id}>
            <div className="eyebrow eyebrow-light">LAYER {String(active + 1).padStart(2, '0')}</div>
            <h3>{layer.name}</h3>
            <p>{layer.summary}</p>
            <div className="stack-chips">{layer.items.map((i) => <span key={i}>{i}</span>)}</div>
            <div className="stack-work">
              <span>What we do here</span>
              <ul>{layer.work.map((w) => <li key={w}>{w}</li>)}</ul>
            </div>
          </div>
        </div>

        <div className="tech-build">
          <div className="section-head split">
            <div className="stack-sm">
              <h3 className="tech-sub">From business need to working feature</h3>
            </div>
            <p className="lead head-note">When configuration isn't enough, we write clean, upgrade-friendly Odoo modules. Pick an example to watch it come together.</p>
          </div>
          <FeatureBuilder />
          <div className="tech-connect">
            <span className="field-label">WE CONNECT ODOO WITH</span>
            <div className="int-chips">{integrationTypes.map((t) => <span key={t}>{t}</span>)}</div>
            <a className="btn btn-accent" href={paths.solutions}>Explore our Odoo solutions →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
