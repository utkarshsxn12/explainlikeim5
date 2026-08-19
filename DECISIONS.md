# Engineering & Architectural Decisions (DECISIONS.md)

---

### 1. Why this Ingestion Strategy over the Obvious Alternative?

We chose **Real-Time Client-Side SSE Streaming (Server-Sent Events)** using native `ReadableStream` and `TextDecoder` to process token chunks directly from Groq's high-speed inference pipeline.

- **Rejected Alternative**: Batch REST Polling / Non-Streaming Completion (waiting for the full response before rendering).
- **Why**: Batch requests require 2 to 5 seconds of latency before rendering anything, creating a "stuck/frozen" UX. SSE streaming delivers a Time-To-First-Byte (TTFB) of **~60-150ms**, allowing the user to start reading the explanation instantly while tokens stream in real-time.

---

### 2. Trade-off Under Time Limit vs. Full Week Execution

- **Trade-off Made**: Implemented a lightweight browser-native API client with fallback model candidates (`openai/gpt-oss-20b`, `qwen/qwen3.6-27b`) and client-side stream filtering (`reasoning_format: 'hidden'`), rather than deploying a dedicated backend proxy server.
- **What I'd Do with a Real Week**:
  1. Build an Edge Proxy (Node.js/FastAPI) with Redis caching for top queries ("Blockchain", "Quantum Computing") to serve cached explanations in **<5ms**.
  2. Implement backend rate-limiting, user query history persistence, and custom vector RAG ingestion for verified academic citations in Expert Mode.
  3. Add WebSockets telemetry for granular token speed and model fallback metrics.

---

### 3. AI Tool Usage & Personal Verification/Iterative Guidance

AI tools were used strictly as an assistant for boilerplate generation and rapid UI scaffolding. The human engineer directed all architecture, prompt engineering, and quality control:

- **Prompt Engineering & Tone Discipline**: Manually defined strict format rules for each complexity level (e.g., exactly 5-6 short bullet points under 15 words for 5yo; 4 structured sections for Expert) and gave iterative feedback when the AI outputted generic walls of text.
- **Backend Model & Reasoning Suppression**: Discovered and resolved an issue where reasoning models streamed internal `<think>...</think>` thought chains to the UI. Configured `reasoning_format: 'hidden'` at the API level and wrote custom stream-cleaning logic to guarantee clean text output.
- **Design Identity & Micro-Interactions**: Rejected generic "AI template" aesthetics. Designed a warm Neutral Nude (`#FAF6EE`) light theme, an Oxford Blue (`#02122F`) & Storm (`#23354D`) dark theme, an interactive cursor radial aura spotlight, and smooth Framer Motion spring physics.
