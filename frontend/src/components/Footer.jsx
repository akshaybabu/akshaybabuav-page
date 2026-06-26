import React from "react";
import { PROFILE } from "../data/resume";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-testid="footer" className="border-t border-white/10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-display text-2xl tracking-tight text-white">{PROFILE.shortName}</div>
          <div className="text-xs text-white/40 mt-1 font-mono">
            Senior SDET · Automation Engineer · {PROFILE.location}
          </div>
        </div>

        <div className="font-mono text-[11px] text-white/40 uppercase tracking-[0.18em]">
          © {year} · Built with Playwright-grade precision · React + FastAPI + Claude
        </div>
      </div>
    </footer>
  );
}
