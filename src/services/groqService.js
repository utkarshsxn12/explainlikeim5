import { COMPLEXITY_LEVELS, EASTER_EGG_PROMPT } from '../utils/prompts';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL_CANDIDATES = [
  'qwen/qwen3.6-27b',
  'openai/gpt-oss-20b',
  'openai/gpt-oss-120b',
  'groq/compound-mini'
];

function sanitizeExplanation(raw) {
  if (!raw) return '';

  let text = raw;

  if (text.includes('</think>')) {
    text = text.split('</think>').pop();
  } else if (text.includes('<think>')) {
    return '';
  }

  if (text.includes("Here's a thinking process:")) {
    const headingIndex = text.search(/\n##\s+|\n-\s+/);
    if (headingIndex !== -1) {
      text = text.slice(headingIndex);
    } else {
      return '';
    }
  }

  const lines = text.split('\n');
  const cleanLines = lines.filter(line => {
    const trimmed = line.trim();
    if (!trimmed) return true;
    if (trimmed.startsWith('<think>') || trimmed.startsWith('</think>')) return false;
    if (trimmed.includes("Here's a thinking process")) return false;
    if (/^-\s*(Analyze|Topic:|Target Audience|Critical Instruction|Required Structure|Constraints|Deconstruct|Format:|Count:|Length:|Vocabulary:|No jargon|Check Constraints|Only bullet|5-6 bullets|Each starts|Brainstorming Content)/i.test(trimmed)) return false;
    if (/^(Analyze User Input|Target Audience|Critical Instruction|Required Structure|Constraints|Deconstruct Constraints|Check Constraints):?$/i.test(trimmed)) return false;
    return true;
  });

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
      const timeoutId = setTimeout(() => controller.abort(), 5000);

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
          const deltaReasoning = parsed.choices[0]?.delta?.reasoning || '';
          const delta = deltaContent || deltaReasoning || '';

          if (delta) {
            rawText += delta;
            const cleanedText = sanitizeExplanation(rawText);

            if (cleanedText) {
              if (!firstTokenTime) {
                firstTokenTime = performance.now();
              }
              if (onToken) {
                onToken(delta, cleanedText);
              }
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
  const rawText = data.choices[0]?.message?.content || '';
  return sanitizeExplanation(rawText);
}
