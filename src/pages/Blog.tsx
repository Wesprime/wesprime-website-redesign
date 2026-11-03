import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { getPost, postCategories, posts, type Block, type Post } from '../data/blog'
import { mediaUrl } from '../data/saudi'
import { useT } from '../i18n'
import { paths, postHref } from '../router'
import { Headline } from '../components/Headline'

const SAVED_KEY = 'wesprime-saved-posts'

function BlockView({ block }: { block: Block }) {
  const t = useT()
  if ('p' in block) return <p>{t(block.p)}</p>
  if ('list' in block) return <ul>{block.list.map((i) => <li key={i}>{t(i)}</li>)}</ul>
  if ('note' in block) return <aside className="guide-note">{t(block.note)}</aside>
  if ('steps' in block) {
    return (
      <ol className="guide-steps">
        {block.steps.map(([title, d]) => <li key={title}><b>{t(title)}</b><span>{t(d)}</span></li>)}
      </ol>
    )
  }
  return (
    <div className="table-scroll">
      <table>
        <thead><tr>{block.table.head.map((h, i) => <th key={i}>{t(h)}</th>)}</tr></thead>
        <tbody>{block.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{t(c)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

const readSaved = (): string[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]')
    return Array.isArray(raw) ? raw.filter((s) => typeof s === 'string' && getPost(s)) : []
  } catch {
    return []
  }
}

/** Posts the visitor bookmarked, kept in this browser only. */
function useSaved() {
  const [saved, setSaved] = useState(readSaved)
  const toggle = (slug: string) =>
    setSaved((list) => {
      const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(next))
      } catch {
        // Storage blocked: bookmarks last for this visit only.
      }
      return next
    })
  return { saved, toggle }
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  )
}

// Card tilts a little towards the pointer; values are written as CSS variables (no re-render).
const tilt = (e: PointerEvent<HTMLElement>) => {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--ry', `${(((e.clientX - r.left) / r.width) - 0.5) * 6}deg`)
  el.style.setProperty('--rx', `${(0.5 - (e.clientY - r.top) / r.height) * 6}deg`)
}
const untilt = (e: PointerEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

type CardProps = { post: Post; saved?: boolean; onSave?: (slug: string) => void; featured?: boolean }

export function PostCard({ post, saved = false, onSave, featured = false }: CardProps) {
  const t = useT()
  return (
    <article className={`post-card${featured ? ' is-featured' : ''}`} onPointerMove={tilt} onPointerLeave={untilt}>
      <div className="post-img">
        <img src={mediaUrl(post.image)} alt="" loading={featured ? 'eager' : 'lazy'} />
        <span className="post-cat">{t(post.category)}</span>
        {featured && <span className="post-flag">{t('Featured')}</span>}
      </div>
      <div className="post-body">
        <div className="post-meta">
          <span>{t(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{t('{n} min read', { n: post.minutes })}</span>
        </div>
        <h3><a className="post-link" href={postHref(post.slug)}>{t(post.title)}</a></h3>
        <p>{t(post.excerpt)}</p>
        <div className="post-foot">
          <span className="post-more">{t('Read article')} <span className="arrow" aria-hidden="true">→</span></span>
          {onSave && (
            <button type="button" className={`post-save${saved ? ' is-on' : ''}`} aria-pressed={saved} aria-label={saved ? t('Remove from saved') : t('Save for later')} onClick={() => onSave(post.slug)}>
              <BookmarkIcon filled={saved} />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export function BlogPage() {
  const t = useT()
  const { saved, toggle } = useSaved()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const q = query.trim().toLowerCase()

  const inCategory = (p: Post) => (category === 'Saved' ? saved.includes(p.slug) : category === 'All' || p.category === category)
  const matches = (p: Post) => !q || `${p.title} ${p.excerpt} ${p.category} ${p.tags.join(' ')}`.toLowerCase().includes(q)
  const shown = posts.filter((p) => inCategory(p) && matches(p))
  // The newest post is featured while browsing everything.
  const featured = category === 'All' && !q ? shown[0] : undefined
  const rest = featured ? shown.slice(1) : shown
  const count = (c: string) => (c === 'All' ? posts.length : posts.filter((p) => p.category === c).length)
  const tags = [...new Set(posts.flatMap((p) => p.tags))]

  return (
    <main>
      <section className="blog-hero dark">
        <div className="blog-hero-grid" aria-hidden="true" />
        <div className="container blog-hero-inner">
          <div className="eyebrow">{t('WESPRIME BLOG')}</div>
          <Headline as="h1" text="Ideas that make Odoo work harder" />
          <p className="body-lg">{t('Practical tips on ERP, automation, AI and Saudi business — written by the people who implement it.')}</p>
          <div className="blog-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" strokeLinecap="round" /></svg>
            <label htmlFor="blog-q" className="sr-only">{t('Search articles')}</label>
            <input id="blog-q" type="search" placeholder={t('Search articles — e.g. POS, AI, warehouse')} value={query} onChange={(e) => setQuery(e.target.value)} />
            {query && <button type="button" className="blog-clear" aria-label={t('Clear search')} onClick={() => setQuery('')}>×</button>}
          </div>
          <div className="blog-tags" role="group" aria-label={t('Popular topics')}>
            {tags.map((tag) => (
              <button key={tag} type="button" className={q === tag.toLowerCase() ? 'is-on' : ''} onClick={() => setQuery(q === tag.toLowerCase() ? '' : tag)}>#{t(tag)}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint blog-list">
        <div className="container">
          <div className="blog-toolbar">
            <div className="blog-chips" role="group" aria-label={t('Filter by category')}>
              {postCategories.map((c) => (
                <button key={c} type="button" className={category === c ? 'is-on' : ''} aria-pressed={category === c} onClick={() => setCategory(c)}>
                  {t(c)} <small>{count(c)}</small>
                </button>
              ))}
              <button type="button" className={`chip-saved${category === 'Saved' ? ' is-on' : ''}`} aria-pressed={category === 'Saved'} onClick={() => setCategory('Saved')}>
                <BookmarkIcon filled={category === 'Saved'} /> {t('Saved')} <small>{saved.length}</small>
              </button>
            </div>
            <div className="blog-view" role="group" aria-label={t('Layout')}>
              <button type="button" aria-pressed={view === 'grid'} aria-label={t('Grid view')} onClick={() => setView('grid')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>
              </button>
              <button type="button" aria-pressed={view === 'list'} aria-label={t('List view')} onClick={() => setView('list')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /></svg>
              </button>
            </div>
          </div>

          {featured && <PostCard post={featured} featured saved={saved.includes(featured.slug)} onSave={toggle} />}

          {rest.length > 0 && (
            <div className={`post-grid is-${view}`} key={`${category}/${q}/${view}`}>
              {rest.map((p) => <PostCard key={p.slug} post={p} saved={saved.includes(p.slug)} onSave={toggle} />)}
            </div>
          )}

          {shown.length === 0 && (
            <div className="blog-empty">
              {category === 'Saved' && !q ? (
                <p>{t('No saved articles yet. Tap the bookmark on any article to keep it here.')}</p>
              ) : (
                <p>{t('No articles match your search.')} <button type="button" className="text-link" onClick={() => { setQuery(''); setCategory('All') }}>{t('Show all articles')}</button></p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

/** Share the current article. The link is copied, or opened in WhatsApp, LinkedIn or X. */
function ShareButtons({ post }: { post: Post }) {
  const t = useT()
  const [copied, setCopied] = useState(false)
  const url = window.location.href
  const text = encodeURIComponent(post.title)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: nothing to show.
    }
  }
  return (
    <div className="share">
      <div className="side-heading">{t('SHARE')}</div>
      <div className="share-row">
        <button type="button" onClick={copy} aria-label={t('Copy link')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" /></svg>
        </button>
        <a href={`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label={t('Share on WhatsApp')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" /></svg>
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label={t('Share on LinkedIn')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 9h3v11H5zM6.5 4a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM10 9h3v1.6c.5-.9 1.7-1.8 3.4-1.8 3.2 0 3.6 2.1 3.6 4.8V20h-3v-5.6c0-1.4 0-3-1.9-3s-2.1 1.4-2.1 2.9V20h-3z" /></svg>
        </a>
        <a href={`https://x.com/intent/post?text=${text}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label={t('Share on X')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" /></svg>
        </a>
      </div>
      <span className={`share-toast${copied ? ' is-on' : ''}`} role="status">{copied ? t('Link copied') : ''}</span>
    </div>
  )
}

export function PostPage({ post }: { post: Post }) {
  const t = useT()
  const { saved, toggle } = useSaved()
  const [active, setActive] = useState(post.sections[0].id)
  const [progress, setProgress] = useState(0)
  const [vote, setVote] = useState<'yes' | 'no' | null>(null)
  const articleRef = useRef<HTMLElement>(null)

  // Reading progress: how far the article body has scrolled past the top of the screen.
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight * 0.6
      setProgress(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Highlight the section currently in view in the contents list.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-90px 0px -60% 0px' },
    )
    post.sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [post])

  const index = posts.indexOf(post)
  const prev = posts[index + 1]
  const next = posts[index - 1]
  const related = [...posts.filter((p) => p !== post && p.category === post.category), ...posts.filter((p) => p !== post && p.category !== post.category)].slice(0, 3)
  const isSaved = saved.includes(post.slug)

  return (
    <main className="post-page">
      <div className="read-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <header className="post-hero dark">
        <img className="post-hero-img" src={mediaUrl(post.image)} alt="" />
        <div className="container post-hero-inner">
          <nav aria-label={t('Breadcrumb')} className="breadcrumb">
            <a href={paths.home}>{t('Home')}</a>
            <span className="crumb"><span aria-hidden="true">›</span><a href={paths.blog}>{t('Blog')}</a></span>
            <span className="crumb"><span aria-hidden="true">›</span><span aria-current="page">{t(post.category)}</span></span>
          </nav>
          <Headline as="h1" text={post.title} />
          <p className="lead">{t(post.excerpt)}</p>
          <div className="post-hero-meta">
            <span className="post-author"><span aria-hidden="true">W</span>{t('Wesprime Team')}</span>
            <span>{t(post.date)}</span>
            <span>{t('{n} min read', { n: post.minutes })}</span>
            <button type="button" className={`post-save on-dark${isSaved ? ' is-on' : ''}`} aria-pressed={isSaved} onClick={() => toggle(post.slug)}>
              <BookmarkIcon filled={isSaved} /> {isSaved ? t('Saved') : t('Save')}
            </button>
          </div>
        </div>
      </header>

      <div className="container post-layout">
        <article className="guide-article post-article" ref={articleRef}>
          {post.sections.map((s) => (
            <section key={s.id} id={s.id} className="guide-section">
              <h2>{t(s.heading)}</h2>
              {s.blocks.map((b, i) => <BlockView key={i} block={b} />)}
            </section>
          ))}

          <div className="post-tags">
            {post.tags.map((tag) => <span key={tag}>#{t(tag)}</span>)}
          </div>

          <div className="post-vote" role="group" aria-label={t('Was this article helpful?')}>
            {vote ? (
              <p role="status">{vote === 'yes' ? t('Thanks — glad it helped!') : t('Thanks for telling us. Our team is happy to answer your questions directly.')}</p>
            ) : (
              <>
                <b>{t('Was this article helpful?')}</b>
                <div>
                  <button type="button" onClick={() => setVote('yes')}>👍 {t('Yes')}</button>
                  <button type="button" onClick={() => setVote('no')}>👎 {t('Not really')}</button>
                </div>
              </>
            )}
          </div>

          <div className="guide-cta">
            <div>
              <b>{t('Want this applied to your business?')}</b>
              <p>{t("We'll walk through your setup in a free 60-minute scoping call.")}</p>
            </div>
            <a className="btn btn-accent" href={paths.contact}>{t('Talk to an Expert')}</a>
          </div>

          <nav className="post-pager" aria-label={t('More articles')}>
            {prev ? (
              <a href={postHref(prev.slug)}><small>← {t('Previous article')}</small><span>{t(prev.title)}</span></a>
            ) : <span />}
            {next && (
              <a href={postHref(next.slug)} className="is-next"><small>{t('Next article')} →</small><span>{t(next.title)}</span></a>
            )}
          </nav>
        </article>

        <aside className="post-side">
          <div className="guide-toc post-toc" aria-label={t('On this page')}>
            <div className="side-heading">{t('ON THIS PAGE')}</div>
            {post.sections.map((s) => (
              <button key={s.id} type="button" className={active === s.id ? 'is-active' : ''} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}>
                {t(s.heading)}
              </button>
            ))}
          </div>
          <ShareButtons post={post} />
        </aside>
      </div>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head split">
            <Headline text="More stories worth your time" />
            <a className="text-link" href={paths.blog}>{t('All articles')} <span className="arrow" aria-hidden="true">→</span></a>
          </div>
          <div className="post-grid is-grid">
            {related.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </main>
  )
}
