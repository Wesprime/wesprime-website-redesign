import { useEffect, useRef, useState } from 'react'
import { stackLayers } from '../data/content'
import { Icon } from './Icon'

const AUTO_MS = 4500

/**
 * The layers of an Odoo system as a 3D stack, top (people) to bottom (servers),
 * with a pulse travelling down to show one action passing through every layer.
 * Steps through the layers on its own until the visitor picks one.
 */
export function StackExplorer() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const layer = stackLayers[active]

  // Only cycle while the section is on screen, so visitors start at layer 1.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!auto || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % stackLayers.length), AUTO_MS)
    return () => window.clearInterval(id)
  }, [auto, visible])

  const pick = (i: number) => {
    setAuto(false)
    setActive(i)
  }

  return (
    <div className="sx" ref={ref}>
      <div className="sx-visual">
        <span className="sx-edge top" aria-hidden="true">People</span>
        <div className="sx-stack" role="tablist" aria-label="Layers of an Odoo system">
          {stackLayers.map((l, i) => (
            <button
              key={l.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`sx-slab${active === i ? ' is-on' : ''}${i < active ? ' is-past' : ''}`}
              style={{ zIndex: stackLayers.length - i }}
              onClick={() => pick(i)}
            >
              <span className="sx-slab-icon"><Icon markup={l.icon} size={20} strokeWidth={1.8} /></span>
              <span className="sx-slab-text">
                <b>{l.plain}</b>
                <small>{String(i + 1).padStart(2, '0')} · {l.name}</small>
              </span>
            </button>
          ))}
          <span className="sx-pulse" aria-hidden="true" style={{ top: `${(active / (stackLayers.length - 1)) * 100}%` }} />
        </div>
        <span className="sx-edge bottom" aria-hidden="true">Servers</span>
      </div>

      <div className="sx-card" key={layer.id} role="tabpanel">
        <div className="sx-card-head">
          <span className="sx-card-icon"><Icon markup={layer.icon} size={26} strokeWidth={1.7} /></span>
          <div>
            <span className="sx-card-label">Layer {active + 1} of {stackLayers.length} · {layer.name}</span>
            <h3>{layer.plain}</h3>
          </div>
        </div>
        <p className="sx-summary">{layer.summary}</p>
        <div className="sx-example">
          <span>For example</span>
          <p>{layer.example}</p>
        </div>
        <div className="sx-cols">
          <div>
            <span className="sx-title">Technology</span>
            <div className="sx-chips">{layer.items.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
          <div>
            <span className="sx-title">What Wesprime does</span>
            <ul className="sx-work">{layer.work.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
        </div>
        <div className="sx-progress" aria-hidden="true">
          {stackLayers.map((l, i) => (
            <i key={l.id} className={i === active ? 'is-on' : ''}>
              {i === active && auto && visible && <b style={{ animationDuration: `${AUTO_MS}ms` }} />}
            </i>
          ))}
        </div>
      </div>
    </div>
  )
}
