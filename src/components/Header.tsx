import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { contact } from '../data/content'
import { getService, serviceGroups } from '../data/services'
import { paths, serviceHref } from '../router'
import { useT } from '../i18n'
import { BrandLogo, Icon } from './Icon'

// Pages after "Services" in the menu. The desktop bar leaves out the ones
// marked mobileOnly to stay on one line; the logo is the link home.
const links = [
  { label: 'Solutions', href: paths.solutions },
  { label: 'Industries', href: paths.industries },
  { label: 'Case Studies', href: paths.cases, mobileOnly: true },
  { label: 'Blog', href: paths.blog },
  { label: 'Careers', href: paths.careers },
  { label: 'FAQ', href: paths.faq, mobileOnly: true },
  { label: 'Contact', href: paths.contact },
]

export function Header({ activeHref }: { activeHref?: string }) {
  const [megaOpen, setMegaOpen] = useState(false)
  const [group, setGroup] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const megaRef = useRef<HTMLDivElement>(null)
  const t = useT()

  // Close menus on navigation, outside click or Escape.
  useEffect(() => {
    const close = () => {
      setMegaOpen(false)
      setMobileOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('hashchange', close)
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('hashchange', close)
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href={paths.home} className="brand" aria-label={t('Wesprime home')}>
          <BrandLogo className="brand-logo" />
          <span>Wesprime</span>
        </a>

        <nav className="main-nav" aria-label={t('Main')}>
          <a className={`navlink${activeHref === paths.about ? ' is-active' : ''}`} href={paths.about}>{t('About')}</a>
          <div className="mega-wrap" ref={megaRef}>
            <button
              type="button"
              className={`navlink nav-button${megaOpen || activeHref === paths.services ? ' is-active' : ''}`}
              aria-expanded={megaOpen}
              aria-controls="mega-menu"
              onClick={() => setMegaOpen((o) => !o)}
            >
              {t('Services')} {megaOpen ? '▴' : '▾'}
            </button>
            {megaOpen && (
              <div id="mega-menu" className="mega panel">
                {/* Categories on the left; pointing at one shows only its services. */}
                <div className="mega-groups" style={{ '--i': group } as CSSProperties}>
                  <span className="mega-glow" aria-hidden="true" />
                  {serviceGroups.map((g, n) => (
                    <button
                      key={g.title}
                      type="button"
                      className={n === group ? 'is-on' : ''}
                      aria-pressed={n === group}
                      onMouseEnter={() => setGroup(n)}
                      onFocus={() => setGroup(n)}
                      onClick={() => setGroup(n)}
                    >
                      <span className="mega-gicon"><Icon markup={g.icon} size={16} strokeWidth={1.9} /></span>
                      {t(g.title)}
                    </button>
                  ))}
                </div>

                <div className="mega-main" key={group}>
                  {serviceGroups[group].slugs.map((slug, n) => {
                    const s = getService(slug)!
                    return (
                      <a key={slug} className="mm-tile" href={serviceHref(slug)} style={{ '--n': n } as CSSProperties}>
                        <span className="mm-icon"><Icon markup={s.icon} size={17} strokeWidth={1.8} /></span>
                        <span className="mm-title">{t(s.title)}</span>
                        <span className="mm-arrow" aria-hidden="true">→</span>
                      </a>
                    )
                  })}
                  <a className="mega-all" href={paths.services}>{t('View all services')} <span aria-hidden="true">→</span></a>
                </div>
              </div>
            )}
          </div>
          {links.filter((l) => !l.mobileOnly).map((l) => (
            <a key={l.href} className={`navlink${activeHref === l.href ? ' is-active' : ''}`} href={l.href} aria-current={activeHref === l.href ? 'page' : undefined}>{t(l.label)}</a>
          ))}
        </nav>

        <a className="btn btn-ghost header-cta" href={paths.contact}>{t('Talk to an Expert')}</a>

        <button type="button" className="icon-btn menu-toggle" aria-label={t('Open menu')} onClick={() => setMobileOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={t('Menu')}>
          <div className="mobile-menu-top">
            <span className="brand"><BrandLogo className="brand-logo" /><span>Wesprime</span></span>
            <button type="button" className="icon-btn" aria-label={t('Close menu')} onClick={() => setMobileOpen(false)}>×</button>
          </div>
          <nav className="mobile-nav" aria-label={t('Mobile')}>
            <a href={paths.home}>{t('Home')}</a>
            <a href={paths.about}>{t('About')}</a>
            <details>
              <summary>{t('Services')}<span>+</span></summary>
              <div className="mobile-sub">
                <a href={paths.services}>{t('All services')}</a>
                {serviceGroups.flatMap((g) => g.slugs).map((slug) => (
                  <a key={slug} href={serviceHref(slug)}>{t(getService(slug)!.title)}</a>
                ))}
              </div>
            </details>
            {links.map((l) => <a key={l.href} href={l.href}>{t(l.label)}</a>)}
          </nav>
          <div className="mobile-menu-foot">
            <a className="btn btn-accent btn-lg" href={paths.contact}>{t('Talk to an Expert')}</a>
            <p>{contact.email} · {contact.phone}</p>
          </div>
        </div>
      )}
    </header>
  )
}
