export const COMPLEXITY_LEVELS = {
  CHILD: {
    id: '5yo',
    label: "05 / Child 🧒",
    shortLabel: '5yo',
    code: '05',
    badge: '🧒 KINDERGARTEN PLAYGROUND MODE',
    accentColor: '#FF6B8B',
    themeGlow: 'bg-rose-500/15 dark:bg-rose-500/10',
    cardBorder: 'border-rose-400/60 dark:border-rose-500/40',
    badgeClass: 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    buttonClass: 'bg-[#FF6B8B] text-white shadow-[0_0_20px_rgba(255,107,139,0.35)]',
    textHighlightClass: 'text-rose-600 dark:text-[#FF6B8B] drop-shadow-[0_0_15px_rgba(255,107,139,0.3)]',
    description: 'Only 5-6 short bullet points, playground analogies, zero jargon',
    systemPrompt: `You are explaining a topic to a 5-year-old child.
Follow these formatting and content rules strictly:
1. Your response MUST be ONLY bullet points (starting with "- "). Do NOT write any introduction, paragraphs, titles, or headings.
2. Provide exactly 5 to 6 bullet points.
3. Each bullet point must be a single, short sentence under 15 words.
4. Use extremely simple everyday words and fun comparisons like toys, animals, or candy.
5. Use zero technical jargon or complicated terms.
6. Keep the entire response under 80 words total.`
  },
  TEEN: {
    id: '15yo',
    label: "15 / Teen 🧑",
    shortLabel: '15yo',
    code: '15',
    badge: '🧑 HIGH SCHOOL CYBER EDITION',
    accentColor: '#00E5FF',
    themeGlow: 'bg-cyan-500/15 dark:bg-cyan-500/10',
    cardBorder: 'border-cyan-400/60 dark:border-cyan-500/40',
    badgeClass: 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800',
    buttonClass: 'bg-[#00E5FF] text-slate-950 shadow-[0_0_20px_rgba(0,229,255,0.35)]',
    textHighlightClass: 'text-cyan-600 dark:text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]',
    description: 'Structured with ## headings, subheadings, and relatable analogies',
    systemPrompt: `You are explaining a topic to a 15-year-old high school student.
Follow these formatting and content rules strictly:
1. Structure the response using 2 to 3 main markdown headings starting with "## ".
2. Under each heading, use short subheadings ("### ") or bullet points ("- ") to elaborate.
3. You may introduce core technical terms, but immediately explain them with clear, relatable analogies.
4. Provide moderate depth and engaging real-world context.
5. Keep the total response length strictly between 150 and 200 words.`
  },
  EXPERT: {
    id: 'expert',
    label: "EXP / Expert 🎓",
    shortLabel: 'Expert',
    code: 'EXP',
    badge: '🎓 DOMAIN EXPERT TERMINAL',
    accentColor: '#C6FF00',
    themeGlow: 'bg-lime-500/15 dark:bg-[#C6FF00]/10',
    cardBorder: 'border-lime-400/60 dark:border-lime-500/40',
    badgeClass: 'bg-lime-100 dark:bg-neutral-900 text-lime-800 dark:text-[#C6FF00] border-lime-300 dark:border-neutral-800',
    buttonClass: 'bg-[#C6FF00] text-black shadow-[0_0_20px_rgba(198,255,0,0.35)]',
    textHighlightClass: 'text-lime-600 dark:text-[#C6FF00] drop-shadow-[0_0_20px_rgba(198,255,0,0.25)]',
    description: 'Rigorous 4-section breakdown with technical depth (250-350 words)',
    systemPrompt: `You are providing a domain-expert technical explanation for a peer professional.
Follow these formatting and content rules strictly:
1. Structure the explanation with these exact markdown section headings:
   ## Core Concept
   ## Mechanism
   ## Key Nuances & Edge Cases
   ## Real-World Applications
2. Use precise, technically rigorous terminology without dumbing down or over-simplifying.
3. Assume advanced domain knowledge, focusing on theoretical foundations, architectural trade-offs, and underlying mechanics.
4. Keep the total response length between 250 and 350 words, dense with technical substance.`
  }
};

export const EASTER_EGG_PROMPT = `You are the Deep Thought supercomputer from Hitchhiker's Guide to the Galaxy. Explain why 42 is the ultimate answer to life, the universe, and everything with humorous cosmic wisdom in under 120 words. Include a nod to towels and digital watches.`;
