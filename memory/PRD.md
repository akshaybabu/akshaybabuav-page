# PRD — Akshay Babu SDET Portfolio

## Original Problem Statement
> Build a landing page: using this resume create a portfolio with best ever portfolio ever an SDET can have.

Subject: Akshay Babu Anthoorveettil — Senior SDET / Automation Engineer, Hyderabad.

## User Personas
- **Recruiters / Talent Acquisition** — scanning for keywords, downloading resume.
- **Engineering Managers / Hiring Managers** — assessing depth of automation work.
- **Developers / SDET peers** — appreciating the engineering aesthetic + auto-healing locator story.

## Architecture
- **Frontend**: React (CRA, Tailwind), framer-motion animations, sonner toasts, lucide-react icons, JetBrains Mono + Inter Tight typography. Single-page portfolio.
- **Backend**: FastAPI + MongoDB (motor). All routes prefixed `/api`.
- **Integrations**: `emergentintegrations` LlmChat with EMERGENT_LLM_KEY (currently using `openai/gpt-5.4` because `anthropic/claude-sonnet-4-6` returned a budget-exceeded error on this universal key).

## Core Requirements (static)
1. Single-page SDET portfolio with terminal/IDE aesthetic.
2. Live test-runner "Automation Demo" — typewriter + log stream + auto-healing storyline.
3. Skills matrix filterable by category.
4. Experience timeline (3 roles).
5. Featured projects (6 case studies).
6. "Ask Akshay's AI" — streaming LLM chat grounded in resume.
7. Contact form persisting to MongoDB.
8. Resume (.docx) download.

## Implemented (2026-06-26)
- Hero with stats-ready CTA, file-tree terminal panel, animated entrance.
- Stats strip (4 cards) + marquee of tech keywords.
- AutomationDemo with Playwright test typewriter + 15-step log stream + replay.
- About with 4 engineering principles.
- Skills matrix with 6 categories + All filter.
- Git-log-style experience timeline with chips.
- 6-project bento grid with hover impact reveal.
- Ask AI: streaming chat endpoint, 4 suggestion buttons, reset.
- Education + Certifications + Awards 3-column grid.
- Contact form (validates, persists to `contact_messages` collection, sonner toasts).
- Footer with year + meta line.
- Resume download endpoint (`/api/resume/download`) serving original .docx.
- 100% pass on testing agent (backend + frontend).

## Prioritized Backlog
- **P1**
  - Replace placeholder LinkedIn / GitHub URLs once Akshay shares them.
  - Restore Claude Sonnet 4.6 model once the LLM key budget is topped up (Profile → Universal Key → Add Balance).
  - Add Open Graph + favicon for share previews.
- **P2**
  - Light/dark theme toggle.
  - Blog / writing section (case-study deep dives).
  - Animated SVG of "auto-healing locator" pipeline.
  - Captcha / spam protection on contact form.
- **P3**
  - i18n (English / Hindi / Slovak / Romanian — nodding to Pepco multi-lang work).
  - PDF resume in addition to .docx.

## Notes for Future Work
- The chat model is set in `/app/backend/server.py` line `.with_model("openai", "gpt-5.4")`. Switch back to `("anthropic", "claude-sonnet-4-6")` once budget allows.
- All interactive elements have `data-testid` attributes per spec.
