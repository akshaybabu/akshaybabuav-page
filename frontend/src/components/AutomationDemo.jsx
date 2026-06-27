import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SCRIPT = `from playwright.sync_api import sync_playwright

def test_insurance_quote_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("https://example.com/quote")
        page.fill("[data-testid=age-input]", "32")
        page.select_option("[data-testid=cover-select]", "premium")
        page.click("[data-testid=calculate-btn]")
        assert page.locator("[data-testid=quote-result]").is_visible()
        browser.close()`;

const LOG_STEPS = [
  { delay: 200, type: "info", text: "› akshay@company.com ~ % pytest tests/test_insurance_quote.py -v" },
  { delay: 500, type: "muted", text: "platform linux -- Python 3.11.4, pytest-7.4.0, playwright-1.42.0" },
  { delay: 500, type: "muted", text: "collected 1 item" },
  { delay: 600, type: "info", text: "tests/test_insurance_quote.py::test_insurance_quote_flow " },
  { delay: 400, type: "step", text: "  → launching chromium (headless)" },
  { delay: 350, type: "step", text: "  → navigate https://.example.com/quote" },
  { delay: 300, type: "step", text: "  → fill age-input = 32" },
  { delay: 250, type: "warn", text: "  ⚠ primary locator [data-testid=cover-select] failed" },
  { delay: 350, type: "step", text: "  → auto-healing: trying recorded fallback attrs..." },
  { delay: 300, type: "ok", text: "  ✓ healed via aria-label=\"coverage selection\"" },
  { delay: 250, type: "step", text: "  → click calculate-btn" },
  { delay: 350, type: "ok", text: "  ✓ quote-result visible (₹ 24,890 / yr)" },
  { delay: 300, type: "ok", text: "PASSED" },
  { delay: 250, type: "muted", text: "─────────────────────────────────────" },
  { delay: 200, type: "ok", text: "1 passed in 4.21s   100% PASS RATE" },
];

function colorFor(type) {
  switch (type) {
    case "ok": return "text-emerald-400";
    case "warn": return "text-amber-400";
    case "muted": return "text-white/40";
    case "info": return "text-sky-400";
    case "step": return "text-white/70";
    default: return "text-white/70";
  }
}

export default function AutomationDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [typed, setTyped] = useState("");
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  // Typewriter for code
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    setTyped("");
    setLogs([]);
    const id = setInterval(() => {
      i++;
      setTyped(SCRIPT.slice(0, i));
      if (i >= SCRIPT.length) {
        clearInterval(id);
        setTimeout(() => setRunning(true), 400);
      }
    }, 8);
    return () => clearInterval(id);
  }, [inView]);

  // Stream logs
  useEffect(() => {
    if (!running) return;
    let cancelled = false;
    let acc = 0;
    LOG_STEPS.forEach((s, idx) => {
      acc += s.delay;
      setTimeout(() => {
        if (cancelled) return;
        setLogs((prev) => [...prev, s]);
      }, acc);
    });
    return () => { cancelled = true; };
  }, [running]);

  const replay = () => {
    setRunning(false);
    setTyped("");
    setLogs([]);
    setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTyped(SCRIPT.slice(0, i));
        if (i >= SCRIPT.length) {
          clearInterval(id);
          setTimeout(() => setRunning(true), 400);
        }
      }, 8);
    }, 100);
  };

  return (
    <section
      id="automation-demo"
      data-testid="automation-demo-section"
      className="relative py-20 md:py-28"
      ref={ref}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="kicker">LIVE_DEMO</span>
            <h2 className="h-section text-white mt-4">
              A test, running.<br />
              <span className="text-white/40">Watch the auto-healer</span> <span className="text-emerald-400">save the build.</span>
            </h2>
          </div>
          <button
            data-testid="automation-demo-replay"
            onClick={replay}
            className="btn-sharp ghost self-start md:self-end"
          >
            ↻ Replay
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10">
          {/* Code panel */}
          <div className="term scanlines">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-xs text-white/50">
                test_insurance_quote.py
              </span>
              <span className="ml-auto font-mono text-[10px] text-white/40 uppercase tracking-widest">
                Python · Playwright
              </span>
            </div>
            <pre
              data-testid="automation-demo-code"
              className="p-5 md:p-6 font-mono text-[12.5px] leading-relaxed text-white/85 whitespace-pre-wrap min-h-[420px]"
            >
              <code>{typed}</code>
              {typed.length < SCRIPT.length && <span className="caret-inline" />}
            </pre>
          </div>

          {/* Logs panel */}
          <div className="term scanlines">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-xs text-white/50">
                runner.log
              </span>
              <span className="ml-auto font-mono text-[10px] text-emerald-400 uppercase tracking-widest inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                {running ? "RUNNING" : "WAITING"}
              </span>
            </div>
            <div
              data-testid="automation-demo-logs"
              className="p-5 md:p-6 font-mono text-[12.5px] leading-relaxed min-h-[420px]"
            >
              {logs.length === 0 && (
                <div className="text-white/30">
                  <span className="text-emerald-400">$</span> waiting for code...
                </div>
              )}
              {logs.map((l, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${colorFor(l.type)} whitespace-pre-wrap`}
                >
                  {l.text}
                </motion.div>
              ))}
              {logs.length === LOG_STEPS.length && (
                <div className="mt-6 border border-emerald-500/40 bg-emerald-500/5 p-4 flex items-center justify-between">
                  <div className="text-emerald-400 font-mono text-xs uppercase tracking-widest">
                    BUILD PASSED — auto-healed 1 selector
                  </div>
                  <div className="text-emerald-300 font-display text-2xl">100%</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
