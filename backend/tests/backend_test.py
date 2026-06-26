"""Backend tests for Akshay Babu SDET Portfolio API."""
import os
import pytest
import requests
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")
load_dotenv("/app/frontend/.env")

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def mongo():
    cli = MongoClient(MONGO_URL)
    yield cli[DB_NAME]
    cli.close()


# --- Health endpoints ---
class TestHealth:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        j = r.json()
        assert j.get("status") == "online"

    def test_health(self, api):
        r = api.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# --- Chat streaming ---
class TestChatStream:
    def test_stream_returns_text(self, api):
        r = api.post(
            f"{BASE_URL}/api/chat/stream",
            json={"message": "What frameworks has Akshay built?"},
            stream=True,
            timeout=60,
        )
        assert r.status_code == 200
        ct = r.headers.get("content-type", "").lower()
        assert "text/plain" in ct
        # streaming: no content-length OR chunked
        cl = r.headers.get("content-length")
        te = r.headers.get("transfer-encoding", "").lower()
        assert (cl is None) or ("chunked" in te)
        body = ""
        for chunk in r.iter_content(chunk_size=None, decode_unicode=True):
            if chunk:
                body += chunk
            if len(body) > 4000:
                break
        r.close()
        assert len(body) > 0
        low = body.lower()
        assert any(k in low for k in ["playwright", "selenium", "page object model", "automation"]), f"Body: {body[:500]}"

    def test_stream_empty_message(self, api):
        r = api.post(f"{BASE_URL}/api/chat/stream", json={"message": ""})
        assert r.status_code == 400


# --- Contact ---
class TestContact:
    def test_contact_create_and_persist(self, api, mongo):
        payload = {
            "name": "TEST_Akshay Tester",
            "email": "TEST_tester@example.com",
            "message": "TEST_Hello from pytest",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        j = r.json()
        for f in ["id", "name", "email", "message", "created_at"]:
            assert f in j
        assert j["name"] == payload["name"]
        assert j["email"] == payload["email"]
        assert j["message"] == payload["message"]
        # verify persisted
        doc = mongo.contact_messages.find_one({"id": j["id"]})
        assert doc is not None
        assert doc["email"] == payload["email"]
        # cleanup
        mongo.contact_messages.delete_one({"id": j["id"]})

    def test_contact_missing_fields(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json={"name": "", "email": "", "message": ""})
        assert r.status_code == 400

    def test_contact_missing_keys(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json={"name": "x"})
        assert r.status_code in (400, 422)


# --- Resume download ---
class TestResume:
    def test_resume_download(self, api):
        r = api.get(f"{BASE_URL}/api/resume/download")
        assert r.status_code == 200
        ct = r.headers.get("content-type", "")
        assert "officedocument.wordprocessingml.document" in ct
        assert len(r.content) > 1000
