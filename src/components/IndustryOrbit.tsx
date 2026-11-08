import { useEffect, useState, type CSSProperties } from 'react'
import { industries } from '../data/saudi'
import { industryHref } from '../router'
import { useT } from '../i18n'
import { Icon } from './Icon'

// Industries hero: every industry orbits an Odoo core. The spotlight moves from
// one industry to the next, a beam links it to the core and its name shows in
// the centre. Each icon links to that industry's page.

const STEP_MS = 2400

export function IndustryOrbit() {
  const t = useT()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = industries.length

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % count), STEP_MS)
    return () => window.clearInterval(id)
  }, [paused, count])

  const current = industries[active]

  return (
    <div className="io" onMouseLeave={() => setPaused(false)}>
      <span className="io-glow" aria-hidden="true" />
      <span className="io-ring io-ring-outer" aria-hidden="true" />
      <span className="io-ring io-ring-inner" aria-hidden="true" />

      <div className="io-spin">
        <span className="io-beam" aria-hidden="true" style={{ '--a': `${(active * 360) / count}deg` } as CSSProperties} />
        {industries.map((ind, i) => (
          <a
            key={ind.id}
            href={industryHref(ind.id)}
            className={`io-item${i === active ? ' is-on' : ''}`}
            style={{ '--a': `${(i * 360) / count}deg` } as CSSProperties}
            aria-label={t(ind.title)}
            onMouseEnter={() => { setPaused(true); setActive(i) }}
            onFocus={() => { setPaused(true); setActive(i) }}
          >
            <span className="io-icon"><Icon markup={ind.icon} size={20} strokeWidth={1.8} /></span>
          </a>
        ))}
      </div>

      <div className="io-core" aria-hidden="true">
        <small>Odoo ERP</small>
        <b key={current.id}>{t(current.title)}</b>
      </div>
    </div>
  )
}
