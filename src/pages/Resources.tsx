import { useEffect, useMemo, useState } from 'react'
import { guideCategories, guides, type Block, type Guide } from '../data/guides'
import { guideHref, resourcesHref, paths } from '../router'

export function ResourcesPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('All')
  const q = query.trim().toLowerCase()
  const shown = guides.filter(
    (g) => (category === 'All' || g.category === category) && (!q || `${g.title} ${g.summary} ${g.category}`.toLowerCase().includes(q)),
  )

  return (
    <main>
      <section className="res-hero">
        <div className="container res-hero-inner">
          <div className="eyebrow">RESOURCES</div>
          <h1>Practical guides for running Odoo in Saudi Arabia</h1>
          <p className="muted body-lg">Plain-language explanations of ZATCA, payroll, hosting and implementation — with the sources behind them.</p>
          <div className="res-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" strokeLinecap="round" /></svg>
            <label htmlFor="res-q" className="sr-only">Search guides</label>
            <input id="res-q" type="search" placeholder="Search guides — e.g. GOSI, Wave 25, hosting" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="filter-chips" role="group" aria-label="Filter by category">
            {guideCategories.map((c) => (
              <button key={c} type="button" className={category === c ? 'is-on' : ''} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          {shown.length ? (
            <div className="grid-3">
              {shown.map((g) => <GuideCard key={g.slug} guide={g} />)}
            </div>
          ) : (
            <p className="muted center-note">No guides match “{query}”. Try another term, or <a className="text-link" href={paths.contact}>ask us directly</a>.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <a className="card guide-card" href={guideHref(guide.slug)}>
      <span className="guide-cat">{guide.category}</span>
      <h3>{guide.title}</h3>
      <p className="muted small">{guide.summary}</p>
      <span className="guide-meta">{guide.minutes} min read · Reviewed {guide.reviewed}</span>
    </a>
  )
}

function BlockView({ block }: { block: Block }) {
  if ('p' in block) return <p>{block.p}</p>
  if ('list' in block) return <ul>{block.list.map((i) => <li key={i}>{i}</li>)}</ul>
  if ('note' in block) return <aside className="guide-note">{block.note}</aside>
  if ('steps' in block) {
    return (
      <ol className="guide-steps">
        {block.steps.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
      </ol>
    )
  }
  return (
    <div className="table-scroll">
      <table>
        <thead><tr>{block.table.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{block.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

export function GuidePage({ guide }: { guide: Guide }) {
  const [active, setActive] = useState(guide.sections[0].id)
  const grouped = useMemo(() => {
    const map = new Map<string, Guide[]>()
    guides.forEach((g) => map.set(g.category, [...(map.get(g.category) ?? []), g]))
    return [...map]
  }, [])

  // Highlight the section currently in view in the "On this page" list.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-90px 0px -60% 0px' },
    )
    guide.sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [guide])

  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3)

  return (
    <main className="guide-wrap">
      <div className="container guide-layout">
        <nav className="guide-sidebar" aria-label="All guides">
          <a className="guide-back" href={resourcesHref}>← All resources</a>
          {grouped.map(([cat, list]) => (
            <div key={cat} className="guide-group">
              <div className="side-heading">{cat.toUpperCase()}</div>
              {list.map((g) => (
                <a key={g.slug} href={guideHref(g.slug)} className={g.slug === guide.slug ? 'is-current' : ''} aria-current={g.slug === guide.slug ? 'page' : undefined}>{g.title}</a>
              ))}
            </div>
          ))}
        </nav>

        <article className="guide-article">
          <nav aria-label="Breadcrumb" className="guide-crumbs">
            <a href={resourcesHref}>Resources</a><span aria-hidden="true">›</span><span>{guide.category}</span>
          </nav>
          <h1>{guide.title}</h1>
          <p className="guide-lede">{guide.summary}</p>
          <div className="guide-meta">{guide.minutes} min read · Last reviewed {guide.reviewed}</div>
          {guide.sections.map((s) => (
            <section key={s.id} id={s.id} className="guide-section">
              <h2>{s.heading}</h2>
              {s.blocks.map((b, i) => <BlockView key={i} block={b} />)}
            </section>
          ))}
          {guide.sources.length > 0 && (
            <section className="guide-sources">
              <h2>Sources</h2>
              <ul>{guide.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
            </section>
          )}
          <div className="guide-cta">
            <div>
              <b>Want this applied to your business?</b>
              <p>We'll walk through your setup in a free 60-minute scoping call.</p>
            </div>
            <a className="btn btn-accent" href={paths.contact}>Talk to an Expert</a>
          </div>
          <div className="guide-related">
            <h2>Related guides</h2>
            <div className="grid-3">{related.map((g) => <GuideCard key={g.slug} guide={g} />)}</div>
          </div>
        </article>

        <aside className="guide-toc" aria-label="On this page">
          <div className="side-heading">ON THIS PAGE</div>
          {guide.sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className={active === s.id ? 'is-active' : ''}
              onClick={() => document.getElementById(s.id)?.scrollIntoView()}
            >
              {s.heading}
            </button>
          ))}
        </aside>
      </div>
    </main>
  )
}
