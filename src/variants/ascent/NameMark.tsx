import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../lib/hooks'

const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function randGlyph(match: string) {
  const from = /[A-Z]/.test(match) ? LATIN.replace(/[a-z]/g, '') : LATIN.replace(/[A-Z]/g, '')
  return from[Math.floor(Math.random() * from.length)] ?? match
}

function seed(name: string) {
  return [...name].map((ch) => (ch === ' ' ? ' ' : randGlyph(ch))).join('')
}

export function NameMark({ name }: { name: string }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? name : seed(name),
  )

  useEffect(() => {
    if (reduced) {
      setShown(name)
      return
    }

    const chars = [...name]
    let raf = 0
    const start = performance.now()
    const hold = 200
    const step = 70

    const tick = (now: number) => {
      const elapsed = now - start
      setShown(
        chars
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (elapsed >= hold + i * step) return ch
            return randGlyph(ch)
          })
          .join(''),
      )
      if (elapsed < hold + chars.length * step) raf = window.requestAnimationFrame(tick)
      else setShown(name)
    }

    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [name, reduced])

  if (reduced) return <h1>{name}</h1>

  return (
    <h1 aria-label={name}>
      {[...name].map((ch, i) =>
        ch === ' ' ? (
          <span key={i} className="name-fx__sp">
            {'\u00a0'}
          </span>
        ) : (
          <span key={i} className="name-fx__ch">
            <span className="name-fx__ghost" aria-hidden="true">
              {ch}
            </span>
            <span className="name-fx__live" aria-hidden="true">
              {shown[i] ?? ch}
            </span>
          </span>
        ),
      )}
    </h1>
  )
}
