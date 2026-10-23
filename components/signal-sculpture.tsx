"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";

/** A lightweight CSS 3D sculpture: no WebGL, textures, or animation dependencies. */
export function SignalSculpture() {
  const scene = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--tilt-x",
      `${(event.clientY - bounds.top - bounds.height / 2) / -24}deg`,
    );
    event.currentTarget.style.setProperty(
      "--tilt-y",
      `${(event.clientX - bounds.left - bounds.width / 2) / 24}deg`,
    );
  }

  return (
    <div
      className={`signal-scene ${paused ? "is-paused" : ""}`}
      ref={scene}
      onPointerMove={move}
      onPointerLeave={() => {
        scene.current?.style.setProperty("--tilt-x", "0deg");
        scene.current?.style.setProperty("--tilt-y", "0deg");
      }}
    >
      <div className="scene-top">
        <span>
          <i /> THE CLARITY ENGINE
        </span>
        <span>FIG. 001</span>
      </div>
      <div
        className="sculpture-stage"
        role="img"
        aria-label="An abstract three-dimensional sphere of green data ribbons, representing complexity becoming clarity"
      >
        <div className="sculpture-shadow" />
        <div className="sculpture-tilt">
          <div className="sculpture-spin">
            {Array.from({ length: 27 }, (_, i) => {
              const latitude = (i / 26) * Math.PI;
              const diameter = Math.max(30, Math.sin(latitude) * 304);
              return (
                <span
                  key={i}
                  className="data-ribbon"
                  style={
                    {
                      "--diameter": `${diameter}px`,
                      "--elevation": `${Math.cos(latitude) * 152}px`,
                      "--ribbon-index": i,
                    } as CSSProperties
                  }
                />
              );
            })}
            <div className="sculpture-axis" />
          </div>
        </div>
        <span className="scene-callout callout-input">
          01 / COMPLEXITY
          <span />
        </span>
        <span className="scene-callout callout-output">
          <span />
          02 / CLARITY <ArrowUpRight size={12} />
        </span>
        <span className="scene-cross cross-one">+</span>
        <span className="scene-cross cross-two">+</span>
      </div>
      <div className="scene-bottom">
        <p>
          Independent signals.
          <br />
          <strong>One connected perspective.</strong>
        </p>
        <button
          aria-label={
            paused ? "Play sculpture animation" : "Pause sculpture animation"
          }
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
        </button>
      </div>
    </div>
  );
}
