"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import type { IntelligenceScene } from "@/lib/intelligence-scene";

const perspectives = [
  {
    name: "AI",
    label: "AGENTIC INTELLIGENCE",
    copy: "Human questions. Connected intelligence.",
  },
  {
    name: "Risk",
    label: "RISK & ASSURANCE",
    copy: "See the signals. Understand the exposure.",
  },
  {
    name: "Data",
    label: "DATA & ENGINEERING",
    copy: "Reliable foundations. Clearer decisions.",
  },
];

function CoreFallback() {
  const path =
    Array.from({ length: 181 }, (_, i) => {
      const t = (i / 180) * Math.PI * 2;
      const x = ((2 + Math.cos(3 * t)) * Math.cos(2 * t)) / 3;
      const y = ((2 + Math.cos(3 * t)) * Math.sin(2 * t)) / 3;
      const z = Math.sin(3 * t) / 3;
      return `${i === 0 ? "M" : "L"}${(250 + (x * 0.92 - y * 0.38) * 155).toFixed(2)},${(250 + (x * 0.38 + y * 0.92) * 110 + z * 80).toFixed(2)}`;
    }).join(" ") + " Z";
  return (
    <svg
      className="intelligence-fallback"
      viewBox="0 0 500 500"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="core-satin" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ddd1ef" />
          <stop offset=".3" stopColor="#8589b9" />
          <stop offset=".55" stopColor="#e8c4aa" />
          <stop offset=".75" stopColor="#9aa9ca" />
          <stop offset="1" stopColor="#75669b" />
        </linearGradient>
        <filter id="core-shadow">
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="13"
            floodColor="#42315d"
            floodOpacity=".1"
          />
        </filter>
      </defs>
      <ellipse
        cx="250"
        cy="250"
        rx="215"
        ry="100"
        fill="none"
        stroke="#b7a7cf55"
        strokeWidth=".7"
        transform="rotate(-25 250 250)"
      />
      <path
        d={path}
        fill="none"
        stroke="url(#core-satin)"
        strokeWidth="34"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#core-shadow)"
      />
      <path
        d={path}
        fill="none"
        stroke="#fff8"
        strokeWidth="1"
        transform="translate(-3 -4)"
      />
      <circle cx="439" cy="147" r="5" fill="#d6b39d" />
    </svg>
  );
}

/** A lazy-loaded, procedurally lit Three.js object with an immediate SVG fallback. */
export function SignalSculpture() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<IntelligenceScene | null>(null);
  const settings = useRef({
    paused: false,
    reduced: false,
    visible: true,
    mode: 0,
  });
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false,
      started = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    settings.current.reduced = motion.matches;
    const syncMotion = () => {
      settings.current.reduced = motion.matches;
      engine.current?.setReduced(motion.matches);
    };
    const load = async () => {
      if (started || !canvas.current) return;
      started = true;
      try {
        const { createIntelligenceScene } =
          await import("@/lib/intelligence-scene");
        if (cancelled || !canvas.current) return;
        const instance = createIntelligenceScene(canvas.current, () => {
          if (!cancelled) {
            const stale = engine.current;
            engine.current = null;
            stale?.dispose();
            setReady(false);
            setFailed(true);
          }
        });
        if (cancelled) {
          instance.dispose();
          return;
        }
        engine.current = instance;
        instance.setPaused(settings.current.paused);
        instance.setReduced(settings.current.reduced);
        instance.setVisible(settings.current.visible);
        instance.setMode(settings.current.mode);
        setReady(true);
      } catch {
        if (!cancelled) {
          setFailed(true);
          setReady(false);
        }
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      settings.current.visible = entry.isIntersecting;
      engine.current?.setVisible(entry.isIntersecting);
      if (
        entry.isIntersecting &&
        document.documentElement.dataset.arrival === "complete"
      )
        void load();
    });
    if (root.current) observer.observe(root.current);
    const arrived = () => {
      if (settings.current.visible) void load();
    };
    if (document.documentElement.dataset.arrival === "complete") arrived();
    window.addEventListener("portfolio:arrived", arrived);
    motion.addEventListener("change", syncMotion);
    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("portfolio:arrived", arrived);
      motion.removeEventListener("change", syncMotion);
      engine.current?.dispose();
      engine.current = null;
    };
  }, []);

  function pointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    engine.current?.setPointer(
      (event.clientX - box.left) / box.width - 0.5,
      (event.clientY - box.top) / box.height - 0.5,
    );
  }
  function select(value: number) {
    setMode(value);
    settings.current.mode = value;
    engine.current?.setMode(value);
  }
  function toggle() {
    const next = !paused;
    setPaused(next);
    settings.current.paused = next;
    engine.current?.setPaused(next);
  }

  return (
    <div
      className={`signal-scene intelligence-scene ${paused ? "is-paused" : ""}`}
      ref={root}
      data-renderer={ready ? "webgl" : failed ? "fallback" : "loading"}
      data-mode={mode}
    >
      <div className="scene-top">
        <span>
          <i /> THE INTELLIGENCE CORE
        </span>
        <span>OBJECT / 002</span>
      </div>
      <div
        className="intelligence-view"
        onPointerMove={pointer}
        onPointerLeave={() => engine.current?.setPointer(0, 0)}
        role="img"
        aria-label="An iridescent three-dimensional sculptural knot with a faceted core and orbiting signals, representing connected AI, risk, and data expertise"
      >
        <div className="intelligence-halo" />
        <div className="intelligence-floor" />
        <div className="intelligence-scroll">
          <CoreFallback />
          <canvas
            ref={canvas}
            className="intelligence-canvas"
            aria-hidden="true"
          />
        </div>
        <span className="core-coordinate coordinate-left">
          COMPLEXITY
          <br />
          <span>CONNECTED</span>
        </span>
        <span className="core-coordinate coordinate-right">
          INSIGHT
          <br />
          <ArrowUpRight size={13} />
        </span>
        <span className="core-cross cross-top">+</span>
        <span className="core-cross cross-bottom">+</span>
      </div>
      <div className="core-controls">
        <span className="core-lens-label">EXPLORE A PERSPECTIVE</span>
        <div role="group" aria-label="Intelligence core perspectives">
          {perspectives.map((item, index) => (
            <button
              key={item.name}
              onClick={() => select(index)}
              aria-pressed={mode === index}
              className={mode === index ? "selected" : ""}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="scene-bottom core-bottom">
        <p>
          <span className="core-current-label">{perspectives[mode].label}</span>
          <strong>{perspectives[mode].copy}</strong>
        </p>
        <button
          className="core-pause"
          aria-label={
            paused ? "Play sculpture animation" : "Pause sculpture animation"
          }
          aria-pressed={paused}
          onClick={toggle}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
        </button>
      </div>
    </div>
  );
}
