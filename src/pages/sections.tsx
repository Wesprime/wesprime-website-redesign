import { useState } from 'react'
import { Check, Icon } from '../components/Icon'
import { GradientIcon } from '../components/HomeExtras'
import { IndustryMosaic } from '../components/IndustryMosaic'
import { ServicesBento } from '../components/ServicesBento'
import { WhyCards } from '../components/WhyCards'
import { ContactPanel } from '../components/ContactPanel'
import { ModuleCard } from '../components/ModuleCard'
import {
  aboutPoints, after, before, coreValues, mission, vision, faqs, journeyPhases,
  odooModules, transformSteps,
} from '../data/content'
import { startSteps } from '../data/saudi'
import { guideHref, paths } from '../router'

export function Eyebrow({ children, light }: { children: string; light?: boolean }) {
  return <div className={`eyebrow${light ? ' eyebrow-light' : ''}`}>{children}</div>
}

function AboutGraphic() {
  const steps = [
    { x: 60, y: 70, tag: '01 · UNDERSTAND', text: 'Your processes, people & goals' },
    { x: 90, y: 190, tag: '02 · DESIGN', text: 'The right ERP & software solution' },
    { x: 60, y: 310, tag: '03 · SUSTAIN', text: 'Long-term support as you grow', active: true },
  ]
  return (
    <svg viewBox="0 0 540 460" fill="none" role="img" aria-label="Understand, design, sustain">
      {steps.map((s) => (
        <g key={s.tag}>
          <rect x={s.x} y={s.y} width="420" height="80" rx="12" fill={s.active ? '#1D5FD6' : '#10254A'} stroke={s.active ? undefined : '#2C4468'} />
          <text x={s.x + 28} y={s.y + 34} fill={s.active ? '#DCE8FF' : '#6FA3FF'} fontSize="12" fontFamily="IBM Plex Mono, monospace">{s.tag}</text>
          <text x={s.x + 28} y={s.y + 60} fill="#fff" fontSize="18" fontWeight="700">{s.text}</text>
        </g>
      ))}
      <line className="flow" x1="270" y1="150" x2="300" y2="190" stroke="#6FA3FF" strokeWidth="1.5" />
      <line className="flow" x1="300" y1="270" x2="270" y2="310" stroke="#6FA3FF" strokeWidth="1.5" />
    </svg>
  )
}

function OdooEcosystem() {
  const [selected, setSelected] = useState(0)
  const positions = odooModules.map((_, i) => {
    const ang = ((-90 + i * 40) * Math.PI) / 180
    return { cx: 280 + 210 * Math.cos(ang), cy: 280 + 210 * Math.sin(ang) }
  })

  return (
    <div className="odoo-layout">
      <div className="orbit">
        <svg viewBox="0 0 560 560" fill="none" aria-hidden="true">
          <circle cx="280" cy="280" r="210" stroke="#D5DCE8" strokeDasharray="4 6" />
          {positions.map((p, i) => (
            <line key={i} x1="280" y1="280" x2={p.cx} y2={p.cy} stroke={i === selected ? '#1D5FD6' : '#C9D2DF'} strokeWidth="1.5" />
          ))}
        </svg>
        <div className="orbit-core">
          <span>ODOO</span>
          <small>ERP</small>
        </div>
        {odooModules.map((m, i) => (
          <button
            key={m.name}
            type="button"
            className={`modbtn${i === selected ? ' is-on' : ''}`}
            style={{ left: `${(positions[i].cx / 560) * 100}%`, top: `${(positions[i].cy / 560) * 100}%` }}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {m.name}
          </button>
        ))}
      </div>
      <ModuleCard index={selected} onSelect={setSelected} />
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq-list">
      {faqs.map(([q, a], i) => (
        <div key={q} className="faq-item">
          <button type="button" className="faqbtn" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {q}
            <span aria-hidden="true">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p className="faqans">{a}</p>}
        </div>
      ))}
    </div>
  )
}

export function AboutSection({ tint = false }: { tint?: boolean }) {
  return (
    <section id="about" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container about">
        <div className="about-visual"><AboutGraphic /></div>
        <div className="stack">
          <Eyebrow>About Wesprime</Eyebrow>
          <h2>Technology that understands your business</h2>
          <p className="muted body-lg">Wesprime Business Solutions is an Odoo ERP consulting and digital transformation company. We start by understanding how your business actually runs — then design, implement and support the ERP and software systems that remove friction and give leadership clear visibility.</p>
          <div className="check-grid">
            {aboutPoints.map((p) => <div key={p} className="check-item"><Check />{p}</div>)}
          </div>
          <div><a className="btn btn-dark" href={paths.services}>Explore our services →</a></div>
        </div>
      </div>
    </section>
  )
}

export function VisionSection({ tint = false }: { tint?: boolean }) {
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head center">
          <Eyebrow>VISION &amp; MISSION</Eyebrow>
          <h2>Why we exist</h2>
          <p className="muted">The purpose behind every implementation we deliver.</p>
        </div>
        <div className="vm-grid">
          <article className="vm-card">
            <span className="vm-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
            </span>
            <Eyebrow>OUR VISION</Eyebrow>
            <h3>Clarity and confidence for every business owner</h3>
            <p>{vision}</p>
          </article>
          <article className="vm-card vm-dark">
            <span className="vm-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
            </span>
            <Eyebrow light>OUR MISSION</Eyebrow>
            <h3>Remove friction, reduce risk, restore focus</h3>
            <p>{mission}</p>
          </article>
        </div>
        <div className="stack-sm">
          <h3 className="values-title">The values we build into every system</h3>
          <div className="values-grid">
            {coreValues.map((v, i) => (
              <div key={v.title} className="value-tile">
                <GradientIcon id={`v${i}`} markup={v.icon} size={40} />
                <div>
                  <b>{v.title}</b>
                  <span>{v.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesSection({ tint = false }: { tint?: boolean }) {
  return (
    <section id="services" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <Eyebrow>CORE SERVICES</Eyebrow>
            <h2>Solutions built around your business</h2>
          </div>
          <div className="stack-sm head-note">
            <p className="muted">From the first process review to long after go-live — one team across consulting, implementation, development and support.</p>
            <a className="text-link" href={paths.services}>All 13 services →</a>
          </div>
        </div>
        <ServicesBento />
      </div>
    </section>
  )
}

export function OdooSection({ tint = false }: { tint?: boolean }) {
  return (
    <section id="odoo" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head center">
          <Eyebrow>HOW IT CONNECTS</Eyebrow>
          <h2>One platform. Connected business.</h2>
          <p className="muted">Select an area to see how it connects to the rest of your operations.</p>
        </div>
        <OdooEcosystem />
      </div>
    </section>
  )
}

export function StartSection({ tint = false }: { tint?: boolean }) {
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <Eyebrow>HOW TO START</Eyebrow>
            <h2>Know the scope before you commit</h2>
          </div>
          <p className="muted head-note">Most ERP overruns come from scope discovered too late. We start by documenting what fits, what needs configuring and what needs building.</p>
        </div>
        <ol className="start-steps">
          {startSteps.map((st, i) => (
            <li key={st.title} className="start-step">
              <div className="start-top">
                <span className="mono-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="start-tag">{st.tag}</span>
              </div>
              <h3>{st.title}</h3>
              <p className="muted small">{st.detail}</p>
            </li>
          ))}
        </ol>
        <div className="start-cta">
          <a className="btn btn-dark btn-lg" href={paths.contact}>Book a scoping call</a>
          <a className="text-link" href={guideHref('fit-gap-analysis')}>What a fit-gap analysis includes →</a>
        </div>
      </div>
    </section>
  )
}

export function JourneySection({ tint = false, title = 'A clear path from discovery to support' }: { tint?: boolean; title?: string }) {
  // Steps are numbered across phases: phase p, step i -> number before it + i + 1.
  const offsets = journeyPhases.map((_, p) => journeyPhases.slice(0, p).reduce((sum, ph) => sum + ph.steps.length, 0))
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head center">
          <Eyebrow>IMPLEMENTATION JOURNEY</Eyebrow>
          <h2>{title}</h2>
          <p className="muted">Eight steps in four phases — so you always know where your project stands and what comes next.</p>
        </div>
        <div className="journey">
          {journeyPhases.map((phase, p) => (
            <div key={phase.name} className="journey-phase">
              <div className="phase-head">
                <span className="phase-dot">{p + 1}</span>
                <span className="phase-name">{phase.name}</span>
                <span className="phase-line" aria-hidden="true" />
              </div>
              <ol className="phase-steps" start={offsets[p] + 1}>
                {phase.steps.map((step, i) => (
                  <li key={step.title} className="step-card">
                    <span className="step-big" aria-hidden="true">{String(offsets[p] + i + 1).padStart(2, '0')}</span>
                    <span className="step-icon"><Icon markup={step.icon} size={22} strokeWidth={1.8} /></span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function IndustriesSection({ tint = false }: { tint?: boolean }) {
  return (
    <section id="industries" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <Eyebrow>INDUSTRIES</Eyebrow>
            <h2>Odoo for every industry</h2>
          </div>
          <p className="muted head-note">Choose your sector to see the challenges we solve and the Saudi requirements we build in.</p>
        </div>
        <IndustryMosaic />
      </div>
    </section>
  )
}

export function TransformSection({ tint = false }: { tint?: boolean }) {
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head center">
          <Eyebrow>BUSINESS TRANSFORMATION</Eyebrow>
          <h2>From complexity to connected operations</h2>
        </div>
        <div className="transform">
          <div className="tf-before">
            <div className="tf-label">BEFORE WESPRIME</div>
            <ul>{before.map((b) => <li key={b}><span aria-hidden="true">✕</span>{b}</li>)}</ul>
          </div>
          <div className="tf-middle">
            <span className="tf-brand">wesprime</span>
            <div className="tf-steps">
              {transformSteps.map((s, i) => (
                <span key={s} className="tf-step">
                  {i > 0 && <span className="flowdown" aria-hidden="true">↓</span>}
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="tf-after">
            <div className="tf-label">AFTER WESPRIME</div>
            <ul>{after.map((a) => <li key={a}><span aria-hidden="true">✓</span>{a}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function WhySection() {
  return (
    <section className="section dark why-section">
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <Eyebrow light>WHY WESPRIME</Eyebrow>
            <h2>Why businesses choose Wesprime</h2>
          </div>
          <a className="btn btn-accent" href={paths.contact}>Get a Consultation</a>
        </div>
        <WhyCards />
      </div>
    </section>
  )
}

export function CasesSection({ tint = false }: { tint?: boolean }) {
  return (
    <section id="cases" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head stack-sm">
          <Eyebrow>CASE STUDIES</Eyebrow>
          <h2>Real projects, real operations</h2>
        </div>
        <div className="grid-3">
          {[1, 2, 3].map((n) => (
            <article key={n} className="card case-card">
              <div className="placeholder-img">[Project image]</div>
              <div className="case-body">
                <div className="case-meta">[CLIENT · INDUSTRY]</div>
                <h3>[Case study title]</h3>
                <div className="case-text">
                  <b>Challenge</b> [Summary]<br />
                  <b>Solution</b> [Summary]<br />
                  <b>Technology</b> [Odoo modules]<br />
                  <b>Result</b> [Verified outcome]
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ClientsSection({ tint = false }: { tint?: boolean }) {
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <h2 className="center-title">Our clients &amp; partners</h2>
        <div className="marquee">
          <div className="marquee-track">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="logo-slot">{i % 6 >= 4 ? '[Partner logo]' : '[Client logo]'}</div>
            ))}
          </div>
        </div>
        <div className="testimonial">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <path d="M10 34c0-10 5-16 13-18l1 4c-5 2-7 5-7 9h7v12H10v-7zm22 0c0-10 5-16 13-18l1 4c-5 2-7 5-7 9h7v12H32v-7z" fill="#1D5FD6" />
          </svg>
          <div className="stack-sm">
            <p className="quote">[Genuine client testimonial — quoted with permission]</p>
            <div className="muted"><b className="ink">[Client name]</b> · [Designation], [Company]</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FaqSection({ tint = false }: { tint?: boolean }) {
  return (
    <section id="faq" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container faq">
        <div className="stack-sm faq-intro">
          <Eyebrow>FAQ</Eyebrow>
          <h2>Questions about Odoo &amp; working with us</h2>
          <p className="muted">Can't find your answer? <a className="text-link" href={paths.contact}>Talk to an expert</a>.</p>
        </div>
        <Faq />
      </div>
    </section>
  )
}

export function CtaSection() {
  return (
    <section className="section dark cta">
      <svg className="cta-lines" viewBox="0 0 520 400" fill="none" aria-hidden="true">
        <line className="flow" x1="0" y1="80" x2="520" y2="40" stroke="#6FA3FF" />
        <line className="flow" x1="60" y1="400" x2="520" y2="160" stroke="#6FA3FF" />
        <line className="flow" x1="200" y1="0" x2="460" y2="400" stroke="#6FA3FF" />
        <circle cx="340" cy="120" r="4" fill="#6FA3FF" />
        <circle cx="420" cy="260" r="4" fill="#6FA3FF" />
      </svg>
      <div className="container cta-inner">
        <div className="stack cta-copy">
          <h2>Ready to transform the way your business works?</h2>
          <p className="lead">Tell us about your business processes and challenges. Our team will help you identify the right ERP and digital transformation strategy.</p>
        </div>
        <div className="cta-buttons">
          <a className="btn btn-accent btn-lg" href={paths.contact}>Talk to an Expert</a>
          <a className="btn btn-ghost btn-lg" href={paths.contact}>Request a Consultation</a>
        </div>
      </div>
    </section>
  )
}

export function ContactSection({ tint = true }: { tint?: boolean }) {
  return (
    <section id="contact" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container">
        <ContactPanel />
      </div>
    </section>
  )
}
