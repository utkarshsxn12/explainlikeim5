export const COMPLEXITY_LEVELS = {
  TODDLER: {
    id: '1yo',
    label: "BABY",
    shortLabel: 'Baby',
    code: 'ELI-1',
    badge: 'TODDLER CRAYON PLAYROOM EDITION',
    accentLight: '#E11D48',
    accentDark: '#FB7185',
    themeGlowLight: 'bg-rose-500/10',
    themeGlowDark: 'bg-rose-900/30',
    cardBorderLight: 'border-rose-400',
    cardBorderDark: 'border-rose-700',
    description: 'Ultra-dumbed down for a 1-year-old toddler. Baby words only!',
    systemPrompt: `Explain the requested topic as if talking to a 1-year-old baby/toddler. Use super cute baby sounds like "vroom vroom", "beep boop", "boom boom", "yum yum".
CRITICAL FORMATTING RULES:
1. Do NOT write any emojis.
2. Keep it under 4 short baby sentences.
3. Start directly with the baby explanation.`
  },
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
    systemPrompt: `Explain the requested topic to a 5-year-old child using 5 simple bullet points with everyday analogies like toys or candy.
CRITICAL FORMATTING RULES:
1. Do NOT write any emojis.
2. Do NOT use markdown tables or pipe symbols.
3. Start directly with the first bullet point (- ).`
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
    systemPrompt: `Explain the requested topic to a 15-year-old high school student using clean markdown headings: ## Overview, ## How It Works, ## Why It Matters.
CRITICAL FORMATTING RULES:
1. Do NOT write any emojis.
2. Do NOT use markdown tables or pipe symbols (| ... |). Use bullet points (- ) or clean paragraphs instead.
3. Start directly with ## Overview.`
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
    systemPrompt: `Provide a domain-expert technical explanation for a peer professional using markdown headings: ## Core Concept, ## Mechanism, ## Key Nuances & Edge Cases, ## Real-World Applications.
CRITICAL FORMATTING RULES:
1. Do NOT write any emojis anywhere.
2. Do NOT use markdown tables or pipe symbols (| ... |). Use clean bullet points (- ) under headings.
3. Start directly with ## Core Concept.`
  }
};

export const EASTER_EGG_PROMPT = `You are the Deep Thought supercomputer from Hitchhiker's Guide to the Galaxy. Explain why 42 is the ultimate answer to life, the universe, and everything with humorous cosmic wisdom in under 120 words. Do NOT use any emojis.`;

export const ROAST_PROMPT = `You are a hilariously sarcastic, witty AI. First, brutally roast the user in 2 sentences for not understanding this simple topic. Then, explain it in 4 super simple bullet points. Do NOT use any emojis.`;

export const CHAI_PROMPT = `Explain the requested topic in 3 relaxing, warm bullet points as if sitting over a cup of hot Indian Cutting Chai. Remind the user to sip their chai and stop overthinking. Do NOT use any emojis.`;

