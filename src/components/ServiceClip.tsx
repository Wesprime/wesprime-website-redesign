import { useEffect, useRef, useState } from 'react'
import { mediaUrl } from '../data/saudi'
import { useT } from '../i18n'

// A real video file for a service page, in the same frame as the animated ServiceVideo.
// Always muted and looping; plays only while on screen, and never on its own for
// visitors who prefer reduced motion.

export function ServiceClip({ file, title }: { file: string; title: string }) {
  const t = useT()
  const ref = useRef<HTMLVideoElement>(null)
  const [reduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [wanted, setWanted] = useState(!reduce)
  const [playing, setPlaying] = useState(false)

  // Play while visible (and wanted), pause when scrolled away.
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && wanted) v.play().catch(() => setPlaying(false))
      else v.pause()
    }, { threshold: 0.3 })
    io.observe(v)
    return () => io.disconnect()
  }, [wanted])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      setWanted(true)
      v.play().catch(() => setPlaying(false))
    } else {
      setWanted(false)
      v.pause()
    }
  }

  return (
    <figure className="sv-video sv-clip">
      <div className="sv-screen">
        <video
          ref={ref}
          src={mediaUrl(file)}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={t('Video: {title}', { title: t(title) })}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <button type="button" className="sv-bigplay" onClick={toggle} aria-label={t('Play')}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
          </button>
        )}
      </div>
      <div className="sv-controls">
        <button type="button" className="sv-ctl" onClick={toggle} aria-label={playing ? t('Pause') : t('Play')}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
          )}
        </button>
        <span className="sv-clip-title">{t(title)}</span>
        <span className="sv-time sv-clip-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" /></svg>
          {t('Muted')}
        </span>
      </div>
    </figure>
  )
}
