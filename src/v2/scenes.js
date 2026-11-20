import { makeIso } from './iso';

/* Architecture scenes, one set per product.

   Each part owns: the shapes it draws, an anchor the label hangs off,
   and the words shown when you hover it. `ch` picks the accent hue —
   for EnglishPersonAI that distinction carries meaning (the person's
   voice out, the machine's voice back), so it is kept. */

const g = makeIso(20, 407, 110);

/* ---------- shared sub-drawings ---------- */

const phone = (x, y) => g.box(x, y, 0, 0.9, 0.2, 1.7) + g.qy(y + 0.2, x + 0.12, x + 0.78, 0.25, 1.5, 'scr');

const tiles = (x0, y0, z, cols, rows, hot) => {
  let s = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      s += g.box(x0 + c * 2.1, y0 + r * 1.55, z, 1.7, 1.2, 0.22, `tile${hot.includes(i) ? ' hot' : ''}`);
    }
  }
  return s;
};

const gate = (x, y0, len, h) =>
  g.box(x, y0, 0, 0.5, 0.55, h) + g.box(x, y0 + len - 0.55, 0, 0.5, 0.55, h) + g.box(x, y0, h, 0.5, len, 0.42);

const gateX = (x0, y, len, h) =>
  g.box(x0, y, 0, 0.5, 0.55, h) + g.box(x0 + len - 0.5, y, 0, 0.5, 0.55, h) + g.box(x0, y, h, len, 0.55, 0.42);

const disks = (cx, cy, r, n) => {
  let s = '';
  for (let i = 0; i < n; i++) s += g.cyl(cx, cy, i * 0.92, r, 0.78);
  return s;
};

const belt = (x, y, len) =>
  g.box(x + 0.4, y + 0.3, 0, 0.3, 0.3, 0.3) +
  g.box(x + len - 0.7, y + 0.3, 0, 0.3, 0.3, 0.3) +
  g.box(x, y, 0.3, len, 1.2, 0.2) +
  Array.from({ length: Math.floor(len / 0.7) }, (_, i) =>
    g.line([x + 0.35 + i * 0.7, y, 0.5], [x + 0.35 + i * 0.7, y + 1.2, 0.5])
  ).join('');

const rack = (x, y, z, w, d, h) => g.box(x, y, z, w, d, h);
const lamp = (x, y, z, s = 0.34) => g.qz(z, x, y, x + s, y + s, 'led');
const floor = () => g.box(0, 0, -0.4, 21, 16, 0.4, 'floor') + g.qz(0, 0.8, 0.8, 20.2, 15.2, 'inset');

/* ============================================================
   EnglishPersonAI
   ============================================================ */

const EPAI = [
  {
    id: 'loop',
    name: 'The voice loop',
    sub: 'one turn',
    prose:
      'The hard part of a voice product is not understanding speech — it is knowing when someone has finished a sentence, and answering before the silence gets awkward. Everything on this belt exists to shorten that gap. The first build was half-duplex: the microphone switched off while the app spoke, so nobody could interrupt and roughly a second of every turn was dead air. This version keeps both directions open at once, cancels the echo in hardware, and starts speaking on the first clause the model produces rather than waiting for the full reply.',
    stats: [
      ['~1.4s', 'speech to first audio'],
      ['250ms', 'to stop when interrupted'],
      ['2', 'providers, auto failover'],
    ],
    stack: ['React Native', 'Web Audio', 'Deepgram nova-3', 'DeepSeek → Groq', 'streaming TTS'],
    parts: [
      {
        id: 'booth', ch: 'human', label: 'the booth', at: [1.2, 1, 2.6], dx: -26, dy: -58,
        desc: 'A phone or a browser tab. Echo cancellation and noise suppression run here, before a single byte leaves the device — a hostel room at 11pm is the normal case, not the edge case.',
        num: 'React Native · Web Audio',
        draw: () => g.box(0, 0, 0, 2.4, 2, 1.5) + g.box(0.8, 0.7, 1.5, 0.7, 0.6, 1.1) + lamp(1.0, 0.9, 2.6),
      },
      {
        id: 'ear', ch: 'human', label: 'the ear', at: [4.9, 1, 2.0], dx: -14, dy: -62,
        desc: 'Streaming speech recognition tuned for Indian English and Hinglish, with the end-of-turn detector set to 500ms of silence — long enough for a learner to think mid-sentence, short enough not to feel slow.',
        num: 'Deepgram nova-3 · en-IN',
        draw: () => g.box(3.8, 0, 0, 2.2, 2, 1.8) + lamp(4.3, 0.5, 2.9) + lamp(4.9, 0.5, 2.9) + lamp(5.5, 0.5, 2.9),
      },
      {
        id: 'turn', ch: 'human', label: 'the turn', at: [8.2, 1, 3.4], dx: 0, dy: -78,
        desc: 'The referee. It decides who holds the floor: when the person starts talking over a reply, this cuts the audio inside a quarter second, throws away the half-finished answer and starts again.',
        num: 'full-duplex · barge-in',
        draw: () => g.box(7.2, -0.2, 0, 2.4, 2.4, 3.0) + g.box(7.6, 0.2, 3.0, 1.6, 1.6, 0.3) + lamp(8.1, 0.7, 3.3, 0.5),
      },
      {
        id: 'mind', ch: 'machine', label: 'the mind', at: [11.6, 1, 4.2], dx: 14, dy: -84,
        desc: 'The language model that forms the reply, capped deliberately short so answers stay conversational. One provider leads, a second takes over mid-request if the first stalls — but only before a single word has been spoken.',
        num: 'DeepSeek → Groq failover',
        draw: () =>
          g.box(10.6, -0.2, 0, 2.2, 2.4, 1.2) +
          g.box(10.6, -0.2, 1.3, 2.2, 2.4, 1.2) +
          g.box(10.6, -0.2, 2.6, 2.2, 2.4, 1.2) +
          lamp(12.2, 0.2, 3.8) + lamp(12.2, 0.2, 2.5) + lamp(12.2, 0.2, 1.2),
      },
      {
        id: 'voice', ch: 'machine', label: 'the voice', at: [15.3, 1, 2.2], dx: 30, dy: -56,
        desc: 'Speech synthesis that begins on the first clause instead of the finished paragraph. By the time the model writes its second sentence, the first one is already playing.',
        num: 'streaming TTS',
        draw: () => g.box(14.2, 0, 0, 2.2, 2, 1.6) + g.box(16.0, 0.6, 0.6, 0.9, 0.8, 0.7) + lamp(14.7, 0.5, 2.7),
      },
      {
        id: 'return', ch: 'machine', label: 'the return', at: [8, 4.6, 0.4], dx: -10, dy: 62,
        desc: 'Audio flowing back to the ear it came from. Because this lane never closes, the person can cut in at any moment — which is what makes it feel like talking to someone rather than into a machine.',
        num: 'open in both directions',
        draw: () => g.slab(-0.4, 4, 0, 17.4, 1.2),
      },
    ],
    scenery: () => g.slab(-0.4, 0.4, -0.3, 17.4, 1.2),
    routes: [
      { p: [[-0.4, 1, 0.05], [16.8, 1, 0.05]], n: 3, t: 3.4, ch: 'human' },
      { p: [[16.8, 4.6, 0.25], [-0.4, 4.6, 0.25]], n: 3, t: 3.4, ch: 'machine' },
    ],
  },
  {
    id: 'hire',
    name: 'The hiring line',
    sub: 'candidate to shortlist',
    prose:
      'The same engine, pointed at hiring. A company uploads a spreadsheet of applicants and every one of them gets a real interview — not a form, a conversation — on whatever evening suits them. Nobody schedules anything. What comes back is not a number on its own: each score is attached to the sentence that earned it, so a recruiter reads the evidence and disagrees with it if they want to. Integrity signals are shown as flags for a human to weigh, never as an automatic rejection.',
    stats: [
      ['100+', 'interviews a day, one bar'],
      ['0', 'scheduling emails'],
      ['every', 'score shows its evidence'],
    ],
    stack: ['CSV / XLSX intake', 'signed invite links', 'object storage', 'structured scoring'],
    parts: [
      {
        id: 'intake', ch: 'human', label: 'the intake', at: [1.1, 1, 2.2], dx: -28, dy: -56,
        desc: 'A spreadsheet in whatever shape the recruiter already has. Columns are mapped by hand once, rows are validated and de-duplicated, and anything malformed comes back as a file you can fix.',
        num: 'CSV · XLSX',
        draw: () =>
          g.box(0, 0, 0, 2.3, 2, 1.0) +
          g.box(0.3, 0.3, 1.0, 1.7, 1.4, 0.25) +
          g.box(0.3, 0.3, 1.3, 1.7, 1.4, 0.25) + lamp(1.6, 0.5, 1.6),
      },
      {
        id: 'invite', ch: 'human', label: 'the invite', at: [4.6, 1, 1.8], dx: -12, dy: -54,
        desc: 'One signed link per candidate: single use, expiring, revocable. No account to create, no app to install — which is the difference between a 30% and an 80% completion rate.',
        num: 'email · WhatsApp',
        draw: () => g.box(3.6, 0, 0, 2.0, 2, 1.2) + g.box(4.0, 0.4, 1.2, 1.2, 1.2, 0.4) + lamp(4.4, 0.7, 1.6),
      },
      {
        id: 'room', ch: 'machine', label: 'the room', at: [7.9, 1, 3.6], dx: 0, dy: -80,
        desc: 'The interview itself, in a browser tab. Microphone check, a plain-language consent screen, then the voice loop from the previous view — questions drawn from the role, not improvised.',
        num: 'the voice loop, applied',
        draw: () => g.box(6.9, -0.2, 0, 2.4, 2.4, 3.2) + g.box(7.3, 0.2, 3.2, 1.6, 1.6, 0.3) + lamp(7.8, 0.7, 3.5, 0.5),
      },
      {
        id: 'record', ch: 'machine', label: 'the record', at: [11.2, 1, 1.6], dx: 10, dy: -50,
        desc: 'Audio uploaded in short chunks while the interview is still running, so a dropped connection costs fifteen seconds rather than the whole session. Screen behaviour is captured alongside it.',
        num: 'object storage · replay',
        draw: () =>
          g.box(10.2, 0, 0, 2.2, 2, 1.0) +
          g.box(10.6, 0.4, 1.0, 0.5, 1.2, 0.4) +
          g.box(11.4, 0.4, 1.0, 0.5, 1.2, 0.4) + lamp(10.5, 0.3, 1.4),
      },
      {
        id: 'scorer', ch: 'machine', label: 'the scorer', at: [14.5, 1, 3.8], dx: 18, dy: -82,
        desc: 'Each answer graded against the role’s rubric at low temperature, so the same answer scores the same way twice. Borderline candidates get a second, independent pass; when the two disagree, a human is asked.',
        num: 'queued · structured output',
        draw: () =>
          g.box(13.5, -0.2, 0, 2.2, 2.4, 1.1) +
          g.box(13.5, -0.2, 1.2, 2.2, 2.4, 1.1) +
          g.box(13.9, 0.2, 2.3, 1.4, 1.6, 0.9) + lamp(14.3, 0.6, 3.2, 0.5),
      },
      {
        id: 'pool', ch: 'human', label: 'the pool', at: [17.4, 1.6, 0.5], dx: 34, dy: 54,
        desc: 'The ranked list a recruiter actually works from: score, the quoted sentence behind it, the audio, and any integrity flags. Shortlist, reject, or export — the decision stays with a person.',
        num: 'the recruiter’s screen',
        draw: () => g.slab(16.4, 0, 0, 2.6, 1.0) + g.slab(16.4, 1.2, 0, 2.6, 1.0) + g.slab(16.4, 2.4, 0, 2.6, 1.0),
      },
    ],
    scenery: () => g.slab(-0.4, 0.4, -0.3, 17.0, 1.2),
    routes: [
      { p: [[-0.4, 1, 0.05], [8, 1, 0.05]], n: 2, t: 3.0, ch: 'human' },
      { p: [[8, 1, 0.05], [18.6, 1.6, 0.3]], n: 2, t: 3.4, ch: 'machine' },
    ],
  },
  {
    id: 'stack',
    name: 'The stack',
    sub: 'what runs where',
    prose:
      'Deliberately boring infrastructure. One database, one stateless API, a queue for anything slow, and object storage for audio — the realtime load sits with the speech and model providers, not with servers I have to keep awake at night. The interesting decisions here were about what not to build: no media server, because audio goes device-to-provider directly; no microservices, because a fifteen-minute interview is three megabytes and fifteen model calls.',
    stats: [
      ['4', 'clients, one API'],
      ['~3MB', 'per interview, audio'],
      ['50k/mo', 'interviews, same shape'],
    ],
    stack: ['Expo', 'Next.js ×3', 'Cloudflare', 'Express', 'Redis / BullMQ', 'Postgres', 'R2'],
    parts: [
      {
        id: 'clients', ch: 'human', label: 'the clients', at: [4.2, 2.2, 6.4], dx: -30, dy: -54,
        desc: 'A React Native app for learners, two dashboards for companies and colleges, and a no-login interview room for candidates. One codebase per surface, one design language across all of them.',
        num: 'Expo · Next.js ×3',
        draw: () =>
          g.slab(0, 0, 6.0, 4.0, 4.4) +
          g.box(0.6, 0.6, 6.2, 1.2, 1.2, 0.5) + g.box(2.4, 0.6, 6.2, 1.2, 1.2, 0.5) +
          g.box(0.6, 2.4, 6.2, 1.2, 1.2, 0.5) + g.box(2.4, 2.4, 6.2, 1.2, 1.2, 0.5),
      },
      {
        id: 'edge', ch: 'human', label: 'the edge', at: [4.2, 2.2, 4.6], dx: -30, dy: -18,
        desc: 'Cloudflare in front of everything: caching, the firewall, and the WebSocket upgrade that carries a live voice session. The one piece of config that broke production for a day lives here.',
        num: 'CDN · WAF · WS proxy',
        draw: () => g.slab(0.4, 0.4, 4.4, 3.2, 3.6),
      },
      {
        id: 'api', ch: 'machine', label: 'the api', at: [4.2, 2.2, 3.0], dx: -30, dy: 18,
        desc: 'A single Express service holding the REST endpoints and the voice session gateway. Stateless on purpose, so scaling it is copy-paste rather than architecture.',
        num: 'Express · Node',
        draw: () => g.slab(0.2, 0.2, 2.8, 3.6, 4.0) + lamp(3.2, 0.6, 3.0),
      },
      {
        id: 'workers', ch: 'machine', label: 'the workers', at: [8.6, 2.2, 1.9], dx: 60, dy: -8,
        desc: 'Everything slow or bursty moved off the request path: spreadsheet imports, invite sending, interview grading. Retries, dead letters, and idempotency keys so a replay cannot double-charge or double-send.',
        num: 'Redis · BullMQ',
        draw: () =>
          rack(7.4, 0.8, 0, 1.2, 1.2, 1.6) + rack(7.4, 2.4, 0, 1.2, 1.2, 1.6) +
          lamp(7.8, 1.2, 1.7) + lamp(7.8, 2.8, 1.7),
      },
      {
        id: 'stores', ch: 'human', label: 'the stores', at: [4.2, 2.2, 1.2], dx: -30, dy: 56,
        desc: 'Postgres for everything relational, with row-level security scoped per organisation so one company can never read another’s candidates. Audio lives in object storage with a retention clock on it.',
        num: 'Postgres · R2',
        draw: () => g.slab(0, 0, 1.0, 4.0, 4.4) + g.slab(0, 0, 0.3, 4.0, 4.4),
      },
    ],
    scenery: () => '',
    routes: [
      { p: [[2.0, 2.2, 6.6], [2.0, 2.2, 3.4]], n: 2, t: 2.6, ch: 'human' },
      { p: [[2.0, 2.2, 3.0], [2.0, 2.2, 1.5]], n: 2, t: 2.2, ch: 'machine' },
    ],
  },
];

/* ============================================================
   AICampz
   ============================================================ */

const AICAMPZ = [
  {
    id: 'platform',
    name: 'The platform',
    sub: 'One API, every college',
    prose:
      'A request starts on the web or the phone, passes the host gate where the college is read from the address it was sent to, and reaches one NestJS service that holds every feature as a module. Fast reads come straight back from Postgres; slow work goes onto a Redis-backed queue and a worker finishes it while the page moves on. Files never pass through the API at all.',
    stats: [
      ['1', 'API, every college'],
      ['5', 'background workers'],
      ['0', 'bytes of media via the API'],
    ],
    stack: ['Next.js (static)', 'Expo', 'NestJS', 'Drizzle', 'Postgres', 'BullMQ', 'Redis', 'Socket.IO', 'Object storage', 'Cloudflare'],
    parts: [
      {
        id: 'vault', label: 'the vault', at: [18, 2.3, 2.2], dx: 26, dy: -62,
        desc: 'Object storage, sorted by college. A file leaves only as a short-lived signed link, minted after the lesson’s access check. The API never streams the bytes itself.',
        num: 'object storage · signed links',
        draw: () => g.box(16.5, 1, 0, 3, 2.6, 2.2) + g.qx(19.5, 1.5, 3.1, 0.3, 1.9, 'scr') + g.box(19.5, 2.1, 1.0, 0.18, 0.4, 0.2),
      },
      {
        id: 'ledger', label: 'the ledger', at: [14.6, 5, 2.6], dx: -14, dy: -72,
        desc: 'Postgres. Every row carries its college, and reads are narrowed by a WHERE clause built from the user’s scope, so a missing check returns nothing rather than everything. Quiz answer keys live in their own table that no student query joins.',
        num: 'Postgres · Drizzle',
        draw: () => disks(14.6, 5, 1.5, 3),
      },
      {
        id: 'api', label: 'the API', at: [7, 7.5, 3.45], dx: 16, dy: -74,
        desc: 'One NestJS service for every college: courses, attendance, quizzes, AI, notices, certificates, projects. Each module is a tile on the same machine, so a new feature is a new tile, not a new server.',
        num: 'NestJS · modular',
        draw: () =>
          g.box(3.5, 5, 0, 7, 5, 3.2) + tiles(3.85, 5.45, 3.2, 3, 3, [1, 3, 8]) +
          [4.4, 5.6, 6.8].map((x) => g.qy(10, x, x + 0.8, 1.9, 2.6, 'scr')).join('') +
          g.qy(10, 8.4, 8.6, 2.2, 2.4, 'led'),
      },
      {
        id: 'queue', label: 'the queue', at: [12.7, 8.8, 0.5], dx: 14, dy: 72,
        desc: 'BullMQ on Redis. Slow work, like a 2,000-row student import, an AI draft or a notice to a whole department, goes on the belt and the request returns at once. Jobs carry ids, never the data itself.',
        num: 'BullMQ · Redis',
        draw: () => belt(10.5, 8.2, 4.5),
      },
      {
        id: 'workers', label: 'the workers', at: [17.1, 9.3, 1.6], dx: 56, dy: 56,
        desc: 'Five workers take jobs off the belt: CSV import, AI generation, notification fan-out, class reminders and the session sweeper. They run outside the web request, so a slow model call never holds a page open.',
        num: '5 workers',
        draw: () =>
          [[15.2, 7.8], [18.8, 7.8], [15.2, 10.6], [18.8, 10.6]].map(([x, y]) => g.box(x, y, 0, 0.25, 0.25, 1.2)).join('') +
          g.box(15, 7.6, 1.2, 4.2, 3.4, 0.2) +
          [[15.4, 8], [17.4, 8], [15.4, 9.6], [17.1, 9.5], [18.3, 9.4]]
            .map(([x, y], i) => g.box(x, y, 1.4, i === 4 ? 0.7 : 1.1, 0.8, 0.5 + (i % 2) * 0.25)).join('') +
          g.qz(1.92, 17.6, 8.2, 17.9, 8.5, 'led'),
      },
      {
        id: 'gate', label: 'the host gate', at: [6.6, 11.9, 2.85], dx: -52, dy: -62,
        desc: 'The college is read from the web address, never from anything the request sends. A token signed for one college is refused at another’s door, and every new route is locked unless it is marked public.',
        num: 'subdomain · per-tenant auth',
        draw: () => gateX(2.2, 11.6, 8.9, 2.4),
      },
      {
        id: 'web', label: 'the web app', at: [3.6, 14.4, 2.8], dx: -38, dy: -22,
        desc: 'A static Next.js site served from the edge. It holds no secrets: the access token lives in memory and the refresh token in an httpOnly cookie the page cannot read.',
        num: 'Next.js · static',
        draw: () =>
          g.box(2.6, 14.2, 0, 1.6, 1.0, 0.2) + g.box(3.2, 14.4, 0.2, 0.4, 0.3, 1.0) +
          g.box(2.4, 14.3, 1.2, 2.4, 0.2, 1.6) + g.qy(14.5, 2.55, 4.65, 1.35, 2.65, 'scr'),
      },
      {
        id: 'phone', label: 'the phone app', at: [6.8, 14.5, 1.8], dx: -16, dy: 60,
        desc: 'Expo, Android first. The refresh token goes into the device keystore and nowhere else, and JavaScript updates ship over the air between store releases.',
        num: 'Expo · OTA updates',
        draw: () => phone(6.35, 14.3),
      },
      {
        id: 'console', label: 'the console', at: [9.6, 14, 1.45], dx: 22, dy: 52,
        desc: 'The platform team’s own tool, run locally: create a college, give it a subdomain and hand it to its first admin.',
        num: 'internal only',
        draw: () =>
          g.box(8.6, 13.9, 0, 2.0, 1.4, 0.15) + g.box(8.6, 13.9, 0.15, 2.0, 0.12, 1.3) +
          g.qy(14.02, 8.75, 10.45, 0.3, 1.3, 'scr'),
      },
    ],
    scenery: floor,
    routes: [
      { p: [[3.6, 13.95, 0.05], [3.6, 10.05, 0.05]], n: 2, t: 3.2 },
      { p: [[6.8, 14.25, 0.05], [6.8, 10.05, 0.05]], n: 2, t: 3.6 },
      { p: [[9.5, 13.85, 0.05], [9.5, 10.05, 0.05]], n: 1, t: 4.2 },
      { p: [[10.55, 5.4, 0.05], [13.05, 5.4, 0.05]], n: 2, t: 2.4 },
      { p: [[10.55, 5.3, 0.05], [12, 5.3, 0.05], [12, 2.3, 0.05], [16.45, 2.3, 0.05]], n: 2, t: 5 },
      { p: [[10.55, 8.8, 0.55], [15, 8.8, 0.55], [16, 8.8, 1.45]], n: 3, t: 4 },
    ],
  },
  {
    id: 'ai',
    name: 'The AI studio',
    sub: 'Teacher tool',
    prose:
      'A teacher asks for a quiz, a flashcard deck or a drip campaign from a topic or their own notes. Their text is treated as material, never as instructions. The model has to answer through a forced tool call, every draft is validated before it is stored, and nothing reaches a student until the teacher publishes it.',
    stats: [
      ['0', 'free-text model replies accepted'],
      ['2×', 'validated — on write and on read'],
      ['teacher', 'holds the publish switch'],
    ],
    stack: ['Claude', 'Forced tool calls', 'Zod', 'BullMQ worker', 'Socket.IO', 'Postgres jsonb'],
    parts: [
      {
        id: 'source', label: 'the source', at: [2.1, 8, 0.5], dx: -26, dy: -52,
        desc: 'What the teacher hands in: a topic, notes, a pasted chapter. It travels inside a fenced source-material block in a user message, with orders to ignore any instructions written inside it.',
        num: 'treated as data, never orders',
        draw: () =>
          g.box(1.2, 6.8, 0, 1.8, 2.4, 0.15) + g.box(1.3, 6.7, 0.17, 1.8, 2.4, 0.15) + g.box(1.15, 6.85, 0.34, 1.8, 2.4, 0.15),
      },
      {
        id: 'brief', label: 'the brief', at: [6, 8.1, 2.8], dx: 16, dy: -62,
        desc: 'The system prompt holds only our rules. The teacher’s text never reaches it, so a line like “ignore the above” in a pasted PDF is just more source text.',
        num: 'system prompt · ours only',
        draw: () =>
          g.box(4.5, 6.6, 0, 3, 3, 2.2) + g.box(5.2, 7.3, 2.2, 1.6, 1.6, 0.6) +
          g.qy(9.6, 5, 7, 0.6, 1.0, 'scr') + g.qy(9.6, 6.6, 6.8, 1.5, 1.7, 'led'),
      },
      {
        id: 'aiqueue', label: 'the queue', at: [9.2, 8.2, 0.5], dx: 16, dy: 80,
        desc: 'The request returns in milliseconds with a pending draft. Generation runs on a worker, and the page hears the result over a socket.',
        num: 'BullMQ · Socket.IO',
        draw: () => belt(7.5, 7.6, 3.5),
      },
      {
        id: 'model', label: 'the model', at: [13, 7.8, 4.1], dx: 16, dy: -80,
        desc: 'Claude, called through a forced tool call. The answer has to come back as structured JSON in the shape we asked for; free text is not accepted.',
        num: 'Claude · forced tool call',
        draw: () =>
          g.box(11, 5.6, 0, 4, 4.4, 3.6) + g.cyl(13, 7.8, 3.6, 0.6, 0.5) +
          [0.8, 1.6, 2.4].map((z) => g.qx(15, 6.2, 9.4, z, z + 0.4, 'scr')).join('') +
          g.qx(15, 9.5, 9.7, 3.0, 3.2, 'led'),
      },
      {
        id: 'sieve', label: 'the sieve', at: [17.3, 8, 1.4], dx: 34, dy: -92,
        desc: 'Every draft is parsed with Zod before it is stored, and parsed again when it is read back out. A malformed quiz is rejected, not patched by guesswork.',
        num: 'Zod · parse twice',
        draw: () =>
          g.box(16, 6.6, 0, 2.6, 2.8, 1.4) +
          [0.5, 1.0, 1.5, 2.0].map((d) => g.line([16 + d, 6.8, 1.41], [16 + d, 9.2, 1.41]) + g.line([16.2, 6.6 + d, 1.41], [18.4, 6.6 + d, 1.41])).join(''),
      },
      {
        id: 'drafts', label: 'the drafts', at: [17.3, 12.3, 0.5], dx: 34, dy: 50,
        desc: 'Drafts belong to the teacher alone. They open them, edit them, delete what is wrong. Students see nothing yet.',
        num: 'private to the author',
        draw: () => [0, 1, 2, 3].map((i) => g.box(15.8 + (i % 2) * 0.12, 11.2 - (i % 2) * 0.1, i * 0.14, 3, 2.2, 0.12)).join(''),
      },
      {
        id: 'publish', label: 'the publish gate', at: [11.8, 13, 2.6], dx: -26, dy: -52,
        desc: 'Publishing re-checks that this teacher still teaches that batch. Only then does the deck or quiz go out, with the quiz answer keys split off into their own table.',
        num: 're-checked at publish',
        draw: () => gate(11.5, 11.4, 3.2, 2.2),
      },
      {
        id: 'class', label: 'the class', at: [7.5, 13, 1.8], dx: -24, dy: 70,
        desc: 'Students get the published quiz or deck on web and phone. A quiz never carries its answers; the score comes back only after the attempt is saved.',
        num: 'answers never shipped',
        draw: () => phone(5.2, 12.9) + phone(7, 12.9) + phone(8.8, 12.9),
      },
    ],
    scenery: floor,
    routes: [
      { p: [[3.05, 8, 0.05], [4.45, 8, 0.05]], n: 1, t: 2 },
      { p: [[7.55, 8.2, 0.55], [10.95, 8.2, 0.55]], n: 2, t: 3 },
      { p: [[15.05, 8, 0.05], [15.95, 8, 0.05]], n: 1, t: 1.6 },
      { p: [[17.2, 9.45, 0.05], [17.2, 11.15, 0.05]], n: 1, t: 2 },
      { p: [[15.75, 13, 0.05], [9.85, 13, 0.05]], n: 3, t: 4.5 },
    ],
  },
  {
    id: 'live',
    name: 'The live class',
    sub: 'Real time',
    prose:
      'In class, the teacher opens a check-in window and students mark themselves present with a rotating code. The API records the mark, then tells everyone who needs to know: the feed row is written first, open screens update over a socket, and closed phones get a push.',
    stats: [
      ['every few s', 'the code rotates'],
      ['row first', 'then socket, then push'],
      ['1', 'room per user id'],
    ],
    stack: ['Socket.IO rooms', 'BullMQ fan-out', 'Expo push', 'FCM', 'Postgres'],
    parts: [
      {
        id: 'code', label: 'the live code', at: [3.9, 9.7, 3.2], dx: -16, dy: -52,
        desc: 'The teacher opens a check-in window and a short code appears on the projector. It changes every few seconds, so a code sent to a friend at home has already expired.',
        num: 'rotating · short-lived',
        draw: () =>
          g.box(3.4, 9.5, 0, 1, 0.6, 1.2) + g.box(2.4, 9.6, 1.2, 3, 0.25, 2.0) +
          g.qy(9.85, 2.55, 5.25, 1.35, 3.05, 'scr'),
        code: [2.85, 9.85, 2.45],
      },
      {
        id: 'api2', label: 'the API', at: [11.5, 7.9, 3.2], dx: 16, dy: -90,
        desc: 'Checks the code, the student, the roster and the time window, records the mark once, then hands the follow-up to the queue so the student’s screen confirms at once.',
        num: 'recorded once',
        draw: () =>
          g.box(9, 5.8, 0, 5, 4.2, 3) + tiles(9.3, 6.2, 3, 2, 2, [0, 3]) +
          g.qy(10, 9.6, 10.4, 1.8, 2.4, 'scr') + g.qy(10, 10.8, 11.6, 1.8, 2.4, 'scr'),
      },
      {
        id: 'feed', label: 'the feed row', at: [17.2, 4.6, 2.5], dx: 16, dy: -80,
        desc: 'Every notification is written as a durable row first. If both the socket and the push fail, the student still finds it in their feed next time.',
        num: 'durable · written first',
        draw: () => disks(17.2, 4.6, 1.3, 3),
      },
      {
        id: 'socket', label: 'the socket', at: [17, 11.4, 3.4], dx: 34, dy: 62,
        desc: 'Each signed-in user joins one room named after their user id, taken from the verified token. Open screens update live: the teacher’s head count, the student’s tick.',
        num: 'Socket.IO · one room per user',
        draw: () =>
          g.box(16.6, 11, 0, 0.8, 0.8, 3.2) + [1.0, 1.8, 2.6].map((z) => g.cyl(17, 11.4, z, 0.9, 0.12)).join('') +
          g.qz(3.21, 16.85, 11.25, 17.15, 11.55, 'led'),
      },
      {
        id: 'push', label: 'the push relay', at: [20.1, 8.1, 2.4], dx: 30, dy: 52,
        desc: 'Phones that are closed get a push through Expo and FCM. The lock-screen text carries a deep link only, never a score or a roster.',
        num: 'Expo · FCM',
        draw: () => g.box(19.6, 7.6, 0, 1, 1, 0.6) + g.box(19.95, 7.95, 0.6, 0.3, 0.3, 1.6) + g.cyl(20.1, 8.1, 2.2, 0.9, 0.15),
      },
      {
        id: 'students', label: 'the class', at: [11.6, 13.3, 1.7], dx: -24, dy: 70,
        desc: 'Students type the code on their phones. The same phones then get the confirmation: live if the app is open, as a push if it is not.',
        num: 'web + phone',
        draw: () => [9.4, 10.9, 12.4, 13.9].map((x) => phone(x, 13.2)).join(''),
      },
    ],
    scenery: floor,
    routes: [
      { p: [[5.5, 9.0, 0.05], [8.95, 9.0, 0.05]], n: 1, t: 3 },
      { p: [[9.85, 13.15, 0.05], [9.85, 10.05, 0.05]], n: 1, t: 2.6 },
      { p: [[12.85, 13.15, 0.05], [12.85, 10.05, 0.05]], n: 1, t: 3.1 },
      { p: [[14.05, 6.2, 0.05], [16.25, 5.6, 0.05]], n: 1, t: 2.2 },
      { p: [[14.05, 9.4, 0.05], [17, 9.4, 0.05], [17, 10.95, 0.05]], n: 2, t: 3 },
      { p: [[17, 11.85, 0.05], [17, 13.3, 0.05], [14.85, 13.3, 0.05]], n: 2, t: 3 },
      { p: [[18.55, 4.6, 0.05], [20.1, 4.6, 0.05], [20.1, 7.55, 0.05]], n: 1, t: 3 },
      { p: [[20.1, 8.65, 0.05], [20.1, 14, 0.05], [14.4, 14, 0.05]], n: 2, t: 4.5 },
    ],
  },
];

export const SCENES = { englishpersonai: EPAI, aicampz: AICAMPZ };
export { g };
