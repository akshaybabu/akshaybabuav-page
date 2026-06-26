import React from "react";
import { STATS } from "../data/resume";

const MARQUEE = [
  "PLAYWRIGHT", "SELENIUM 4", "APPIUM", "WINAPPDRIVER", "TYPESCRIPT",
  "PYTHON", "JAVA", "AWS SECRETS MANAGER", "AZURE KEY VAULT",
  "TESSERACT OCR", "OPENCV", "TWILIO OTP", "BROWSERSTACK",
  "CUCUMBER BDD", "POM", "CI/CD",
];

export default function StatsStrip() {
  return (
    <section data-testid="stats-strip" className="relative border-y border-white/10 bg-black/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {STATS.map((s, i) => (
            <div
              key={i}
              data-testid={`stat-card-${i}`}
              className="bg-[#070708] p-6 md:p-8 group hover:bg-[#0c0c0e] transition-colors"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
                STAT_{String(i + 1).padStart(2, "0")}
              </div>
              <div className="stat-num text-white group-hover:text-emerald-400 transition-colors">
                {s.value}
              </div>
              <div className="mt-3 font-mono text-xs text-white/60">
                {s.unit}
              </div>
              <div className="mt-1 text-xs text-white/40">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden border-t border-white/10 py-4 bg-[#050505]">
        <div className="marquee-track flex gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.24em] text-white/40">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="inline-flex items-center gap-10">
              <span className={i % 3 === 0 ? "text-emerald-400" : i % 3 === 1 ? "text-fuchsia-400" : "text-sky-400"}>◆</span>
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
