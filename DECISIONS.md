# Architectural & Technical Engineering Decisions

This document details every major technical, design, and performance decision made while building the ELI5 application.

---

## 1. Tech Stack Selection

- **React + Vite**: Chosen for lightning-fast module replacement (HMR), minimal bundle footprint, and native support for modern JavaScript standard ES modules.
- **Tailwind CSS (Customized)**: Configured with custom design system tokens (`cute-pink`, `cute-purple`, `cute-indigo`, `cute-bgLight`, `cute-bgDark`) to completely eliminate default Tailwind "cliché" aesthetics and create a bespoke visual identity.
- **Framer Motion**: Used for layout animations (`layoutId="sliderIndicator"`), bouncy spring physics on button clicks, and enter/exit states on cards and modal dialogs.
- **Groq API (`llama-3.3-70b-versatile`)**: Selected for industry-leading inferencing speed and ultra-low Time-To-First-Byte (TTFB ~150-250ms).

---

## 2. Real-Time Token Streaming Architecture

- **Mechanism**: Implemented native Browser `fetch` with `ReadableStream` and `TextDecoder` to consume Groq's Server-Sent Events (SSE) standard output.
- **Typewriter Rendering**: Tokens are appended directly to React state as they arrive from the network stream without artificial delays, paired with a CSS blinking cursor (`typing-cursor`).
- **High-Precision Latency Tracking**: Uses `performance.now()` before sending the HTTP request and records TTFB on the first chunk read, as well as total duration upon `done: true`.

---

## 3. Dynamic Prompt Engineering & Complexity Scaling

- **5yo Mode (Child)**: Limits explanations to 110 words with playground/candy analogies, simple words, and zero jargon.
- **15yo Mode (Teen)**: Uses modern relatable high-school contexts with digestible paragraph structuring up to 160 words.
- **Expert Mode (Graduate)**: Focuses strictly on mechanics, trade-offs, architecture, and precise technical jargon up to 200 words.

---

## 4. UI Aesthetics & Micro-Interactions

- **Font Pairing**: Google Fonts `Space Grotesk` (expressive, geometric display font for headers) + `Plus Jakarta Sans` (ultra-legible, modern sans-serif body font).
- **Tactile Slider**: Bouncy emoji animations (`🧒`, `🧑`, `🎓`) with layout morphing via Framer Motion.
- **Responsive Layout**: Designed mobile-first, ensuring zero horizontal scroll down to 390px viewports (iPhone SE / 12 mini) and rich multi-column layouts up to 1440px desktop displays.

---

## 5. Easter Egg Implementation

- Triggers when searching for `"42"` or `"meaning of life"`.
- Integrates `canvas-confetti` fireworks with Hitchhiker's Guide to the Galaxy custom theme and modal display.
