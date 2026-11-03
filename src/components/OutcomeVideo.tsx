import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { outcomes } from '../data/outcomes'
import { getService } from '../data/services'
import { serviceHref } from '../router'
import { useT } from '../i18n'
import { Icon } from './Icon'
import { Headline } from './Headline'

// The homepage outcome chooser as a short animated "video": one chapter per business
// result. Each chapter shows the everyday chaos first, then pulls it together into a
// small preview of the result. Chapters stay clickable, so nothing depends on watching.

const SCENE_MS = 6500
const TOTAL = SCENE_MS * outcomes.length

// Where the four "before" symptoms float, as % of the screen.
const spots = [[22, 24], [74, 20], [20, 64], [76, 62]]

const fmt = (ms: number) => {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

const n = (i: number) => ({ '--n': i }) as CSSProperties

/** The "after" preview for each outcome, a few seconds of animated UI. */
function After({ slug }: { slug: string }) {
  const t = useT()
  const views: Record<string, ReactNode> = {
    crm: (
      <div className="ov-crm">
        {['New', 'Qualified', 'Won'].map((c) => <span key={c} className="ov-crm-col"><i>{t(c)}</i></span>)}
        <span className="ov-crm-card is-moving"><b>Blue Sands Co.</b><small>{t('Sara · call today')}</small></span>
        <span className="ov-crm-card is-still" style={{ left: '3%' }}><b>Al Noor</b><small>{t('Website')}</small></span>
        <span className="ov-crm-card is-still" style={{ left: '36%', top: '64%' }}><b>Summit</b><small>{t('Follow up Mon')}</small></span>
      </div>
    ),
    'erp-consultation': (
      <div className="ov-flow">
        <span className="ov-flow-line" />
        {['Quote', 'Order', 'Delivery', 'Invoice'].map((s, i) => (
          <span key={s} className="ov-flow-node" style={n(i)}><i>✓</i>{t(s)}</span>
        ))}
      </div>
    ),
    'business-automation': (
      <div className="ov-steps">
        {['Purchase request submitted', 'Manager approved', 'Finance notified'].map((s, i) => (
          <span key={s} className="ov-step" style={n(i)}><i>✓</i>{t(s)}</span>
        ))}
        <span className="ov-status"><s>{t('Pending')}</s><b>{t('Approved')}</b></span>
      </div>
    ),
    'dashboards-reporting': (
      <div className="ov-dash">
        <div className="ov-kpis">
          {[['Sales', 'SAR 1.7M'], ['Cash', 'SAR 420K'], ['Stock', '5.2x']].map(([k, v], i) => (
            <span key={k} style={n(i)}><small>{t(k)}</small><b>{v}</b></span>
          ))}
        </div>
        <div className="ov-bars">
          {[40, 55, 48, 70, 64, 86].map((h, i) => <i key={i} style={{ ...n(i), height: `${h}%` }} />)}
        </div>
      </div>
    ),
    'erp-health-check': (
      <div className="ov-health">
        <span className="ov-meter"><i /></span>
        {['Fix invoice approval route', 'Reconcile stock report', 'Retrain purchasing team'].map((s, i) => (
          <span key={s} className="ov-fix" style={n(i)}><i>✓</i>{t(s)}</span>
        ))}
      </div>
    ),
    'support-maintenance': (
      <div className="ov-ticket">
        <b>{t('Invoice posting error')}</b>
        <small>{t('Owner: Omar · Priority: High')}</small>
        <div className="ov-ticket-steps">
          {['New', 'Assigned', 'Resolved'].map((s, i) => <span key={s} style={n(i)}>{t(s)}</span>)}
        </div>
      </div>
    ),
  }
  return <>{views[slug]}</>
}

export function OutcomeSection() {
  const t = useT()
  const [reduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [playing, setPlaying] = useState(!reduce)
  const [inView, setInView] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  // Bumped on every chapter pick, so picking the current chapter restarts its animation too.
  const [run, setRun] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const scene = Math.floor(elapsed / SCENE_MS)
  const o = outcomes[scene]
  const service = getService(o.slug)!
  const running = playing && inView

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setElapsed((e) => (e + 100) % TOTAL), 100)
    return () => window.clearInterval(id)
  }, [running])

  const jump = (i: number) => {
    setElapsed(i * SCENE_MS)
    setRun((r) => r + 1)
    if (!reduce) setPlaying(true)
  }

  return (
    <section id="outcomes" className="section">
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <div className="eyebrow">{t('CHOOSE THE RESULT YOU NEED')}</div>
            <Headline text="What do you want your business to do better?" />
          </div>
          <p className="muted head-note">{t('Watch each everyday problem turn into a result, or pick the one you recognize.')}</p>
        </div>

        <div className="ov-wrap">
          <ol className="ov-chapters">
            {outcomes.map((c, i) => {
              const on = i === scene
              const fill = on ? (elapsed - i * SCENE_MS) / SCENE_MS : i < scene ? 1 : 0
              return (
                <li key={c.slug} className={on ? 'is-on' : ''}>
                  <button type="button" aria-current={on ? 'step' : undefined} onClick={() => jump(i)}>
                    <span className="ov-ch-icon"><Icon markup={c.icon} size={18} strokeWidth={1.9} /></span>
                    <span className="ov-ch-text">
                      <b>{t(c.title)}</b>
                      <small>{t(c.problem)}</small>
                    </span>
                    <i className="ov-ch-bar" style={{ transform: `scaleX(${fill})` }} aria-hidden="true" />
                  </button>
                  {on && (
                    <a className="ov-ch-link" href={serviceHref(c.slug)}>
                      {t(getService(c.slug)!.title)} <span className="arrow" aria-hidden="true">→</span>
                    </a>
                  )}
                </li>
              )
            })}
          </ol>

          <figure className="sv-video ov-video" ref={ref} aria-label={t('Animated overview: {title}', { title: t(o.title) })}>
            <div className={`sv-screen${running ? '' : ' is-paused'}${reduce ? ' is-static' : ''}`}>
              <div className="ov-scene" key={`${scene}-${run}`}>
                <span className="sv-badge ov-tag ov-tag-before"><i aria-hidden="true" />{t('Before')}</span>
                <span className="sv-badge ov-tag ov-tag-after"><i aria-hidden="true" />{t('After')}</span>

                <p className="ov-problem">{t(o.problem)}</p>
                {o.pains.map((p, i) => (
                  <span key={p} className="ov-pain" style={{ '--x': `${spots[i][0]}%`, '--y': `${spots[i][1]}%`, ...n(i) } as CSSProperties}>
                    {t(p)}
                  </span>
                ))}

                <div className="ov-after">
                  <span className="ov-after-title"><Icon markup={o.icon} size={16} strokeWidth={2} />{t(o.title)}</span>
                  <After slug={o.slug} />
                </div>
                <p className="ov-gain"><span aria-hidden="true">✓</span>{t(o.gain)}</p>
                <a className="ov-cta" href={serviceHref(o.slug)}>{t('See how: {service}', { service: t(service.title) })} →</a>
              </div>

              {!playing && !reduce && (
                <button type="button" className="sv-bigplay" onClick={() => setPlaying(true)} aria-label={t('Play')}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
                </button>
              )}
            </div>

            <div className="sv-controls">
              {!reduce && (
                <button type="button" className="sv-ctl" onClick={() => setPlaying((p) => !p)} aria-label={playing ? t('Pause') : t('Play')}>
                  {playing ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
                  )}
                </button>
              )}
              <div className="sv-segs">
                {outcomes.map((c, i) => {
                  const fill = Math.min(1, Math.max(0, (elapsed - i * SCENE_MS) / SCENE_MS))
                  return (
                    <button key={c.slug} type="button" aria-label={t('Chapter {n}: {title}', { n: i + 1, title: t(c.title) })} onClick={() => jump(i)}>
                      <i style={{ transform: `scaleX(${fill})` }} />
                    </button>
                  )
                })}
              </div>
              <span className="sv-time">{fmt(elapsed)} / {fmt(TOTAL)}</span>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
