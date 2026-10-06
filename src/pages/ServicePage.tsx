import { Check, Icon } from '../components/Icon'
import { contact } from '../data/content'
import { serviceGroups, services, type Service } from '../data/services'
import { serviceHref, paths } from '../router'

const steps = [
  ['Discover', 'Understand your processes and goals.'],
  ['Plan', 'Agree scope, approach and roadmap.'],
  ['Deliver', 'Build, configure and test with your team.'],
  ['Support', 'Train users and support after go-live.'],
]

const sideGroups = [
  { title: 'ERP & ODOO', slugs: [...serviceGroups[0].slugs, ...serviceGroups[1].slugs] },
  { title: 'DIGITAL SOLUTIONS', slugs: serviceGroups[2].slugs },
]

export function ServicePage({ service }: { service: Service }) {
  const index = services.indexOf(service)
  const prev = services[(index - 1 + services.length) % services.length]
  const next = services[(index + 1) % services.length]

  return (
    <main>
      <section className="svc-hero dark">
        <svg className="svc-hero-lines" viewBox="0 0 700 380" fill="none" aria-hidden="true">
          <line className="flow" x1="80" y1="380" x2="420" y2="60" stroke="#2C4A7A" />
          <line className="flow" x1="300" y1="0" x2="700" y2="260" stroke="#2C4A7A" />
          <line className="flow" x1="420" y1="60" x2="620" y2="330" stroke="#2C4A7A" />
          <circle className="pulse" cx="420" cy="60" r="5" fill="#6FA3FF" />
          <circle className="pulse" cx="560" cy="170" r="4" fill="#6FA3FF" />
          <circle className="pulse" cx="620" cy="330" r="5" fill="#6FA3FF" />
        </svg>
        <Icon className="svc-hero-icon" markup={service.icon} size={150} strokeWidth={1.6} />
        <div className="container svc-hero-inner">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <a href={paths.home}>Home</a>
            <span aria-hidden="true">›</span>
            <a href={paths.services}>Services</a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{service.title}</span>
          </nav>
          <h1>{service.title}</h1>
          <p className="lead">{service.tagline}</p>
        </div>
      </section>

      <section className="svc-body section-tint">
        <div className="container svc-layout">
          <aside className="svc-aside">
            <nav aria-label="Services" className="side-nav">
              {sideGroups.map((g) => (
                <div key={g.title} className="side-group">
                  <div className="side-heading">{g.title}</div>
                  {g.slugs.map((slug) => {
                    const s = services.find((x) => x.slug === slug)!
                    const current = slug === service.slug
                    return (
                      <a
                        key={slug}
                        href={serviceHref(slug)}
                        className={`side-link${current ? ' is-current' : ''}`}
                        aria-current={current ? 'page' : undefined}
                      >
                        {s.title}
                        <span className="side-arrow" aria-hidden="true">→</span>
                      </a>
                    )
                  })}
                </div>
              ))}
            </nav>
            <div className="help-card">
              <b>Need help choosing the right service?</b>
              <span>Tell us about your processes and we'll recommend the right approach.</span>
              <a className="btn btn-accent" href={paths.contact}>Talk to an Expert</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </div>
          </aside>

          <div className="svc-main">
            <div className="stack-sm">
              <div className="eyebrow">OVERVIEW</div>
              <h2>{service.tagline}</h2>
              <p className="muted body-lg">{service.overview}</p>
            </div>

            <div className="stack-sm">
              <h3 className="svc-h3">What's included</h3>
              <div className="included-grid">
                {service.included.map((item) => (
                  <div key={item} className="included-card">
                    <span className="check-circle"><Check /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="deliver-card">
              <h3 className="svc-h3">How we deliver</h3>
              <ol className="deliver-steps">
                {steps.map(([title, desc], i) => (
                  <li key={title}>
                    <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                    <b>{title}</b>
                    <span className="muted small">{desc}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="stack-sm">
              <h3 className="svc-h3">Related Odoo modules</h3>
              <div className="chips">
                {service.modules.map((m) => <span key={m} className="chip-soft">{m}</span>)}
              </div>
            </div>

            <div className="prev-next">
              <a className="pn" href={serviceHref(prev.slug)}>
                <span>← Previous service</span>
                <b>{prev.title}</b>
              </a>
              <a className="pn pn-next" href={serviceHref(next.slug)}>
                <span>Next service →</span>
                <b>{next.title}</b>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
