import { COMPLEXITY_LEVELS, EASTER_EGG_PROMPT } from '../utils/prompts';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL_CANDIDATES = [
  'openai/gpt-oss-20b',
  'qwen/qwen3.6-27b',
  'openai/gpt-oss-120b',
  'groq/compound-mini'
];

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
          temperature: 0.4,
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

            let cleanText = rawText;
            if (cleanText.includes('</think>')) {
              cleanText = cleanText.split('</think>').pop();
            }
            cleanText = cleanText.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/<think>[\s\S]*/gi, '').trim();

            if (onToken && (cleanText || rawText)) {
              onToken(deltaContent, cleanText || rawText);
            }
          }
        } catch (e) {
        }
      }
    }
  }

  let finalCleanText = rawText;
  if (finalCleanText.includes('</think>')) {
    finalCleanText = finalCleanText.split('</think>').pop();
  }
  finalCleanText = finalCleanText.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/<think>[\s\S]*/gi, '').trim();

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
      temperature: 0.4,
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
  if (rawText.includes('</think>')) {
    rawText = rawText.split('</think>').pop();
  }
  return rawText.trim();
}
