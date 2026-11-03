import { useState, type ReactNode } from 'react'
import { useT } from '../i18n'
import { Icon } from './Icon'

// Interactive service previews. Everything here is fictional, seeded data that
// changes only in the browser: nothing is sent, saved or connected to a real system.

/** Frame every demo shares, with a visible synthetic-data label. */
export function DemoShell({ title, children, onReset }: { title: string; children: ReactNode; onReset?: () => void }) {
  const t = useT()
  return (
    <div className="demo">
      <div className="demo-bar">
        <b>{t(title)}</b>
        <span className="demo-badge">{t('Illustrative demo · synthetic data')}</span>
        {onReset && <button type="button" className="demo-reset" onClick={onReset}>{t('Reset')}</button>}
      </div>
      {children}
    </div>
  )
}

// ---------- Sales pipeline (laid out like Odoo CRM's kanban view) ----------

type Route = 'hot' | 'warm' | 'dormant'
type ActivityState = 'overdue' | 'today' | 'planned'
type ActivityType = 'call' | 'email' | 'meeting'
type Lead = {
  id: string; title: string; name: string; contact: string; source: string; owner: string; value: number
  stage: number; priority: number; tag: string; activity: ActivityState | null; activityType: ActivityType
  route: Route; history: string[]
}

const stages = ['New', 'Qualified', 'Proposition', 'Won']
const probability = [10, 30, 70, 100]

const seedLeads: Lead[] = [
  { id: 'noor', title: 'ERP rollout for 3 branches', name: 'Al Noor Trading', contact: 'Khalid', source: 'Website', owner: 'Sara', value: 48000, stage: 0, priority: 1, tag: 'ERP', activity: 'planned', activityType: 'email', route: 'warm', history: ['Enquiry received from the website form'] },
  { id: 'pearl', title: 'Service desk upgrade', name: 'Pearl Services', contact: 'Huda', source: 'Referral', owner: 'Omar', value: 22500, stage: 0, priority: 0, tag: 'Services', activity: 'today', activityType: 'call', route: 'warm', history: ['Referral logged by Omar'] },
  { id: 'sands', title: 'CRM with WhatsApp follow-ups', name: 'Blue Sands Co.', contact: 'Faisal', source: 'WhatsApp', owner: 'Sara', value: 120000, stage: 1, priority: 3, tag: 'CRM', activity: 'today', activityType: 'call', route: 'hot', history: ['Asked for a demo on WhatsApp', 'Discovery call held'] },
  { id: 'summit', title: 'Inventory & barcode setup', name: 'Summit Tech', contact: 'Lina', source: 'Campaign', owner: 'Omar', value: 36000, stage: 1, priority: 1, tag: 'Inventory', activity: null, activityType: 'call', route: 'dormant', history: ['Opened the campaign email'] },
  { id: 'palm', title: 'Finance & e-invoicing', name: 'Red Palm LLC', contact: 'Majed', source: 'Website', owner: 'Sara', value: 75000, stage: 2, priority: 2, tag: 'ZATCA', activity: 'overdue', activityType: 'email', route: 'warm', history: ['Proposal sent'] },
  { id: 'capital', title: 'Retail POS rollout', name: 'Capital Stores', contact: 'Noura', source: 'Referral', owner: 'Omar', value: 54000, stage: 3, priority: 2, tag: 'POS', activity: null, activityType: 'meeting', route: 'warm', history: ['Deal won'] },
]

const routes: { id: Route; label: string; note: string }[] = [
  { id: 'hot', label: 'Hot', note: 'Call within 24 hours' },
  { id: 'warm', label: 'Warm', note: 'Follow up weekly' },
  { id: 'dormant', label: 'Dormant', note: 'Monthly check-in' },
]

const templates: Record<Route, string> = {
  hot: 'Hello {name}, thank you for your time today. Shall we confirm the demo for this week?',
  warm: 'Hello {name}, a quick follow-up on your enquiry. Would a short call next week suit you?',
  dormant: 'Hello {name}, we wanted to share a short guide that may help with your plans. Reply anytime to continue.',
}

const tagColors: Record<string, string> = { ERP: '#F4A6A6', Services: '#FCE38A', CRM: '#B8D8F5', Inventory: '#C9B8F5', ZATCA: '#A8E6CF', POS: '#FFD3A5' }
const ownerColors: Record<string, string> = { Sara: '#E07A5F', Omar: '#3D8B8B' }
const activityLabel: Record<ActivityState, string> = { overdue: 'Overdue', today: 'Today', planned: 'Planned' }

const activityIcons: Record<ActivityType, string> = {
  call: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  meeting: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
}

const sar = (n: number) => `SAR ${n.toLocaleString('en-US')}`
const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

function nextAction(l: Lead) {
  if (l.stage === 3) return 'Hand over to delivery and plan the kickoff'
  return ['Qualify the need and budget', 'Confirm the demo date', 'Agree terms and close'][l.stage]
}

function Stars({ value, onPick }: { value: number; onPick?: (n: number) => void }) {
  const t = useT()
  return (
    <span className="od-stars" role={onPick ? 'radiogroup' : undefined} aria-label={t('Priority')}>
      {[1, 2, 3].map((n) => onPick ? (
        <button key={n} type="button" className={n <= value ? 'is-on' : ''} aria-label={t('{n} stars', { n })} onClick={() => onPick(n === value ? 0 : n)}>★</button>
      ) : (
        <i key={n} className={n <= value ? 'is-on' : ''} aria-hidden="true">★</i>
      ))}
    </span>
  )
}

export function PipelineDemo() {
  const t = useT()
  const [leads, setLeads] = useState(seedLeads)
  const [selected, setSelected] = useState('sands')
  const lead = leads.find((l) => l.id === selected)!

  const update = (fn: (l: Lead) => Lead) => setLeads((ls) => ls.map((l) => (l.id === selected ? fn(l) : l)))
  const reset = () => { setLeads(seedLeads); setSelected('sands') }
  const setStage = (stage: number) => update((l) => (l.stage === stage ? l : { ...l, stage, history: [...l.history, `Stage changed to ${stages[stage]}`] }))

  return (
    <DemoShell title="Your pipeline at a glance" onReset={reset}>
      <div className="od">
        <div className="od-nav">
          <span className="od-app"><i aria-hidden="true" />CRM</span>
          {['Sales', 'Leads', 'Reporting', 'Configuration'].map((m) => <span key={m}>{t(m)}</span>)}
        </div>

        <div className="od-control">
          <div className="od-control-left">
            <button type="button" className="od-btn od-btn-primary" onClick={() => setSelected(leads[0].id)}>{t('New')}</button>
            <button type="button" className="od-btn">{t('Generate Leads')}</button>
            <b>{t('Pipeline')}</b>
          </div>
          <div className="od-search">
            <Icon markup='<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>' size={14} strokeWidth={2} />
            <span className="od-facet">{t('My Pipeline')} ×</span>
            <span className="od-search-ph">{t('Search...')}</span>
          </div>
          <div className="od-views" aria-hidden="true">
            {['<rect x="4" y="4" width="6" height="16" rx="1"/><rect x="14" y="4" width="6" height="10" rx="1"/>', '<path d="M4 6h16M4 12h16M4 18h16"/>', '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'].map((m, i) => (
              <span key={i} className={i === 0 ? 'is-on' : ''}><Icon markup={m} size={14} strokeWidth={1.9} /></span>
            ))}
          </div>
        </div>

        <div className="od-body">
          <div className="od-kanban">
            {stages.map((s, i) => {
              const inStage = leads.filter((l) => l.stage === i)
              const total = inStage.reduce((sum, l) => sum + l.value, 0)
              const share = (state: ActivityState | null) => (inStage.length ? (inStage.filter((l) => l.activity === state).length / inStage.length) * 100 : 0)
              return (
                <div key={s} className="od-col">
                  <div className="od-col-head">
                    <b>{t(s)}</b>
                    <span className="od-plus" aria-hidden="true">+</span>
                  </div>
                  <div className="od-col-bar">
                    <span className="od-bar">
                      <i className="is-planned" style={{ width: `${share('planned')}%` }} />
                      <i className="is-today" style={{ width: `${share('today')}%` }} />
                      <i className="is-overdue" style={{ width: `${share('overdue')}%` }} />
                    </span>
                    <b>{total.toLocaleString('en-US')}</b>
                  </div>
                  {inStage.map((l) => (
                    <button
                      key={`${l.id}-${l.stage}`}
                      type="button"
                      className={`od-card${l.id === selected ? ' is-on' : ''}`}
                      aria-pressed={l.id === selected}
                      onClick={() => setSelected(l.id)}
                    >
                      <b className="od-card-title">{t(l.title)}</b>
                      <span className="od-card-amount">{sar(l.value)}</span>
                      <span className="od-card-customer">{l.name}</span>
                      <span className="od-tag" style={{ background: tagColors[l.tag] }}>{t(l.tag)}</span>
                      <span className="od-card-foot">
                        <Stars value={l.priority} />
                        <span className={`od-act${l.activity ? ` is-${l.activity}` : ''}`} title={l.activity ? t(activityLabel[l.activity]) : t('No activity')}>
                          <Icon markup={activityIcons[l.activityType]} size={13} strokeWidth={2} />
                        </span>
                        <span className="od-avatar" style={{ background: ownerColors[l.owner] }} title={l.owner}>{initials(l.owner)}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )
            })}
          </div>

          <div className="od-form" key={lead.id} aria-live="polite">
            <div className="od-form-head">
              <div className="od-form-buttons">
                <button type="button" className="od-btn od-btn-primary" onClick={() => update((l) => ({ ...l, history: [...l.history, 'Quotation drafted'] }))}>{t('New Quotation')}</button>
                {lead.stage < 3 && <button type="button" className="od-btn" onClick={() => setStage(3)}>{t('Mark Won')}</button>}
              </div>
              <ol className="od-status">
                {stages.map((s, i) => (
                  <li key={s}>
                    <button type="button" className={i === lead.stage ? 'is-on' : ''} aria-current={i === lead.stage ? 'step' : undefined} onClick={() => setStage(i)}>{t(s)}</button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="od-sheet">
              <h4>{t(lead.title)}</h4>
              <div className="od-revenue">
                <b>{sar(lead.value)}</b>
                <span>{t('at {p}%', { p: probability[lead.stage] })}</span>
              </div>
              <dl className="od-fields">
                <div><dt>{t('Customer')}</dt><dd>{lead.name}</dd></div>
                <div><dt>{t('Salesperson')}</dt><dd><span className="od-avatar" style={{ background: ownerColors[lead.owner] }}>{initials(lead.owner)}</span>{lead.owner}</dd></div>
                <div><dt>{t('Priority')}</dt><dd><Stars value={lead.priority} onPick={(n) => update((l) => ({ ...l, priority: n }))} /></dd></div>
                <div><dt>{t('Tags')}</dt><dd><span className="od-tag" style={{ background: tagColors[lead.tag] }}>{t(lead.tag)}</span></dd></div>
              </dl>
              <div className="od-route" role="radiogroup" aria-label={t('Nurture route')}>
                <span>{t('Nurture route')}</span>
                {routes.map((r) => (
                  <label key={r.id} className={`is-${r.id}${lead.route === r.id ? ' is-on' : ''}`} title={t(r.note)}>
                    <input type="radio" name="od-route" checked={lead.route === r.id} onChange={() => update((l) => ({ ...l, route: r.id }))} />
                    {t(r.label)}
                  </label>
                ))}
              </div>
            </div>

            <div className="od-chatter">
              <span className="od-chatter-title">{t('Planned activities')}</span>
              {lead.activity && lead.stage < 3 ? (
                <div className={`od-activity is-${lead.activity}`}>
                  <span className="od-act-icon"><Icon markup={activityIcons[lead.activityType]} size={14} strokeWidth={2} /></span>
                  <span className="od-activity-text">
                    <b>{t(activityLabel[lead.activity])}:</b> {t(nextAction(lead))}
                  </span>
                  <button type="button" className="od-link" onClick={() => update((l) => ({ ...l, activity: null, history: [...l.history, 'Activity marked done'] }))}>✓ {t('Mark Done')}</button>
                </div>
              ) : (
                <button
                  type="button"
                  className="od-link od-schedule"
                  disabled={lead.stage === 3}
                  onClick={() => update((l) => ({ ...l, activity: 'planned', history: [...l.history, 'Activity scheduled'] }))}
                >
                  {lead.stage === 3 ? t('No activity needed') : `+ ${t('Schedule activity')}`}
                </button>
              )}

              {lead.stage < 3 && (
                <div className="od-wa">
                  <span className="od-wa-head">{t('WhatsApp template · preview only, nothing is sent')}</span>
                  <p key={lead.route}>{t(templates[lead.route], { name: lead.contact })}<small>✓✓</small></p>
                </div>
              )}

              <ul className="od-log">
                {[...lead.history].reverse().map((h, i) => (
                  <li key={`${lead.history.length - i}`}>
                    <span className="od-avatar" style={{ background: ownerColors[lead.owner] }}>{initials(lead.owner)}</span>
                    <span><b>{lead.owner}</b>{t(h)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  )
}

// ---------- Management dashboard ----------

type Segment = 'trading' | 'services' | 'projects'

const segments: Record<Segment, {
  label: string; weekly: number[]; margin: string; overdue: [string, string]; fourth: [string, string, string]
  insights: string[]; invoices: [string, string, string, string][]
}> = {
  trading: {
    label: 'Trading',
    weekly: [118, 126, 121, 134, 140, 129, 146, 152, 149, 158, 163, 171],
    margin: '31%',
    overdue: ['SAR 96K', 'SAR 240K'],
    fourth: ['Stock turns', '5.4x', '5.2x'],
    insights: ['4 invoices are more than 60 days overdue', 'Slow-moving stock is rising in two categories', 'Two product lines drive most of the growth'],
    invoices: [['INV-0412', 'Gulf Line Supplies', 'SAR 84,000', '72 days'], ['INV-0398', 'Oasis Retail', 'SAR 61,500', '65 days'], ['INV-0451', 'Northgate Foods', 'SAR 52,000', '41 days'], ['INV-0467', 'Delta Hardware', 'SAR 42,500', '33 days']],
  },
  services: {
    label: 'Services',
    weekly: [64, 61, 70, 68, 73, 75, 72, 79, 82, 80, 86, 88],
    margin: '46%',
    overdue: ['SAR 48K', 'SAR 132K'],
    fourth: ['Billable utilization', '81%', '78%'],
    insights: ['Utilization dipped in week 7 during the holiday period', 'Maintenance contracts renew next month', 'One client accounts for a third of receivables'],
    invoices: [['INV-0233', 'Crescent Facilities', 'SAR 44,000', '58 days'], ['INV-0241', 'Harbor Clinics', 'SAR 38,000', '47 days'], ['INV-0256', 'Summit Offices', 'SAR 29,000', '36 days'], ['INV-0262', 'Palm Residences', 'SAR 21,000', '31 days']],
  },
  projects: {
    label: 'Projects',
    weekly: [90, 40, 130, 85, 60, 140, 95, 70, 150, 110, 80, 160],
    margin: '24%',
    overdue: ['SAR 120K', 'SAR 310K'],
    fourth: ['Projects on schedule', '8 of 9', '7 of 9'],
    insights: ['Revenue follows milestone billing, so weeks vary', 'One project is over budget on materials', 'Retention amounts make up most receivables'],
    invoices: [['INV-0118', 'Al Waha Developments', 'SAR 126,000', '80 days'], ['INV-0124', 'Riverside Mall', 'SAR 92,000', '61 days'], ['INV-0131', 'East Park Towers', 'SAR 54,000', '45 days'], ['INV-0137', 'Coastal Schools', 'SAR 38,000', '34 days']],
  },
}

export function DashboardDemo() {
  const t = useT()
  const [seg, setSeg] = useState<Segment>('trading')
  const [days, setDays] = useState<30 | 90>(90)
  const [view, setView] = useState<'revenue' | 'overdue'>('revenue')
  const [bar, setBar] = useState<number | null>(null)
  const d = segments[seg]
  const series = days === 30 ? d.weekly.slice(-4) : d.weekly
  const first = d.weekly.length - series.length + 1
  const max = Math.max(...d.weekly)
  const total = series.reduce((a, b) => a + b, 0)
  const p = days === 30 ? 0 : 1

  const kpis = [
    { id: 'revenue', label: 'Revenue', value: `SAR ${(total / 1000).toFixed(2)}M` },
    { id: 'margin', label: 'Gross margin', value: d.margin },
    { id: 'overdue', label: 'Overdue receivables', value: d.overdue[p] },
    { id: 'fourth', label: d.fourth[0], value: d.fourth[1 + p] },
  ]
  const readout = bar === null
    ? t('Select a bar to see that week')
    : t('Week {n}: SAR {v}K', { n: first + bar, v: series[bar] })

  return (
    <DemoShell title="Management overview">
      <div className="db-filters">
        <div className="db-seg" role="group" aria-label={t('Business type')}>
          {(Object.keys(segments) as Segment[]).map((s) => (
            <button key={s} type="button" aria-pressed={seg === s} onClick={() => { setSeg(s); setBar(null) }}>{t(segments[s].label)}</button>
          ))}
        </div>
        <div className="db-seg" role="group" aria-label={t('Period')}>
          {([30, 90] as const).map((n) => (
            <button key={n} type="button" aria-pressed={days === n} onClick={() => { setDays(n); setBar(null) }}>{t('{n} days', { n })}</button>
          ))}
        </div>
      </div>

      <div className="db-kpis">
        {kpis.map((k) => {
          const clickable = k.id === 'revenue' || k.id === 'overdue'
          const inner = <><span>{t(k.label)}</span><b>{k.value}</b></>
          return clickable ? (
            <button key={k.id} type="button" className={`db-kpi is-link${view === k.id ? ' is-on' : ''}`} aria-pressed={view === k.id} onClick={() => setView(k.id as 'revenue' | 'overdue')}>{inner}</button>
          ) : (
            <div key={k.id} className="db-kpi">{inner}</div>
          )
        })}
      </div>

      <div className="db-body">
        <div className="db-main" aria-live="polite">
          {view === 'revenue' ? (
            <>
              <div className="db-chart-head">
                <b>{t('Weekly revenue')}</b>
                <span>{readout}</span>
              </div>
              <div className="db-chart">
                <span className="db-axis-max">SAR {max}K</span>
                <div className="db-bars" onMouseLeave={() => setBar(null)}>
                  {series.map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      className={bar === i ? 'is-on' : ''}
                      aria-label={t('Week {n}: SAR {v}K', { n: first + i, v })}
                      aria-pressed={bar === i}
                      onMouseEnter={() => setBar(i)}
                      onFocus={() => setBar(i)}
                      onClick={() => setBar(i)}
                    >
                      <i style={{ height: `${(v / max) * 100}%` }} />
                      <small>W{first + i}</small>
                    </button>
                  ))}
                </div>
              </div>
              <p className="db-hint">{t('Tip: select "Overdue receivables" above to see the invoices behind it.')}</p>
            </>
          ) : (
            <>
              <div className="db-chart-head"><b>{t('Overdue invoices')}</b><span>{d.overdue[p]} {t('total')}</span></div>
              <table className="db-table">
                <thead><tr><th>{t('Invoice')}</th><th>{t('Customer')}</th><th>{t('Amount')}</th><th>{t('Overdue')}</th></tr></thead>
                <tbody>
                  {d.invoices.slice(0, days === 30 ? 2 : 4).map((r) => (
                    <tr key={r[0]}>{r.map((c, i) => <td key={i} data-label={[t('Invoice'), t('Customer'), t('Amount'), t('Overdue')][i]}>{t(c)}</td>)}</tr>
                  ))}
                </tbody>
              </table>
              <button type="button" className="text-link db-back" onClick={() => setView('revenue')}>← {t('Back to revenue')}</button>
            </>
          )}
        </div>
        <div className="db-insights">
          <b>{t('Top insights')}</b>
          {d.insights.map((x) => <p key={x}>{t(x)}</p>)}
        </div>
      </div>
      <p className="demo-foot">{t('Illustrative values only. Real dashboards need agreed KPI definitions, data access and permissions.')}</p>
    </DemoShell>
  )
}
