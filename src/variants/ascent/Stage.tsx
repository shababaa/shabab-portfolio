import type { SceneId } from '../../data/profile'
import { profile } from '../../data/profile'

export type StageView = {
  id: string
  scene: SceneId
  kicker: string
  title: string
  body: string
  metrics?: string[]
  href?: string
  where?: string
  pinned?: boolean
}

export function idleView(): StageView {
  return {
    id: 'idle',
    scene: 'idle',
    kicker: 'Based in',
    title: profile.location,
    body: `School in ${profile.schoolLocation}. Currently at Princess Margaret Cancer Centre.`,
    where: profile.location,
  }
}

function SceneIdle() {
  return (
    <svg className="scene-svg" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path className="scene-line" d="M28 168 C78 138, 98 92, 148 112 S228 48, 292 78" />
      <path className="scene-line scene-line--soft" d="M28 186 C88 158, 128 152, 176 164 S248 128, 292 154" />
      <circle className="scene-dot" cx="160" cy="110" r="7" />
      <circle className="scene-ring" cx="160" cy="110" r="18" />
      <circle className="scene-ring scene-ring--late" cx="160" cy="110" r="32" />
    </svg>
  )
}

function SceneUhn() {
  const size = 32
  const gap = 12
  const cols = 6
  const rows = 3
  const width = cols * size + (cols - 1) * gap
  const height = rows * size + (rows - 1) * gap
  const ox = (320 - width) / 2
  const oy = (220 - height) / 2
  return (
    <svg className="scene-svg" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {Array.from({ length: cols * rows }, (_, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        return (
          <rect
            key={i}
            className="scene-tile"
            x={ox + col * (size + gap)}
            y={oy + row * (size + gap)}
            width={size}
            height={size}
            rx="8"
          />
        )
      })}
    </svg>
  )
}

function SceneZomp() {
  const cardW = 210
  const cardH = 78
  const ox = (320 - cardW) / 2 - 27
  const oy = 38
  return (
    <svg className="scene-svg" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${ox + i * 18} ${oy + i * 20})`}>
          <rect className="scene-card" x="0" y="0" width={cardW} height={cardH} rx="12" />
          <rect className="scene-bar" x="18" y="20" width="128" height="8" rx="4" />
          <rect className="scene-bar scene-bar--dim" x="18" y="38" width="86" height="8" rx="4" />
          <rect className="scene-bar scene-bar--dim" x="18" y="56" width="154" height="8" rx="4" />
        </g>
      ))}
    </svg>
  )
}

function SceneNinjas() {
  const cardW = 248
  const cardH = 132
  const ox = (320 - cardW) / 2
  const oy = (220 - cardH) / 2
  const dots = 6
  const dotGap = 32
  const dotsWidth = (dots - 1) * dotGap
  const dotStart = ox + (cardW - dotsWidth) / 2
  return (
    <svg className="scene-svg" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect className="scene-card" x={ox} y={oy} width={cardW} height={cardH} rx="16" />
      {Array.from({ length: dots }, (_, i) => (
        <circle key={i} className="scene-dot" cx={dotStart + i * dotGap} cy={oy + 46} r="7" />
      ))}
      <rect className="scene-bar" x={ox + 28} y={oy + 80} width={cardW - 56} height="10" rx="5" />
      <rect className="scene-bar scene-bar--dim" x={ox + 28} y={oy + 100} width={cardW - 120} height="10" rx="5" />
    </svg>
  )
}

function SceneMarket() {
  const candles = [48, 72, 40, 96, 64, 110, 58, 88, 70]
  const barW = 12
  const gap = 18
  const width = candles.length * barW + (candles.length - 1) * gap
  const ox = (320 - width) / 2
  const base = 168
  return (
    <svg className="scene-svg" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {candles.map((h, i) => {
        const x = ox + i * (barW + gap)
        const y = base - h
        return (
          <g key={i}>
            <line className="scene-wick" x1={x + barW / 2} x2={x + barW / 2} y1={y - 10} y2={y + h + 8} />
            <rect className="scene-candle" x={x} y={y} width={barW} height={h} rx="2" />
          </g>
        )
      })}
    </svg>
  )
}

function SceneSkylink() {
  return (
    <svg className="scene-svg" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path className="scene-line" d="M36 160 C88 52, 140 188, 200 82 S268 52, 284 98" />
      <path className="scene-line scene-line--soft" d="M36 128 C92 176, 148 48, 220 118 S276 150, 284 92" />
      {[
        [86, 108],
        [140, 146],
        [186, 90],
        [228, 120],
        [262, 78],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle className="scene-ring" cx={cx} cy={cy} r="11" />
          <circle className="scene-dot" cx={cx} cy={cy} r="4" />
        </g>
      ))}
    </svg>
  )
}

function SceneDocuEdit() {
  const cardW = 200
  const cardH = 150
  const ox = (320 - cardW) / 2
  const oy = (220 - cardH) / 2
  const rows = [120, 150, 96, 138, 110]
  return (
    <svg className="scene-svg" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect className="scene-card" x={ox} y={oy} width={cardW} height={cardH} rx="14" />
      {rows.map((w, i) => (
        <rect
          key={i}
          className={i % 2 ? 'scene-bar scene-bar--dim' : 'scene-bar'}
          x={ox + 20}
          y={oy + 26 + i * 22}
          width={w}
          height="8"
          rx="4"
        />
      ))}
      <line className="scene-line" x1={ox + 150} x2={ox + 150} y1={oy + 20} y2={oy + 42} />
      <circle className="scene-dot" cx={ox + 150} cy={oy + 17} r="3.5" />
      <line className="scene-line scene-line--soft" x1={ox + 122} x2={ox + 122} y1={oy + 86} y2={oy + 108} />
      <circle className="scene-dot" cx={ox + 122} cy={oy + 83} r="3.5" />
    </svg>
  )
}

function Scene({ id }: { id: SceneId }) {
  if (id === 'uhn') return <SceneUhn />
  if (id === 'zomp') return <SceneZomp />
  if (id === 'ninjas') return <SceneNinjas />
  if (id === 'market') return <SceneMarket />
  if (id === 'skylink') return <SceneSkylink />
  if (id === 'docuedit') return <SceneDocuEdit />
  return <SceneIdle />
}

export function Stage({
  view,
  onClose,
  onPeekKeep,
  onPeekLeave,
}: {
  view: StageView
  onClose?: () => void
  onPeekKeep?: () => void
  onPeekLeave?: () => void
}) {
  const isProject = Boolean(view.href)
  return (
    <aside
      className={`ascent__stage${view.id === 'idle' ? '' : ' is-live'}`}
      aria-live="polite"
      onMouseEnter={onPeekKeep}
      onMouseLeave={onPeekLeave}
    >
      <div className="stage__top">
        <p className="stage__place">
          <span className="stage__pin" aria-hidden="true" />
          {profile.location}
        </p>
      </div>

      <div className="stage__visual" key={view.id}>
        <Scene id={view.scene} />
      </div>

      <div className="stage__copy" key={`${view.id}-copy`}>
        <p className="inst">{view.kicker}</p>
        <h2>{view.title}</h2>
        {view.where && view.id !== 'idle' && <p className="stage__where">{view.where}</p>}
        <p>{view.body}</p>
        {view.metrics && view.metrics.length > 0 && (
          <ul className="stage__metrics">
            {view.metrics.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}
        {isProject && view.href && (
          <a className="stage__open" href={view.href} target="_blank" rel="noreferrer">
            Open project
          </a>
        )}
        {view.pinned && onClose && (
          <button type="button" className="stage__clear" onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </aside>
  )
}
