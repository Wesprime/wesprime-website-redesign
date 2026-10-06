import { useEffect } from 'react'

// Fades content in as it scrolls into view. Elements are only hidden once this
// runs, so the page still shows everything without JavaScript or with reduced motion.
const TARGETS = [
  'main .section .container > *',
  'main .pillar',
  'main .card',
  'main .bento-card',
  'main .why-card',
  'main .wo-card',
  'main .dp-card',
  'main .ind-tile',
  'main .step-card',
].join(', ')

export function useReveal(key: string) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Content already on screen stays visible; only what is below the fold animates in.
    let pending = [...document.querySelectorAll<HTMLElement>(TARGETS)].filter(
      (el) => el.getBoundingClientRect().top >= window.innerHeight,
    )
    const all = [...pending]
    pending.forEach((el) => {
      // Stagger siblings in the same row a little.
      const index = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0
      el.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 70}ms`)
      el.classList.add('reveal')
    })

    // Reveal everything whose top has reached the lower part of the viewport —
    // including anything already scrolled past, so fast scrolls and jumps never
    // leave content hidden.
    let frame = 0
    const check = () => {
      frame = 0
      const line = window.innerHeight * 0.92
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top > line) return true
        el.classList.add('is-revealed')
        return false
      })
      if (!pending.length) stop()
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    const stop = () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    check()

    return () => {
      stop()
      cancelAnimationFrame(frame)
      all.forEach((el) => el.classList.remove('reveal', 'is-revealed'))
    }
  }, [key])
}
