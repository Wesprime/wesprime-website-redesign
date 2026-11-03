import type { CSSProperties } from 'react'
import { clients } from '../data/clients'
import { mediaUrl } from '../data/saudi'
import { useT } from '../i18n'
import { Headline } from './Headline'

// The logos repeat enough to fill wide screens, then that set is doubled so the
// track loops seamlessly by sliding exactly half its width. Only the first
// copy of each client is exposed to screen readers.
const REPEAT = 3

export function ClientLogosSection() {
  const t = useT()
  const set = Array.from({ length: REPEAT }, () => clients).flat()

  return (
    <section className="section dark clients">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow">{t('OUR CLIENTS')}</div>
          <Headline text="Trusted by businesses that refuse to stand still" />
          <p className="clients-lead">{t('Companies across Saudi Arabia running sharper, connected operations with Wesprime.')}</p>
        </div>
      </div>
      <div className="cl-row">
        <ul className="cl-track">
          {[...set, ...set].map((c, i) => {
            const dup = i >= clients.length
            return (
              <li key={i} className={`cl-tile${dup ? ' cl-dup' : ''}`} aria-hidden={dup || undefined}>
                <span className="cl-logo">
                  <img src={mediaUrl(c.logo)} alt="" loading="lazy" className={c.dark ? 'is-dark' : undefined} style={{ '--s': c.scale ?? 1, '--y': c.shift ?? '0%', clipPath: c.trim && `inset(${c.trim})` } as CSSProperties} />
                </span>
                <span className="cl-name">{c.name}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
