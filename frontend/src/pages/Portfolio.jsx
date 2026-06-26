import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsStrip from "../components/StatsStrip";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import AutomationDemo from "../components/AutomationDemo";
import AskAI from "../components/AskAI";
import EducationAwards from "../components/EducationAwards";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Portfolio() {
  return (
    <main data-testid="portfolio-root" className="relative">
      <Navbar />
      <Hero />
      <StatsStrip />
      <AutomationDemo />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <AskAI />
      <EducationAwards />
      <Contact />
      <Footer />
    </main>
  );
}
