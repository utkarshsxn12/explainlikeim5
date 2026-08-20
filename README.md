<div align="center">

# ELI5 — Explain Like I'm 5

### For everything you've smiled and nodded at while your brain buffered.

[![Groq](https://img.shields.io/badge/Powered%20by-Groq-C6FF00?style=for-the-badge&logo=lightning&logoColor=black)](https://groq.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge)](#license)

**[Live Demo](#) · [Report Bug](#) · [Request Feature](#)**

</div>

---

## What is this

Type literally anything confusing. Get it explained back to you in **seconds**, streamed live, at exactly the depth you asked for — bullet points for a 5-year-old, structured breakdowns for a curious teenager, or dense technical detail for someone who already knows what a Hamiltonian is.

No sign-up. No fake stats. No "10,000+ happy users" nonsense. Just fast, honest, real-time AI explanations powered by [Groq](https://groq.com)'s absurdly fast inference.

---

## Why it exists

Everyone has nodded along in a meeting, a lecture, or a group chat pretending to understand something they had zero grip on. This fixes that — in the time it takes you to read this sentence.

---

## Features

| | |
|---|---|
| ⚡ **Real-time streaming** | Tokens render as they arrive from Groq — no waiting on a spinner |
| 🎚️ **Three complexity modes** | `5yo` → bullet points only · `15yo` → structured headings · `Expert` → dense technical breakdown |
| 🌗 **Full dark mode** | Every component, no half-measures |
| 📚 **Expert sources** | Real Wikipedia / Scholar / YouTube links auto-generated per topic — no hallucinated citations |
| 🕐 **Live response timer** | Actual measured Groq latency, not a fake number |
| 🧠 **Recent topics** | Quick-access chips for your last few searches |
| 🥚 **Easter egg** | Somewhere in here. Good luck. |

---

## Tech Stack

```
Frontend      React + Vite
Styling       Tailwind CSS
Animation     Framer Motion
Inference     Groq API (llama-3.3-70b-versatile)
Deployment    Vercel / Netlify
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com/keys)

### Installation

```bash
# clone it
git clone https://github.com/your-username/eli5.git
cd eli5

# install dependencies
npm install

# add your API key
echo "VITE_GROQ_API_KEY=your_key_here" > .env

# run it
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start asking dumb questions. There are no dumb questions here. That's the entire point.

---

## How the complexity modes work

```
┌─────────┬─────────────────────────────────────────┐
│  Mode   │  What you get                            │
├─────────┼─────────────────────────────────────────┤
│  5yo    │  5-6 bullet points. Zero jargon.         │
│  15yo   │  Headings + subheadings. Basic terms ok. │
│  Expert │  Full technical depth. No hand-holding.  │
└─────────┴─────────────────────────────────────────┘
```

Each mode sends a distinct system prompt to Groq — not just "simplify this," but explicit formatting and depth rules, so the difference is real, not cosmetic.

---

## Project Structure

```
eli5/
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ComplexitySlider.jsx
│   │   ├── StreamingResponse.jsx
│   │   └── SourceLinks.jsx
│   ├── hooks/
│   │   └── useGroqStream.js
│   ├── lib/
│   │   └── prompts.js
│   └── App.jsx
├── .env.example
└── README.md
```

---

## Honesty, by design

Every number on this page is real:

- Response times are **measured**, not decorative
- Source links are **generated from real URL patterns** (Wikipedia, Scholar, YouTube) — never invented by the model
- No fabricated testimonials, no fake user counts, no stock-photo logos

If a field can't be verified, it isn't shown.

---

## Roadmap

- [ ] Save explanations to a personal history
- [ ] Voice input
- [ ] Shareable explanation cards
- [ ] More complexity presets (ELI-boomer? ELI-recruiter?)

---

## License

MIT — do whatever you want with it, just don't claim you built Groq.

---

<div align="center">

**Built for the confidently confused.**

</div>
