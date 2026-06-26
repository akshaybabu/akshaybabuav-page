import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, BadgeCheck } from "lucide-react";
import { EDUCATION, CERTS, AWARDS } from "../data/resume";

export default function EducationAwards() {
  return (
    <section data-testid="education-awards-section" className="relative py-20 md:py-28 bg-[#070708] border-y border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {/* Education */}
          <div className="bg-[#0a0a0c] p-7 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap size={18} className="text-sky-400" />
              <span className="kicker !text-sky-400">/EDUCATION</span>
            </div>
            <div className="space-y-5">
              {EDUCATION.map((ed, i) => (
                <div key={i} data-testid={`education-${i}`}>
                  <div className="font-display text-lg text-white tracking-tight">{ed.degree}</div>
                  <div className="text-sm text-white/55 mt-1">{ed.school}</div>
                  <div className="font-mono text-xs text-white/35 mt-1">{ed.period}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-[#0a0a0c] p-7 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <BadgeCheck size={18} className="text-emerald-400" />
              <span className="kicker">/CERTS</span>
            </div>
            <ul className="space-y-3">
              {CERTS.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  data-testid={`cert-${i}`}
                  className="flex gap-3 text-sm text-white/70 leading-relaxed"
                >
                  <span className="text-emerald-400 mt-1 shrink-0">▸</span>
                  <span>{c}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Awards */}
          <div className="bg-[#0a0a0c] p-7 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Trophy size={18} className="text-fuchsia-400" />
              <span className="kicker !text-fuchsia-400">/AWARDS</span>
            </div>
            <div className="space-y-5">
              {AWARDS.map((a, i) => (
                <div key={i} data-testid={`award-${i}`} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-fuchsia-400 mt-1 shrink-0">{a.year}</span>
                  <div>
                    <div className="text-sm text-white">{a.title}</div>
                    <div className="text-xs text-white/45 mt-0.5">{a.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
