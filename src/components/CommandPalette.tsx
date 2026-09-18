import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile, searchIndex } from '../data/profile'
import './palette.css'

type Props = {
  open: boolean
  onClose: () => void
  accent?: 'hud' | 'ink' | 'orbit' | 'glass'
}

export function CommandPalette({ open, onClose, accent = 'hud' }: Props) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const items = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return searchIndex().filter(
      (row) =>
        !needle ||
        row.title.toLowerCase().includes(needle) ||
        row.hint.toLowerCase().includes(needle),
    )
  }, [q])

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      const t = window.setTimeout(() => inputRef.current?.focus(), 20)
      return () => window.clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((n) => Math.min(n + 1, Math.max(items.length - 1, 0)))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((n) => Math.max(n - 1, 0))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const row = items[active]
        if (row) run(row)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, items, active, onClose])

  function run(row: (typeof items)[number]) {
    if (row.action === 'email') {
      window.location.href = `mailto:${profile.email}`
    } else if (row.href?.startsWith('#') && row.href.length > 1) {
      document.querySelector(row.href)?.scrollIntoView({ behavior: 'smooth' })
    } else if (row.href?.startsWith('/') && !row.href.endsWith('.pdf')) {
      navigate(row.href)
    } else if (row.href) {
      window.open(row.href, '_blank', 'noreferrer')
    }
    onClose()
  }

  if (!open) return null

  return (
    <div className={`palette palette--${accent}`} role="dialog" aria-modal="true" aria-label="Command palette">
      <button className="palette__scrim" onClick={onClose} aria-label="Close palette" />
      <div className="palette__panel">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setActive(0)
          }}
          placeholder="Search work, skills, resume…"
          aria-label="Search"
        />
        <ul>
          {items.slice(0, 9).map((row, i) => (
            <li key={`${row.title}-${i}`}>
              <button className={i === active ? 'is-active' : ''} onClick={() => run(row)}>
                <span>{row.title}</span>
                <em>{row.hint}</em>
              </button>
            </li>
          ))}
          {items.length === 0 && <li className="palette__empty">No matches</li>}
        </ul>
        <p className="palette__hint">↑↓ enter · esc</p>
      </div>
    </div>
  )
}
