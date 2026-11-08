import { useEffect, useRef } from 'react'

// Particle network for the dark parts of the Solutions page: small glowing dots
// drift slowly and link up with thin lines when they come close. The pointer
// gently pulls nearby links toward it. Purely decorative.

type Dot = { x: number; y: number; vx: number; vy: number; r: number }

const LINK = 130 // px: dots closer than this are joined by a line
const POINTER = 170 // px: dots this close to the pointer link to it

export function ParticleNetwork() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dots: Dot[] = []
    let w = 0
    let h = 0
    let frame = 0
    let visible = false
    const pointer = { x: -9999, y: -9999 }

    // Seeded so every visit lays the dots out the same way.
    let seed = 7
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.round((w * h) / 11000))
      seed = 7
      dots = Array.from({ length: count }, () => ({
        x: rand() * w,
        y: rand() * h,
        vx: (rand() - 0.5) * 0.35,
        vy: (rand() - 0.5) * 0.35,
        r: 1.2 + rand() * 1.6,
      }))
      if (reduce || !visible) draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(111, 163, 255, ${(1 - d / LINK) * 0.35})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const dp = Math.hypot(a.x - pointer.x, a.y - pointer.y)
        if (dp < POINTER) {
          ctx.strokeStyle = `rgba(62, 200, 255, ${(1 - dp / POINTER) * 0.55})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(pointer.x, pointer.y)
          ctx.stroke()
        }
      }
      for (const d of dots) {
        ctx.fillStyle = 'rgba(160, 196, 255, .9)'
        ctx.shadowColor = 'rgba(111, 163, 255, .9)'
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    const step = () => {
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < -10) d.x = w + 10
        if (d.x > w + 10) d.x = -10
        if (d.y < -10) d.y = h + 10
        if (d.y > h + 10) d.y = -10
      }
      draw()
      frame = requestAnimationFrame(step)
    }

    const start = () => {
      if (reduce || frame) return
      frame = requestAnimationFrame(step)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    // Only animate while the canvas is on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const host = canvas.parentElement!
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    resize()
    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
