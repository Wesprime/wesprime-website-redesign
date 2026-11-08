import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { languages, makeT, useT, type Lang } from '../i18n'
import { mediaUrl } from '../data/saudi'
import { HeroCopy } from './HeroCopy'

const bars = [38, 52, 44, 68, 58, 82, 74]

// Each hero language stays on screen this long before the next one (EN → AR → HI).
const LANG_MS = 5000
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Homepage hero: full-bleed office photo with a slow zoom, a navy fade for
 * legibility, floating glass cards and a light pointer parallax.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const scrollT = useT()
  const [lang, setLang] = useState<Lang>('en')
  const [auto] = useState(() => !reducedMotion())
  const t = makeT(lang)

  // Move to the next language; picking one by hand restarts the timer from there.
  useEffect(() => {
    if (!auto) return
    const id = window.setTimeout(() => {
      const i = languages.findIndex((l) => l.code === lang)
      setLang(languages[(i + 1) % languages.length].code)
    }, LANG_MS)
    return () => window.clearTimeout(id)
  }, [lang, auto])

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
        <HeroCopy lang={lang} duration={auto ? LANG_MS : null} onPick={setLang} />

        <div className="hero-cards" lang={lang} aria-hidden="true">
          <div className="glass glass-status">
            <span className="hero-live" />
            <b>Odoo ERP</b>
            <span>{t('All apps connected')}</span>
          </div>
          <div className="glass glass-dash">
            <div className="glass-title">
              <span>{t('Live operations')}</span>
              <span className="glass-up">▲ {t('on track')}</span>
            </div>
            <div className="glass-bars">
              {bars.map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${0.6 + i * 0.08}s` }} />)}
            </div>
            <div className="glass-legend"><span>{t('Sales')}</span><span>{t('Stock')}</span><span>{t('Finance')}</span></div>
          </div>
        </div>
      </div>

      <a className="hero-scroll" href="#outcomes" onClick={(e) => { e.preventDefault(); document.getElementById('outcomes')?.scrollIntoView({ behavior: 'smooth' }) }}>
        <span>{scrollT('Scroll')}</span>
        <i aria-hidden="true" />
      </a>
    </section>
  )
}
