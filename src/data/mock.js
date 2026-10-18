// Portfolio content — Ankit Rajoria

export const navLinks = {
  primary: [
    { label: 'Products', hasDropdown: true, path: '/#products' },
    { label: 'Experience', hasDropdown: false, path: '/#experience' },
    { label: 'About', hasDropdown: false, path: '/about' },
  ],
  secondary: [
    { label: 'GitHub', href: 'https://github.com/ankitrraj' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ankit-rajoria' },
    { label: 'Email', href: 'mailto:ai.ankitrajoria@gmail.com' },
  ],
};

export const exploreItems = [
  { label: 'GenAI roadmap', href: '/genai' },
  { label: 'EnglishpersonAI', href: '/#products' },
  { label: 'AICampz', href: '/#products' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Tech stack', href: '/#stack' },
  { label: 'Achievements', href: '/#experience' },
  { label: 'About me', href: '/about' },
  { label: 'GitHub', href: 'https://github.com/ankitrraj' },
  { label: 'Contact', href: 'mailto:ai.ankitrajoria@gmail.com' },
];

export const heroTitle = ['Ankit builds', 'AI products', 'end to end'];

export const heroIntro = `Full Stack Software Engineer shipping production web & mobile apps with React, Next.js, React Native, Node.js and PostgreSQL. Sole engineer behind two live AI products.`;

// The two flagship products (rendered as big feature cards)
export const products = [
  {
    id: 'englishpersonai',
    name: 'EnglishpersonAI',
    tagline: 'AI-powered English coaching platform',
    category: 'Live product',
    color: '#84BFFF',
    description:
      'A production AI English coach: 4 practice modes with personalized prompts, automatic failover between DeepSeek & Groq LLMs, Razorpay subscription billing with HMAC verification, gamification (XP, streaks, leaderboard) with an offline sync queue, and edge push notifications on Cloudflare Workers.',
    stats: ['18 app screens', '11 API modules', '5,400+ LOC'],
    web: 'https://englishpersonai.com',
    app: 'https://englishpersonai.com',
    featured: true,
  },
  {
    id: 'aicampz',
    name: 'AICampz',
    tagline: 'AI learning platform — web & mobile',
    category: 'Live product',
    color: '#F0A8DD',
    description:
      'An AI-driven learning product available on web and as a mobile app. Built full stack with a React / Next.js frontend, Node.js backend and PostgreSQL, deployed on cloud infrastructure with CI/CD.',
    stats: ['Web + App', 'Full stack', 'Production'],
    web: 'https://aicampz.com',
    app: 'https://aicampz.com',
    featured: true,
  },
];

// Experience / achievement cards
export const highlights = [
  {
    id: 'founder',
    title: 'Founder & CTO — EnglishpersonAI',
    description:
      'Jan 2024 – Present. Architected and led development of a production AI coaching platform as sole engineer — technical strategy, system design and delivery.',
    cta: 'View product',
    href: '/#products',
  },
  {
    id: 'hackathons',
    title: '1st Prize — HackUEM 2025',
    description:
      'Runner-up at LNMIIT Unstoppable Hackathon, Technical Head at AceHack 5.0, and 12+ hackathons overall. Single-handedly built and shipped full products end to end.',
    cta: 'See achievements',
    href: '/#experience',
  },
  {
    id: 'build',
    title: 'Let’s build something',
    description:
      'Open to full-stack, product engineering and AI roles. Fast to ship, comfortable owning the whole stack from React Native to Cloudflare Workers.',
    cta: 'Get in touch',
    href: 'mailto:ai.ankitrajoria@gmail.com',
  },
];

export const skills = [
  { group: 'Languages', items: 'JavaScript, TypeScript, HTML, CSS' },
  { group: 'Frontend', items: 'React.js, Next.js, React Native (Expo), Tailwind, shadcn/ui' },
  { group: 'Backend', items: 'Node.js, Express.js, REST APIs, Socket.IO, Prisma' },
  { group: 'Databases', items: 'PostgreSQL' },
  { group: 'Cloud & DevOps', items: 'DigitalOcean, Cloudflare Workers & R2, Docker, CI/CD, Vercel, Nginx, PM2' },
  { group: 'Tools', items: 'Git, GitHub, Postman, Playwright, Cursor' },
];

export const marqueeWords = ['React', 'Next.js', 'React Native', 'Node.js', 'PostgreSQL', 'TypeScript', 'Cloudflare'];

export const footerLinks = {
  navigation: [
    { label: 'GenAI roadmap', href: '/genai' },
    { label: 'EnglishpersonAI', href: '/#products' },
    { label: 'AICampz', href: '/#products' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Tech stack', href: '/#stack' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: 'mailto:ai.ankitrajoria@gmail.com' },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/ankitrraj' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ankit-rajoria' },
    { label: 'Email', href: 'mailto:ai.ankitrajoria@gmail.com' },
  ],
};

export const BRAND_COLORS = ['#84BFFF', '#EF724F', '#981082', '#E7DB4C', '#ACE2DF', '#F0A8DD'];
