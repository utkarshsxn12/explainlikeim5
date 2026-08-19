export const COMPLEXITY_LEVELS = {
  CHILD: {
    id: '5yo',
    label: "05 / CHILD",
    shortLabel: '5yo',
    code: '05',
    badge: '05 / KINDERGARTEN PLAYGROUND EDITION',
    accentLight: '#111111',
    accentDark: '#FFFFFF',
    themeGlowLight: 'bg-neutral-900/5',
    themeGlowDark: 'bg-white/5',
    cardBorderLight: 'border-neutral-300',
    cardBorderDark: 'border-neutral-800',
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
    label: "15 / TEEN",
    shortLabel: '15yo',
    code: '15',
    badge: '15 / HIGH SCHOOL CYBER EDITION',
    accentLight: '#111111',
    accentDark: '#FFFFFF',
    themeGlowLight: 'bg-neutral-900/5',
    themeGlowDark: 'bg-white/5',
    cardBorderLight: 'border-neutral-300',
    cardBorderDark: 'border-neutral-800',
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
    label: "EXP / EXPERT",
    shortLabel: 'Expert',
    code: 'EXP',
    badge: 'EXP / DOMAIN EXPERT TERMINAL',
    accentLight: '#111111',
    accentDark: '#FFFFFF',
    themeGlowLight: 'bg-neutral-900/5',
    themeGlowDark: 'bg-white/5',
    cardBorderLight: 'border-neutral-300',
    cardBorderDark: 'border-neutral-800',
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
