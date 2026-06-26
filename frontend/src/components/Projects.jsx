import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/resume";

export default function Projects() {
  return (
    <section id="projects" data-testid="projects-section" className="relative py-20 md:py-28 bg-[#070708] border-y border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="kicker">/CASE_STUDIES</span>
            <h2 className="h-section text-white mt-4">
              Shipped, scaled,<br />
              <span className="text-emerald-400">scrutinised</span>.
            </h2>
          </div>
          <p className="text-sm text-white/55 max-w-md font-mono">
            Six selected automation case studies from 7+ enterprise projects
            across insurance, retail, automotive and hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              data-testid={`project-card-${p.code}`}
              className="bg-[#0a0a0c] p-7 md:p-8 group hover:bg-[#101013] transition-colors relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                  {p.code} · {p.domain}
                </div>
                <ArrowUpRight size={18} className="text-white/30 group-hover:text-emerald-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>

              <h3 className="font-display text-xl md:text-2xl text-white tracking-tight leading-tight">
                {p.name}
              </h3>

              <p className="mt-4 text-sm text-white/60 leading-relaxed min-h-[88px]">
                {p.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/55 border border-white/10 px-2 py-1">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">IMPACT</div>
                <div className="text-sm text-emerald-400">{p.impact}</div>
              </div>

              {/* corner decoration */}
              <div className="absolute -top-12 -right-12 w-32 h-32 border border-emerald-500/0 group-hover:border-emerald-500/20 rotate-45 transition-colors pointer-events-none" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
