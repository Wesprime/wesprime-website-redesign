import { CompareSlider } from './CompareSlider'
import { StackExplorer } from './StackExplorer'
import { useEffect, useState } from 'react'
import { coreValues, integrationTypes, mission, pillars, vision } from '../data/content'
import { paths } from '../router'
import { useT } from '../i18n'
import { Headline, Scribble } from './Headline'

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

// Why we exist: three statements shown as a connected path.
const purpose = [
  {
    label: 'OUR VISION',
    title: 'Clarity and confidence for every business owner',
    text: vision,
    icon: <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z" />,
  },
  {
    label: 'OUR MISSION',
    title: 'Remove friction, reduce risk, restore focus',
    text: mission,
    icon: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 17a5 5 0 100-10 5 5 0 000 10zM12 13a1 1 0 100-2 1 1 0 000 2z" />,
  },
  {
    label: 'OUR PROMISE',
    title: 'Support after go-live',
    text: 'We stay with you after launch — resolving issues, optimizing performance and adding enhancements as your business grows.',
    icon: <path d="M4 13v-1a8 8 0 0116 0v1M3 14.5A1.5 1.5 0 014.5 13h1A1.5 1.5 0 017 14.5v3A1.5 1.5 0 015.5 19h-1A1.5 1.5 0 013 17.5zM17 14.5a1.5 1.5 0 011.5-1.5h1a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5zM19 19c0 1.5-2 2.5-5 2.5" />,
  },
]

const VALUE_MS = 3200

/** Home: what Wesprime stands for — why we exist as a path, and the core values orbiting the brand. */
export function StandsForSection() {
  const t = useT()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const value = coreValues[active]

  // Step through the values on its own until the visitor points at one.
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % coreValues.length), VALUE_MS)
    return () => window.clearTimeout(id)
  }, [active, paused])

  return (
    <section className="section stands">
      <div className="container stack-xl">
        <div className="section-head center">
          <div className="eyebrow">{t('OUR PURPOSE & VALUES')}</div>
          <h2 className="stands-title">
            {t('Built on')} <Scribble>{t('purpose')}</Scribble>, {t('driven by')} <Scribble delay>{t('values')}</Scribble>.
          </h2>
          <p className="muted">{t('Clarity, confidence and connected operations for every business we work with.')}</p>
        </div>

        <div className="stands-grid">
          <div className="stands-why">
            <div className="stands-why-head">
              <h3>{t('Why we exist')}</h3>
              <p>{t('The purpose behind every implementation we deliver.')}</p>
            </div>
            <ol className="stands-path">
              {purpose.map((p, i) => (
                <li key={p.label} className="stands-step">
                  <span className="stands-node" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg>
                  </span>
                  <div className="stands-card">
                    <span className="stands-card-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="stands-card-label">{t(p.label)}</span>
                    <h4>{t(p.title)}</h4>
                    <p>{t(p.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="orbit-wrap" onMouseLeave={() => setPaused(false)}>
            <div className="vorbit">
              <span className="vorbit-ring" aria-hidden="true" />
              <span className="vorbit-ring vorbit-ring-2" aria-hidden="true" />
              <div className="vorbit-core" role="tabpanel" aria-live="polite">
                <div className="vorbit-core-in" key={value.title}>
                  <GradientIcon id="vcore" markup={value.icon} size={44} />
                  <b>{t(value.title)}</b>
                  <span>{t(value.text)}</span>
                </div>
              </div>
              <div role="tablist" aria-label={t('Our values')}>
                {coreValues.map((v, i) => {
                  const angle = (i / coreValues.length) * Math.PI * 2 - Math.PI / 2
                  return (
                    <button
                      key={v.title}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      className={`vorbit-node${i === active ? ' is-on' : ''}`}
                      style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
                      onMouseEnter={() => { setActive(i); setPaused(true) }}
                      onFocus={() => { setActive(i); setPaused(true) }}
                      onClick={() => { setActive(i); setPaused(true) }}
                    >
                      <span className="vorbit-node-icon"><GradientIcon id={`vn${i}`} markup={v.icon} size={20} /></span>
                      {t(v.title)}
                    </button>
                  )
                })}
              </div>
            </div>
            <span className="vorbit-caption">{t('Our values')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PillarsSection({ tint = false }: { tint?: boolean }) {
  const t = useT()
  return (
    <section id="pillars" className={`section${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head stack-sm">
          <div className="eyebrow">{t("OUR PILLARS")}</div>
          <Headline text="The foundations under every Wesprime build" />
          <p className="muted">{t("Four commitments that shape how we consult, build and support.")}</p>
        </div>
        <div className="pillars">
          {pillars.map((p, i) => (
            <article key={p.title} className="pillar">
              <GradientIcon id={String(i)} markup={p.icon} />
              <h3>{t(p.title)}</h3>
              <p>{t(p.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechStackSection() {
  const t = useT()
  return (
    <section className="section dark tech-stack">
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <div className="eyebrow eyebrow-light">{t("TECHNOLOGY")}</div>
            <Headline text="Inside a connected Odoo system" />
          </div>
          <p className="lead head-note">{t("Five layers, from the screen your team uses to the server it runs on. Odoo is open source, so we can shape every one of them — no black boxes, no lock-in.")}</p>
        </div>

        <StackExplorer />

        <div className="tech-build">
          <div className="section-head split">
            <div className="stack-sm">
              <h3 className="tech-sub">{t("Your process, before and after Odoo")}</h3>
            </div>
            <p className="lead head-note">{t("Pick an everyday process and watch the same work run twice — once by hand, once in one connected Odoo system.")}</p>
          </div>
          <CompareSlider />
          <div className="tech-connect">
            <span className="field-label">{t("WE CONNECT ODOO WITH")}</span>
            <div className="int-chips">{integrationTypes.map((it) => <span key={it}>{t(it)}</span>)}</div>
            <a className="btn btn-accent" href={paths.solutions}>{t("Explore our Odoo solutions")} <span className="arrow" aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}
