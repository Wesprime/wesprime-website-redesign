import { useState } from 'react'
import { packageMatrix, packageQuestions, packages } from '../data/outcomes'
import { getService } from '../data/services'
import { contactHref, serviceHref } from '../router'
import { useT } from '../i18n'
import { DashboardDemo, PipelineDemo } from './Demos'
import { Headline } from './Headline'
export { OutcomeSection } from './OutcomeVideo'
import { Check } from './Icon'

const previews = [
  { id: 'pipeline', label: 'Sales pipeline', slug: 'crm', note: 'Click a lead to see its next action, move it along and switch its nurture route.' },
  { id: 'dashboard', label: 'Management dashboard', slug: 'dashboards-reporting', note: 'Switch business type and period, then select a bar or the overdue receivables.' },
] as const

/** Home: one hands-on preview of what working with the system feels like. */
export function DemoPreviewSection({ tint = false }: { tint?: boolean }) {
  const t = useT()
  const [tab, setTab] = useState<(typeof previews)[number]['id']>('pipeline')
  const active = previews.find((p) => p.id === tab)!
  return (
    <section className={`section demo-band${tint ? ' section-tint' : ''}`}>
      <div className="container stack-xl">
        <div className="section-head split">
          <div className="stack-sm">
            <div className="eyebrow">{t('TRY IT')}</div>
            <Headline text="See the finish line before you start" />
          </div>
          <div className="stack-sm head-note">
            <p className="muted">{t(active.note)}</p>
            <a className="text-link" href={serviceHref(active.slug)}>{t(getService(active.slug)!.title)} <span className="arrow" aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="demo-tabs" role="group" aria-label={t('Choose a demo')}>
          {previews.map((p) => (
            <button key={p.id} type="button" aria-pressed={tab === p.id} onClick={() => setTab(p.id)}>{t(p.label)}</button>
          ))}
        </div>
        {tab === 'pipeline' ? <PipelineDemo /> : <DashboardDemo />}
      </div>
    </section>
  )
}

const pkTabs = [
  ['packages', 'Packages'],
  ['fit', 'Find my fit'],
  ['compare', 'Compare'],
] as const

/** The four implementation packages in three tabs: pick one, answer three questions, or compare them all. */
export function PackageGuide({ service }: { service: string }) {
  const t = useT()
  const [tab, setTab] = useState<(typeof pkTabs)[number][0]>('packages')
  const [picked, setPicked] = useState(1)
  const [answers, setAnswers] = useState<(number | null)[]>(packageQuestions.map(() => null))
  const done = answers.every((a) => a !== null)
  // The most demanding answer sets the starting point: a small company with complex integrations still needs a bigger scope.
  const suggested = done ? Math.max(...(answers as number[])) : null
  const pkg = packages[picked]

  return (
    <div className="pk">
      <div className="demo-tabs pk-tabs" role="tablist" aria-label={t('Package guide')}>
        {pkTabs.map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} aria-pressed={tab === id} onClick={() => setTab(id)}>{t(label)}</button>
        ))}
      </div>

      <div className="pk-pane" key={tab} role="tabpanel">
        {tab === 'packages' && (
          <>
            <div className="pk-cards">
              {packages.map((p, i) => (
                <button key={p.id} type="button" className={`pk-card${picked === i ? ' is-on' : ''}`} aria-pressed={picked === i} onClick={() => setPicked(i)}>
                  {p.id === 'pro-plus' && <span className="pk-flag">{t('Most flexible')}</span>}
                  <span className="pk-name">{p.name}</span>
                  <b>{t(p.headline)}</b>
                  <span className="pk-tag">{t(p.tag)}</span>
                </button>
              ))}
            </div>
            <div className="pk-panel" key={pkg.id} aria-live="polite">
              <ul>{pkg.changes.map((c) => <li key={c}><Check />{t(c)}</li>)}</ul>
              <div className="pk-fit">
                <p>{t(pkg.fit)}</p>
                <a className="btn btn-accent" href={contactHref(service, pkg.id)}>{t('Discuss {name}', { name: pkg.name })}</a>
              </div>
            </div>
          </>
        )}

        {tab === 'fit' && (
          <div className="pk-quiz">
            {packageQuestions.map((q, qi) => (
              <fieldset key={q.q}>
                <legend>{qi + 1}. {t(q.q)}</legend>
                <div className="pk-opts">
                  {q.options.map((o, oi) => (
                    <label key={o} className={answers[qi] === oi ? 'is-on' : ''}>
                      <input type="radio" name={`pk-q${qi}`} checked={answers[qi] === oi} onChange={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))} />
                      {t(o)}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            {suggested !== null && (
              <div className="pk-result" role="status">
                <div>
                  <span>{t('Suggested starting conversation')}</span>
                  <b>{packages[suggested].name}</b>
                  <small>{t('A starting point, not a guarantee of fit — we confirm scope after discovery.')}</small>
                </div>
                <button type="button" className="btn btn-dark" onClick={() => { setPicked(suggested); setTab('packages') }}>{t('Show {name}', { name: packages[suggested].name })}</button>
              </div>
            )}
          </div>
        )}

        {tab === 'compare' && (
          <div className="pk-compare">
            <table>
              <thead>
                <tr><th>{t('Dimension')}</th>{packages.map((p) => <th key={p.id}>{p.name}</th>)}</tr>
              </thead>
              <tbody>
                {packageMatrix.map(([dim, ...cells]) => (
                  <tr key={dim}>
                    <th scope="row">{t(dim)}</th>
                    {cells.map((c, i) => <td key={i} data-label={packages[i].name}>{t(c)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <p className="pk-note">{t('Packages are Wesprime implementation scopes, not Odoo licence tiers. Licences, hosting and migration are quoted separately.')}</p>
    </div>
  )
}
