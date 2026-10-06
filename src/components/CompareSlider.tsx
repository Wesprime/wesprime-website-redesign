import { useState, type CSSProperties } from 'react'
import { Icon } from './Icon'

// Drag-to-compare: the same business process done manually vs. in Odoo.

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

function Side({ kind, steps }: { kind: 'before' | 'after'; steps: Step[] }) {
  const before = kind === 'before'
  return (
    <div className={`cs-side cs-${kind}`}>
      <div className="cs-side-head">
        <span className="cs-pill">{before ? 'Today' : 'With Odoo'}</span>
        <h3>{before ? 'Manual & disconnected' : 'Connected & automatic'}</h3>
      </div>
      <ol className="cs-steps">
        {steps.map((s, n) => (
          <li key={s.text}>
            <span className="cs-icon"><Icon markup={s.icon} size={18} strokeWidth={1.8} /></span>
            <span className="cs-text">{s.text}</span>
            <span className="cs-tag">{before ? 'Manual' : 'Automatic'}</span>
            {n < steps.length - 1 && <span className="cs-join" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function CompareSlider() {
  const [tab, setTab] = useState(0)
  const [pos, setPos] = useState(50)
  const sc = scenarios[tab]

  return (
    <div className="cs">
      <div className="cs-tabs" role="tablist" aria-label="Business process">
        {scenarios.map((s, n) => (
          <button key={s.id} type="button" role="tab" aria-selected={tab === n} className={tab === n ? 'is-on' : ''} onClick={() => { setTab(n); setPos(50) }}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="cs-frame" style={{ '--pos': `${pos}%` } as CSSProperties} key={sc.id}>
        <Side kind="after" steps={sc.after} />
        <div className="cs-clip" aria-hidden={pos < 5}>
          <Side kind="before" steps={sc.before} />
        </div>
        <div className="cs-handle" aria-hidden="true">
          <span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
          </span>
        </div>
        <input
          className="cs-range"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Drag to compare the manual process with Odoo"
        />
      </div>
      <p className="cs-hint">Drag the handle to compare</p>
    </div>
  )
}
