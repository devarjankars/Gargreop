"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Download, Pause, Play } from "lucide-react";

const perspectives = [
  {
    word: "clarity",
    label: "BUSINESS INTELLIGENCE",
    description: "Turning complex data into decisions people can act on.",
  },
  {
    word: "confidence",
    label: "AUDIT & RISK ANALYTICS",
    description: "Making control gaps visible. Bringing context to risk.",
  },
  {
    word: "direction",
    label: "AGENTIC AI & AUTOMATION",
    description: "Connecting human questions to smarter ways of working.",
  },
];

export function HeroCopy() {
  const root = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(preference.matches);
    syncMotion();
    preference.addEventListener("change", syncMotion);
    const start = () => setArrived(true);
    if (document.documentElement.dataset.arrival === "complete") start();
    window.addEventListener("portfolio:arrived", start);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    if (root.current) observer.observe(root.current);
    const visibility = () =>
      setVisible(
        !document.hidden &&
          !!root.current &&
          root.current.getBoundingClientRect().bottom > 0,
      );
    document.addEventListener("visibilitychange", visibility);
    return () => {
      preference.removeEventListener("change", syncMotion);
      window.removeEventListener("portfolio:arrived", start);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused || reduced || !arrived || !visible) return;
    const interval = setInterval(
      () => setCurrent((index) => (index + 1) % perspectives.length),
      4300,
    );
    return () => clearInterval(interval);
  }, [paused, reduced, arrived, visible]);

  const enter = (step: number) => ({ "--enter-step": step }) as CSSProperties;
  return (
    <div className="hero-copy" ref={root}>
      <p className="hero-kicker" data-enter style={enter(0)}>
        <span className="kicker-dash" /> SONU GARG / BI & ANALYTICS LEAD
      </p>
      <h1 aria-label="Finding clarity, confidence, and direction in complexity.">
        <span className="hero-line" aria-hidden="true">
          <span data-enter style={enter(1)}>
            Finding the
          </span>
        </span>
        <span
          className="hero-word-line"
          aria-hidden="true"
          data-enter
          style={enter(2)}
        >
          <span className="word-stack">
            {perspectives.map((item, index) => (
              <span
                key={item.word}
                className={`hero-word ${current === index ? "word-active" : ""}`}
              >
                {item.word}
              </span>
            ))}
          </span>
          <svg
            className="word-underline"
            viewBox="0 0 420 20"
            preserveAspectRatio="none"
          >
            <path d="M3 14 Q180 -5 410 8" />
          </svg>
        </span>
        <span className="hero-line" aria-hidden="true">
          <span data-enter style={enter(3)}>
            in complexity.
          </span>
        </span>
      </h1>
      <p className="hero-intro" data-enter style={enter(4)}>
        I connect data, risk, and AI to make complex decisions feel clear.{" "}
        <strong>11+ years</strong> building what comes after the dashboard.
      </p>
      <div className="perspective-panel" data-enter style={enter(5)}>
        <div className="perspective-heading">
          <span className="perspective-index">0{current + 1}</span>
          <span className="perspective-label" aria-hidden="true">
            {perspectives[current].label}
          </span>
          <div className="perspective-controls">
            {perspectives.map((p, index) => (
              <button
                key={p.word}
                className={
                  current === index
                    ? "perspective-dot selected"
                    : "perspective-dot"
                }
                aria-label={`Show ${p.word} perspective`}
                aria-pressed={current === index}
                onClick={() => {
                  setCurrent(index);
                  setPaused(true);
                }}
              />
            ))}
            {!reduced && (
              <button
                className="perspective-pause"
                aria-label={
                  paused
                    ? "Play headline animation"
                    : "Pause headline animation"
                }
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={11} /> : <Pause size={11} />}
              </button>
            )}
          </div>
        </div>
        <div className="perspective-descriptions" aria-hidden="true">
          {perspectives.map((item, index) => (
            <p
              key={item.word}
              className={current === index ? "description-active" : ""}
            >
              {item.description}
            </p>
          ))}
        </div>
      </div>
      <div className="hero-actions" data-enter style={enter(6)}>
        <a className="button primary" href="#work">
          Discover my work <ArrowUpRight size={18} />
        </a>
        <a className="text-link" href="/Sonu-Garg-Resume.pdf" download>
          Get my résumé <Download size={15} />
        </a>
      </div>
    </div>
  );
}
