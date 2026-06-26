// Resume data extracted from Akshay Babu's resume
export const PROFILE = {
  name: "Akshay Babu Anthoorveettil",
  shortName: "Akshay Babu",
  role: "Senior SDET / Automation Engineer",
  tagline: "I build automation frameworks that ship release confidence.",
  location: "Hyderabad, Telangana, India",
  phone: "+91 96524 66004",
  email: "anthoorveettilakshaybabu@gmail.com",
  linkedin: "https://www.linkedin.com/in/anthoorveettilakshaybabu",
  github: "https://github.com/akshaybabu",
  portfolio: "#",
};

export const STATS = [
  { label: "Years building automation", value: "2.9+", unit: "yrs" },
  { label: "Enterprise client projects", value: "7+", unit: "projects" },
  { label: "Platforms automated", value: "5", unit: "W/M/A/D/iOS" },
  { label: "Org-level recognition", value: "Star", unit: "Contributor" },
];

export const SUMMARY = `Automation Engineer / SDET with 2.9+ years designing and scaling test automation frameworks across Web, Mobile, API, Desktop and iOS — using Java, Selenium, Appium, Playwright, Python and TypeScript. Proven record building Page Object Model code-generation frameworks, dynamic locator fallback / auto-healing engines, and reusable keyword libraries in production across 7+ enterprise client projects (insurance, retail, automotive, hospitality).`;

export const SKILLS = {
  Automation: [
    "Selenium WebDriver 4", "Appium", "Playwright", "Selenium IDE",
    "WinAppDriver", "TestNG", "JUnit", "Maven",
  ],
  Languages: [
    "Java (Core + OOP)", "Python", "TypeScript", "JavaScript",
    "SQL", "Shell / Bash",
  ],
  Frameworks: [
    "Page Object Model", "Hybrid Web-to-Mobile", "Keyword-driven",
    "BDD / Cucumber", "Code-generation engines",
  ],
  "Cloud / DevOps": [
    "AWS Secrets Manager", "Azure Key Vault", "BrowserStack",
    "Git / GitHub", "CI execution engines",
  ],
  Platforms: [
    "Web", "Android", "iOS (Sim + Real)", "Windows Desktop", "REST API",
  ],
  Specialized: [
    "Auto-healing locators", "OCR (Tesseract, OpenCV)",
    "OTP automation (Email + Twilio SMS)", "Excel / PDF / JSON / DB utils",
  ],
};

export const EXPERIENCE = [
  {
    company: "Coforge",
    role: "Engineer — SDET / Automation",
    period: "Nov 2024 — Present",
    location: "Hyderabad, India",
    tag: "current",
    bullets: [
      "Architected Page Object Model frameworks for Playwright-based code generation in Python & TypeScript, slashing manual scripting across multiple client projects.",
      "Built a dynamic locator fallback & auto-healing engine using recorded element attributes; shipped via a merged platform PR.",
      "Enabled end-to-end iOS automation (simulators + real devices): session recording, app discovery, parallel multi-device execution.",
      "Integrated AWS Secrets Manager & Azure Key Vault for secure cloud credential handling in test execution.",
      "Implemented Safari support and resolved cross-browser, auth, locator, and execution-engine defects.",
      "Delivered across 7+ enterprise projects spanning insurance, retail/automotive and hospitality.",
    ],
    chips: ["Playwright", "Python", "TypeScript", "iOS", "AWS", "Azure"],
  },
  {
    company: "Cigniti Technologies",
    role: "Associate Engineer",
    period: "Feb 2024 — Nov 2024",
    location: "Hyderabad, India",
    tag: "promoted",
    bullets: [
      "Promoted from Trainee after consistently delivering automation features across multiple concurrent projects.",
      "Refactored core automation agent with factory patterns + POJO/Bean architecture; built unified InstaDriver wrapper for hybrid Web/Mobile/Windows plus a thread-safe Driver Manager.",
      "Built a multi-language test-code-generation platform (Java/TestNG, C#/NUnit, Python/Pytest) with JSON-driven keyword-to-code mapping and microservices code-gen pipeline using Feign clients.",
      "Built a Tosca-to-platform migration utility — accelerated client migrations off Tosca.",
      "Pepco: Windows desktop automation (Selenium 4 + WinAppDriver) + OCR-based POS validation (Tesseract / OpenCV across English, Slovak, Romanian).",
    ],
    chips: ["Java", "C#", "Python", "WinAppDriver", "OCR", "Microservices"],
  },
  {
    company: "Cigniti Technologies",
    role: "Trainee → Intern",
    period: "Jun 2023 — Feb 2024",
    location: "Hyderabad, India",
    tag: "started",
    bullets: [
      "Nucor: file-system utilities, JS-path clicks for shadow/hidden elements, date-range validation, Excel/PDF readers with column verification.",
      "Completed structured SDET & DevOps certification while delivering live project tasks.",
      "Hands-on with Cypress, WebdriverIO, Playwright, C#/NUnit, Python/Pytest, Java/Cucumber BDD, and Tosca through self-driven rotations.",
    ],
    chips: ["Cypress", "WebdriverIO", "Cucumber", "Tosca"],
  },
];

export const PROJECTS = [
  {
    code: "PRJ_001",
    name: "Solstice — Insurance Platform",
    domain: "Insurance",
    stack: ["Playwright", "Python", "TypeScript", "POM"],
    summary: "Designed Python/TypeScript Playwright POM framework + insurance calculation keyword library. Powered automation for complex multi-step quote/bind flows.",
    impact: "Cut scripting effort across the insurance suite",
  },
  {
    code: "PRJ_002",
    name: "South West WorkTop — AWS Bedrock POC",
    domain: "Retail / Automotive",
    stack: ["AWS Bedrock", "Code-gen", "Playwright"],
    summary: "Critical-priority POC integrating AWS Bedrock with a dedicated code-generation service for AI-assisted test authoring.",
    impact: "Unblocked a key enterprise pursuit with AI-augmented automation",
  },
  {
    code: "PRJ_003",
    name: "M2A / Signet — Portable Deployment",
    domain: "Retail",
    stack: ["Python", "Wheel files", "Auth"],
    summary: "Portable wheel-file deployment architecture + profile-based OTP-less login support for distributed test execution.",
    impact: "Simplified rollout across client environments",
  },
  {
    code: "PRJ_004",
    name: "Pepco — POS Desktop OCR",
    domain: "Retail",
    stack: ["Selenium 4", "WinAppDriver", "Tesseract", "OpenCV"],
    summary: "Windows desktop automation + OCR-based POS validation across English, Slovak and Romanian. Clipboard text extraction, custom window switching, Gmail App-Password OTP.",
    impact: "Trained teammates via KT sessions",
  },
  {
    code: "PRJ_005",
    name: "Christies — Hospitality",
    domain: "Hospitality",
    stack: ["Selenium", "Shadow DOM"],
    summary: "Shadow-DOM element handling, scroll-to-element and scroll-until-element keywords. Separated client-specific keyword classes from core platform to prevent regressions.",
    impact: "Stabilised hospitality client release pipeline",
  },
  {
    code: "PRJ_006",
    name: "Auto-Healing Locator Engine",
    domain: "Platform",
    stack: ["Playwright", "POM", "Attributes"],
    summary: "Dynamic locator fallback engine using recorded element attributes; reduces test maintenance when primary/alternate locators fail. Shipped via merged platform PR.",
    impact: "Now in production across multiple client suites",
  },
];

export const CERTS = [
  "SDET & DevOps Certification — Organization-level structured training",
  "Core DevOps Skills — Moving Toward DevOps",
  "Mobile Interruption Testing & Charles Proxy",
  "Introducing Selenium & Locators",
  "Mobile Testing Fundamentals — Types & Techniques",
];

export const AWARDS = [
  { title: "Star Contributor of the Quarter", org: "Coforge", year: "2025" },
  { title: "IBM Watson Assistant Chatbot — Honors Project", org: "B.Tech CSE", year: "2022" },
  { title: "Campus Ambassador — Technozion & WAC 2019", org: "NIT Warangal", year: "2019" },
  { title: "Campus Ambassador — Elan & Nvision 2019", org: "IIT Hyderabad", year: "2019" },
];

export const EDUCATION = [
  { degree: "B.Tech, Computer Science", school: "Vaagdevi Engineering College, JNTU Hyderabad", period: "2017 — 2022" },
  { degree: "Intermediate — MPC", school: "Narayana Junior College", period: "2015 — 2017" },
];
