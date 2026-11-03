import { languages, makeT, type Lang } from '../i18n'
import { paths } from '../router'

type Props = { lang: Lang; duration: number | null; onPick: (l: Lang) => void }

/**
 * Hero text in English, Arabic and Hindi. All three share one grid cell, so the
 * layout never jumps; only the active one is visible and reachable.
 */
export function HeroCopy({ lang, duration, onPick }: Props) {
  return (
    <div className="hc">
      <div className="rt-langs" role="group" aria-label="Hero language">
        {languages.map((l) => (
          <button key={l.code} type="button" lang={l.code} aria-pressed={l.code === lang} className={l.code === lang ? 'is-on' : ''} onClick={() => onPick(l.code)}>
            {l.label}
            {l.code === lang && duration && <i key={lang} style={{ animationDuration: `${duration}ms` }} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className="hc-stack">
        {languages.map(({ code, dir }) => {
          const t = makeT(code)
          const on = code === lang
          const Title = on ? 'h1' : 'p'
          return (
            <div key={code} className={`hero-copy hc-${code}${on ? ' is-on' : ''}`} lang={code} dir={dir} aria-hidden={!on} inert={!on}>
              <div className="hero-badge">
                <span className="hero-live" aria-hidden="true" />
                {t('Business technology, made practical')}
              </div>
              <Title className="hc-title">{t('We help businesses run smarter')}<br /><span className="hero-hl">{t('and grow with confidence.')}</span></Title>
              <p className="lead">{t('From sales and connected operations to automation, dashboards and ongoing support — get the right solution for the result you need.')}</p>
              <div className="btn-row">
                <a className="btn btn-accent btn-lg" href="#outcomes" onClick={(e) => { e.preventDefault(); document.getElementById('outcomes')?.scrollIntoView({ behavior: 'smooth' }) }}>{t('Explore Solutions')}</a>
                <a className="btn btn-ghost btn-lg" href={paths.contact}>{t('Request a Discovery Call')} <span className="arrow" aria-hidden="true">→</span></a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
