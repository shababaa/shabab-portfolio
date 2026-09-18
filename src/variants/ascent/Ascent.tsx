import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { CommandPalette } from '../../components/CommandPalette'
import { experience, profile, projects, skills } from '../../data/profile'
import { useKeyChord, useTheme } from '../../lib/hooks'
import { idleView, Stage, type StageView } from './Stage'
import { NameMark } from './NameMark'
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

const route = [
  { id: 'ceiling', ft: CEILING, label: 'Ceiling' },
  ...experience.map((j, i) => ({ id: j.id, ft: jobAlts[i], label: j.short })),
  ...featured.map((p, i) => ({ id: p.id, ft: projectAlts[i], label: p.name })),
  { id: 'education', ft: 900, label: 'Education' },
  { id: 'skills', ft: 400, label: 'Skills' },
]

const LAST = route.length - 1
const EXP_START = 1
const PROJ_START = 1 + experience.length

/** Where the reader is along the route: which stop, and how far toward the next one. */
function readPosition() {
  // the "you are here" line sits a little below the top of the viewport, so the
  // ceiling is anchored where that line falls when the page is scrolled to 0
  const offset = window.innerHeight * 0.28
  const marker = window.scrollY + offset
  const tops = route.map((stop, i) =>
    i === 0 ? offset : (document.getElementById(stop.id)?.getBoundingClientRect().top ?? 0) + window.scrollY,
  )

  let i = 0
  while (i < LAST && tops[i + 1] <= marker) i++

  const span = i < LAST ? tops[i + 1] - tops[i] : 0
  const t = span > 0 ? Math.min(Math.max((marker - tops[i]) / span, 0), 1) : 0
  const nextFt = i < LAST ? route[i + 1].ft : route[i].ft

  return {
    index: i,
    alt: Math.round(route[i].ft + (nextFt - route[i].ft) * t),
    progress: (i + t) / LAST,
  }
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
  const [pos, setPos] = useState({ index: 0, alt: CEILING, progress: 0 })
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
    // re-measures when a card expands, since that moves every section below it
    const track = () => setPos(readPosition())
    track()
    window.addEventListener('scroll', track, { passive: true })
    window.addEventListener('resize', track)
    return () => {
      window.removeEventListener('scroll', track)
      window.removeEventListener('resize', track)
    }
  }, [expanded])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPinned(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function flyTo(id: string) {
    if (id === 'ceiling') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const alt = pos.alt
  const climb = Math.round((alt / CEILING) * 100)
  const descent = pos.progress * 100
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
        <p className="inst">Flight path</p>
        <nav className="route" aria-label="Sections">
          <span className="route__rail" aria-hidden="true">
            <span className="route__flown" style={{ height: `${descent}%` }} />
            <span className="route__needle" style={{ top: `${descent}%` }} />
          </span>
          <ul>
            {route.map((stop, i) => {
              const state = i === pos.index ? 'is-current' : i < pos.index ? 'is-passed' : ''
              const layer = i === EXP_START ? 'Experience' : i === PROJ_START ? 'Projects' : null
              const layerOn =
                (layer === 'Experience' && pos.index >= EXP_START && pos.index < PROJ_START) ||
                (layer === 'Projects' && pos.index >= PROJ_START && pos.index < PROJ_START + featured.length)
              return (
                <Fragment key={stop.id}>
                  {layer && (
                    <li className="route__layer">
                      <button
                        type="button"
                        className={layerOn ? 'is-current' : ''}
                        onClick={() => flyTo(layer === 'Experience' ? experience[0].id : featured[0].id)}
                      >
                        {layer}
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      type="button"
                      className={state}
                      onClick={() => flyTo(stop.id)}
                      aria-current={i === pos.index ? 'true' : undefined}
                    >
                      <span className="route__dot" aria-hidden="true" />
                      <span className="route__name">{stop.label}</span>
                      <span className="route__ft">{stop.ft.toLocaleString()}</span>
                    </button>
                  </li>
                </Fragment>
              )
            })}
          </ul>
        </nav>

        <a className="panel__contact" href={`mailto:${profile.email}`}>
          Contact
        </a>
      </aside>

      <main>
        <header>
          <p>12,000 ft · {profile.availability.toLowerCase()}</p>
          <NameMark name={profile.name} /> 
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

          <p className="lede">
            I'm very interested in distributed systems and currently learning quantum mechanics and machine learning.
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
              onMouseEnter={() => show(jobView(job))}
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
              onMouseEnter={() => show(projectView(p))}
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
                <p className="skill-line">{items.join(', ')}</p>
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
