import type { PointerEvent } from 'react'
import { reasons } from '../data/content'
import { Icon } from './Icon'

// One line icon per reason, in the same order as `reasons` in content.ts.
const icons = [
  // Tailored solutions — puzzle piece
  '<path d="M10 3.5a2 2 0 014 0V5h4a1 1 0 011 1v4h-1.5a2 2 0 000 4H19v4a1 1 0 01-1 1h-4v-1.5a2 2 0 00-4 0V19H6a1 1 0 01-1-1v-4h1.5a2 2 0 000-4H5V6a1 1 0 011-1h4z"/>',
  // Smooth migration — data moving across
  '<ellipse cx="7" cy="6" rx="4" ry="1.8"/><path d="M3 6v8c0 1 1.8 1.8 4 1.8M11 6v3"/><path d="M14 13h7M18 10l3 3-3 3"/><rect x="13" y="17" width="8" height="4" rx="1"/>',
  // Experienced Odoo experts — award badge
  '<circle cx="12" cy="9" r="5.5"/><path d="M9.6 9.2l1.6 1.6 3.2-3.4"/><path d="M8.5 13.8L7 21l5-2.6L17 21l-1.5-7.2"/>',
  // Scalable & affordable — growth bars
  '<path d="M4 20V14M10 20V10M16 20V6"/><path d="M3 21h18"/><path d="M14 4h5v5"/><path d="M19 4l-6 6"/>',
  // Dedicated support — headset
  '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20a3 3 0 01-3 2h-3"/>',
  // Cloud agility — cloud with check
  '<path d="M7 18h10a4 4 0 00.6-7.95A6 6 0 006.2 9.1 4.5 4.5 0 007 18z"/><path d="M9.5 13.5l2 2 3.5-4"/>',
]

/** Moves the card's spotlight to the pointer position (CSS variables, no re-render). */
function spotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--sx', `${e.clientX - r.left}px`)
  el.style.setProperty('--sy', `${e.clientY - r.top}px`)
}

export function WhyCards() {
  return (
    <div className="why-cards">
      {reasons.map(([title, desc], i) => (
        <article key={title} className="why-card" onPointerMove={spotlight}>
          <span className="why-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <span className="why-icon"><Icon markup={icons[i] ?? icons[0]} size={32} strokeWidth={1.6} /></span>
          <h3>{title}</h3>
          <p>{desc}</p>
        </article>
      ))}
    </div>
  )
}
