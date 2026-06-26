from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import StreamingResponse, FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

app = FastAPI(title="Akshay Babu - SDET Portfolio API")
api_router = APIRouter(prefix="/api")

# --- Resume context for AI ---
RESUME_CONTEXT = """
You are an AI assistant for AKSHAY BABU ANTHOORVEETTIL's portfolio. Answer questions about Akshay based ONLY on the resume facts below. Be concise, friendly and confident. If asked about something not in the resume, say you do not have that information and suggest contacting Akshay directly. Always speak about Akshay in the third person.

# Profile
- Name: Akshay Babu Anthoorveettil
- Title: Senior SDET / Automation Engineer (Web, Mobile, API, Desktop, iOS)
- Location: Hyderabad, Telangana, India
- Phone: +91 96524 66004
- Email: anthoorveettilakshaybabu@gmail.com
- Experience: 2.9+ years
- Award: "Star Contributor of the Quarter" at Coforge

# Professional Summary
Automation Engineer / SDET with 2.9+ years designing and scaling test automation frameworks across Web, Mobile, API, Desktop, and iOS using Java, Selenium, Appium, Playwright, Python, and TypeScript. Built Page Object Model code-generation frameworks, dynamic locator fallback / auto-healing engines, and reusable automation keyword libraries used across 7+ enterprise client projects (insurance, retail, automotive, hospitality). Hands-on with AWS Secrets Manager, Azure Key Vault, CI-driven execution engines, and cloud test infrastructure.

# Skills
- Automation Tools: Selenium WebDriver 4, Appium, Playwright, Selenium IDE, WinAppDriver, TestNG, JUnit, Maven
- Languages: Java (Core + OOP), Python, TypeScript/JavaScript, SQL, Shell Scripting (Bash)
- Frameworks & Design: Page Object Model, Hybrid (Web-to-Mobile) frameworks, Keyword-driven frameworks, BDD/Cucumber, Code-generation engines
- Testing Practices: SDLC, STLC, Agile/Scrum, Defect Lifecycle, Functional, Regression, Smoke, Compatibility, Integration, Cross-platform & Cross-browser
- Platforms: Web, Mobile (Android & iOS simulators + real devices), Windows Desktop, REST API
- Cloud & DevOps: AWS Secrets Manager, Azure Key Vault, BrowserStack, Git/GitHub, CI-integrated execution engines
- Specialized: Dynamic locator fallback & auto-healing, OCR-based validation (Tesseract, OpenCV), OTP automation (email & SMS via Twilio), Excel/PDF/JSON/DB automation utilities
- Tools/IDEs: Eclipse, IntelliJ, VS Code, PyCharm; Linux (Ubuntu, Kali), Windows

# Experience
1) Coforge — Engineer (SDET / Automation Engineer), Nov 2024 – Present
   - Architected Page Object Model frameworks for Playwright-based automated code generation (Python and TypeScript).
   - Built dynamic locator fallback and auto-healing engine using recorded element attributes; shipped via a merged platform PR.
   - Enabled end-to-end iOS automation for simulators and real devices: session recording, app discovery, parallel multi-device execution.
   - Developed reusable keyword libraries for Excel, PDF, JSON, DB, email-OTP, and Twilio mobile-OTP retrieval.
   - Built/enhanced code-generation services for web and REST API tests, including hybrid web-to-API code-gen pipeline.
   - Integrated AWS Secrets Manager and Azure Key Vault for secure credential handling.
   - Implemented Safari execution and resolved cross-browser/auth/locator/execution-engine defects.
   - Delivered across 7+ enterprise projects: Solstice (insurance, Playwright POM Python/TS), South West WorkTop (AWS Bedrock integration POC + code-gen service), M2A/Signet (portable wheel-file deployment + profile-based OTP-less login).

2) Cigniti Technologies — Associate Engineer, Feb 2024 – Nov 2024
   - Promoted from Trainee for consistent delivery.
   - Refactored core automation agent with factory patterns + POJO/Bean architecture; built unified InstaDriver wrapper for hybrid Web/Mobile/Windows, plus thread-safe Driver Manager.
   - Built multi-language test-code-generation platform (Java/TestNG, C#/NUnit, Python/Pytest), JSON-driven keyword-to-code mapping engine, microservices code-gen pipeline using Feign clients.
   - Built Tosca-to-platform migration utility for legacy test-case import.
   - Pepco: Windows desktop automation (Selenium 4 + WinAppDriver) + OCR-based POS validation; clipboard text extraction, window-switching, Gmail App-Password OTP, Tesseract/OpenCV across English/Slovak/Romanian.
   - Christies: shadow-DOM handling, scroll-to-element / scroll-until-element keywords; separated client-specific keyword classes to avoid regressions.
   - Supported POCs/demos: Neighborly, SystemC, Nike, BrightHorizons, Aurora Parts, Rainbird, HGV (Cypress, Salesforce test authoring, multi-app hybrid mobile execution).

3) Cigniti Technologies — Trainee → Intern, Jun 2023 – Feb 2024
   - Nucor: file-system utilities (latest-download detection), JS-path clicks for shadow/hidden elements, date-range validation, latest Excel/PDF readers with column verification.
   - Completed SDET & DevOps certification; hands-on with Cypress, WebdriverIO, Playwright, C#/NUnit, Python/Pytest, Java/Cucumber BDD, Tosca.

# Education
- B.Tech, Computer Science — Vaagdevi Engineering College, JNTU Hyderabad (2017–2022)
- Intermediate (MPC) — Narayana Junior College (2015–2017)

# Certifications
- SDET & DevOps Certification (organization-level structured training)
- Core DevOps: Moving Toward DevOps
- Mobile Interruption Testing and Charles Proxy
- Introducing Selenium & Locators
- Mobile Testing Fundamentals

# Achievements
- Star Contributor of the Quarter (Coforge)
- Delivered Chat Bot with IBM Watson Assistant (Honors)
- Campus Ambassador — Technozion 2019 & WAC 2019, NIT Warangal
- Campus Ambassador — Elan & Nvision 2019, IIT Hyderabad
"""


# --- Models ---
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatMessageDoc(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    role: str
    content: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactRequest(BaseModel):
    name: str
    email: str
    message: str


class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: str


# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "Akshay Babu SDET Portfolio API", "status": "online"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "ts": datetime.now(timezone.utc).isoformat()}


@api_router.post("/chat/stream")
async def chat_stream(req: ChatRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    session_id = req.session_id or str(uuid.uuid4())
    user_text = (req.message or "").strip()
    if not user_text:
        raise HTTPException(status_code=400, detail="Empty message")

    # Persist user message
    user_doc = ChatMessageDoc(session_id=session_id, role="user", content=user_text)
    doc = user_doc.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.chat_messages.insert_one(doc)

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=RESUME_CONTEXT,
    ).with_model("openai", "gpt-5.4")

    async def event_generator():
        full_text = ""
        try:
            async for ev in chat.stream_message(UserMessage(text=user_text)):
                if isinstance(ev, TextDelta):
                    full_text += ev.content
                    yield ev.content
                elif isinstance(ev, StreamDone):
                    break
        except Exception as e:
            logger.exception("LLM stream error: %s", e)
            yield f"\n[error] {str(e)}"
        finally:
            try:
                ai_doc = ChatMessageDoc(session_id=session_id, role="assistant", content=full_text)
                d = ai_doc.model_dump()
                d['created_at'] = d['created_at'].isoformat()
                await db.chat_messages.insert_one(d)
            except Exception:
                pass

    return StreamingResponse(
        event_generator(),
        media_type="text/plain; charset=utf-8",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(req: ContactRequest):
    name = (req.name or "").strip()
    email = (req.email or "").strip()
    message = (req.message or "").strip()
    if not name or not email or not message:
        raise HTTPException(status_code=400, detail="All fields required")

    new_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": new_id,
        "name": name,
        "email": email,
        "message": message,
        "created_at": created_at,
    }
    await db.contact_messages.insert_one(doc)
    return ContactResponse(id=new_id, name=name, email=email, message=message, created_at=created_at)


@api_router.get("/resume/download")
async def resume_download():
    path = ROOT_DIR / "static" / "Akshay_Babu_Resume_Senior_SDET.docx"
    if not path.exists():
        raise HTTPException(status_code=404, detail="Resume not found")
    return FileResponse(
        path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename="Akshay_Babu_Resume_Senior_SDET.docx",
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
