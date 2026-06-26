import React from "react";
import { motion } from "framer-motion";
import { SUMMARY, PROFILE } from "../data/resume";

const PRINCIPLES = [
  {
    no: "01",
    title: "Test what hurts in prod",
    body: "Frameworks should mirror the realities of release pipelines — flaky locators, OTPs, mobile carriers, shadow DOM, multi-language POS.",
  },
  {
    no: "02",
    title: "Code-gen > Copy-paste",
    body: "Built POM + keyword code-generation engines (Python, TS, Java, C#) so QA scales with the product, not the headcount.",
  },
  {
    no: "03",
    title: "Heal, don't fail",
    body: "Dynamic locator fallback with recorded element attributes. When the primary selector breaks, the suite keeps moving.",
  },
  {
    no: "04",
    title: "Secrets stay secret",
    body: "AWS Secrets Manager + Azure Key Vault wired into the execution engine — no creds in repos, no creds in logs.",
  },
];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="kicker">/ABOUT</span>
            <h2 className="h-section text-white mt-4">
              An engineer who <span className="text-emerald-400">happens</span> to test.
            </h2>
            <p className="mt-6 text-white/65 leading-relaxed text-sm md:text-base">
              {SUMMARY}
            </p>

            <div className="mt-8 border border-white/10 p-5 font-mono text-xs text-white/60 bg-[#0a0a0c]">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                STATUS
              </div>
              <div className="space-y-1.5">
                <Row k="role" v={PROFILE.role} />
                <Row k="location" v={PROFILE.location} />
                <Row k="experience" v="2.9+ years" />
                <Row k="domains" v="insurance · retail · automotive · hospitality" />
                <Row k="open_to" v="Senior SDET / Senior Automation Engineer roles" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.no}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  data-testid={`principle-${p.no}`}
                  className="bg-[#0a0a0c] p-7 md:p-8 hover:bg-[#0f0f12] transition-colors group"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">PRINCIPLE</span>
                    <span className="font-display text-3xl text-white/15 group-hover:text-emerald-400/40 transition-colors">{p.no}</span>
                  </div>
                  <h3 className="font-display text-2xl text-white tracking-tight mb-3">{p.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex gap-3">
      <span className="text-emerald-400 shrink-0">{k}</span>
      <span className="text-white/30">::</span>
      <span className="text-white/75">{v}</span>
    </div>
  );
}
