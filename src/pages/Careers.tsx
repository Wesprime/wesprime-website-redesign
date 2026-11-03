import { useState } from 'react'
import { Headline } from '../components/Headline'
import { Check, Icon } from '../components/Icon'
import { PageHero } from '../components/PageHero'
import { careersEmail, hiringSteps, jobs, jobTeams, perks, type Job } from '../data/careers'
import { useT } from '../i18n'

const applyHref = (subject: string, body: string) =>
  `mailto:${careersEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export function CareersPage() {
  const t = useT()
  const [team, setTeam] = useState<(typeof jobTeams)[number]>('All')
  const [open, setOpen] = useState<string | null>(jobs[0]?.slug ?? null)
  const shown = jobs.filter((j) => team === 'All' || j.team === team)

  return (
    <main>
      <PageHero
        crumbs={[['Careers']]}
        title="Build the systems businesses run on"
        lead="Join a team of Odoo developers and consultants helping Saudi businesses work smarter."
      >
        <div className="careers-actions">
          <button type="button" className="btn btn-accent btn-lg" onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('See open roles')} <span className="arrow" aria-hidden="true">↓</span>
          </button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container stack-xl">
          <div className="section-head center">
            <div className="eyebrow">{t('WHY WESPRIME')}</div>
            <Headline text="Do the best work of your career" />
          </div>
          <div className="perk-grid">
            {perks.map((p) => (
              <div key={p.title} className="card perk-card">
                <span className="perk-icon"><Icon markup={p.icon} size={22} /></span>
                <h3>{t(p.title)}</h3>
                <p className="muted">{t(p.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" id="open-roles">
        <div className="container stack-xl">
          <div className="section-head split">
            <div className="stack-sm">
              <div className="eyebrow">{t('OPEN POSITIONS')}</div>
              <Headline text="Find your seat at the table" />
              <p className="muted">{t(shown.length === 1 ? '{n} open position' : '{n} open positions', { n: shown.length })}</p>
            </div>
            <div className="blog-chips" role="group" aria-label={t('Filter by team')}>
              {jobTeams.map((c) => (
                <button key={c} type="button" className={team === c ? 'is-on' : ''} aria-pressed={team === c} onClick={() => setTeam(c)}>
                  {t(c)}
                </button>
              ))}
            </div>
          </div>
          <div className="job-list">
            {shown.map((job) => (
              <JobCard key={job.slug} job={job} open={open === job.slug} onToggle={() => setOpen(open === job.slug ? null : job.slug)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack-xl">
          <div className="section-head center">
            <div className="eyebrow">{t('HOW WE HIRE')}</div>
            <Headline text="Four steps, no guesswork" />
          </div>
          <ol className="hire-steps">
            {hiringSteps.map(([title, text], i) => (
              <li key={title}>
                <span className="hire-num">{String(i + 1).padStart(2, '0')}</span>
                <b>{t(title)}</b>
                <p className="muted">{t(text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section dark">
        <div className="container careers-cta">
          <div className="stack-sm">
            <Headline text="Don't see your role? Say hello anyway." />
            <p className="careers-cta-lead">{t('We are always glad to meet talented people. Send your CV and tell us how you would like to contribute.')}</p>
          </div>
          <a className="btn btn-accent btn-lg" href={applyHref(t('General application'), t('Hello Wesprime team,\n\nPlease find my CV attached.\n\n'))}>{t('Send your CV')}</a>
        </div>
      </section>
    </main>
  )
}

function JobCard({ job, open, onToggle }: { job: Job; open: boolean; onToggle: () => void }) {
  const t = useT()
  const panel = `job-${job.slug}`
  const apply = applyHref(
    t('Application: {role}', { role: t(job.title) }),
    t('Hello Wesprime team,\n\nI would like to apply for the {role} position. Please find my CV attached.\n\n', { role: t(job.title) }),
  )

  return (
    <article className={`job-card${open ? ' is-open' : ''}`}>
      <h3 className="job-h">
        <button type="button" className="job-head" aria-expanded={open} aria-controls={panel} onClick={onToggle}>
          <span className="job-title">
            <span className="chip-soft">{t(job.team)}</span>
            <span className="job-name">{t(job.title)}</span>
            <span className="muted">{t(job.summary)}</span>
          </span>
          <span className="job-meta">
            <span>{t(job.location)}</span>
            <span>{t(job.type)}</span>
            <span>{t(job.experience)}</span>
          </span>
          <span className="job-toggle" aria-hidden="true">+</span>
        </button>
      </h3>
      <div id={panel} className="job-body" hidden={!open}>
        <div className="job-cols">
          <div>
            <h4>{t("What you'll do")}</h4>
            <ul>{job.responsibilities.map((r) => <li key={r}><Check />{t(r)}</li>)}</ul>
          </div>
          <div>
            <h4>{t("What you'll bring")}</h4>
            <ul>{job.requirements.map((r) => <li key={r}><Check />{t(r)}</li>)}</ul>
          </div>
        </div>
        <div className="job-apply">
          <a className="btn btn-dark" href={apply}>{t('Apply for this role')} <span className="arrow" aria-hidden="true">→</span></a>
          <span className="muted small">{t('Or email your CV to')} <a href={`mailto:${careersEmail}`}>{careersEmail}</a></span>
        </div>
      </div>
    </article>
  )
}
