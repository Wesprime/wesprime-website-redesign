import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { languages, makeT, useT, type Lang } from '../i18n'
import { mediaUrl } from '../data/saudi'
import { HeroCopy } from './HeroCopy'

const bars = [38, 52, 44, 68, 58, 82, 74]

// Animated light over the background scene, placed with a fixed pseudo-random step so it never jumps between renders.
const spread = (i: number, k: number) => ((i * k) % 89) / 89
const packets = Array.from({ length: 9 }, (_, i) => ({
  left: `${42 + spread(i, 31) * 50}%`, top: `${12 + spread(i, 47) * 72}%`,
  '--dur': `${3.5 + spread(i, 19) * 3}s`, '--delay': `${-spread(i, 61) * 6}s`,
}) as CSSProperties)
const sparks = Array.from({ length: 18 }, (_, i) => ({
  left: `${38 + spread(i, 37) * 60}%`, top: `${6 + spread(i, 53) * 86}%`,
  '--dur': `${2 + spread(i, 23) * 3}s`, '--delay': `${-spread(i, 71) * 4}s`,
}) as CSSProperties)

// Each hero language stays on screen this long before the next one (EN → AR → HI).
const LANG_MS = 5000
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Homepage hero: full-bleed technology scene with a slow zoom, a navy fade for
 * legibility, animated light over the scene (pulsing glows, data packets
 * running along its circuit lines, sparks), floating glass cards and a light
 * pointer parallax.
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
        <img src={mediaUrl('background.jpg')} alt="" fetchPriority="high" />
      </div>
      <div className="hero-fx" aria-hidden="true">
        <span className="fx-glow g1" /><span className="fx-glow g2" /><span className="fx-glow g3" />
        {packets.map((s, i) => <i key={i} className="fx-packet" style={s} />)}
        {sparks.map((s, i) => <b key={i} className="fx-spark" style={s} />)}
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
