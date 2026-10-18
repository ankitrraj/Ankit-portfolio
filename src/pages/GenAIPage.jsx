import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, BookOpen, BrainCircuit, CheckCircle2, Code2, Rocket, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Marquee from '../components/Marquee';

const starterGuide = [
  {
    title: 'Web development basics',
    text: 'Learn HTML, CSS, JavaScript and Git well enough to build a responsive site without copying a tutorial.',
    icon: Code2,
    color: '#84BFFF',
  },
  {
    title: 'Build your fresher portfolio',
    text: 'Ship 2–3 small projects, write clear README files, deploy them, and make your GitHub show your progress.',
    icon: Rocket,
    color: '#E7DB4C',
  },
  {
    title: 'Then add GenAI',
    text: 'Use your web skills to turn prompts, APIs and models into useful products people can actually try.',
    icon: BrainCircuit,
    color: '#F0A8DD',
  },
];

const modules = [
  {
    number: '01',
    title: 'Foundation',
    color: '#84BFFF',
    topics: [
      'Transformers: what happens when you send a message to an LLM',
      'How transformers process text internally',
      'Tokenization and how text becomes numbers',
      'Attention mechanisms and embeddings',
      'Context windows, temperature and top-p',
    ],
  },
  {
    number: '02',
    title: 'API Platforms',
    color: '#ACE2DF',
    topics: [
      'Set up a Node.js project from scratch',
      'Explore OpenAI, Claude and Gemini APIs',
      'Read response objects and stream responses end to end',
      'Run local LLMs with Ollama and generate embeddings locally',
      'Choose models for cost, speed and quality',
    ],
  },
  {
    number: '03',
    title: 'Prompt Engineering',
    color: '#E7DB4C',
    topics: [
      'Zero-shot, few-shot and role prompting',
      'Chain-of-thought, self-consistency and ReAct prompting',
      'Constraints and negative prompting',
      'Reliable structured output with JSON',
      'Prompt chaining and common prompt mistakes',
    ],
  },
  {
    number: '04',
    title: 'Streaming ChatGPT Clone',
    color: '#F0A8DD',
    topics: [
      'Set up a full-stack project',
      'Stream chat responses in real time',
      'Render Markdown and code blocks',
      'Persist conversations and manage history',
      'Count tokens and handle context limits',
    ],
  },
  {
    number: '05',
    title: 'AI System Design',
    color: '#EF724F',
    topics: [
      'RAG architecture, indexing and query pipelines',
      'Fixed-size, semantic and recursive chunking',
      'Parse PDFs, Markdown and HTML',
      'Pick embedding models and build vector search with Qdrant',
      'Design queue-based ingestion, workers, retries and progress tracking',
    ],
  },
  {
    number: '06',
    title: 'Vectorless Indexing',
    color: '#D7C6FF',
    topics: [
      'Where vector RAG fails: boundaries, drift and opaque scores',
      'Retrieve with PageIndex without a vector database',
      'Build an LLM-generated wiki from documents',
      'Use a wiki as an agent memory substrate',
      'Compare vector, vectorless and hybrid strategies',
    ],
  },
  {
    number: '07',
    title: 'AI-Powered Projects',
    color: '#981082',
    dark: true,
    topics: [
      'NotebookLM clone: document upload, indexing and multi-document reasoning',
      'Handle large files and edge cases',
      'AI pitch deck: prompt → outline → slides pipeline',
      'Use structured output for consistent slides',
      'Export the final deck as a downloadable file',
    ],
  },
  {
    number: '08',
    title: 'Agentic Workflows',
    color: '#84BFFF',
    topics: [
      'Chains vs agents and the perceive-decide-act loop',
      'Strict JSON tool schemas and safe execution',
      'Parallel and sequential tool calls',
      'Guardrails, retries, recovery and runaway-loop prevention',
      'Build a Claude-Code-style CLI agent in JavaScript',
    ],
  },
  {
    number: '09',
    title: 'Agentic SDK',
    color: '#ACE2DF',
    topics: [
      'OpenAI Agents SDK: agents, instructions and handoffs',
      'Shared state, input/output guardrails and tracing',
      'File Search, Web Search and Code Interpreter tools',
      'Sessions and managed tools',
      'Build a real-time voice agent with the Realtime API',
    ],
  },
  {
    number: '10',
    title: 'Claude 101',
    color: '#E7DB4C',
    topics: [
      'Long context, direct PDF input and inline citations',
      'Prompt caching and cost savings',
      'Extended thinking and structured tool use',
      'Message batches for bulk processing',
      'Build with Claude Agent SDK and choose the right model',
    ],
  },
  {
    number: '11',
    title: 'Agentic AI Project',
    color: '#EF724F',
    topics: [
      'Build AutoWiki for Git',
      'Show repository indexing progress and a file tree',
      'Search files, functions and classes',
      'Copy AI-generated documentation',
      'Export the wiki as Markdown or PDF',
    ],
  },
  {
    number: '12',
    title: 'Memory Layer',
    color: '#F0A8DD',
    topics: [
      'Why LLMs are stateless: short-term and long-term memory',
      'Episodic and semantic memory',
      'Memory write, update and forget policies',
      'Integrate Mem0 and retrieve personal memories',
      'Model memory with Neo4j knowledge graphs',
    ],
  },
  {
    number: '13',
    title: 'Adapting the AI Ecosystem',
    color: '#D7C6FF',
    topics: [
      'MCP: clients, servers and transports',
      'Build and publish your first MCP server',
      'Create Skills with clear input and output schemas',
      'Distribute capabilities in the AI ecosystem',
      'Build Plugins and ship a public portfolio of your work',
    ],
  },
];

const ModuleCard = ({ module, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
    className="relative flex h-full flex-col overflow-hidden rounded-[28px] border-2 border-black p-6 shadow-[5px_5px_0_#000] transition-transform duration-300 hover:-translate-y-1"
    style={{ backgroundColor: module.color, color: module.dark ? '#fff' : '#000' }}
  >
    <div className="flex items-start justify-between gap-4">
      <span className="font-['Alfa_Slab_One'] text-[16px] opacity-70">{module.number}</span>
      <ArrowUpRight className="h-6 w-6" strokeWidth={2.8} />
    </div>
    <h2 className="mt-10 font-['Alfa_Slab_One'] text-[28px] leading-[1.05]">{module.title}</h2>
    <ul className="mt-6 space-y-3">
      {module.topics.map((topic) => (
        <li key={topic} className="flex gap-2 text-[14px] font-extrabold leading-[1.35]">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={3} />
          <span>{topic}</span>
        </li>
      ))}
    </ul>
  </motion.article>
);

const GenAIPage = () => (
  <PageTransition>
    <section className="relative overflow-hidden px-8 pb-20 pt-14 md:pb-28 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#E7DB4C] px-4 py-2 text-[13px] font-extrabold">
            <Sparkles className="h-4 w-4" strokeWidth={3} /> Learning roadmap
          </div>
          <h1 className="mt-7 font-['Alfa_Slab_One'] text-[54px] leading-[0.94] tracking-tight text-black sm:text-[76px] md:text-[112px]">
            GenAI<br />from zero<br /><span className="text-[#981082]">to ship.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] font-extrabold leading-[1.45] text-black md:text-[20px]">
            A practical curriculum for learning modern AI systems — from how an LLM works to RAG, agents, memory and real products.
          </p>
        </motion.div>
        <a href="#web-dev-first" className="mt-12 inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-6 py-3 text-[15px] font-extrabold shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-1">
          Start with the fresher guide <ArrowDown className="h-4 w-4" strokeWidth={3} />
        </a>
      </div>
    </section>

    <Marquee color="#981082" textColor="#fff" words={['Learn the web first', 'Build in public', 'Ship projects', 'Then go GenAI']} />

    <section id="web-dev-first" className="scroll-mt-8 border-y-2 border-black bg-white px-8 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[#981082]"><BookOpen className="h-6 w-6" strokeWidth={3} /><span className="text-[13px] font-extrabold uppercase tracking-[0.16em]">Start here</span></div>
          <h2 className="mt-4 font-['Alfa_Slab_One'] text-[40px] leading-[1] text-black md:text-[64px]">Web dev + fresher guide</h2>
          <p className="mt-5 text-[17px] font-bold leading-[1.5] text-black">Before building with AI, get comfortable making things for the web. This is the shortest path from beginner to a portfolio that proves you can ship.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {starterGuide.map(({ title, text, icon: Icon, color }, index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="rounded-[26px] border-2 border-black p-7 shadow-[5px_5px_0_#000]" style={{ backgroundColor: color }}>
              <Icon className="h-9 w-9" strokeWidth={2.6} />
              <h3 className="mt-10 font-['Alfa_Slab_One'] text-[24px] leading-tight text-black">{title}</h3>
              <p className="mt-4 text-[15px] font-bold leading-[1.45] text-black">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="px-8 py-20 md:py-28" id="genai-roadmap">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#981082]">13 hands-on modules</p>
            <h2 className="mt-3 font-['Alfa_Slab_One'] text-[42px] leading-[1] text-black md:text-[68px]">The GenAI roadmap</h2>
          </div>
          <p className="max-w-md text-[15px] font-bold leading-[1.45] text-black">Go in order: understand the model, connect it to data, then give it tools, memory and a product experience.</p>
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module, index) => <ModuleCard key={module.number} module={module} index={index} />)}
        </div>
      </div>
    </section>
  </PageTransition>
);

export default GenAIPage;
