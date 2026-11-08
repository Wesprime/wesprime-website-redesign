import { useEffect, useId, useState } from 'react'
import { useT } from '../i18n'
import { Icon } from './Icon'

// About hero: how Wesprime works, as a timeline of symbols that fills step by
// step. Pointing at (or tabbing to) a symbol pauses the timeline on that step
// and shows a small tooltip saying what happens there.

const STEP_MS = 2000

const steps = [
  { label: 'Understand', text: 'Your processes, people & goals', icon: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>' },
  { label: 'Design', text: 'The right ERP & software solution', icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>' },
  { label: 'Build', text: 'Configured, tested & ready', icon: '<path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/>' },
  { label: 'Support', text: 'Long-term support as you grow', icon: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/>' },
]

export function AboutHeroArt() {
  const t = useT()
  const id = useId()
  const [still] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [active, setActive] = useState(still ? steps.length - 1 : 0)
  const [hover, setHover] = useState<number | null>(null)

  // Advance on its own, unless someone is looking at a step.
  useEffect(() => {
    if (still || hover !== null) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % steps.length), STEP_MS)
    return () => window.clearInterval(id)
  }, [still, hover])

  const show = (i: number) => { setHover(i); setActive(i) }
  const hide = () => setHover(null)
  const pct = (i: number) => (i / (steps.length - 1)) * 100

  return (
    <div className="ab-art" role="list" aria-label={t('How we work')}>
      <div className="ab-track">
        <span className="ab-fill" style={{ width: `${pct(active)}%` }} />
        {steps.map((s, i) => (
          <span
            key={s.label}
            role="listitem"
            className={`ab-step${i < active ? ' is-done' : ''}${i === active ? ' is-on' : ''}${hover === i ? ' is-tip' : ''}`}
            style={{ left: `${pct(i)}%` }}
          >
            <button
              type="button"
              className="ab-node"
              aria-label={t(s.label)}
              aria-describedby={`${id}-tip-${i}`}
              onMouseEnter={() => show(i)}
              onMouseLeave={hide}
              onFocus={() => show(i)}
              onBlur={hide}
            >
              <Icon markup={s.icon} size={20} strokeWidth={2.1} />
            </button>
            <span className="ab-tip" role="tooltip" id={`${id}-tip-${i}`}>
              <b>{t(s.label)}</b>
              {t(s.text)}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
