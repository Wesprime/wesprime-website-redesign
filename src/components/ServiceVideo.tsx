import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Service } from '../data/services'
import { useT } from '../i18n'
import { Icon } from './Icon'

// A short animated "video" for each service page, drawn in code from the service's own data:
// scattered work comes together, the Odoo apps connect, and the system goes live.

const SCENE_MS = 5000

const scenes = [
  { id: 'connect', caption: 'From scattered work to one connected system' },
  { id: 'apps', caption: 'Working inside the Odoo apps your team needs' },
  { id: 'live', caption: 'Configured, tested and supported after go-live' },
] as const

const TOTAL = SCENE_MS * scenes.length

// Everyday tools the work is scattered across, with where each one floats in scene 1.
const bits = [
  { x: -150, y: -70, icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 4v16M15 4v16"/>' },
  { x: 140, y: -80, icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>' },
  { x: -170, y: 50, icon: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>' },
  { x: 165, y: 40, icon: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>' },
  { x: -60, y: 95, icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
  { x: 70, y: 100, icon: '<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/>' },
]

const liveRows = ['Tested with your team', 'Users trained', 'Support on hand']

const fmt = (ms: number) => {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function ServiceVideo({ service }: { service: Service }) {
  const t = useT()
  const [reduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [playing, setPlaying] = useState(!reduce)
  const [inView, setInView] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const scene = Math.floor(elapsed / SCENE_MS)
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

  const modules = service.modules.slice(0, 6)

  return (
    <figure className="sv-video" ref={ref} aria-label={t('Animated overview of {service}', { service: t(service.title) })}>
      <div className={`sv-screen${running ? '' : ' is-paused'}`}>
        <span className="sv-badge"><i aria-hidden="true" />{t('Overview')}</span>

        <div className={`sv-scene sv-${scenes[scene].id}`} key={scene}>
          {scene === 0 && (
            <>
              {bits.map((b, n) => (
                <span key={n} className="sv-bit" style={{ '--x': `${b.x}px`, '--y': `${b.y}px`, '--n': n } as CSSProperties}>
                  <Icon markup={b.icon} size={20} strokeWidth={1.8} />
                </span>
              ))}
              <span className="sv-core"><Icon markup={service.icon} size={44} strokeWidth={1.6} /></span>
            </>
          )}

          {scene === 1 && (
            <>
              <svg className="sv-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {modules.map((m, n) => {
                  const a = (n / modules.length) * Math.PI * 2 - Math.PI / 2
                  return <line key={m} x1="50" y1="50" x2={50 + 34 * Math.cos(a)} y2={50 + 34 * Math.sin(a)} style={{ '--n': n } as CSSProperties} />
                })}
              </svg>
              <span className="sv-hub">Odoo</span>
              {modules.map((m, n) => {
                const a = (n / modules.length) * Math.PI * 2 - Math.PI / 2
                return (
                  <span key={m} className="sv-app" style={{ left: `${50 + 34 * Math.cos(a)}%`, top: `${50 + 34 * Math.sin(a)}%`, '--n': n } as CSSProperties}>
                    {t(m)}
                  </span>
                )
              })}
            </>
          )}

          {scene === 2 && (
            <div className="sv-live">
              <span className="sv-ring">
                <svg viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r="52" className="sv-ring-bg" />
                  <circle cx="60" cy="60" r="52" className="sv-ring-fill" />
                </svg>
                <b>{t('Live')}</b>
              </span>
              <ul>
                {liveRows.map((r, n) => (
                  <li key={r} style={{ '--n': n } as CSSProperties}>
                    <span aria-hidden="true">✓</span>{t(r)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="sv-caption" key={`c${scene}`}>{t(scenes[scene].caption)}</p>

        {!playing && (
          <button type="button" className="sv-bigplay" onClick={() => setPlaying(true)} aria-label={t('Play')}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
          </button>
        )}
      </div>

      <div className="sv-controls">
        <button type="button" className="sv-ctl" onClick={() => setPlaying((p) => !p)} aria-label={playing ? t('Pause') : t('Play')}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
          )}
        </button>
        <div className="sv-segs">
          {scenes.map((s, n) => {
            const fill = Math.min(1, Math.max(0, (elapsed - n * SCENE_MS) / SCENE_MS))
            return (
              <button key={s.id} type="button" aria-label={t('Scene {n}: {caption}', { n: n + 1, caption: t(s.caption) })} onClick={() => setElapsed(n * SCENE_MS)}>
                <i style={{ transform: `scaleX(${fill})` }} />
              </button>
            )
          })}
        </div>
        <span className="sv-time">{fmt(elapsed)} / {fmt(TOTAL)}</span>
      </div>
    </figure>
  )
}
