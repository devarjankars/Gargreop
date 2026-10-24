"use client";
import { BrandStar } from "./brand-star";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/** Visible in server HTML, then promoted to a modal when hydration is ready. */
export function Arrival() {
  const dialog = useRef<HTMLDialogElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const finished = useRef(false);
  const [stage, setStage] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const complete = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach(clearTimeout);
    dialog.current?.close?.();
    dialog.current?.removeAttribute("open");
    document.documentElement.dataset.arrival = "complete";
    window.dispatchEvent(new Event("portfolio:arrived"));
  }, []);

  const leave = useCallback(() => {
    if (finished.current) return;
    setLeaving(true);
    timers.current.push(setTimeout(complete, 340));
  }, [complete]);

  useEffect(() => {
    finished.current = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !dialog.current?.showModal) {
      complete();
      return;
    }

    document.documentElement.dataset.arrival = "running";
    setStage(0);
    setLeaving(false);
    // A server-rendered `open` dialog is non-modal. Promote it in the same
    // task so there is no intervening paint without the introduction.
    dialog.current.removeAttribute("open");
    dialog.current.showModal();
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      skip.current?.focus({ preventScroll: true });
    }
    timers.current.push(setTimeout(() => setStage(1), 450));
    timers.current.push(setTimeout(() => setStage(2), 900));
    timers.current.push(setTimeout(leave, 1450));
    const onMotionChange = () => {
      if (preference.matches) complete();
    };
    preference.addEventListener("change", onMotionChange);
    return () => {
      timers.current.forEach(clearTimeout);
      dialog.current?.close?.();
      preference.removeEventListener("change", onMotionChange);
      delete document.documentElement.dataset.arrival;
    };
  }, [complete, leave]);

  return (
    <>
      <dialog
        open
        ref={dialog}
        tabIndex={-1}
        autoFocus
        className={`arrival ${leaving ? "arrival-leaving" : ""}`}
        aria-label="Welcome to Sonu Garg’s portfolio"
        onCancel={(event) => {
          event.preventDefault();
          complete();
        }}
      >
        <div className="arrival-shell">
          <div className="arrival-top">
            <span className="wordmark">
              sonu garg
              <span>
                <BrandStar />
              </span>
            </span>
            <span>ANALYTICS WITH INTENT</span>
          </div>
          <div className="arrival-center" aria-hidden="true">
            <div className="arrival-orbits">
              <svg viewBox="0 0 300 300">
                <circle cx="150" cy="150" r="145" />
                <circle cx="150" cy="150" r="120" />
                <circle cx="150" cy="150" r="94" />
              </svg>
              <span className="arrival-dot" />
            </div>
            <div className="arrival-words">
              {["Data.", "Context.", "Clarity."].map((word, index) => (
                <span key={word} className={stage === index ? "current" : ""}>
                  {word}
                </span>
              ))}
            </div>
            <span className="arrival-center-note">CONNECTING THE DOTS</span>
          </div>
          <div className="arrival-bottom">
            <div className="arrival-track" aria-hidden="true">
              <div className="arrival-track-label">
                <span>A DIFFERENT PERSPECTIVE</span>
                <span>0{stage + 1} / 03</span>
              </div>
              <div className="arrival-track-line">
                <span />
              </div>
            </div>
            <button ref={skip} onClick={complete}>
              Skip intro <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </dialog>
      <noscript>
        <style>{`
        .arrival { display: none !important; }
        html[data-arrival="pending"] { overflow: auto !important; }
        html[data-arrival="pending"] .hero-copy [data-enter] {
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
          animation: none !important;
        }
      `}</style>
      </noscript>
    </>
  );
}
