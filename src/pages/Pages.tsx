// Top-level pages, composed from the shared sections in ./sections.
import { Check } from '../components/Icon'
import { Hero } from '../components/Hero'
import { PillarsSection, TechStackSection } from '../components/HomeExtras'
import { PageHero } from '../components/PageHero'
import { ServiceCatalog } from '../components/ServiceCatalog'
import { AppLauncherSection, DeploySection, EcosystemSection, WhyOdooSection } from '../components/SolutionsBlocks'
import { contact, whatsappHref } from '../data/content'
import { industries, mediaUrl, type Industry } from '../data/saudi'
import { industryHref, paths } from '../router'
import {
  AboutSection, CasesSection, ClientsSection, ContactSection, CtaSection, FaqSection,
  IndustriesSection, JourneySection, OdooSection, ServicesSection,
  StartSection, TransformSection, VisionSection, WhySection,
} from './sections'

export function Home() {
  return (
    <main>
      <Hero />
      <PillarsSection tint />
      <ServicesSection />
      <TechStackSection />
      <JourneySection title="How we work" />
      <CtaSection />
    </main>
  )
}

export function AboutPage() {
  return (
    <main>
      <PageHero
        crumbs={[['About']]}
        title="About Wesprime"
        lead="An Odoo ERP consulting and digital transformation company helping businesses run on connected, intelligent systems."
      />
      <AboutSection />
      <VisionSection tint />
      <WhySection />
      <TransformSection />
      <CtaSection />
    </main>
  )
}

export function ServicesPage() {
  return (
    <main>
      <PageHero
        crumbs={[['Services']]}
        title="Services"
        lead="Consulting, implementation, development and support — one team from the first process review to long after go-live."
      />
      <section className="section">
        <div className="container">
          <ServiceCatalog />
        </div>
      </section>
      <StartSection tint />
      <JourneySection />
      <CtaSection />
    </main>
  )
}

export function SolutionsPage() {
  return (
    <main>
      <PageHero
        crumbs={[['Solutions']]}
        title="Odoo solutions"
        lead="One platform for finance, sales, operations, HR and your website — implemented, connected and hosted the way your business needs."
      />
      <WhyOdooSection />
      <OdooSection tint />
      <AppLauncherSection />
      <EcosystemSection />
      <DeploySection tint />
      <CtaSection />
    </main>
  )
}

export function IndustriesPage() {
  return (
    <main>
      <PageHero
        crumbs={[['Industries']]}
        title="Odoo ERP for every industry in Saudi Arabia & the Middle East"
        lead="We apply our experience across sectors to deliver tailored solutions that support growth — including the Saudi requirements that come with each one."
      >
        <div className="btn-row">
          <a className="btn btn-accent btn-lg" href={paths.contact}>Talk to Our Experts</a>
          <a className="btn btn-whatsapp btn-lg" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        </div>
      </PageHero>
      <IndustriesSection />
      <TransformSection tint />
      <CtaSection />
    </main>
  )
}

export function IndustryPage({ industry }: { industry: Industry }) {
  const index = industries.indexOf(industry)
  const prev = industries[(index - 1 + industries.length) % industries.length]
  const next = industries[(index + 1) % industries.length]
  return (
    <main>
      <PageHero
        crumbs={[['Industries', paths.industries], [industry.title]]}
        title={industry.title}
        lead={industry.summary}
        image={industry.image ? mediaUrl(industry.image) : undefined}
      />
      <section className="svc-body section-tint">
        <div className="container svc-layout">
          <aside className="svc-aside">
            <nav aria-label="Industries" className="side-nav">
              <div className="side-group">
                <div className="side-heading">INDUSTRIES</div>
                {industries.map((x) => (
                  <a
                    key={x.id}
                    href={industryHref(x.id)}
                    className={`side-link${x.id === industry.id ? ' is-current' : ''}`}
                    aria-current={x.id === industry.id ? 'page' : undefined}
                  >
                    {x.title}
                    <span className="side-arrow" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </nav>
            <div className="help-card">
              <b>Talk to someone who knows your sector</b>
              <span>Tell us how you work today and we'll show you how Odoo would fit.</span>
              <a className="btn btn-accent" href={paths.contact}>Talk to an Expert</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </div>
          </aside>

          <div className="svc-main">
            <div className="stack-sm">
              <div className="eyebrow">COMMON CHALLENGES</div>
              <h2>What slows {industry.title.toLowerCase()} businesses down</h2>
              <div className="included-grid">
                {industry.challenges.map((c) => (
                  <div key={c} className="included-card">
                    <span className="check-circle warn" aria-hidden="true">!</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="deliver-card">
              <div className="eyebrow ksa-eyebrow">IN SAUDI ARABIA</div>
              <h3 className="svc-h3">What we build in for the Kingdom</h3>
              <ul className="ksa-list">
                {industry.saudi.map((c) => <li key={c}><Check />{c}</li>)}
              </ul>
            </div>

            <div className="stack-sm">
              <h3 className="svc-h3">Odoo apps we typically implement</h3>
              <div className="chips">{industry.modules.map((m) => <span key={m} className="chip-soft">{m}</span>)}</div>
            </div>

            <div className="prev-next">
              <a className="pn" href={industryHref(prev.id)}>
                <span>← Previous industry</span>
                <b>{prev.title}</b>
              </a>
              <a className="pn pn-next" href={industryHref(next.id)}>
                <span>Next industry →</span>
                <b>{next.title}</b>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export function CasesPage() {
  return (
    <main>
      <PageHero crumbs={[['Case Studies']]} title="Case studies" lead="How businesses moved from fragmented processes to connected operations with Odoo." />
      <CasesSection />
      <ClientsSection tint />
      <CtaSection />
    </main>
  )
}

export function FaqPage() {
  return (
    <main>
      <PageHero crumbs={[['FAQ']]} title="Frequently asked questions" lead="About Odoo, Saudi compliance and working with Wesprime." />
      <FaqSection />
      <CtaSection />
    </main>
  )
}

export function ContactPage() {
  return (
    <main>
      <PageHero
        crumbs={[['Contact']]}
        title="Let's build your digital future"
        lead="Tell us about your business processes and challenges. Our team will help you identify the right ERP and digital transformation strategy."
      />
      <ContactSection />
    </main>
  )
}
