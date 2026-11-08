import type { CSSProperties } from 'react'
import { jobs } from '../data/careers'
import { useT } from '../i18n'
import { Icon } from './Icon'

// Careers hero: a career path climbs through Join → Learn → Build → Lead.
// A glowing dot travels along it, lighting each milestone as it passes,
// while two open roles float beside it. Decorative only.

const PATH = 'M20 270 C 70 270, 70 200, 120 200 S 170 130, 220 130 S 290 60, 320 40'

const milestones = [
  { at: 0, label: 'Join', icon: '<path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/>' },
  { at: 35, label: 'Learn', icon: '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>' },
  { at: 68, label: 'Build', icon: '<path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/>' },
  { at: 100, label: 'Lead', icon: '<path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z"/>' },
]

// An icon for each team, shown in the role card.
const teamIcon: Record<string, string> = {
  Technical: '<path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/>',
  Functional: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
  Delivery: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  Support: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/>',
}

export function CareersHeroArt() {
  const t = useT()
  const roles = jobs.slice(0, 2)
  return (
    <div className="ch-art" aria-hidden="true" style={{ '--path': `path('${PATH}')` } as CSSProperties}>
      <svg className="ch-svg" viewBox="0 0 340 300">
        <path className="ch-track" d={PATH} />
        <path className="ch-trail" d={PATH} pathLength={100} />
      </svg>
      {milestones.map((m) => (
        <span key={m.label} className="ch-stop" style={{ offsetDistance: `${m.at}%`, '--at': m.at } as CSSProperties}>
          <span className="ch-stop-dot"><Icon markup={m.icon} size={15} strokeWidth={2} /></span>
          <span className="ch-stop-label">{t(m.label)}</span>
        </span>
      ))}
      <span className="ch-traveler" />
      {roles.map((r, i) => (
        <span key={r.title} className={`ch-role ch-role-${i}`}>
          <span className="ch-avatar"><Icon markup={teamIcon[r.team]} size={17} strokeWidth={2} /></span>
          <span className="ch-role-text">
            <b>{t(r.title)}</b>
            <small><i />{t('Hiring')}</small>
          </span>
        </span>
      ))}
    </div>
  )
}
