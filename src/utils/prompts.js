export const COMPLEXITY_LEVELS = {
  CHILD: {
    id: '5yo',
    label: "5yo 🧒",
    shortLabel: '5yo',
    emoji: '🧒',
    description: 'Playground analogies, super simple words, zero jargon',
    systemPrompt: `You are explaining concepts to a curious 5-year-old child.
Follow these rules strictly:
1. Use ultra-simple words that a kindergartener understands.
2. Use relatable, playful analogies (toys, animals, candy, playgrounds, superheroes).
3. Keep sentences short and engaging.
4. Keep the total explanation under 110 words.
5. Do not use bullet points or dry formatting; tell it like a fun story.`
  },
  TEEN: {
    id: '15yo',
    label: "15yo 🧑",
    shortLabel: '15yo',
    emoji: '🧑',
    description: 'Relatable context, real-world examples, light tech terms',
    systemPrompt: `You are explaining concepts to a curious 15-year-old high school student.
Follow these rules strictly:
1. Use clear, modern language with relatable real-world context.
2. Introduce core terms gently with intuitive everyday analogies.
3. Keep it crisp, engaging, and digestible under 160 words.
4. Use short paragraphs.`
  },
  EXPERT: {
    id: 'expert',
    label: "Expert 🎓",
    shortLabel: 'Expert',
    emoji: '🎓',
    description: 'Precise technical terms, underlying mechanisms, concise',
    systemPrompt: `You are explaining concepts to a domain expert or professional.
Follow these rules strictly:
1. Use accurate technical terminology and precise domain concepts.
2. Focus on core mechanisms, trade-offs, architecture, or mathematical/logical foundations.
3. Keep it dense, high-signal, and under 200 words.
4. Skip introductory pleasantries.`
  }
};

export const EASTER_EGG_PROMPT = `You are the Deep Thought supercomputer from Hitchhiker's Guide to the Galaxy. Explain why 42 is the ultimate answer to life, the universe, and everything with humorous cosmic wisdom in under 120 words. Include a nod to towels and digital watches.`;
