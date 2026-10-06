import { useEffect, type ReactElement } from 'react'
import { ChatWidget } from './components/ChatWidget'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useReveal } from './components/useReveal'
import { getGuide } from './data/guides'
import { industries } from './data/saudi'
import { getService } from './data/services'
import {
  AboutPage, CasesPage, ContactPage, FaqPage, Home, IndustriesPage, IndustryPage, ServicesPage, SolutionsPage,
} from './pages/Pages'
import { GuidePage, ResourcesPage } from './pages/Resources'
import { ServicePage } from './pages/ServicePage'
import { paths, useRoute, type Route } from './router'

const SITE = 'Wesprime'

type Resolved = { page: ReactElement; title: string; nav?: string }

// Map the route to a page, falling back to the list page when a slug is unknown.
function resolve({ page, slug }: Route): Resolved {
  switch (page) {
    case 'about':
      return { page: <AboutPage />, title: 'About', nav: paths.about }
    case 'services':
      return { page: <ServicesPage />, title: 'Services', nav: paths.services }
    case 'service': {
      const service = getService(slug)
      if (!service) return resolve({ page: 'services', slug: '' })
      return { page: <ServicePage service={service} />, title: service.title, nav: paths.services }
    }
    case 'solutions':
      return { page: <SolutionsPage />, title: 'Odoo Solutions', nav: paths.solutions }
    case 'industries':
      return { page: <IndustriesPage />, title: 'Industries', nav: paths.industries }
    case 'industry': {
      const industry = industries.find((i) => i.id === slug)
      if (!industry) return resolve({ page: 'industries', slug: '' })
      return { page: <IndustryPage industry={industry} />, title: `Odoo for ${industry.title}`, nav: paths.industries }
    }
    case 'cases':
      return { page: <CasesPage />, title: 'Case Studies', nav: paths.cases }
    case 'faq':
      return { page: <FaqPage />, title: 'FAQ', nav: paths.faq }
    case 'contact':
      return { page: <ContactPage />, title: 'Contact', nav: paths.contact }
    case 'resources':
      return { page: <ResourcesPage />, title: 'Resources', nav: paths.resources }
    case 'guide': {
      const guide = getGuide(slug)
      if (!guide) return resolve({ page: 'resources', slug: '' })
      return { page: <GuidePage key={guide.slug} guide={guide} />, title: guide.title, nav: paths.resources }
    }
    default:
      return { page: <Home />, title: '' }
  }
}

function App() {
  const route = useRoute()
  const { page, title, nav } = resolve(route)
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} | Odoo ERP Consulting & Digital Transformation in Saudi Arabia`

  useEffect(() => {
    document.title = fullTitle
  }, [fullTitle])

  useReveal(`${route.page}/${route.slug}`)

  return (
    <>
      <Header activeHref={nav} />
      {page}
      <Footer />
      <ChatWidget />
    </>
  )
}

export default App
