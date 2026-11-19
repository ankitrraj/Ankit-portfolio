// v2 content — Ankit Rajoria
// Product copy is drawn from each site's own metadata plus the résumé.

export const identity = {
  name: 'Ankit Rajoria',
  role: 'Full Stack Software Engineer',
  email: 'ai.ankitrajoria@gmail.com',
  github: 'https://github.com/ankitrraj',
  linkedin: 'https://linkedin.com/in/ankit-rajoria',
};

export const intro = {
  headline: 'I ship products, not prototypes.',
  lede: 'Full-stack engineer. I build the whole thing — the screen, the API behind it, and the box it runs on.',
  paras: [
    'Since 2024 I have been <strong>Founder and CTO of EnglishpersonAI</strong>, a production AI coaching platform I architected and built as the sole engineer. Alongside it I run <strong>AICampz</strong>, a campus platform for physical colleges.',
    'Most of my work is AI-shaped: LLM routing and failover, prompt and context design, and the unglamorous parts around them — billing, offline sync, push at the edge.',
  ],
  ask: 'Happy to talk about LLM plumbing, React Native, Cloudflare Workers, or why your first architecture is usually wrong.',
};

// Four layers every product gets mapped onto. Facets light the layers they touch.
export const LAYERS = [
  { id: 'client', name: 'Client', desc: 'What the user touches' },
  { id: 'api', name: 'API', desc: 'Routes, auth, business rules' },
  { id: 'data', name: 'Data', desc: 'Persistence and state' },
  { id: 'edge', name: 'Edge', desc: 'Infra, delivery, jobs' },
];

export const products = [
  {
    id: 'englishpersonai',
    name: 'EnglishpersonAI',
    status: 'Live · since 2024',
    year: '2024',
    live: true,
    url: 'https://englishpersonai.com',
    summary:
      'An AI English coach for Indian learners preparing for interviews and placements. Four practice modes, spoken feedback, and a streak system that keeps people coming back. I architected and built all of it — app, API, billing, infrastructure — as the only engineer.',
    tech: 'React Native (Expo), Node.js, Express, Supabase (PostgreSQL), Cloudflare Workers, DeepSeek / Groq, Razorpay',
    facets: [
      { id: 'modes', name: 'the modes', layers: ['client', 'api'], text: 'Four practice modes, each with its own generated prompt built from the learner’s level and history.' },
      { id: 'failover', name: 'the failover', layers: ['api'], text: 'DeepSeek first, Groq automatically on failure — a turn never dies because one provider is down.' },
      { id: 'billing', name: 'the billing', layers: ['api', 'data'], text: 'Razorpay subscriptions with HMAC-verified webhooks and a polling fallback, so a dropped webhook never loses a payment.' },
      { id: 'streaks', name: 'the streak', layers: ['client', 'data'], text: 'XP, streaks and a leaderboard, with an offline action queue that syncs the moment the phone reconnects.' },
      { id: 'push', name: 'the push', layers: ['edge'], text: 'Notifications batched and delivered from Cloudflare Workers at the edge, at zero idle cost.' },
    ],
  },
  {
    id: 'aicampz',
    name: 'AICampz',
    status: 'Live',
    year: '2025',
    live: true,
    url: 'https://aicampz.com',
    summary:
      'Run the campus, not the register. A platform for physical colleges that puts attendance, lectures, quizzes and AI-assisted study material in one place instead of five spreadsheets and a WhatsApp group.',
    tech: 'Next.js, Node.js, PostgreSQL',
    facets: [
      { id: 'attendance', name: 'attendance', layers: ['client', 'data'], text: 'The register, replaced — marked once and readable by everyone who needs it.' },
      { id: 'lectures', name: 'lectures', layers: ['client', 'api'], text: 'Schedule and material for every lecture, in the place students already are.' },
      { id: 'quizzes', name: 'quizzes', layers: ['api', 'data'], text: 'Set, take and score — results land without anyone collecting paper.' },
      { id: 'material', name: 'AI material', layers: ['api'], text: 'Study material generated against the lecture it belongs to, not a generic summary.' },
      { id: 'campus', name: 'the campus', layers: ['client', 'api', 'data'], text: 'One platform per college, so the pieces above actually talk to each other.' },
    ],
  },
  {
    id: 'hackpulse',
    name: 'HackPulse',
    status: 'Live · Jan 2027',
    year: '2026',
    live: true,
    url: 'https://hackpulse.dev',
    summary:
      'The Main Heist — a 36-hour national offline hackathon at UEM Jaipur on 29 January 2027. Student developers, designers and innovators build a working product against the clock. I built and run the event site.',
    tech: 'Next.js',
    facets: [
      { id: 'heist', name: 'the heist', layers: ['client'], text: '36 hours, national, offline — the whole site is built around one countdown.' },
      { id: 'registration', name: 'registration', layers: ['api', 'data'], text: 'Teams sign up and are tracked through to the day itself.' },
      { id: 'venue', name: 'the venue', layers: ['client'], text: 'UEM Jaipur, 29 January 2027 — logistics a participant can read in one screen.' },
    ],
  },
  {
    id: 'cirportal',
    name: 'CIR Portal',
    status: 'In progress',
    year: '2026',
    live: false,
    url: 'https://cirportal.tech',
    summary:
      'A portal project at cirportal.tech. The domain is not resolving publicly yet, so this entry is a placeholder — the real description and facets need your input.',
    tech: '—',
    facets: [
      { id: 'tbd', name: 'to be written', layers: [], text: 'Tell me what this one does and I will write it up like the others.' },
    ],
  },
];

export const writing = [
  {
    date: '2026',
    title: 'Where RAG Fails: Understand the Limitations',
    sub: 'What retrieval-augmented generation actually is, why it was introduced, and the places it quietly stops working.',
    meta: 'Hashnode',
    url: 'https://howchatgptworks.hashnode.dev/where-rag-fails-understand-the-limitations',
  },
  {
    date: '2026',
    title: 'How ChatGPT Understands Your Questions',
    sub: 'A walk through what happens between your prompt and the first token of the answer.',
    meta: 'Hashnode',
    url: 'https://howchatgptworks.hashnode.dev/how-chatgpt-understands-your-questions',
  },
];

export const awards = [
  { date: '2025', title: '1st Prize — HackUEM 2025', sub: 'Built and shipped the winning product end to end.', meta: 'Winner' },
  { date: '2025', title: 'Runner-up — LNMIIT Unstoppable Hackathon', sub: 'National-level hackathon at LNMIIT.', meta: 'Runner-up' },
  { date: '2025', title: 'Technical Head — AceHack 5.0', sub: 'Organised and led technical operations for the event.', meta: 'Organiser' },
  { date: '2024—', title: '12+ hackathons', sub: 'Mostly solo, mostly shipping something that runs by the deadline.', meta: 'Participant' },
];

export const career = {
  years: [{ label: '2024' }, { label: '2025' }, { label: '2026' }, { label: 'NOW' }],
  stations: [
    {
      org: 'EnglishpersonAI',
      title: 'Founder & CTO · EnglishpersonAI',
      period: 'January 2024 - Present',
      from: 0.02,
      to: 1,
      points: [
        'Architected and led development of a production AI English coaching platform, owning technical strategy, system design and delivery as the sole engineer.',
        'Built a resilient LLM engine with automatic failover between DeepSeek and Groq, keeping four practice modes answering even when a provider goes down.',
        'Implemented Razorpay subscription billing with HMAC signature verification and a polling fallback, so a dropped webhook never loses a payment.',
        'Shipped an offline-first gamification system — XP, streaks and a leaderboard — that queues actions locally and syncs on reconnect.',
      ],
    },
    {
      org: 'AICampz',
      title: 'AICampz · campus platform',
      period: '2025 - Present',
      from: 0.42,
      to: 1,
      points: [
        'Run the campus, not the register: attendance, lectures, quizzes and AI-assisted study material in one platform for physical colleges.',
        'Built full stack — Next.js front end, Node.js API, PostgreSQL — and deployed it to production.',
      ],
    },
    {
      org: 'BCA · UEM',
      title: 'Bachelor of Computer Applications',
      period: '2024 - 2027 · University of Engineering and Management',
      from: 0,
      to: 1,
      points: [
        'Studying for a BCA while building and running products full time.',
        '12+ hackathons alongside coursework, including a first prize at HackUEM 2025.',
      ],
    },
  ],
};
