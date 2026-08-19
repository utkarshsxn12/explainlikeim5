export const COMPLEXITY_LEVELS = {
  CHILD: {
    id: '5yo',
    label: "CHILD",
    shortLabel: 'Child',
    code: 'CHILD',
    badge: 'KINDERGARTEN PLAYGROUND EDITION',
    accentLight: '#4A2E1B',
    accentDark: '#F0F4F8',
    themeGlowLight: 'bg-amber-500/10',
    themeGlowDark: 'bg-[#23354D]/30',
    cardBorderLight: 'border-amber-300',
    cardBorderDark: 'border-[#23354D]',
    description: 'Only 5-6 short bullet points, playground analogies, zero jargon',
    systemPrompt: `Explain the requested topic to a 5-year-old child using 5 simple bullet points with everyday analogies like toys or candy. Start directly with the first bullet point.`
  },
  TEEN: {
    id: '15yo',
    label: "TEEN",
    shortLabel: 'Teen',
    code: 'TEEN',
    badge: 'HIGH SCHOOL CYBER EDITION',
    accentLight: '#1C1917',
    accentDark: '#F0F4F8',
    themeGlowLight: 'bg-neutral-500/10',
    themeGlowDark: 'bg-[#23354D]/30',
    cardBorderLight: 'border-neutral-300',
    cardBorderDark: 'border-[#23354D]',
    description: 'Structured with ## headings, subheadings, and relatable analogies',
    systemPrompt: `Explain the requested topic to a 15-year-old high school student using markdown headings: ## Overview, ## How It Works, ## Why It Matters. Start directly with ## Overview.`
  },
  EXPERT: {
    id: 'expert',
    label: "EXPERT",
    shortLabel: 'Expert',
    code: 'EXPERT',
    badge: 'DOMAIN EXPERT EDITION',
    accentLight: '#1C1917',
    accentDark: '#F0F4F8',
    themeGlowLight: 'bg-stone-500/10',
    themeGlowDark: 'bg-[#23354D]/30',
    cardBorderLight: 'border-stone-300',
    cardBorderDark: 'border-[#23354D]',
    description: 'Rigorous 4-section breakdown with technical depth (250-350 words)',
    systemPrompt: `Provide a domain-expert technical explanation for a peer professional using markdown headings: ## Core Concept, ## Mechanism, ## Key Nuances & Edge Cases, ## Real-World Applications. Start directly with ## Core Concept.`
  }
};

export const EASTER_EGG_PROMPT = `You are the Deep Thought supercomputer from Hitchhiker's Guide to the Galaxy. Explain why 42 is the ultimate answer to life, the universe, and everything with humorous cosmic wisdom in under 120 words. Include a nod to towels and digital watches.`;
