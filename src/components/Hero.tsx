import { useRef, type PointerEvent } from 'react'
import { mediaUrl } from '../data/saudi'
import { paths } from '../router'

const bars = [38, 52, 44, 68, 58, 82, 74]

/**
 * Homepage hero: full-bleed office photo with a slow zoom, a navy fade for
 * legibility, floating glass cards and a light pointer parallax.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)

  // Pointer position as -1…1, written to CSS variables (no re-render).
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }
  const onLeave = () => {
    ref.current?.style.setProperty('--mx', '0')
    ref.current?.style.setProperty('--my', '0')
  }

  return (
    <section ref={ref} className="hero-photo dark" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="hero-media" aria-hidden="true">
        <img src={mediaUrl('hero-office.jpg')} alt="" fetchPriority="high" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-sweep" aria-hidden="true" />

      <div className="container hero-photo-inner">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="hero-live" aria-hidden="true" />
            Odoo ERP Consulting &amp; Digital Transformation
          </div>
          <h1>Transform your business with <span className="hero-hl">intelligent ERP</span> &amp; digital solutions</h1>
          <p className="lead">Wesprime helps businesses simplify operations, implement powerful Odoo ERP solutions, automate workflows and build scalable digital systems tailored to the way they work.</p>
          <div className="btn-row">
            <a className="btn btn-accent btn-lg" href={paths.contact}>Talk to an Expert</a>
            <a className="btn btn-ghost btn-lg" href={paths.solutions}>Explore Our Solutions →</a>
          </div>
        </div>

        <div className="hero-cards" aria-hidden="true">
          <div className="glass glass-status">
            <span className="hero-live" />
            <b>Odoo ERP</b>
            <span>All apps connected</span>
          </div>
          <div className="glass glass-dash">
            <div className="glass-title">
              <span>Live operations</span>
              <span className="glass-up">▲ on track</span>
            </div>
            <div className="glass-bars">
              {bars.map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${0.6 + i * 0.08}s` }} />)}
            </div>
            <div className="glass-legend"><span>Sales</span><span>Stock</span><span>Finance</span></div>
          </div>
          <div className="glass glass-flow">
            <div className="glass-title"><span>Automated workflow</span></div>
            <div className="glass-steps">
              <span>Quote</span><span>Order</span><span className="is-on">Invoice</span>
              <i className="glass-dot" />
            </div>
          </div>
        </div>
      </div>

      <a className="hero-scroll" href="#pillars" onClick={(e) => { e.preventDefault(); document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' }) }}>
        <span>Scroll</span>
        <i aria-hidden="true" />
      </a>
    </section>
  )
}
