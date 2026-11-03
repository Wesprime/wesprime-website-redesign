import { useState } from 'react'
import { Check, Icon } from '../components/Icon'
import { GradientIcon } from '../components/HomeExtras'
import { IndustryMosaic } from '../components/IndustryMosaic'
import { WhyCards } from '../components/WhyCards'
import { ContactPanel } from '../components/ContactPanel'
import { ModuleCard } from '../components/ModuleCard'
import { Headline } from '../components/Headline'
import {
  aboutPoints, after, before, coreValues, mission, vision, faqs, journeyPhases,
  odooModules, transformSteps,
} from '../data/content'
import { startSteps } from '../data/saudi'
import { services } from '../data/services'
import { paths, serviceHref } from '../router'
import { useT } from '../i18n'

export function Eyebrow({ children, light }: { children: string; light?: boolean }) {
  return <div className={`eyebrow${light ? ' eyebrow-light' : ''}`}>{children}</div>
}

function AboutGraphic() {
  const t = useT()
  const steps = [
    { x: 60, y: 70, tag: '01 · UNDERSTAND', text: 'Your processes, people & goals' },
    { x: 90, y: 190, tag: '02 · DESIGN', text: 'The right ERP & software solution' },
    { x: 60, y: 310, tag: '03 · SUSTAIN', text: 'Long-term support as you grow', active: true },
  ]
  return (
    <svg viewBox="0 0 540 460" fill="none" role="img" aria-label={t("Understand, design, sustain")}>
      {steps.map((s) => (
        <g key={s.tag}>
          <rect x={s.x} y={s.y} width="420" height="80" rx="12" fill={s.active ? '#1D5FD6' : '#10254A'} stroke={s.active ? undefined : '#2C4468'} />
          <text x={s.x + 28} y={s.y + 34} fill={s.active ? '#DCE8FF' : '#6FA3FF'} fontSize="12" fontFamily="IBM Plex Mono, monospace">{t(s.tag)}</text>
          <text x={s.x + 28} y={s.y + 60} fill="#fff" fontSize="18" fontWeight="700">{t(s.text)}</text>
        </g>
      ))}
      <line className="flow" x1="270" y1="150" x2="300" y2="190" stroke="#6FA3FF" strokeWidth="1.5" />
      <line className="flow" x1="300" y1="270" x2="270" y2="310" stroke="#6FA3FF" strokeWidth="1.5" />
    </svg>
  )
}

function OdooEcosystem() {
  const t = useT()
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
            {t(m.name)}
          </button>
        ))}
      </div>
      <ModuleCard index={selected} onSelect={setSelected} />
    </div>
  )
}

function Faq() {
  const t = useT()
  const [open, setOpen] = useState(0)
  return (
    <div className="faq-list">
      {faqs.map(([q, a], i) => (
        <div key={q} className="faq-item">
          <button type="button" className="faqbtn" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {t(q)}
            <span aria-hidden="true">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p className="faqans">{t(a)}</p>}
        </div>
      ))}
    </div>
  )
}

export function AboutSection({ tint = false }: { tint?: boolean }) {
  const t = useT()
  return (
    <section id="about" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container about">
        <div className="about-visual"><AboutGraphic /></div>
        <div className="stack">
          <Eyebrow>{t("About Wesprime")}</Eyebrow>
          <Headline text="Technology that speaks your business" />
          <p className="muted body-lg">{t("Wesprime Business Solutions is an Odoo ERP consulting and digital transformation company. We start by understanding how your business actually runs — then design, implement and support the ERP and software systems that remove friction and give leadership clear visibility.")}</p>
          <div className="check-grid">
            {aboutPoints.map((p) => <div key={p} className="check-item"><Check />{t(p)}</div>)}
          </div>
          <div><a className="btn btn-dark" href={paths.services}>{t("Explore our services")} <span className="arrow" aria-hidden="true">→</span></a></div>
        </div>
      </div>
    </section>
  )
}

export function VisionSection({ tint = false }: { tint?: boolean }) {
  const t = useT()
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head center">
          <Eyebrow>{t("VISION & MISSION")}</Eyebrow>
          <Headline text="Why we exist" />
          <p className="muted">{t("The purpose behind every implementation we deliver.")}</p>
        </div>
        <div className="vm-grid">
          <article className="vm-card">
            <span className="vm-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
            </span>
            <Eyebrow>{t("OUR VISION")}</Eyebrow>
            <h3>{t("Clarity and confidence for every business owner")}</h3>
            <p>{t(vision)}</p>
          </article>
          <article className="vm-card vm-dark">
            <span className="vm-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
            </span>
            <Eyebrow light>{t("OUR MISSION")}</Eyebrow>
            <h3>{t("Remove friction, reduce risk, restore focus")}</h3>
            <p>{t(mission)}</p>
          </article>
        </div>
        <div className="stack-sm">
          <h3 className="values-title">{t("The values we build into every system")}</h3>
          <div className="values-grid">
            {coreValues.map((v, i) => (
              <div key={v.title} className="value-tile">
                <GradientIcon id={`v${i}`} markup={v.icon} size={40} />
                <div>
                  <b>{t(v.title)}</b>
                  <span>{t(v.text)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function OdooSection({ tint = false }: { tint?: boolean }) {
  const t = useT()
  return (
    <section id="odoo" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head center">
          <Eyebrow>{t("HOW IT CONNECTS")}</Eyebrow>
          <Headline text="One platform. Connected business." />
          <p className="muted">{t("Select an area to see how it connects to the rest of your operations.")}</p>
        </div>
        <OdooEcosystem />
      </div>
    </section>
  )
}

export function StartSection({ tint = false }: { tint?: boolean }) {
  const t = useT()
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <Eyebrow>{t("HOW TO START")}</Eyebrow>
            <Headline text="Clear scope. Zero surprises." />
          </div>
          <p className="muted head-note">{t("Most ERP overruns come from scope discovered too late. We start by documenting what fits, what needs configuring and what needs building.")}</p>
        </div>
        <ol className="start-steps">
          {startSteps.map((st, i) => (
            <li key={st.title} className="start-step">
              <div className="start-top">
                <span className="mono-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="start-tag">{t(st.tag)}</span>
              </div>
              <h3>{t(st.title)}</h3>
              <p className="muted small">{t(st.detail)}</p>
            </li>
          ))}
        </ol>
        <div className="start-cta">
          <a className="btn btn-dark btn-lg" href={paths.contact}>{t("Book a scoping call")}</a>
          <a className="text-link" href={serviceHref('erp-consultation')}>{t("What a fit-gap analysis includes")} <span className="arrow" aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  )
}

export function JourneySection({ tint = false, title = 'A clear path from discovery to support' }: { tint?: boolean; title?: string }) {
  const t = useT()
  // Steps are numbered across phases: phase p, step i -> number before it + i + 1.
  const offsets = journeyPhases.map((_, p) => journeyPhases.slice(0, p).reduce((sum, ph) => sum + ph.steps.length, 0))
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head center">
          <Eyebrow>{t("IMPLEMENTATION JOURNEY")}</Eyebrow>
          <Headline text={title} />
          <p className="muted">{t("Eight steps in four phases — so you always know where your project stands and what comes next.")}</p>
        </div>
        <div className="journey">
          {journeyPhases.map((phase, p) => (
            <div key={phase.name} className="journey-phase">
              <div className="phase-head">
                <span className="phase-dot">{p + 1}</span>
                <span className="phase-name">{t(phase.name)}</span>
                <span className="phase-line" aria-hidden="true" />
              </div>
              <ol className="phase-steps" start={offsets[p] + 1}>
                {phase.steps.map((step, i) => (
                  <li key={step.title} className="step-card">
                    <span className="step-big" aria-hidden="true">{String(offsets[p] + i + 1).padStart(2, '0')}</span>
                    <span className="step-icon"><Icon markup={step.icon} size={22} strokeWidth={1.8} /></span>
                    <h3>{t(step.title)}</h3>
                    <p>{t(step.text)}</p>
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
  const t = useT()
  return (
    <section id="industries" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <Eyebrow>{t("INDUSTRIES")}</Eyebrow>
            <Headline text="Odoo, tailored to your industry" />
          </div>
          <p className="muted head-note">{t("Choose your sector to see the challenges we solve and the Saudi requirements we build in.")}</p>
        </div>
        <IndustryMosaic />
      </div>
    </section>
  )
}

export function TransformSection({ tint = false }: { tint?: boolean }) {
  const t = useT()
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head center">
          <Eyebrow>{t("BUSINESS TRANSFORMATION")}</Eyebrow>
          <Headline text="From chaos to connected operations" />
        </div>
        <div className="transform">
          <div className="tf-before">
            <div className="tf-label">{t("BEFORE WESPRIME")}</div>
            <ul>{before.map((b) => <li key={b}><span aria-hidden="true">✕</span>{t(b)}</li>)}</ul>
          </div>
          <div className="tf-middle">
            <span className="tf-brand">wesprime</span>
            <div className="tf-steps">
              {transformSteps.map((s, i) => (
                <span key={s} className="tf-step">
                  {i > 0 && <span className="flowdown" aria-hidden="true">↓</span>}
                  {t(s)}
                </span>
              ))}
            </div>
          </div>
          <div className="tf-after">
            <div className="tf-label">{t("AFTER WESPRIME")}</div>
            <ul>{after.map((a) => <li key={a}><span aria-hidden="true">✓</span>{t(a)}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function WhySection() {
  const t = useT()
  return (
    <section className="section dark why-section">
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <Eyebrow light>{t("WHY WESPRIME")}</Eyebrow>
            <Headline text="Why ambitious businesses choose Wesprime" />
          </div>
          <a className="btn btn-accent" href={paths.contact}>{t("Get a Consultation")}</a>
        </div>
        <WhyCards />
      </div>
    </section>
  )
}

// Hypothetical situations, clearly labelled. Named client stories appear only with permission.
const scenarios = [
  {
    industry: 'Trading & distribution',
    title: 'From spreadsheets to one connected system',
    challenge: 'Orders, stock and customer balances tracked in separate spreadsheets; month-end took over a week.',
    approach: 'Fit-gap workshop, then sales, purchase, inventory and accounting configured as one flow, with opening balances migrated and reconciled.',
    services: ['erp-consultation', 'data-migration'],
  },
  {
    industry: 'Technical services',
    title: 'Recovering value from an existing ERP',
    challenge: 'An ERP implemented by another provider was live, but teams kept parallel spreadsheets and reports did not reconcile.',
    approach: 'Health check and stakeholder interviews, a prioritized issue register, targeted fixes and role-based retraining.',
    services: ['erp-health-check', 'training-enablement'],
  },
  {
    industry: 'B2B sales team',
    title: 'Making every enquiry visible',
    challenge: 'Leads arrived by website, WhatsApp and referral, with no owner or next step and no view of which deals were stalling.',
    approach: 'One CRM pipeline with stages, activities and lead capture, plus a weekly management view of overdue follow-ups.',
    services: ['crm', 'dashboards-reporting'],
  },
]

export function CasesSection({ tint = false }: { tint?: boolean }) {
  const t = useT()
  return (
    <section id="cases" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head stack-sm">
          <Eyebrow>{t("EXAMPLE SCENARIOS")}</Eyebrow>
          <Headline text="Real problems we've turned around" />
        </div>
        <div className="grid-3">
          {scenarios.map((sc) => (
            <article key={sc.title} className="card case-card">
              <div className="case-body">
                <span className="demo-badge">{t("Illustrative scenario — not a client project")}</span>
                <div className="case-meta">{t(sc.industry)}</div>
                <h3>{t(sc.title)}</h3>
                <div className="case-text">
                  <b>{t("Challenge")}</b> {t(sc.challenge)}<br />
                  <b>{t("Approach")}</b> {t(sc.approach)}
                </div>
                <div className="case-links">
                  {sc.services.map((slug) => {
                    const svc = services.find((x) => x.slug === slug)!
                    return <a key={slug} className="text-link" href={serviceHref(slug)}>{t(svc.title)} →</a>
                  })}
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
  const t = useT()
  return (
    <section className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container">
        <div className="proof-note">
          <div className="stack-sm">
            <Headline text="Client stories, with permission" />
            <p className="muted">{t("We publish client names, logos, results and testimonials only when the client has approved them. During discovery we're happy to talk you through relevant past work and sample deliverables.")}</p>
          </div>
          <a className="btn btn-dark btn-lg" href={paths.contact}>{t("Ask about relevant work")}</a>
        </div>
      </div>
    </section>
  )
}

export function FaqSection({ tint = false }: { tint?: boolean }) {
  const t = useT()
  return (
    <section id="faq" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container faq">
        <div className="stack-sm faq-intro">
          <Eyebrow>{t("FAQ")}</Eyebrow>
          <Headline text="Questions? We've got straight answers" />
          <p className="muted">{t("Can't find your answer?")} <a className="text-link" href={paths.contact}>{t("Talk to an expert")}</a>.</p>
        </div>
        <Faq />
      </div>
    </section>
  )
}

export function CtaSection() {
  const t = useT()
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
          <Headline text="Ready to see your business run smarter?" />
          <p className="lead">{t("Tell us about your business processes and challenges. Our team will help you identify the right ERP and digital transformation strategy.")}</p>
        </div>
        <div className="cta-buttons">
          <a className="btn btn-accent btn-lg" href={paths.contact}>{t("Talk to an Expert")}</a>
          <a className="btn btn-ghost btn-lg" href={paths.contact}>{t("Request a Consultation")}</a>
        </div>
      </div>
    </section>
  )
}

// Outline icons that drift slowly in the margins behind the contact form.
const contactFloaters = [
  '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  '<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/>',
  '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
]

export function ContactSection({ tint = true }: { tint?: boolean }) {
  return (
    <section id="contact" className={`section cp-section${tint ? ' section-tint' : ''}`}>
      <div className="cp-bg" aria-hidden="true">
        <span className="cp-blob cp-blob-1" />
        <span className="cp-blob cp-blob-2" />
        <span className="cp-blob cp-blob-3" />
        {contactFloaters.map((icon, i) => (
          <span key={i} className={`cp-float cp-float-${i + 1}`}>
            <Icon markup={icon} size={26} strokeWidth={1.6} />
          </span>
        ))}
      </div>
      <div className="container">
        <ContactPanel />
      </div>
    </section>
  )
}
