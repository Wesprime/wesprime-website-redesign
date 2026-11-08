// Top-level pages, composed from the shared sections in ./sections.
import { ClientLogosSection } from '../components/ClientLogos'
import { Check } from '../components/Icon'
import { Headline } from '../components/Headline'
import { Hero } from '../components/Hero'
import { PillarsSection, StandsForSection, TechStackSection } from '../components/HomeExtras'
import { DemoPreviewSection, OutcomeSection } from '../components/OutcomeBlocks'
import { IndustryOrbit } from '../components/IndustryOrbit'
import { AboutHeroArt } from '../components/AboutHeroArt'
import { PageHero } from '../components/PageHero'
import { ParticleNetwork } from '../components/SolutionsBackdrop'
import { ServiceCatalog } from '../components/ServiceCatalog'
import { AppLauncherSection, DeploySection, EcosystemSection, WhyOdooSection } from '../components/SolutionsBlocks'
import { contact, whatsappHref } from '../data/content'
import { industries, mediaUrl, type Industry } from '../data/saudi'
import { industryHref, paths } from '../router'
import { useT } from '../i18n'
import {
  AboutSection, CasesSection, ClientsSection, ContactSection, CtaSection, FaqSection,
  IndustriesSection, JourneySection, OdooSection,
  StartSection, TransformSection, VisionSection, WhySection,
} from './sections'

export function Home() {
  return (
    <main>
      <Hero />
      <OutcomeSection />
      <StandsForSection />
      <PillarsSection />
      <ClientLogosSection />
      <DemoPreviewSection />
      <TechStackSection />
    </main>
  )
}

export function AboutPage() {
  const t = useT()
  return (
    <main className="about-page">
      <PageHero
        crumbs={[['About']]}
        title={t("About Wesprime")}
        lead="An Odoo ERP consulting and digital transformation company helping businesses run on connected, intelligent systems."
        art={<AboutHeroArt />}
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
  const t = useT()
  return (
    <main>
      <PageHero
        crumbs={[['Services']]}
        title={t("Services")}
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
  const t = useT()
  return (
    <main className="sol-page">
      <PageHero
        crumbs={[['Solutions']]}
        title={t("Odoo solutions")}
        lead="One platform for finance, sales, operations, HR and your website — implemented, connected and hosted the way your business needs."
        art={<ParticleNetwork />}
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
  const t = useT()
  return (
    <main className="industries-page">
      <PageHero
        crumbs={[['Industries']]}
        title={t("Odoo ERP for every industry in Saudi Arabia & the Middle East")}
        lead="We apply our experience across sectors to deliver tailored solutions that support growth — including the Saudi requirements that come with each one."
        art={<IndustryOrbit />}
      >
        <div className="btn-row">
          <a className="btn btn-accent btn-lg" href={paths.contact}>{t("Talk to Our Experts")}</a>
          <a className="btn btn-whatsapp btn-lg" href={whatsappHref} target="_blank" rel="noopener noreferrer">{t("WhatsApp us")}</a>
        </div>
      </PageHero>
      <IndustriesSection />
      <TransformSection tint />
      <CtaSection />
    </main>
  )
}

export function IndustryPage({ industry }: { industry: Industry }) {
  const t = useT()
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
            <nav aria-label={t("Industries")} className="side-nav">
              <div className="side-group">
                <div className="side-heading">{t("INDUSTRIES")}</div>
                {industries.map((x) => (
                  <a
                    key={x.id}
                    href={industryHref(x.id)}
                    className={`side-link${x.id === industry.id ? ' is-current' : ''}`}
                    aria-current={x.id === industry.id ? 'page' : undefined}
                  >
                    {t(x.title)}
                    <span className="side-arrow" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </nav>
            <div className="help-card">
              <b>{t("Talk to someone who knows your sector")}</b>
              <span>{t("Tell us how you work today and we'll show you how Odoo would fit.")}</span>
              <a className="btn btn-accent" href={paths.contact}>{t("Talk to an Expert")}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </div>
          </aside>

          <div className="svc-main">
            <div className="stack-sm">
              <div className="eyebrow">{t("COMMON CHALLENGES")}</div>
              <Headline text="What's holding {industry} businesses back" vars={{ industry: t(industry.title).toLowerCase() }} />
              <div className="included-grid">
                {industry.challenges.map((c) => (
                  <div key={c} className="included-card">
                    <span className="check-circle warn" aria-hidden="true">!</span>
                    <span>{t(c)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="deliver-card">
              <div className="eyebrow ksa-eyebrow">{t("IN SAUDI ARABIA")}</div>
              <h3 className="svc-h3">{t("What we build in for the Kingdom")}</h3>
              <ul className="ksa-list">
                {industry.saudi.map((c) => <li key={c}><Check />{t(c)}</li>)}
              </ul>
            </div>

            <div className="stack-sm">
              <h3 className="svc-h3">{t("Odoo apps we typically implement")}</h3>
              <div className="chips">{industry.modules.map((m) => <span key={m} className="chip-soft">{t(m)}</span>)}</div>
            </div>

            <div className="prev-next">
              <a className="pn" href={industryHref(prev.id)}>
                <span>{t("← Previous industry")}</span>
                <b>{t(prev.title)}</b>
              </a>
              <a className="pn pn-next" href={industryHref(next.id)}>
                <span>{t("Next industry")} <span className="arrow" aria-hidden="true">→</span></span>
                <b>{t(next.title)}</b>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export function CasesPage() {
  const t = useT()
  return (
    <main>
      <PageHero crumbs={[['Case Studies']]} title={t("Case studies")} lead="Typical situations we help with, and how we approach them. Named client stories are published only with permission." />
      <CasesSection />
      <ClientsSection tint />
      <CtaSection />
    </main>
  )
}

export function FaqPage() {
  const t = useT()
  return (
    <main>
      <PageHero crumbs={[['FAQ']]} title={t("Frequently asked questions")} lead="About Odoo, Saudi compliance and working with Wesprime." />
      <FaqSection />
      <CtaSection />
    </main>
  )
}

export function ContactPage() {
  const t = useT()
  return (
    <main>
      <PageHero
        crumbs={[['Contact']]}
        title={t("Let's build your digital future")}
        lead="Tell us about your business processes and challenges. Our team will help you identify the right ERP and digital transformation strategy."
      />
      <ContactSection />
    </main>
  )
}
