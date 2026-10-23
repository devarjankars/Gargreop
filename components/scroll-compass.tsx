"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const chapters = [
  { id: "home", label: "Introduction" },
  { id: "about", label: "Executive brief" },
  { id: "work", label: "Selected work" },
  { id: "innovation", label: "AI spotlight" },
  { id: "journey", label: "The method" },
  { id: "experience", label: "Experience" },
  { id: "expertise", label: "Expertise" },
  { id: "contact", label: "Let’s connect" },
];

export function ScrollCompass() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const sections = chapters.map((c) => document.getElementById(c.id));
    const render = () => {
      frame = 0;
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const percent = Math.min(Math.max(window.scrollY / max, 0), 1);
      root.current?.style.setProperty("--page-progress", String(percent));
      let next = 0;
      sections.forEach((section, index) => {
        if (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight * 0.4
        )
          next = index;
      });
      if (percent > 0.99) next = chapters.length - 1;
      setActive((current) => (current === next ? current : next));
      setScrolled(window.scrollY > 250);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const next = chapters[(active + 1) % chapters.length];
  return (
    <aside
      className="scroll-compass"
      ref={root}
      data-visible={scrolled}
      inert={!scrolled}
      aria-hidden={!scrolled}
    >
      <nav className="chapter-rail" aria-label="Page chapters">
        <div className="chapter-track" aria-hidden="true">
          <span />
        </div>
        {chapters.map((chapter, index) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-label={chapter.label}
            aria-current={active === index ? "location" : undefined}
            className={
              active === index ? "chapter-point active" : "chapter-point"
            }
          >
            <span className="chapter-name">{chapter.label}</span>
            <span className="chapter-dot" />
          </a>
        ))}
      </nav>
      <div className="mobile-chapter">
        <a
          href={`#${chapters[active].id}`}
          className="mobile-chapter-current"
          aria-label={`Current section: ${chapters[active].label}`}
        >
          <span>{String(active + 1).padStart(2, "0")} /</span>
          {chapters[active].label}
        </a>
        <a
          href={`#${next.id}`}
          className="mobile-chapter-next"
          aria-label={`Next section: ${next.label}`}
        >
          {active === chapters.length - 1 ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDown size={14} />
          )}
        </a>
        <span className="mobile-chapter-progress" aria-hidden="true" />
      </div>
    </aside>
  );
}
