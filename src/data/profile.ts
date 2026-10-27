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
  website: 'https://simonakhter.com',
  websiteLabel: 'simonakhter.com',
  linkedin: 'https://www.linkedin.com/in/simonakhter',
  devpost: 'https://devpost.com/simonakhter',
  resume: '/Simon_Akhter_Resume.pdf',
  availability: 'Open to software engineering internships',
  now: 'Building UHN Research’s intranet at Princess Margaret Cancer Centre.',
}

export const stats = [
  { value: '60%', label: 'MySQL latency cut', detail: 'UHN — plans, indexes, join refactors' },
  { value: '40%', label: 'API response drop', detail: 'UHN — 15+ REST APIs, ACID, migrations' },
  { value: '96%', label: 'Docs deploy cut', detail: 'Zomp — 8 manual steps down to 1' },
  { value: '39×', label: 'Faster vector search', detail: 'VectorForge — 87.2 ms to 2.21 ms, 94.9% of exact top 10' },
  { value: '0.86', label: 'Anomaly ROC-AUC', detail: 'Skylink Ops — unseen later flights' },
  { value: '262', label: 'req/s locally', detail: 'Market intelligence REST, 93 ms p95' },
]

export const skills = {
  Languages: ['Go', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  Frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI'],
  'Developer Tools': [
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'SQLite',
    'Docker',
    'Git',
    'GitHub Actions',
    'Azure',
    'Linux',
  ],
}

export type SceneId = 'idle' | 'uhn' | 'zomp' | 'ninjas' | 'vectorforge' | 'market' | 'skylink' | 'docuedit'

export const experience = [
  {
    id: 'uhn',
    org: 'University Health Network',
    short: 'UHN',
    unit: 'Princess Margaret Cancer Centre',
    title: 'Software Engineer Intern',
    when: 'Sep 2026 – Present',
    where: 'Toronto, ON',
    tags: ['React', 'Next.js', 'Python', 'MySQL', 'dotCMS'],
    year: 2026,
    scene: 'uhn' as const,
    summary:
      'Shipping full-stack features on a research intranet used by 6,000+ staff with 60% lower query latency and 40% faster APIs.',
    bullets: [
      'Reduced MySQL query latency by 60% on UHN Research’s intranet serving 6,000+ researchers and staff by profiling execution plans, eliminating N+1 queries, and adding composite indexes.',
      'Cut API response latency by 40% across 15+ REST endpoints by designing transactional data models with foreign keys, ACID workflows, and automated migrations.',
      'Rolled out React and Next.js intranet pages to 6,000+ researchers and staff by replacing CMS templates while keeping MySQL as the source of truth.',
    ],
  },
  {
    id: 'zomp',
    org: 'Zomp',
    short: 'Zomp',
    unit: 'Documentation platform',
    title: 'Software Engineer Intern',
    when: 'Feb 2026 – May 2026',
    where: 'Toronto, ON',
    tags: ['TypeScript', 'Docker', 'Azure', 'CI/CD'],
    year: 2026,
    scene: 'zomp' as const,
    summary:
      'Built a self-hosted documentation CMS behind 10+ sites with deployments down 96% and 8 manual steps down to 1.',
    bullets: [
      'Cut content deployments by 96% (8 manual steps to 1) across 10+ documentation sites by building a self-hosted CMS with GitHub publishing, role-based access, uploads, and Docker on Azure Container Apps.',
      'Removed manual image builds and production checks from those deploys by building GitHub Actions pipelines with Docker and Azure Container Registry.',
      'Cut failed and partial publishes across 10+ documentation sites by committing updates atomically to GitHub and blocking deploys that failed spell-check or validation.',
    ],
  },
  {
    id: 'codeninjas',
    org: 'Code Ninjas',
    short: 'Code Ninjas',
    unit: 'Operations software',
    title: 'Software Developer Intern',
    when: 'May 2025 – Aug 2025',
    where: 'Richmond Hill, ON',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    year: 2025,
    scene: 'ninjas' as const,
    summary:
      'Built a check-in portal running in 2 locations for 200+ families with 25% more API throughput.',
    bullets: [
      'Launched a check-in portal across 2 locations serving 200+ families by building a React, Node.js, Express, and MongoDB app with live student tracking and reporting.',
      'Increased API throughput by 25% during concurrent check-in by moving CPU-heavy work onto Node.js worker threads so the event loop stayed responsive.',
      'Cut feature delivery from 2 weeks to 5 days across both locations by shipping live notifications, file uploads, and reporting in production.',
    ],
  },
]

export const projects = [
  {
    id: 'vectorforge',
    name: 'VectorForge',
    blurb: 'Semantic search engine and vector database on a from-scratch Go B+tree store.',
    story:
      'Indexes 7,478 code and document chunks and searches by meaning, not keywords. IVF cuts lookup 39× across 523K embeddings while keeping 94.9% Recall@10. Fine-tuning MiniLM lifted ranking 8.4%, and a persistent IVF index on 100,000 vectors reloads 53× faster than retraining.',
    year: 'Oct 2026',
    tags: ['Go', 'Python', 'React', 'TypeScript', 'FastAPI', 'PyTorch'],
    href: 'https://github.com/shababaa/vectorforge',
    metrics: ['7,478 chunks', '39× faster search', '94.9% Recall@10', '53× faster IVF reload'],
    featured: true,
    scene: 'vectorforge' as const,
  },
  {
    id: 'market',
    name: 'Market Intelligence',
    blurb: 'Market-data platform on a database engine written from scratch in Go.',
    story:
      'A Go database engine with copy-on-write B+ trees, transactions, and crash recovery. Inserts on 1,000 keys are 77% faster and use 85% less memory after page-split and key-compression work. Five years of AAPL bars, leak-safe features, and a local load test at 262 req/s (93 ms p95).',
    year: 'Jun 2026',
    tags: ['Go', 'B+ Trees', 'Transactions', 'REST APIs', 'Docker', 'GitHub Actions'],
    href: 'https://github.com/shababaa/market-pred-from-scratch',
    metrics: ['77% faster inserts', '85% less memory', '262 req/s local', '93 ms p95'],
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
    id: 'docuedit',
    name: 'DocuEdit',
    blurb: 'AI documentation platform that turns selected code into a collaborative doc.',
    story:
      'A full-stack platform that turns selected code into editable technical documentation. WebSockets keep edits in sync across users in real time, MySQL stores the documents and their CRDT state, and a VS Code extension pushes selected files straight into the generation pipeline — code selection, generation, storage, and web editing in one workflow.',
    year: 'Jan 2026 – Jun 2026',
    tags: ['React', 'JavaScript', 'WebSockets', 'Node.js', 'Express', 'MySQL', 'OpenAI API'],
    href: 'https://github.com/shababaa/DocumentEditor',
    metrics: ['Real-time co-editing', 'VS Code extension', 'CRDT sync', 'OpenAI pipeline'],
    featured: true,
    scene: 'docuedit' as const,
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
