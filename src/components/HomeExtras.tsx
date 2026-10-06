import { CompareSlider } from './CompareSlider'
import { StackExplorer } from './StackExplorer'
import { integrationTypes, pillars } from '../data/content'
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
  return (
    <section className="section dark tech-stack">
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <div className="eyebrow eyebrow-light">TECHNOLOGY</div>
            <h2>How an Odoo system fits together</h2>
          </div>
          <p className="lead head-note">Five layers, from the screen your team uses to the server it runs on. Odoo is open source, so we can shape every one of them — no black boxes, no lock-in.</p>
        </div>

        <StackExplorer />

        <div className="tech-build">
          <div className="section-head split">
            <div className="stack-sm">
              <h3 className="tech-sub">Your process, before and after Odoo</h3>
            </div>
            <p className="lead head-note">Pick an everyday process and drag the handle to see how it changes when every team works in one connected system.</p>
          </div>
          <CompareSlider />
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
