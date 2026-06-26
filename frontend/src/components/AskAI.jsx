import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CornerDownLeft, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const API = process.env.REACT_APP_BACKEND_URL;

const SUGGESTIONS = [
  "What automation frameworks has Akshay built?",
  "Tell me about the auto-healing locator engine",
  "Which enterprise clients has Akshay shipped for?",
  "What's Akshay's experience with iOS automation?",
];

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function AskAI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [sessionId] = useState(() => uid());
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || streaming) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const res = await fetch(`${API}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, session_id: sessionId }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: next[next.length - 1].content + chunk,
          };
          return next;
        });
      }
    } catch (e) {
      toast.error("Could not reach the AI. Try again in a moment.");
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "Sorry — the AI service is unavailable right now.",
        };
        return next;
      });
    } finally {
      setStreaming(false);
    }
  };

  const reset = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <section id="ask-ai" data-testid="ask-ai-section" className="relative py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="kicker">/INTERROGATE</span>
            <h2 className="h-section text-white mt-4">
              Ask Akshay&apos;s <span className="text-fuchsia-400">AI</span>.
            </h2>
            <p className="mt-5 text-sm text-white/60 leading-relaxed">
              Skip the recruiter call. This terminal answers questions about
              Akshay&apos;s frameworks, projects and stack — grounded in his resume,
              streaming token-by-token from the LLM.
            </p>

            <div className="mt-8 space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35 mb-2">Try asking</div>
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  data-testid={`ask-ai-suggestion-${i}`}
                  onClick={() => send(s)}
                  disabled={streaming}
                  className="block w-full text-left border border-white/10 hover:border-fuchsia-500/50 hover:text-fuchsia-300 px-4 py-3 text-sm text-white/70 font-mono transition-colors disabled:opacity-50"
                >
                  › {s}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="term scanlines">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-xs text-white/50">
                  akshay-ai · claude-sonnet-4.6
                </span>
                <span className="ml-auto flex items-center gap-2">
                  <span className="font-mono text-[10px] text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={12} /> ONLINE
                  </span>
                  <button
                    data-testid="ask-ai-reset"
                    onClick={reset}
                    className="text-white/40 hover:text-white"
                    aria-label="Reset"
                  >
                    <RotateCcw size={14} />
                  </button>
                </span>
              </div>

              <div
                ref={listRef}
                data-testid="ask-ai-messages"
                className="p-5 md:p-6 font-mono text-[13px] leading-relaxed h-[460px] overflow-y-auto"
              >
                {messages.length === 0 && (
                  <div className="text-white/40">
                    <div className="text-emerald-400">akshay-ai$</div>
                    <div className="mt-2">
                      Hi — I&apos;m an AI trained on Akshay&apos;s resume. Ask me anything
                      about his experience as a Senior SDET, or pick a starter
                      question on the left.
                    </div>
                  </div>
                )}

                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5"
                  >
                    {m.role === "user" ? (
                      <>
                        <div className="text-sky-400">you$</div>
                        <div className="mt-1 text-white/85 whitespace-pre-wrap">{m.content}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-fuchsia-400">akshay-ai$</div>
                        <div className="mt-1 text-white/85 whitespace-pre-wrap">
                          {m.content}
                          {streaming && i === messages.length - 1 && <span className="caret-inline" />}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              <form
                data-testid="ask-ai-form"
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex items-center gap-3 border-t border-white/10 px-4 py-3 bg-black/40"
              >
                <span className="text-emerald-400 font-mono text-sm">›</span>
                <input
                  data-testid="ask-ai-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={streaming}
                  placeholder="ask anything about Akshay's experience..."
                  className="flex-1 bg-transparent outline-none font-mono text-sm text-white placeholder:text-white/30 disabled:opacity-50"
                />
                <button
                  data-testid="ask-ai-submit"
                  type="submit"
                  disabled={streaming || !input.trim()}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-2 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-emerald-400"
                >
                  Send <CornerDownLeft size={12} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
