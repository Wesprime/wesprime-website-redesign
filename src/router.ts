import { useEffect, useState } from 'react'

// Tiny hash router: every page lives at "#/<page>[/<slug>]". Hash routing keeps
// the site deployable on any static host without server rewrites.

export type Page =
  | 'home' | 'about' | 'services' | 'service' | 'solutions' | 'industries' | 'industry'
  | 'cases' | 'faq' | 'contact' | 'resources' | 'guide'

export type Route = { page: Page; slug: string }

export const paths = {
  home: '#/',
  about: '#/about',
  services: '#/services',
  solutions: '#/solutions',
  industries: '#/industries',
  cases: '#/case-studies',
  faq: '#/faq',
  contact: '#/contact',
  resources: '#/resources',
}

export const serviceHref = (slug: string) => `#/services/${slug}`
export const industryHref = (id: string) => `#/industries/${id}`
export const guideHref = (slug: string) => `#/resources/${slug}`
export const resourcesHref = paths.resources

// First path segment -> [list page, detail page]
const segments: Record<string, [Page, Page]> = {
  '': ['home', 'home'],
  about: ['about', 'about'],
  services: ['services', 'service'],
  solutions: ['solutions', 'solutions'],
  industries: ['industries', 'industry'],
  'case-studies': ['cases', 'cases'],
  faq: ['faq', 'faq'],
  contact: ['contact', 'contact'],
  resources: ['resources', 'guide'],
}

// Old single-page anchors (e.g. "#contact") still land on the right page.
const legacy: Record<string, string> = {
  top: '', about: 'about', services: 'services', odoo: 'solutions',
  industries: 'industries', cases: 'case-studies', faq: 'faq', contact: 'contact',
}

function parse(hash: string): Route {
  const raw = hash.replace(/^#/, '')
  const [first = '', slug = ''] = raw.startsWith('/') ? raw.slice(1).split('/') : [legacy[raw] ?? '']
  const pages = segments[first]
  if (!pages) return { page: 'home', slug: '' }
  return { page: slug ? pages[1] : pages[0], slug }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash))

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  // Every navigation opens a new page at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route.page, route.slug])

  return route
}
