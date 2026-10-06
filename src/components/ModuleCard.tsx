import { appIcons } from '../data/appIcons'
import { odooModules } from '../data/content'
import { paths } from '../router'
import { Icon } from './Icon'

type Module = (typeof odooModules)[number]

// Icon per module in the orbit diagram, reusing the app icon set.
const moduleIcons: Record<string, string> = {
  Finance: appIcons.Accounting,
  Sales: appIcons.Sales,
  CRM: appIcons.CRM,
  Inventory: appIcons.Inventory,
  HR: appIcons.Employees,
  Manufacturing: appIcons.Manufacturing,
  Projects: appIcons.Project,
  Website: appIcons.Website,
  Marketing: appIcons['Email Marketing'],
}

// App names in odooModules that differ from the keys in appIcons.
const appAliases: Record<string, string> = {
  'E-commerce': 'eCommerce',
  HR: 'Employees',
  'Project Management': 'Project',
  Marketing: 'Email Marketing',
}

// Which other modules each one exchanges data with.
const connections: Record<string, string[]> = {
  Finance: ['Sales', 'Inventory', 'HR', 'Projects'],
  Sales: ['CRM', 'Inventory', 'Finance', 'Website'],
  CRM: ['Sales', 'Marketing', 'Website'],
  Inventory: ['Sales', 'Manufacturing', 'Finance'],
  HR: ['Finance', 'Projects'],
  Manufacturing: ['Inventory', 'Finance', 'Sales'],
  Projects: ['Finance', 'HR', 'Sales'],
  Website: ['Sales', 'Inventory', 'CRM'],
  Marketing: ['CRM', 'Website', 'Sales'],
}

const scope = ['Requirement analysis', 'Configuration', 'Customization', 'Data migration', 'Training', 'Ongoing support']

type Props = { index: number; onSelect: (i: number) => void }

export function ModuleCard({ index, onSelect }: Props) {
  const sel: Module = odooModules[index]
  const total = odooModules.length
  const go = (step: number) => onSelect((index + step + total) % total)
  const indexOf = (name: string) => odooModules.findIndex((m) => m.name === name)

  return (
    <div className="mc" key={sel.name}>
      <div className="mc-head">
        <span className="mc-icon"><Icon markup={moduleIcons[sel.name] ?? appIcons.Inventory} size={30} strokeWidth={1.6} /></span>
        <div>
          <span className="mc-label">Module focus</span>
          <h3>{sel.name}</h3>
        </div>
        <span className="mc-count">{String(index + 1).padStart(2, '0')}<small> / {String(total).padStart(2, '0')}</small></span>
      </div>

      <div className="mc-body">
        <p className="mc-desc">{sel.desc}</p>

        <div className="mc-block">
          <span className="mc-title">Apps included</span>
          <div className="mc-apps">
            {sel.apps.map((a) => (
              <span key={a} className="mc-app">
                <Icon markup={appIcons[appAliases[a] ?? a] ?? moduleIcons[sel.name]} size={16} strokeWidth={1.9} />
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="mc-block">
          <span className="mc-title">Connects to</span>
          <div className="mc-links">
            {(connections[sel.name] ?? []).map((n) => (
              <button key={n} type="button" className="mc-link" onClick={() => onSelect(indexOf(n))}>
                <span className="mc-dot" aria-hidden="true" />
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="mc-block">
          <span className="mc-title">Wesprime scope</span>
          <ul className="mc-scope">
            {scope.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </div>

      <div className="mc-foot">
        <a className="btn btn-accent" href={paths.contact}>Discuss this module →</a>
        <div className="mc-nav">
          <button type="button" aria-label="Previous module" onClick={() => go(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" aria-label="Next module" onClick={() => go(1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
