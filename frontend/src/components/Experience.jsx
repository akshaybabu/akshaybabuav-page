import React from "react";
import { motion } from "framer-motion";
import { GitCommit } from "lucide-react";
import { EXPERIENCE } from "../data/resume";

export default function Experience() {
  return (
    <section id="experience" data-testid="experience-section" className="relative py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-12">
          <span className="kicker">/HISTORY</span>
          <h2 className="h-section text-white mt-4">
            git log <span className="text-white/40">--career</span>
          </h2>
        </div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-white/10" aria-hidden />

          <div className="space-y-10">
            {EXPERIENCE.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                data-testid={`experience-item-${i}`}
                className="relative pl-12 md:pl-16"
              >
                <div className="absolute left-0 md:left-2 top-1.5 w-8 h-8 grid place-items-center border border-white/20 bg-[#070708]">
                  <GitCommit size={14} className={i === 0 ? "text-emerald-400" : "text-white/50"} />
                </div>

                <div className="card-flat p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight">{e.company}</h3>
                        {e.tag && (
                          <span className={`tag ${e.tag === "current" ? "active" : ""}`}>
                            {e.tag}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-white/60 font-mono">{e.role}</div>
                    </div>
                    <div className="font-mono text-xs text-white/40">
                      <div>{e.period}</div>
                      <div className="text-right">{e.location}</div>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mt-4">
                    {e.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm text-white/70 leading-relaxed">
                        <span className="text-emerald-400 mt-1 shrink-0">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {e.chips && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {e.chips.map((c) => (
                        <span key={c} className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/55 border border-white/10 px-2 py-1">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
