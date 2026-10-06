import { coreServices } from '../data/content'
import { serviceHref } from '../router'
import { Check, Icon } from './Icon'

type Service = (typeof coreServices)[number]

// Bento layout: one featured card plus five smaller ones, each with its own
// small visual. Grid areas are set in home.css (.bento-a … .bento-f).
const areas = ['a', 'b', 'c', 'd', 'e', 'f']

function Arrow() {
  return (
    <span className="bento-arrow" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
    </span>
  )
}

function Head({ service, index }: { service: Service; index: number }) {
  return (
    <div className="bento-head">
      <span className="bento-icon"><Icon markup={service.icon} size={index === 0 ? 40 : 30} viewBox={40} /></span>
      <span className="bento-num">{String(index + 1).padStart(2, '0')}</span>
    </div>
  )
}

/** Small visual that sits at the bottom of some cards. */
function Visual({ slug }: { slug: string }) {
  if (slug === 'custom-odoo-development') {
    return (
      <pre className="bento-code" aria-hidden="true">
        <span className="tk-kw">class</span> SaleOrder(models.Model):{'\n'}
        {'    '}_inherit = <span className="tk-str">'sale.order'</span>{'\n'}
        {'    '}approval = fields.Boolean()
      </pre>
    )
  }
  if (slug === 'data-migration') {
    return (
      <div className="bento-migrate" aria-hidden="true">
        <span>Legacy</span>
        <span className="bento-bar"><i /></span>
        <span>Odoo</span>
      </div>
    )
  }
  if (slug === 'training-enablement') {
    return (
      <div className="bento-langs" aria-hidden="true">
        <span>English</span>
        <span lang="ar" dir="rtl">العربية</span>
        <span>Guides &amp; documentation</span>
      </div>
    )
  }
  if (slug === 'odoo-implementation') {
    return (
      <div className="bento-modules" aria-hidden="true">
        {['Sales', 'Stock', 'Finance', 'HR', 'CRM', 'POS'].map((m) => <span key={m}>{m}</span>)}
      </div>
    )
  }
  return null
}

export function ServicesBento() {
  return (
    <div className="bento">
      {coreServices.map((s, i) => {
        const featured = i === 0
        return (
          <a key={s.slug} className={`bento-card bento-${areas[i]}`} href={serviceHref(s.slug)}>
            <Head service={s} index={i} />
            <h3>{s.title}</h3>
            {featured ? (
              <>
                <p className="bento-lead">Understand your processes first — then map the right ERP roadmap, with AI where it genuinely helps.</p>
                <ul className="bento-checks">
                  {s.points.map((p) => <li key={p}><Check />{p}</li>)}
                </ul>
                <div className="bento-roadmap">
                  <svg viewBox="0 0 600 70" fill="none" aria-hidden="true">
                    <path className="flow" d="M20 50 C 120 10, 200 10, 300 35 S 480 65, 580 20" stroke="#6FA3FF" strokeWidth="2" />
                    {[[20, 50], [300, 35], [580, 20]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="8" fill={k === 2 ? '#6FA3FF' : '#1D5FD6'} stroke="#0A1830" strokeWidth="4" />)}
                  </svg>
                  <ol>
                    {['Current processes', 'Gaps & opportunities', 'ERP roadmap'].map((t) => <li key={t}>{t}</li>)}
                  </ol>
                </div>
                <div className="bento-deliver">
                  <span>You receive</span>
                  {['Process maps', 'Fit-gap report', 'Module plan', 'Roadmap & budget'].map((d) => <b key={d}>{d}</b>)}
                </div>
              </>
            ) : (
              <div className="bento-tags">{s.points.slice(0, 3).map((p) => <span key={p}>{p}</span>)}</div>
            )}
            <Visual slug={s.slug} />
            <span className="bento-cta">{featured ? 'Start with a consultation' : 'Learn more'} <Arrow /></span>
          </a>
        )
      })}
    </div>
  )
}
