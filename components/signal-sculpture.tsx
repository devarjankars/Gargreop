"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import aiPoster from "@/public/images/core/ai.webp";
import riskPoster from "@/public/images/core/risk.webp";
import dataPoster from "@/public/images/core/data.webp";
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

const posters = [aiPoster, riskPoster, dataPoster];

function CoreFallback({ mode }: { mode: number }) {
  return (
    <Image
      src={posters[mode]}
      alt=""
      aria-hidden="true"
      fill
      preload={mode === 0}
      sizes="(max-width: 760px) 340px, 480px"
      className="intelligence-fallback intelligence-poster"
    />
  );
}

/** A lazy-loaded, procedurally lit Three.js object with an immediate matching rendered poster. */
export function SignalSculpture() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<IntelligenceScene | null>(null);
  const settings = useRef({
    paused: false,
    reduced: false,
    visible: false,
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
        const bounds = root.current?.getBoundingClientRect();
        if (!bounds || bounds.bottom <= 0 || bounds.top >= window.innerHeight) {
          settings.current.visible = false;
          started = false;
          return;
        }
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
        // Apply the selected rest pose before exposing the first live frame.
        instance.setPaused(true);
        instance.setReduced(settings.current.reduced);
        instance.setVisible(settings.current.visible);
        instance.setMode(settings.current.mode);
        instance.setPaused(settings.current.paused);
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
          <CoreFallback mode={mode} />
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
