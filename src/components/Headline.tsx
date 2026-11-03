import { useEffect, useRef, type ReactNode } from 'react'
import { useT } from '../i18n'

/** A highlighted phrase with a hand-drawn underline that draws itself in once on screen. */
export function Scribble({ children, delay = false }: { children: ReactNode; delay?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return void el.classList.add('is-drawn')
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      el.classList.add('is-drawn')
      io.disconnect()
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span ref={ref} className={`scribble${delay ? ' is-late' : ''}`}>
      {children}
      <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 9c30-6 62-7 96-4s68 4 98-2" />
      </svg>
    </span>
  )
}

type HeadlineProps = {
  text: string
  vars?: Record<string, string | number>
  as?: 'h1' | 'h2'
  className?: string
  /** How many closing words to highlight; by default 1 for short titles, 2 for longer ones. */
  words?: number
}

/** A translated title whose closing words are highlighted, the site-wide heading style. */
export function Headline({ text, vars, as: Tag = 'h2', className, words }: HeadlineProps) {
  const t = useT()
  const [, body, end] = t(text, vars).match(/^([\s\S]*?)([.?!؟।]*)$/) ?? []
  const parts = body.split(' ')
  const count = Math.min(words ?? (parts.length > 4 ? 2 : 1), parts.length)
  const lead = parts.slice(0, parts.length - count).join(' ')

  return (
    <Tag className={className}>
      {lead && `${lead} `}
      <Scribble>{parts.slice(-count).join(' ')}</Scribble>
      {end}
    </Tag>
  )
}
