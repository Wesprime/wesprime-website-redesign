import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Icon } from './Icon'
import { useT } from '../i18n'

// Process race: the same business process run by hand and in Odoo, animated side by side.

type Step = { text: string; icon: string }
type Scenario = { id: string; label: string; before: Step[]; after: Step[] }

const i = {
  sheet: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 4v16M15 4v16"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  retype: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
  wait: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  sync: '<path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  bank: '<path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/>',
}

const scenarios: Scenario[] = [
  {
    id: 'order',
    label: 'Order to invoice',
    before: [
      { text: 'Order arrives by email or phone', icon: i.mail },
      { text: 'Typed into a spreadsheet', icon: i.sheet },
      { text: 'Stock checked by calling the warehouse', icon: i.phone },
      { text: 'Invoice re-typed in accounting software', icon: i.retype },
      { text: 'Payment matched by hand at month end', icon: i.wait },
    ],
    after: [
      { text: 'Quotation created once in Odoo', icon: i.doc },
      { text: 'Stock availability shown instantly', icon: i.check },
      { text: 'Delivery order created on confirmation', icon: i.bolt },
      { text: 'Invoice generated from the order', icon: i.doc },
      { text: 'Payment reconciled from the bank feed', icon: i.bank },
    ],
  },
  {
    id: 'close',
    label: 'Month-end close',
    before: [
      { text: 'Exports collected from several systems', icon: i.sheet },
      { text: 'Figures copied between spreadsheets', icon: i.retype },
      { text: 'Bank statements ticked off manually', icon: i.bank },
      { text: 'Differences chased by email', icon: i.mail },
      { text: 'Reports ready days after month end', icon: i.wait },
    ],
    after: [
      { text: 'Every sale and purchase already posted', icon: i.check },
      { text: 'Bank statements imported and matched', icon: i.sync },
      { text: 'VAT and journals in one ledger', icon: i.doc },
      { text: 'Exceptions flagged automatically', icon: i.bolt },
      { text: 'Reports available live, any time', icon: i.chart },
    ],
  },
  {
    id: 'payroll',
    label: 'Payroll',
    before: [
      { text: 'Attendance collected on paper or Excel', icon: i.sheet },
      { text: 'Leave balances tracked separately', icon: i.retype },
      { text: 'Salaries calculated in a spreadsheet', icon: i.sheet },
      { text: 'Bank file prepared by hand', icon: i.bank },
      { text: 'Payslips emailed one by one', icon: i.mail },
    ],
    after: [
      { text: 'Attendance and leave in one employee record', icon: i.user },
      { text: 'Allowances and deductions applied by rules', icon: i.bolt },
      { text: 'Payslips generated for everyone at once', icon: i.doc },
      { text: 'Salary bank file produced from the run', icon: i.bank },
      { text: 'Payroll posted straight to accounting', icon: i.sync },
    ],
  },
]

// Timeline of one race, in ms: Odoo hops quickly from step to step, the manual process waits at each hand-off.
const START = 500
const ODOO_GAP = 550
const MANUAL_GAP = 1700
const HOLD = 3200
const TOTAL = START + MANUAL_GAP * 4 + HOLD
const TICK = 100

/** How many steps the token has reached by this point in the race. */
function reachedAt(elapsed: number, gap: number, count: number) {
  if (elapsed < START) return 0
  return Math.min(count, Math.floor((elapsed - START) / gap) + 1)
}

function Lane({ kind, steps, reached }: { kind: 'before' | 'after'; steps: Step[]; reached: number }) {
  const t = useT()
  const before = kind === 'before'
  const done = reached === steps.length
  const at = Math.max(0, reached - 1)
  let status = before ? t('Waiting on someone…') : t('Running…')
  if (reached === 0) status = t('Starting…')
  if (done) status = before ? t('Done after {n} hand-offs', { n: steps.length }) : t('Done — nothing re-typed')

  return (
    <div
      className={`pr-lane pr-${kind}${done ? ' is-done' : ''}${reached > 0 ? ' is-moving' : ''}`}
      style={{ '--at': at, '--count': steps.length } as CSSProperties}
    >
      <div className="pr-head">
        <span className="cs-pill">{before ? t('Today') : t('With Odoo')}</span>
        <h3>{before ? t('Manual & disconnected') : t('Connected & automatic')}</h3>
        <span className="pr-status">
          {done ? <Icon markup={i.check} size={15} strokeWidth={2} /> : <span className="pr-spin" aria-hidden="true" />}
          {status}
        </span>
        <span className="pr-count">{reached}/{steps.length}</span>
      </div>
      <div className="pr-track">
        <span className="pr-rail" aria-hidden="true"><span className="pr-fill" /></span>
        <span className="pr-token" aria-hidden="true">
          <Icon markup={before ? i.doc : i.bolt} size={16} strokeWidth={2} />
        </span>
        <ol className="pr-steps">
          {steps.map((s, n) => (
            <li
              key={s.text}
              className={`${n < reached ? 'is-done' : ''}${n === reached - 1 && !done ? ' is-current' : ''}`}
              style={{ '--n': n } as CSSProperties}
            >
              <span className="pr-node"><Icon markup={s.icon} size={18} strokeWidth={1.8} /></span>
              <span className="pr-label">{t(s.text)}</span>
              <span className="pr-tag">{before ? t('Manual') : t('Automatic')}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/** The same process run twice, side by side: by hand, and in Odoo. Plays through every scenario on its own. */
export function CompareSlider() {
  const t = useT()
  const [clock, setClock] = useState({ tab: 0, elapsed: 0 })
  const [auto, setAuto] = useState(true)
  const [inView, setInView] = useState(false)
  const [reduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const ref = useRef<HTMLDivElement>(null)
  const sc = scenarios[clock.tab]
  // With reduced motion, show every race already finished.
  const elapsed = reduce ? TOTAL - HOLD : clock.elapsed

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!auto || !inView || reduce) return
    const id = window.setInterval(() => {
      setClock((c) => (c.elapsed + TICK >= TOTAL
        ? { tab: (c.tab + 1) % scenarios.length, elapsed: 0 }
        : { ...c, elapsed: c.elapsed + TICK }))
    }, TICK)
    return () => window.clearInterval(id)
  }, [auto, inView, reduce])

  const manual = reachedAt(elapsed, MANUAL_GAP, sc.before.length)
  const odoo = reachedAt(elapsed, ODOO_GAP, sc.after.length)
  const finished = manual === sc.before.length

  return (
    <div className="cs" ref={ref}>
      <div className="cs-bar">
        <div className="cs-tabs" role="tablist" aria-label={t("Business process")}>
          {scenarios.map((s, n) => (
            <button key={s.id} type="button" role="tab" aria-selected={clock.tab === n} className={clock.tab === n ? 'is-on' : ''} onClick={() => setClock({ tab: n, elapsed: 0 })}>
              {t(s.label)}
              {clock.tab === n && !reduce && <i className="cs-tab-progress" style={{ transform: `scaleX(${elapsed / TOTAL})` }} aria-hidden="true" />}
            </button>
          ))}
        </div>
        {!reduce && (
          <div className="cs-ctrl">
            <button type="button" className="cs-play" onClick={() => setClock((c) => ({ ...c, elapsed: 0 }))}>
              <Icon markup={i.sync} size={14} strokeWidth={2.2} />
              {t("Replay")}
            </button>
            <button type="button" className="cs-play" onClick={() => setAuto((a) => !a)} aria-pressed={!auto}>
              {auto ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
              )}
              {auto ? t("Pause") : t("Play")}
            </button>
          </div>
        )}
      </div>

      <div className="pr" key={sc.id}>
        <Lane kind="before" steps={sc.before} reached={manual} />
        <Lane kind="after" steps={sc.after} reached={odoo} />
        <div className={`pr-result${finished ? ' is-on' : ''}`} aria-live="polite">
          <span className="pr-result-icon"><Icon markup={i.bolt} size={18} strokeWidth={2} /></span>
          <span>
            <b>{t("{n} manual hand-offs removed.", { n: sc.before.length })}</b> {t("Every step runs in one connected system — entered once, never re-typed.")}
          </span>
        </div>
      </div>
    </div>
  )
}
