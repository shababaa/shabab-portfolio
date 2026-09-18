export const profile = {
  name: 'Simon Akhter',
  first: 'Simon',
  last: 'Akhter',
  monogram: 'SA',
  role: 'Software engineer',
  headline: 'I build software that can explain itself.',
  summary:
    'Management Engineering student at the University of Waterloo. I like systems that leave an audit trail: research platforms, integration labs, and tools that make operational data honest.',
  location: 'Toronto, ON',
  schoolLocation: 'Waterloo, Canada',
  school: 'University of Waterloo',
  degree: 'Bachelor of Applied Science, Management Engineering',
  grad: 'Expected Apr 2029',
  coursework: [
    'Data Structures and Algorithms',
    'Databases and Software Design',
    'Distributed Systems',
  ],
  email: 's23akhte@uwaterloo.ca',
  phone: '437-376-2527',
  github: 'https://github.com/shababaa',
  githubHandle: 'shababaa',
  linkedin: 'https://www.linkedin.com/in/simonakhter',
  devpost: 'https://devpost.com/simonakhter',
  resume: '/Simon_Akhter_Resume.pdf',
  availability: 'Open to software engineering internships',
  now: 'Building UHN Research’s intranet at Princess Margaret Cancer Centre.',
}

export const stats = [
  { value: '60%', label: 'MySQL latency cut', detail: 'UHN — plans, indexes, join refactors' },
  { value: '40%', label: 'API response drop', detail: 'UHN — 15+ REST APIs, ACID, migrations' },
  { value: '96%', label: 'Docs deploy cut', detail: 'Zomp — 10+ sites, GitHub publishing' },
  { value: '8 → 1', label: 'Manual deploy steps', detail: 'Zomp automation layer' },
  { value: '0.86', label: 'Anomaly ROC-AUC', detail: 'Skylink Ops — unseen later flights' },
  { value: '262', label: 'req/s locally', detail: 'Market intelligence REST, 93 ms p95' },
]

export const skills = {
  Languages: ['Go', 'Python', 'TypeScript', 'JavaScript', 'C++', 'Java', 'C#', 'SQL'],
  Frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'Flask', 'ASP.NET'],
  'Developer Tools': [
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'SQLite',
    'Docker',
    'Git',
    'GitHub Actions',
    'AWS',
    'Azure',
    'Linux',
  ],
}

export type SceneId = 'idle' | 'uhn' | 'zomp' | 'ninjas' | 'market' | 'skylink'

export const experience = [
  {
    id: 'uhn',
    org: 'University Health Network',
    unit: 'Princess Margaret Cancer Centre',
    title: 'Software Engineer Intern',
    when: 'Sep 2026 – Present',
    where: 'Toronto, ON',
    tags: ['React', 'Next.js', 'Python', 'MySQL', 'dotCMS'],
    year: 2026,
    scene: 'uhn' as const,
    summary:
      'Shipping full-stack features on a research intranet used by 6,000+ staff — 60% lower query latency and 40% faster APIs.',
    bullets: [
      'Building and redesigning UHN Research’s intranet platform serving 6,000+ researchers, clinicians, trainees, and staff by developing full-stack features across React, Next.js, Python, MySQL, and dotCMS.',
      'Optimizing MySQL data access by profiling query execution plans, eliminating N+1 queries, designing composite indexes, and refactoring joins, reducing database query latency by 60%.',
      'Designing backend data models and transactional workflows with ACID guarantees, foreign key constraints, and automated migrations; developed 15+ REST APIs reducing API response latency by 40%.',
    ],
  },
  {
    id: 'zomp',
    org: 'Zomp',
    unit: 'Documentation platform',
    title: 'Software Engineer Intern',
    when: 'Feb 2026 – May 2026',
    where: 'Toronto, ON',
    tags: ['TypeScript', 'Docker', 'Azure', 'CI/CD'],
    year: 2026,
    scene: 'zomp' as const,
    summary:
      'Built a self-hosted documentation CMS behind 10+ sites — deployments down 96% and 8 manual steps down to 1.',
    bullets: [
      'Built a self-hosted documentation CMS supporting 10+ documentation sites with automated GitHub-based publishing, Docker deployments, and Azure Container Apps, reducing content deployments by 96%.',
      'Implemented an automation layer handling role-based access control, file uploads, spell-check validation, and atomic GitHub commits across 10+ documentation sites, reducing manual deployment steps from 8 to 1.',
      'Designed CI/CD pipelines using GitHub Actions, Docker, Azure Container Registry, and Azure Container Apps to automate image builds, registry pushes, and production validation with automated deployment validation.',
    ],
  },
  {
    id: 'codeninjas',
    org: 'Code Ninjas',
    unit: 'Operations software',
    title: 'Software Developer Intern',
    when: 'May 2025 – Aug 2025',
    where: 'Richmond Hill, ON',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    year: 2025,
    scene: 'ninjas' as const,
    summary:
      'Built a check-in portal running in 2 locations for 200+ families — 25% more API throughput and 8 features shipped.',
    bullets: [
      'Designed and deployed an interactive check-in portal across 2 Code Ninjas locations, enabling live student tracking and reporting for 200+ families through a React, Node.js, Express.js, and MongoDB application.',
      'Enhanced API throughput by 25% by migrating CPU-intensive tasks to Node.js worker threads, preventing event loop blocking and improving backend responsiveness during concurrent check-in and data processing workflows.',
      'Shipped 8 production features including real-time notifications, uploads, and reporting tools, reducing feature delivery cycles from 2 weeks to 5 days.',
    ],
  },
]

export const projects = [
  {
    id: 'market',
    name: 'Market Intelligence',
    blurb: 'Market-data platform on a database engine written from scratch in Go.',
    story:
      'A Go database engine with copy-on-write B+ trees, atomic transactions, indexing, and crash recovery — then an indexed time-series pipeline across five years of AAPL. REST APIs, durable jobs, and Docker CI that race, fuzz, and crash-recover the store.',
    year: 'Jun 2026',
    tags: ['Go', 'JavaScript', 'REST APIs', 'Machine Learning', 'Docker', 'GitHub Actions'],
    href: 'https://github.com/shababaa/market-pred-from-scratch',
    metrics: ['77% faster inserts', '85% fewer allocations', '262 req/s', '93 ms p95'],
    featured: true,
    scene: 'market' as const,
  },
  {
    id: 'skylink',
    name: 'Skylink Ops',
    blurb: 'Aircraft software-integration lab for a simulated delivery-drone fleet.',
    story:
      'An end-to-end integration workbench for a simulated 6-aircraft delivery fleet: 120 missions, 53k+ IMU/GPS/battery samples, and sim-vs-planner gates that caught a controls regression (campaign pass rate 82% → 35%). Anomaly models on later unseen flights hit 0.86 ROC-AUC.',
    year: 'Sep 2026',
    tags: ['Python', 'SQL', 'Plotly', 'scikit-learn', 'NumPy', 'SciPy', 'Dash'],
    href: 'https://github.com/shababaa/skylink-ops',
    metrics: ['6-aircraft fleet', '53k+ samples', '82% → 35% pass rate', 'ROC-AUC 0.86'],
    featured: true,
    scene: 'skylink' as const,
  },
  {
    id: 'timetrace',
    name: 'TimeTrace',
    blurb: 'Temporal incident reconstruction for distributed systems.',
    story:
      'Immutable operational facts — deploys, flags, dependencies, health — reconstructed at any timestamp, diffed, and ranked as investigation candidates on SirixDB.',
    year: '2026',
    tags: ['Java', 'Vert.x', 'React', 'SirixDB'],
    href: 'https://github.com/shababaa/timetrace',
    metrics: ['Temporal ledger', 'Query planner', 'Incident ranking'],
    featured: false,
    scene: 'idle' as const,
  },
  {
    id: 'macfind',
    name: 'MacFind',
    blurb: 'AI lost-and-found marketplace with Gemini Vision search.',
    story:
      'Campus-only auth, privacy-blurred photos, and vision metadata so students can find a lost item without a wall of unsearchable listings. DeltaHacks build.',
    year: '2026',
    tags: ['React', 'TypeScript', 'Express', 'Supabase', 'Gemini'],
    href: 'https://devpost.com/software/macfind',
    metrics: ['Vision search', 'Magic-link auth', 'Realtime chat'],
    featured: false,
    scene: 'idle' as const,
  },
]

export function searchIndex() {
  const rows: { title: string; hint: string; href?: string; action?: string }[] = [
    { title: 'Email Simon', hint: profile.email, action: 'email' },
    { title: 'Download resume', hint: 'PDF', href: profile.resume },
    { title: 'GitHub', hint: profile.githubHandle, href: profile.github },
    { title: 'Education', hint: `${profile.school} · ${profile.grad}`, href: '#education' },
    { title: 'Skills', hint: skills.Languages.join(', '), href: '#skills' },
    ...experience.map((job) => ({
      title: job.org,
      hint: `${job.title} · ${job.when}`,
      href: `#${job.id}`,
    })),
    ...projects.map((p) => ({
      title: p.name,
      hint: p.blurb,
      href: p.href,
    })),
  ]
  return rows
}
