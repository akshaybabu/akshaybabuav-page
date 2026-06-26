import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, MapPin, Award } from "lucide-react";
import { PROFILE } from "../data/resume";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FILE_TREE = [
  { icon: "📁", label: "src/", color: "text-white/50" },
  { icon: "├─", label: "frameworks/", color: "text-white/40" },
  { icon: "│  ├─", label: "playwright_pom.py", color: "text-emerald-400" },
  { icon: "│  ├─", label: "selenium_hybrid.java", color: "text-sky-400" },
  { icon: "│  └─", label: "appium_ios.ts", color: "text-fuchsia-400" },
  { icon: "├─", label: "engines/", color: "text-white/40" },
  { icon: "│  ├─", label: "auto_healing_locators.py", color: "text-emerald-400" },
  { icon: "│  └─", label: "ocr_pos_validator.py", color: "text-emerald-400" },
  { icon: "└─", label: "akshay.md", color: "text-amber-400" },
];

export default function Hero() {
  return (
    <section id="hero" data-testid="hero-section" className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {/* grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 80%)",
        }}
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT - text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
          >
            <motion.div variants={item} className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-emerald-400 pulse-dot" />
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-400">
                AVAILABLE FOR SENIOR SDET ROLES
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-[clamp(2.6rem,7vw,6.2rem)] leading-[0.92] tracking-tight text-white"
            >
              I write tests<br />
              that <span className="text-emerald-400">break things</span><br />
              <span className="text-white/40">before</span> production does.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-8 max-w-xl text-white/60 leading-relaxed text-sm md:text-base font-mono"
            >
              <span className="text-emerald-400">{">"}</span> {PROFILE.name.split(" ")[0]}{" "}
              {PROFILE.name.split(" ").slice(1).join(" ")} — Senior SDET / Automation Engineer.
              Building Page-Object frameworks, auto-healing locator engines, and
              hybrid Web / Mobile / API / Desktop / iOS automation that scales across
              7+ enterprise client projects.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <button
                data-testid="hero-cta-projects"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-sharp"
              >
                See the work <ArrowDownRight size={14} />
              </button>
              <button
                data-testid="hero-cta-ask-ai"
                onClick={() => document.getElementById("ask-ai")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-sharp ghost"
              >
                Ask my AI →
              </button>
            </motion.div>

            <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-white/50">
              <span className="inline-flex items-center gap-2">
                <MapPin size={12} className="text-emerald-400" />
                {PROFILE.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Award size={12} className="text-fuchsia-400" />
                Star Contributor of the Quarter
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-emerald-400">●</span> 2.9+ yrs experience
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT - file tree card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="term scanlines">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-xs text-white/50">
                  ~/akshay/portfolio — tree
                </span>
              </div>
              <div className="p-5 md:p-6 font-mono text-[13px] leading-relaxed">
                {FILE_TREE.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    className="flex items-baseline gap-2 whitespace-pre"
                  >
                    <span className="text-white/30">{row.icon}</span>
                    <span className={row.color}>{row.label}</span>
                  </motion.div>
                ))}
                <div className="mt-6 pt-4 border-t border-white/5 text-white/40 text-xs">
                  $ git log --oneline
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div><span className="text-amber-400">a3f8c12</span> <span className="text-white/60">feat: shipped auto-healing locator engine</span></div>
                  <div><span className="text-amber-400">b9e7d04</span> <span className="text-white/60">feat: ios parallel multi-device execution</span></div>
                  <div><span className="text-amber-400">c1d52f8</span> <span className="text-white/60">feat: aws bedrock code-gen integration</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
