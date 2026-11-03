import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { Check } from '../components/Icon'
import { DashboardDemo, PipelineDemo } from '../components/Demos'
import { PackageGuide } from '../components/OutcomeBlocks'
import { ServiceClip } from '../components/ServiceClip'
import { ServiceVideo } from '../components/ServiceVideo'
import { getDetails, type Demo } from '../data/serviceDetails'
import { serviceGroups, type Service } from '../data/services'
import { contactHref, paths } from '../router'
import { useT } from '../i18n'
import { Headline } from '../components/Headline'

const demoInfo: Record<Demo, { eyebrow: string; title: string; button: string }> = {
  pipeline: { eyebrow: 'TRY IT', title: 'See a lead move through your pipeline', button: 'See it in action' },
  dashboard: { eyebrow: 'TRY IT', title: 'Explore a sample dashboard', button: 'Try the sample dashboard' },
  packages: { eyebrow: 'FIND YOUR PACKAGE', title: 'Packages matched to your complexity', button: 'Find your package' },
}

const CYCLE_MS = 3200
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const n = (i: number) => ({ '--n': i }) as CSSProperties

// Backdrop particles, spread with a fixed pseudo-random step so every render lays them out the same.
const spread = (i: number, k: number) => ((i * k) % 97) / 97
const bokeh = Array.from({ length: 22 }, (_, i) => ({
  left: `${spread(i, 37) * 100}%`, top: `${spread(i, 59) * 100}%`,
  '--size': `${6 + spread(i, 23) * 54}px`, '--dur': `${14 + spread(i, 41) * 16}s`, '--delay': `${-spread(i, 71) * 20}s`,
}) as CSSProperties)
const streaks = Array.from({ length: 12 }, (_, i) => ({
  left: `${4 + i * 8 + spread(i, 29) * 5}%`,
  '--len': `${80 + spread(i, 53) * 180}px`, '--dur': `${5 + spread(i, 43) * 7}s`, '--delay': `${-spread(i, 67) * 10}s`,
}) as CSSProperties)

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/** True once the element has been on screen, so timers only start when someone can see them. */
function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen] as const
}

/** Steps through 0..count-1 on its own while visible, until the visitor takes over. */
function useAutoStep(count: number, seen: boolean) {
  const [active, setActive] = useState(0)
  const [manual, setManual] = useState(false)
  useEffect(() => {
    if (manual || !seen || reducedMotion()) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % count), CYCLE_MS)
    return () => window.clearTimeout(id)
  }, [active, manual, seen, count])
  const pick = (i: number) => {
    setManual(true)
    setActive(i)
  }
  return [active, pick] as const
}

/** Writes the pointer position into CSS variables for the spotlight glow (no re-render). */
function spotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/** Today's problems as sticky notes, wired to the result each one turns into. */
function BeforeAfter({ problems, outcomes }: { problems: string[]; outcomes: string[] }) {
  const t = useT()
  const [ref, seen] = useSeen<HTMLDivElement>()
  const pairs = problems.slice(0, 3).map((p, i) => [p, outcomes[i] ?? outcomes[0]])
  const [active, pick] = useAutoStep(pairs.length, seen)

  return (
    <div className="sp-ba" ref={ref}>
      <div className="sp-ba-col">
        <span className="sp-ba-label is-before">{t('Today')}</span>
        {pairs.map(([p], i) => (
          <button
            key={p}
            type="button"
            className={`sp-note${active === i ? ' is-on' : ''}`}
            style={{ ...n(i), '--r': `${[-2.5, 1.8, -1.2][i]}deg` } as CSSProperties}
            aria-pressed={active === i}
            onMouseEnter={() => pick(i)}
            onFocus={() => pick(i)}
            onClick={() => pick(i)}
          >
            <span className="sp-pin" aria-hidden="true" />
            {t(p)}
          </button>
        ))}
      </div>

      <div className="sp-wires-wrap" aria-hidden="true">
        <svg className="sp-wires" viewBox="0 0 100 300" preserveAspectRatio="none">
          {pairs.map((_, i) => {
            const y = 50 + i * 100
            return <path key={i} className={active === i ? 'is-on' : ''} d={`M0 ${y} C 50 ${y - 34}, 50 ${y + 34}, 100 ${y}`} />
          })}
        </svg>
      </div>

      <div className="sp-ba-col">
        <span className="sp-ba-label is-after">{t('With Wesprime')}</span>
        {pairs.map(([, o], i) => (
          <div key={o} className={`sp-win${active === i ? ' is-on' : ''}`} style={n(i)}>
            <span className="sp-win-check"><Check /></span>
            {t(o)}
          </div>
        ))}
      </div>
    </div>
  )
}

function Accordion({ items }: { items: [string, string][] }) {
  const t = useT()
  const [open, setOpen] = useState(0)
  return (
    <div className="sp-acc">
      {items.map(([q, a], i) => (
        <div key={q} className={`sp-acc-item${open === i ? ' is-open' : ''}`}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {t(q)}
            <span className="sp-acc-icon" aria-hidden="true" />
          </button>
          <div className="sp-acc-body"><p>{t(a)}</p></div>
        </div>
      ))}
    </div>
  )
}

// Service detail: hero, before → after, a bento of what's included,
// an optional demo, then questions with a way to get in touch.
export function ServicePage({ service }: { service: Service }) {
  const t = useT()
  const group = serviceGroups.find((g) => g.slugs.includes(service.slug))
  const d = getDetails(service.slug)
  const enquire = contactHref(service.slug)
  const cta = d?.cta ?? 'Talk to an Expert'
  const questions: [string, string][] = d
    ? [['Who is this for?', d.fit], ['Good to know', d.boundaries.join(' ')], ...d.faqs]
    : []
  const ribbon = [...service.included, ...service.modules]

  return (
    <main className="sp">
      <div className="sp-bg" aria-hidden="true">
        {bokeh.map((s, i) => <i key={i} className="sp-bokeh" style={s} />)}
        {streaks.map((s, i) => <b key={i} className="sp-streak" style={s} />)}
      </div>
      <section className="sv-hero dark">
        <div className="container sv-hero-grid">
          <div className="sv-hero-copy">
            <nav aria-label={t("Breadcrumb")} className="breadcrumb">
              <a href={paths.home}>{t("Home")}</a>
              <span aria-hidden="true">›</span>
              <a href={paths.services}>{t("Services")}</a>
            </nav>
            {group && <div className="eyebrow eyebrow-light">{t(group.title)}</div>}
            <Headline as="h1" text={service.title} />
            <p className="lead">{t(service.tagline)}</p>
            <div className="btn-row">
              <a className="btn btn-ghost btn-lg" href={enquire}>{t(cta)}</a>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => scrollTo(d?.demo ? 'demo' : 'included')}>
                {t(d?.demo ? demoInfo[d.demo].button : "What's included")} <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>
          {d?.video ? <ServiceClip key={d.video} file={d.video} title={service.title} /> : <ServiceVideo service={service} />}
        </div>
      </section>

      <div className="sp-ribbon" aria-hidden="true">
        <div className="sp-ribbon-track">
          {[0, 1].map((k) => (
            <span key={k}>{ribbon.map((r) => <span key={r}>{t(r)}<i>✦</i></span>)}</span>
          ))}
        </div>
      </div>

      {d && (
        <section className="section sp-section dark">
          <div className="container stack-lg">
            <div className="section-head center">
              <div className="eyebrow">{t("BEFORE → AFTER")}</div>
              <Headline text="From friction to flow" />
              <p className="muted">{t("Point at a problem to see what it turns into.")}</p>
            </div>
            <BeforeAfter problems={d.problems} outcomes={d.outcomes} />
          </div>
        </section>
      )}

      <section className="section dark" id="included">
        <div className="container">
          <div className="sp-bento">
            <div className="sp-feature" onMouseMove={spotlight}>
              <div className="eyebrow eyebrow-light">{t("WHAT YOU GET")}</div>
              <Headline text="Everything you get, nothing hidden" />
              <p>{t("{n} deliverables, agreed in writing before work starts.", { n: service.included.length })}</p>
              {service.modules.length > 0 && (
                <div className="sp-mods">
                  {service.modules.map((m) => <i key={m}>{t(m)}</i>)}
                </div>
              )}
              <a className="sp-feature-link" href={enquire}>{t(cta)} <span aria-hidden="true">→</span></a>
            </div>
            {service.included.map((item, i) => (
              <div key={item} className="sp-tile" style={n(i)} onMouseMove={spotlight}>
                <span className="sp-tile-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="sp-tile-icon"><Check /></span>
                <b>{t(item)}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {d?.demo && (
        <section className="section dark" id="demo">
          <div className="container stack-lg">
            <div className="section-head stack-sm">
              <div className="eyebrow">{t(demoInfo[d.demo].eyebrow)}</div>
              <Headline text={demoInfo[d.demo].title} />
            </div>
            {d.demo === 'pipeline' && <PipelineDemo />}
            {d.demo === 'dashboard' && <DashboardDemo />}
            {d.demo === 'packages' && <PackageGuide service={service.slug} />}
          </div>
        </section>
      )}

      {d && (
        <section className="section dark">
          <div className="container sp-faq">
            <div className="stack-sm sp-faq-side">
              <div className="eyebrow">{t("QUESTIONS")}</div>
              <Headline text="Before you ask" />
              <div className="sp-help">
                <b>{t("Still deciding?")}</b>
                <span>{t("A short call is often the quickest way to know if this fits.")}</span>
                <a className="btn btn-dark" href={enquire}>{t("Talk to an Expert")}</a>
              </div>
            </div>
            <Accordion items={questions} />
          </div>
        </section>
      )}

    </main>
  )
}
