import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CommandPalette } from '../../components/CommandPalette'
import { experience, profile, projects, skills } from '../../data/profile'
import { useKeyChord, useTheme } from '../../lib/hooks'
import { idleView, Stage, type StageView } from './Stage'
import { ThemeToggle } from './ThemeToggle'
import './ascent.css'

const CEILING = 12_000
const featured = projects.filter((p) => p.featured)

function band(from: number, to: number, i: number, n: number) {
  if (n <= 1) return from
  return Math.round(from - ((from - to) * i) / (n - 1))
}

const jobAlts = experience.map((_, i) => band(10_800, 7_200, i, experience.length))
const projectAlts = featured.map((_, i) => band(5_400, 2_800, i, featured.length))

const waypoints = [
  { ft: CEILING, title: 'Ceiling', body: `${profile.name} · ${profile.role}` },
  ...experience.map((j, i) => ({
    ft: jobAlts[i],
    title: j.org,
    body: `${j.title} · ${j.when}. ${j.summary}`,
  })),
  ...featured.map((p, i) => ({
    ft: projectAlts[i],
    title: p.name,
    body: p.story,
  })),
  {
    ft: 900,
    title: 'Education',
    body: `${profile.degree}, ${profile.school}.`,
  },
  {
    ft: 400,
    title: 'Skills',
    body: Object.values(skills).flat().join(', '),
  },
]

function altitudeFromScroll() {
  const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  return Math.round((1 - window.scrollY / max) * CEILING)
}

function jobView(job: (typeof experience)[number]): StageView {
  return {
    id: job.id,
    scene: job.scene,
    kicker: job.title,
    title: job.org,
    body: job.summary,
    metrics: job.tags,
    where: job.where,
  }
}

function projectView(p: (typeof featured)[number], pinned = false): StageView {
  return {
    id: p.id,
    scene: p.scene,
    kicker: p.year,
    title: p.name,
    body: p.story,
    metrics: p.metrics,
    href: p.href,
    pinned,
  }
}

export function Ascent() {
  const [alt, setAlt] = useState(CEILING)
  const [log, setLog] = useState<string[]>(['Opened at ceiling'])
  const [palette, setPalette] = useState(false)
  const [peek, setPeek] = useState<StageView | null>(null)
  const [pinned, setPinned] = useState<StageView | null>(null)
  const [expanded, setExpanded] = useState<string[]>([])
  const leaveTimer = useRef(0)
  const pinnedRef = useRef(pinned)
  pinnedRef.current = pinned
  const { theme, toggle: toggleTheme } = useTheme()
  const openPalette = useCallback(() => setPalette(true), [])
  useKeyChord('mod+k', openPalette)

  function show(view: StageView) {
    window.clearTimeout(leaveTimer.current)
    if (!pinnedRef.current) setPeek(view)
  }

  function hide() {
    window.clearTimeout(leaveTimer.current)
    leaveTimer.current = window.setTimeout(() => {
      if (!pinnedRef.current) setPeek(null)
    }, 200)
  }

  const isExpanded = (id: string) => expanded.includes(id)

  function toggleExpand(id: string) {
    setExpanded((cur) => (cur.includes(id) ? cur.filter((row) => row !== id) : [...cur, id]))
  }

  function pin(view: StageView) {
    window.clearTimeout(leaveTimer.current)
    setPeek(null)
    setPinned((cur) => (cur?.id === view.id ? null : { ...view, pinned: true }))
  }

  useEffect(() => {
    const onScroll = () => setAlt(altitudeFromScroll())
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPinned(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const nearby = useMemo(
    () => waypoints.reduce((best, w) => (Math.abs(w.ft - alt) < Math.abs(best.ft - alt) ? w : best)),
    [alt],
  )

  function mark(title: string) {
    setLog((prev) => [`Looked at ${title}`, ...prev.filter((row) => row !== `Looked at ${title}`)].slice(0, 8))
  }

  async function exportLog() {
    const text = [`Visit log — ${profile.name}`, ...log, profile.email, profile.resume].join('\n')
    await navigator.clipboard.writeText(text)
    setLog((prev) => ['Log copied', ...prev].slice(0, 8))
  }

  const climb = Math.round((alt / CEILING) * 100)
  const stage = pinned ?? peek ?? idleView()

  return (
    <div className="ascent">
      <aside className="ascent__panel">
        <div className="ascent__mast">
          <div className="ascent__tape" aria-hidden="true">
            <span style={{ height: `${climb}%` }} />
          </div>
          <a className="panel__resume" href={profile.resume} target="_blank" rel="noreferrer">
            Resume<span aria-hidden="true">↗</span>
          </a>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <p className="inst">Altitude</p>
        <strong>
          {alt.toLocaleString()}
          <span> ft</span>
        </strong>
        <p className="inst">Nearby</p>
        <em>{nearby.title}</em>
        <p className="inst">Visited</p>
        <ol>
          {log.map((l, i) => (
            <li key={`${l}-${i}`}>{l}</li>
          ))}
        </ol>
        <button type="button" onClick={exportLog}>
          Copy visit log
        </button>
      </aside>

      <main>
        <header>
          <p>12,000 ft · {profile.availability.toLowerCase()}</p>
          <h1>{profile.name}</h1> 
          <p>
            Software Engineer Intern @ <a href="https://www.uhn.ca/" target="_blank" rel="noopener noreferrer">
              UHN
            </a>
            <br />
            Prev SWE @{' '}
            <a href="https://www.zomp.com/" target="_blank" rel="noopener noreferrer">
              Zomp
            </a>
            <a href="https://www.codeninjas.com/" target='_blank' rel='noopener noreferrer'>
            , Code Ninjas</a>
          </p>
     
          <p className="lede">
            Studying Management Engineering at the University of Waterloo, working in {profile.location}.
            Scroll down to descend through recent work; hover or click a project and it opens on the right.
          </p>

          <nav className="social" aria-label="Contact">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </nav>
        </header>

        {experience.map((job, i) => {
          const open = isExpanded(job.id)
          return (
            <article
              key={job.id}
              id={job.id}
              className={`ascent__card${open ? ' is-expanded' : ''}${
                (pinned ?? peek)?.id === job.id ? ' is-open' : ''
              }`}
              onMouseEnter={() => {
                mark(job.org)
                show(jobView(job))
              }}
              onMouseLeave={hide}
              onClick={() => {
                toggleExpand(job.id)
                pin(jobView(job))
              }}
            >
              <span className="fl">{jobAlts[i].toLocaleString()} ft</span>
              <div className="card__head">
                <h2>
                  {job.org}
                  <small>
                    {job.title} · {job.when} · {job.where}
                  </small>
                </h2>
                <button
                  type="button"
                  className="card__toggle"
                  aria-expanded={open}
                  aria-controls={`${job.id}-detail`}
                  aria-label={open ? `Collapse ${job.org}` : `Expand ${job.org}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleExpand(job.id)
                  }}
                />
              </div>
              <p className="card__summary">{job.summary}</p>
              <div className="card__more" id={`${job.id}-detail`}>
                <div>
                  <ul>
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <ul className="chips">
                    {job.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          )
        })}

        {featured.map((p, i) => {
          const active = (pinned ?? peek)?.id === p.id
          const open = isExpanded(p.id)
          return (
            <article
              key={p.id}
              id={p.id}
              className={`ascent__card ascent__project${open ? ' is-expanded' : ''}${
                active ? ' is-open' : ''
              }`}
              onMouseEnter={() => {
                mark(p.name)
                show(projectView(p))
              }}
              onMouseLeave={hide}
              onClick={() => {
                toggleExpand(p.id)
                pin(projectView(p, true))
              }}
            >
              <span className="fl">{projectAlts[i].toLocaleString()} ft</span>
              <div className="card__head">
                <h2>
                  {p.name}
                  <small>
                    {p.year} · {p.metrics[0]}
                  </small>
                </h2>
                <button
                  type="button"
                  className="card__toggle"
                  aria-expanded={open}
                  aria-controls={`${p.id}-detail`}
                  aria-label={open ? `Collapse ${p.name}` : `Expand ${p.name}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleExpand(p.id)
                  }}
                />
              </div>
              <p className="card__summary">{p.blurb}</p>
              <div className="card__more" id={`${p.id}-detail`}>
                <div>
                  <p>{p.story}</p>
                  <ul className="chips">
                    {p.metrics.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  <a
                    className="card__link"
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open project ↗
                  </a>
                </div>
              </div>
            </article>
          )
        })}

        <section className="ascent__block" id="education">
          <span className="fl">900 ft</span>
          <h2>Education</h2>
          <div className="edu">
            <p className="edu__school">{profile.school}</p>
            <p className="edu__degree">{profile.degree}</p>
            <p className="edu__meta">
              <span>{profile.schoolLocation}</span>
              <span>{profile.grad}</span>
            </p>
            <p className="edu__label">Coursework</p>
            <ul className="chips">
              {profile.coursework.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ascent__block" id="skills">
          <span className="fl">400 ft</span>
          <h2>Skills</h2>
          <div className="skill-groups">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="skill-group">
                <p className="edu__label">{group}</p>
                <ul className="chips">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="ascent__cap">
          <p className="edu__label">{profile.availability}</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </section>
      </main>

      <Stage
        view={stage}
        onClose={() => setPinned(null)}
        onPeekKeep={() => window.clearTimeout(leaveTimer.current)}
        onPeekLeave={hide}
      />
      <CommandPalette open={palette} onClose={() => setPalette(false)} accent="glass" />
    </div>
  )
}
