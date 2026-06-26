import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SKILLS } from "../data/resume";

const CATEGORIES = ["All", ...Object.keys(SKILLS)];

export default function Skills() {
  const [active, setActive] = useState("All");

  const items = useMemo(() => {
    if (active === "All") {
      return Object.entries(SKILLS).flatMap(([cat, arr]) =>
        arr.map((s) => ({ skill: s, category: cat }))
      );
    }
    return SKILLS[active].map((s) => ({ skill: s, category: active }));
  }, [active]);

  return (
    <section id="skills" data-testid="skills-section" className="relative py-20 md:py-28 bg-[#070708] border-y border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="kicker">/STACK</span>
            <h2 className="h-section text-white mt-4">
              The toolbelt.<br />
              <span className="text-white/40">Filter</span> by <span className="text-emerald-400">layer</span>.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                data-testid={`skills-filter-${c.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
                onClick={() => setActive(c)}
                className={`tag ${active === c ? "active" : "hover:text-white/80"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/10"
        >
          {items.map((s, i) => (
            <motion.div
              key={`${s.category}-${s.skill}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              data-testid={`skill-${s.skill.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
              className="bg-[#0a0a0c] p-4 md:p-5 hover:bg-[#101013] group transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                  {s.category}
                </span>
                <span className="font-mono text-[10px] text-emerald-400/0 group-hover:text-emerald-400 transition-colors">●</span>
              </div>
              <div className="mt-3 font-mono text-sm text-white group-hover:text-emerald-400 transition-colors">
                {s.skill}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
