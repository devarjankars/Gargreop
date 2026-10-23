"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const steps = [
  {
    label: "DATA",
    title: "Find the signal.",
    copy: "Start with the right question. Validate the data behind it.",
  },
  {
    label: "CONTEXT",
    title: "Connect the dots.",
    copy: "Bring systems, people, and risk into one connected perspective.",
  },
  {
    label: "CLARITY",
    title: "Make it actionable.",
    copy: "Translate the analysis into a decision someone can move forward with.",
  },
];

export function SignalJourney() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const marker = useRef<SVGCircleElement>(null);
  const progress = useRef<SVGPathElement>(null);
  const [step, setStep] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const element = root.current,
      sticky = panel.current,
      line = path.current;
    if (!element || !sticky || !line) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-height: 640px)");
    let frame = 0;
    const length = line.getTotalLength();
    const render = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const travel = Math.max(element.offsetHeight - sticky.offsetHeight, 1);
      const value = motion.matches
        ? 1
        : compact.matches
          ? Math.min(
              Math.max(
                (window.innerHeight * 0.6 - bounds.top) /
                  Math.max(bounds.height * 0.65, 1),
                0,
              ),
              1,
            )
          : Math.min(Math.max((100 - bounds.top) / travel, 0), 1);
      const point = line.getPointAtLength(length * value);
      marker.current?.setAttribute("cx", String(point.x));
      marker.current?.setAttribute("cy", String(point.y));
      progress.current?.style.setProperty(
        "stroke-dashoffset",
        String(1 - value),
      );
      element.style.setProperty("--journey-progress", String(value));
      const next = value < 0.34 ? 0 : value < 0.72 ? 1 : 2;
      setStep((previous) => (previous === next ? previous : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const sync = () => {
      setEnhanced(!motion.matches && !compact.matches);
      schedule();
    };
    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    motion.addEventListener("change", sync);
    compact.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", sync);
      motion.removeEventListener("change", sync);
      compact.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section
      ref={root}
      id="journey"
      className="signal-journey section-wrap"
      data-enhanced={enhanced}
      aria-labelledby="journey-title"
    >
      <div className="journey-sticky" ref={panel}>
        <div className="section-marker">
          <span>THE METHOD / CONNECTED THINKING</span>
          <span>
            SCROLL TO CONNECT <ArrowDown size={10} />
          </span>
        </div>
        <div className="journey-heading">
          <h2 id="journey-title">
            Behind every insight,
            <br />
            <span className="serif-word">a little alchemy.</span>
          </h2>
          <p>
            My approach to turning
            <br />
            complexity into something useful.
          </p>
        </div>
        <div className="journey-graph" aria-hidden="true">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="journey-gradient">
                <stop stopColor="#b9a5df" />
                <stop offset=".55" stopColor="#7b69b3" />
                <stop offset="1" stopColor="#c18c6d" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                className="journey-input"
                d={`M40 ${45 + i * 70} Q180 ${45 + i * 70} 250 150`}
              />
            ))}
            <path
              className="journey-base"
              ref={path}
              d="M90 150 C240 150 285 55 450 135 S720 245 910 150"
            />
            <path
              className="journey-progress"
              ref={progress}
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
              d="M90 150 C240 150 285 55 450 135 S720 245 910 150"
            />
            {[
              { x: 90, y: 150 },
              { x: 500, y: 157 },
              { x: 910, y: 150 },
            ].map((p, i) => (
              <g
                key={i}
                className={step >= i ? "journey-node reached" : "journey-node"}
              >
                <circle cx={p.x} cy={p.y} r="32" />
                <circle cx={p.x} cy={p.y} r="5" />
              </g>
            ))}
            <circle
              ref={marker}
              className="journey-signal"
              cx="90"
              cy="150"
              r="8"
            />
          </svg>
          <div className="journey-graph-labels">
            {steps.map((s, i) => (
              <span key={s.label} className={step === i ? "active" : ""}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
        <div className="journey-steps">
          {steps.map((item, index) => (
            <div
              key={item.label}
              className={
                step === index ? "journey-step active" : "journey-step"
              }
            >
              <span>
                0{index + 1} / {item.label}
              </span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
        <div className="journey-footnote">
          <span>A WORKING PHILOSOPHY, NOT A BLACK BOX.</span>
          <a href="#work">
            SEE IT IN PRACTICE <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
