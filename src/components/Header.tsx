import { useEffect, useRef, useState } from 'react'
import { contact } from '../data/content'
import { getService, serviceGroups } from '../data/services'
import { paths, serviceHref } from '../router'
import { Logo } from './Icon'

// Pages after "Services" in the menu. The desktop bar leaves out the ones
// marked mobileOnly to stay on one line; the logo is the link home.
const links = [
  { label: 'Solutions', href: paths.solutions },
  { label: 'Industries', href: paths.industries },
  { label: 'Case Studies', href: paths.cases, mobileOnly: true },
  { label: 'Resources', href: paths.resources },
  { label: 'FAQ', href: paths.faq, mobileOnly: true },
  { label: 'Contact', href: paths.contact },
]

export function Header({ activeHref }: { activeHref?: string }) {
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const megaRef = useRef<HTMLDivElement>(null)

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
        <a href={paths.home} className="brand" aria-label="Wesprime home">
          <Logo />
          <span>wesprime</span>
        </a>

        <nav className="main-nav" aria-label="Main">
          <a className={`navlink${activeHref === paths.about ? ' is-active' : ''}`} href={paths.about}>About</a>
          <div className="mega-wrap" ref={megaRef}>
            <button
              type="button"
              className={`navlink nav-button${megaOpen || activeHref === paths.services ? ' is-active' : ''}`}
              aria-expanded={megaOpen}
              aria-controls="mega-menu"
              onClick={() => setMegaOpen((o) => !o)}
            >
              Services {megaOpen ? '▴' : '▾'}
            </button>
            {megaOpen && (
              <div id="mega-menu" className="mega panel">
                <div className="mega-cols">
                  {serviceGroups.map((group) => (
                    <div key={group.title} className="mega-col">
                      <div className="mega-heading">{group.title}</div>
                      {group.slugs.map((slug) => (
                        <a key={slug} className="mm-item" href={serviceHref(slug)}>
                          <span className="mm-dot">›</span>
                          {getService(slug)!.title}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mega-foot">
                  <span>Not sure which service fits? We'll help you decide.</span>
                  <a href={paths.services}>View all services →</a>
                </div>
              </div>
            )}
          </div>
          {links.filter((l) => !l.mobileOnly).map((l) => (
            <a key={l.href} className={`navlink${activeHref === l.href ? ' is-active' : ''}`} href={l.href} aria-current={activeHref === l.href ? 'page' : undefined}>{l.label}</a>
          ))}
        </nav>

        <a className="btn btn-accent header-cta" href={paths.contact}>Talk to an Expert</a>

        <button type="button" className="icon-btn menu-toggle" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-menu-top">
            <span className="brand"><Logo size={30} /><span>wesprime</span></span>
            <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setMobileOpen(false)}>×</button>
          </div>
          <nav className="mobile-nav" aria-label="Mobile">
            <a href={paths.home}>Home</a>
            <a href={paths.about}>About</a>
            <details>
              <summary>Services<span>+</span></summary>
              <div className="mobile-sub">
                <a href={paths.services}>All services</a>
                {serviceGroups.flatMap((g) => g.slugs).map((slug) => (
                  <a key={slug} href={serviceHref(slug)}>{getService(slug)!.title}</a>
                ))}
              </div>
            </details>
            {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <div className="mobile-menu-foot">
            <a className="btn btn-accent btn-lg" href={paths.contact}>Talk to an Expert</a>
            <p>{contact.email} · {contact.phone}</p>
          </div>
        </div>
      )}
    </header>
  )
}
