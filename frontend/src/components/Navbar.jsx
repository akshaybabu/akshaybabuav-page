import React, { useEffect, useState } from "react";
import { Menu, X, TerminalSquare } from "lucide-react";
import { PROFILE } from "../data/resume";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const RESUME_HREF = `${process.env.PUBLIC_URL || ""}/Akshay_Babu_Resume_Senior_SDET.docx`;

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-black/60 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <button
          data-testid="navbar-brand"
          onClick={() => go("hero")}
          className="flex items-center gap-3 group"
        >
          <span className="w-9 h-9 grid place-items-center border border-white/15 group-hover:border-emerald-500/60 transition-colors">
            <TerminalSquare size={16} className="text-emerald-400" />
          </span>
          <span className="font-mono text-sm tracking-tight">
            <span className="text-white/50">~/</span>
            <span className="text-white">akshay</span>
            <span className="text-emerald-400 caret-inline" />
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => go(l.id)}
              className="px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/60 hover:text-emerald-400 transition-colors font-mono"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            data-testid="navbar-resume-download"
            href={RESUME_HREF}
            download
            target="_blank"
            rel="noreferrer"
            className="btn-sharp"
          >
            ./resume.docx
          </a>
        </div>

        <button
          data-testid="navbar-mobile-toggle"
          className="md:hidden w-10 h-10 grid place-items-center border border-white/15"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div data-testid="navbar-mobile-menu" className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-mobile-${l.id}`}
                onClick={() => go(l.id)}
                className="text-left py-3 text-sm font-mono uppercase tracking-[0.18em] text-white/70"
              >
                › {l.label}
              </button>
            ))}
            <a
              data-testid="navbar-mobile-resume"
              href={RESUME_HREF}
              download
              className="btn-sharp mt-4 self-start"
            >
              ./resume.docx
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
