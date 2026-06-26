# Akshay Babu — SDET Portfolio

A terminal/IDE-inspired single-page portfolio for **Akshay Babu Anthoorveettil**, Senior SDET / Automation Engineer. Static UI, no backend — deploys to GitHub Pages via GitHub Actions.

🔴 **Live:** https://akshaybabu.github.io  *(after first successful deploy)*

---

## Highlights

- **Live "Automation Demo"** — watch a Playwright test type itself out, then a streaming log shows the auto-healing locator engine rescue a flaky run.
- **Filterable skills matrix** — Automation, Languages, Frameworks, Cloud/DevOps, Platforms, Specialized.
- **Git-log experience timeline** — 3 roles styled as `git commit` history.
- **6 project case studies** — Solstice (insurance), South West WorkTop (AWS Bedrock POC), M2A/Signet, Pepco POS OCR, Christies hospitality, Auto-Healing Locator Engine.
- **Education · Certifications · Awards** in a 3-column grid (Star Contributor of the Quarter).
- **Contact form** opens the visitor's email client via `mailto:` — no backend needed.
- **Resume download** (`.docx`) served as a static asset.

---

## Tech Stack

| Layer       | Tech                                                              |
| ----------- | ----------------------------------------------------------------- |
| Frontend    | React 19 (CRA via CRACO), Tailwind CSS, framer-motion, lucide-react, sonner |
| Typography  | Inter Tight (display) · JetBrains Mono (body / code)              |
| Animations  | framer-motion (typewriter, log streaming, staggered reveals)      |
| Deployment  | GitHub Pages via GitHub Actions                                   |

> **Note:** Earlier iterations included a FastAPI + MongoDB backend with an "Ask AI" chat (Claude / GPT-5.4 via Emergent Universal LLM Key) and a persisted contact form. Those were removed to make the site fully static and GitHub-Pages-deployable. The backend source is preserved under `/backend` for reference but is **not** required to run or deploy the portfolio.

---

## Project Structure

```
.
├── .github/workflows/deploy.yml     # GitHub Pages deploy (Node 22, CRA build)
├── frontend/                        # ← the deployable static site
│   ├── public/
│   │   ├── index.html
│   │   └── Akshay_Babu_Resume_Senior_SDET.docx
│   ├── src/
│   │   ├── App.js / App.css
│   │   ├── index.js / index.css
│   │   ├── pages/Portfolio.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── StatsStrip.jsx
│   │   │   ├── AutomationDemo.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── EducationAwards.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ui/                  # shadcn/ui primitives
│   │   └── data/resume.js           # all resume content lives here
│   ├── tailwind.config.js
│   ├── package.json                 # homepage: "." → portable static paths
│   └── yarn.lock
├── backend/                         # legacy FastAPI (not deployed)
└── README.md
```

---

## Run Locally

```bash
cd frontend
yarn install
yarn start          # http://localhost:3000
```

Build the production bundle:

```bash
cd frontend
yarn build          # outputs frontend/build/
```

The build is fully static — open `frontend/build/index.html` in a browser or serve with any static file server (`npx serve frontend/build`).

---

## Deploy to GitHub Pages

The repo ships with a ready-to-use workflow at `.github/workflows/deploy.yml`.

### One-time setup
1. Push this repo to GitHub.
2. Go to **Settings → Pages → Source** and choose **GitHub Actions**.

### Every push to `main`
The workflow will:
- Check out the repo
- Install Node 22 and run `yarn install --frozen-lockfile`
- Build the CRA bundle with `REACT_APP_BACKEND_URL=""` and `CI=false`
- Copy `index.html → 404.html` (SPA fallback) and add `.nojekyll`
- Upload `frontend/build` and publish via `actions/deploy-pages@v4`

Manual trigger: **Actions tab → Deploy Portfolio to GitHub Pages → Run workflow**.

### Personal vs. project Pages
- **Personal site** (`akshaybabu.github.io` repo) → served at `https://akshaybabu.github.io`
- **Project repo** (e.g. `sdet-portfolio`) → served at `https://akshaybabu.github.io/sdet-portfolio/`

Both work out of the box because `package.json` sets `"homepage": "."` (relative paths).

### Custom domain
Add a file `frontend/public/CNAME` containing your domain (e.g. `akshaybabu.dev`) and configure DNS to point to GitHub Pages.

---

## Customising the Content

All resume content is in **one file**: `frontend/src/data/resume.js`.

Edit any of these exports to update the site:

| Export        | What it controls                          |
| ------------- | ----------------------------------------- |
| `PROFILE`     | name, role, contact, social URLs          |
| `STATS`       | 4 hero stat cards                         |
| `SUMMARY`     | About-section paragraph                   |
| `SKILLS`      | Skills matrix (object of categories)      |
| `EXPERIENCE`  | Work timeline (array of 3 roles)          |
| `PROJECTS`    | Project case-study cards                  |
| `CERTS`       | Certifications list                       |
| `AWARDS`      | Awards / achievements                     |
| `EDUCATION`   | Degrees                                   |

To replace the resume file, drop your new `.docx` (or `.pdf`) into `frontend/public/` and update the filename in `Navbar.jsx` and `Contact.jsx` (search for `Akshay_Babu_Resume_Senior_SDET.docx`).

---

## License

Source code: MIT.
Resume content & personal branding: © Akshay Babu Anthoorveettil — all rights reserved.

---

## Contact

- **Email** — anthoorveettilakshaybabu@gmail.com
- **LinkedIn** — [linkedin.com/in/anthoorveettilakshaybabu](https://www.linkedin.com/in/anthoorveettilakshaybabu)
- **GitHub** — [github.com/akshaybabu](https://github.com/akshaybabu)
- **Location** — Hyderabad, India
