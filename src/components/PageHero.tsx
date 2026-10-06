import type { ReactNode } from 'react'
import { paths } from '../router'

type Props = {
  /** Trail after "Home"; the last item is the current page */
  crumbs: [label: string, href?: string][]
  title: string
  lead?: string
  /** Optional background photo URL */
  image?: string
  children?: ReactNode
}

export function PageHero({ crumbs, title, lead, image, children }: Props) {
  return (
    <section className={`svc-hero dark page-hero${image ? ' has-image' : ''}`}>
      {image && <img className="page-hero-img" src={image} alt="" />}
      <svg className="svc-hero-lines" viewBox="0 0 700 380" fill="none" aria-hidden="true">
        <line className="flow" x1="80" y1="380" x2="420" y2="60" stroke="#2C4A7A" />
        <line className="flow" x1="300" y1="0" x2="700" y2="260" stroke="#2C4A7A" />
        <line className="flow" x1="420" y1="60" x2="620" y2="330" stroke="#2C4A7A" />
        <circle className="pulse" cx="420" cy="60" r="5" fill="#6FA3FF" />
        <circle className="pulse" cx="560" cy="170" r="4" fill="#6FA3FF" />
        <circle className="pulse" cx="620" cy="330" r="5" fill="#6FA3FF" />
      </svg>
      <div className="container svc-hero-inner">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <a href={paths.home}>Home</a>
          {crumbs.map(([label, href], i) => (
            <span key={label} className="crumb">
              <span aria-hidden="true">›</span>
              {href && i < crumbs.length - 1 ? <a href={href}>{label}</a> : <span aria-current="page">{label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  )
}
