import { useEffect, useRef, useState, type ReactNode } from 'react'

// Simplified 20×14 flags drawn inline — flag emoji don't render on Windows.
const F = ({ children }: { children: ReactNode }) => (
  <svg className="flag" width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">{children}</svg>
)

const countries: { iso: string; name: string; code: string; flag: ReactNode }[] = [
  { iso: 'SA', name: 'Saudi Arabia', code: '+966', flag: <F><rect width="20" height="14" fill="#006C35" /><path d="M5 6h10M6 5h3M11 5h3" stroke="#fff" strokeWidth="1" /><path d="M5 9.5h9" stroke="#fff" strokeWidth=".9" /></F> },
  { iso: 'AE', name: 'United Arab Emirates', code: '+971', flag: <F><rect width="20" height="14" fill="#fff" /><rect width="20" height="4.67" fill="#00732F" /><rect y="9.33" width="20" height="4.67" fill="#000" /><rect width="5" height="14" fill="#FF0000" /></F> },
  { iso: 'BH', name: 'Bahrain', code: '+973', flag: <F><rect width="20" height="14" fill="#CE1126" /><path d="M0 0h6l2 1.4-2 1.4 2 1.4-2 1.4 2 1.4-2 1.4 2 1.4-2 1.4 2 1.4-2 1.4H0z" fill="#fff" /></F> },
  { iso: 'QA', name: 'Qatar', code: '+974', flag: <F><rect width="20" height="14" fill="#8A1538" /><path d="M0 0h6l2 .8-2 .8 2 .8-2 .8 2 .8-2 .8 2 .8-2 .8 2 .8-2 .8 2 .8-2 .8 2 .8-2 .8 2 .8-2 .8 2 .8-2 .4H0z" fill="#fff" /></F> },
  { iso: 'KW', name: 'Kuwait', code: '+965', flag: <F><rect width="20" height="14" fill="#fff" /><rect width="20" height="4.67" fill="#007A3D" /><rect y="9.33" width="20" height="4.67" fill="#CE1126" /><path d="M0 0l5 4.67v4.66L0 14z" fill="#000" /></F> },
  { iso: 'OM', name: 'Oman', code: '+968', flag: <F><rect width="20" height="14" fill="#C8102E" /><rect x="5" width="15" height="4.67" fill="#fff" /><rect x="5" y="9.33" width="15" height="4.67" fill="#008000" /></F> },
  { iso: 'EG', name: 'Egypt', code: '+20', flag: <F><rect width="20" height="14" fill="#fff" /><rect width="20" height="4.67" fill="#CE1126" /><rect y="9.33" width="20" height="4.67" fill="#000" /><circle cx="10" cy="7" r="1.2" fill="#C09300" /></F> },
  { iso: 'IN', name: 'India', code: '+91', flag: <F><rect width="20" height="14" fill="#fff" /><rect width="20" height="4.67" fill="#FF9933" /><rect y="9.33" width="20" height="4.67" fill="#138808" /><circle cx="10" cy="7" r="1.6" fill="none" stroke="#000080" strokeWidth=".6" /></F> },
  { iso: 'GB', name: 'United Kingdom', code: '+44', flag: <F><rect width="20" height="14" fill="#012169" /><path d="M0 0l20 14M20 0L0 14" stroke="#fff" strokeWidth="2.6" /><path d="M0 0l20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1" /><path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4" /><path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.2" /></F> },
  { iso: 'US', name: 'United States', code: '+1', flag: <F><rect width="20" height="14" fill="#fff" />{[0, 2, 4, 6, 8, 10, 12].map((y) => <rect key={y} y={y} width="20" height="1.08" fill="#B22234" />)}<rect width="9" height="7.5" fill="#3C3B6E" /></F> },
]

type Props = { value: string; onChange: (iso: string, code: string) => void }

/** Flag dropdown for the phone field. */
export function CountryPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const current = countries.find((c) => c.iso === value) ?? countries[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey, true)
    }
  }, [open])

  return (
    <div className="cp" ref={wrap}>
      <button
        type="button"
        className="cp-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code: ${current.name} ${current.code}`}
        onClick={() => setOpen((o) => !o)}
      >
        {current.flag}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <ul className="cp-list" role="listbox" aria-label="Country">
          {countries.map((c) => (
            <li key={c.iso} role="option" aria-selected={c.iso === value}>
              <button type="button" onClick={() => { onChange(c.iso, c.code); setOpen(false) }}>
                {c.flag}
                <span>{c.name}</span>
                <b>{c.code}</b>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
