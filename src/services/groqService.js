import { COMPLEXITY_LEVELS, EASTER_EGG_PROMPT } from '../utils/prompts';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL_CANDIDATES = [
  'openai/gpt-oss-20b',
  'qwen/qwen3.6-27b',
  'openai/gpt-oss-120b',
  'groq/compound-mini'
];

function sanitizeExplanation(raw) {
  if (!raw) return '';

  let text = raw;

  if (text.includes('</think>')) {
    text = text.split('</think>').pop();
  }

  text = text.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/<think>[\s\S]*/gi, '');

  text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

  const lines = text.split('\n');
  let inPlanningBlock = false;
  const cleanLines = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (
      trimmed.startsWith('<think>') ||
      trimmed.includes("Here's a thinking process") ||
      /^-\s*(Analyze User Input|Topic:|Target Audience|Format Requirements|Required Structure|Tone\/Style|Constraints|Deconstruct|Format:|Count:|Length:|Vocabulary:|No jargon|Check Constraints|Only bullet|5-6 bullets|Each starts|Brainstorming Content)/i.test(trimmed) ||
      /^(Analyze User Input|Target Audience|Format Requirements|Required Structure|Tone\/Style|Constraints|Deconstruct Constraints|Check Constraints):?$/i.test(trimmed)
    ) {
      inPlanningBlock = true;
      continue;
    }

    if (
      /^-\s*(Output ONLY|Structure:|No system rules|No extra text|Keep the|Provide exactly|Use simple|Zero technical|Each bullet|Clear, appropriate)/i.test(trimmed)
    ) {
      continue;
    }

    if (trimmed.startsWith('##') || /^-\s*"?[A-Z0-9]/.test(trimmed)) {
      inPlanningBlock = false;
    }

    if (!inPlanningBlock) {
      cleanLines.push(line);
    }
  }

  return cleanLines.join('\n').trim();
}

export async function fetchExplanationStreaming(topic, levelKey = 'CHILD', onToken, onStart) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('Groq API Key is missing. Please set VITE_GROQ_API_KEY in .env.local');
  }

  const isEasterEgg = topic.trim().toLowerCase() === '42' || topic.trim().toLowerCase() === 'meaning of life';
  const levelConfig = COMPLEXITY_LEVELS[levelKey] || COMPLEXITY_LEVELS.CHILD;
  const systemPrompt = isEasterEgg ? EASTER_EGG_PROMPT : levelConfig.systemPrompt;

  const startTime = performance.now();
  let firstTokenTime = null;

  let response = null;
  let lastErrorMsg = '';

  for (const modelName of MODEL_CANDIDATES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Explain this topic clearly: "${topic}"` }
          ],
          temperature: 0.3,
          max_tokens: 750,
          stream: true
        })
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        response = res;
        break;
      } else {
        const errorData = await res.json().catch(() => ({}));
        lastErrorMsg = errorData.error?.message || `Groq API Error (${res.status})`;
      }
    } catch (err) {
      lastErrorMsg = err.message;
    }
  }

  if (!response || !response.ok) {
    throw new Error(lastErrorMsg || 'Groq API request failed across available models.');
  }

  if (onStart) onStart();

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let rawText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith(':')) continue;
      if (trimmed === 'data: [DONE]') continue;

      if (trimmed.startsWith('data: ')) {
        const jsonStr = trimmed.slice(6);
        try {
          const parsed = JSON.parse(jsonStr);
          const deltaContent = parsed.choices[0]?.delta?.content || '';

          if (deltaContent) {
            if (!firstTokenTime) {
              firstTokenTime = performance.now();
            }
            rawText += deltaContent;
            const cleanedText = sanitizeExplanation(rawText);

            if (onToken && (cleanedText || rawText)) {
              onToken(deltaContent, cleanedText || rawText);
            }
          }
        } catch (e) {
        }
      }
    }
  }

  const finalCleanText = sanitizeExplanation(rawText);

  const endTime = performance.now();
  const totalLatencyMs = Math.round(endTime - startTime);
  const ttfbMs = firstTokenTime ? Math.round(firstTokenTime - startTime) : totalLatencyMs;

  return {
    text: finalCleanText || rawText,
    latencyMs: totalLatencyMs,
    ttfbMs: ttfbMs,
    isEasterEgg
  };
}

export async function fetchExplanationNonStreaming(topic, levelKey = 'CHILD') {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('Groq API Key is missing. Please set VITE_GROQ_API_KEY in .env.local');
  }

  const isEasterEgg = topic.trim().toLowerCase() === '42' || topic.trim().toLowerCase() === 'meaning of life';
  const levelConfig = COMPLEXITY_LEVELS[levelKey] || COMPLEXITY_LEVELS.CHILD;
  const systemPrompt = isEasterEgg ? EASTER_EGG_PROMPT : levelConfig.systemPrompt;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL_CANDIDATES[0],
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Explain this topic clearly: "${topic}"` }
      ],
      temperature: 0.3,
      max_tokens: 700,
      stream: false
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Groq API Error (${response.status})`);
  }

  const data = await response.json();
  let rawText = data.choices[0]?.message?.content || '';
  return sanitizeExplanation(rawText);
}
