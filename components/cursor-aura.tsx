"use client";

import { useEffect, useRef } from "react";

/** A quiet pointer-following light that adds depth without replacing the cursor. */
export function CursorAura() {
  const aura = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = -400;
    let y = -400;

    const sync = () => {
      const enabled = finePointer.matches && !reducedMotion.matches;
      document.documentElement.dataset.cursorAura = enabled ? "on" : "off";
      if (!enabled) aura.current?.setAttribute("data-hidden", "true");
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        aura.current?.style.setProperty("--pointer-x", `${x}px`);
        aura.current?.style.setProperty("--pointer-y", `${y}px`);
        aura.current?.removeAttribute("data-hidden");
        frame = 0;
      });
    };
    const leave = () => aura.current?.setAttribute("data-hidden", "true");
    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      delete document.documentElement.dataset.cursorAura;
    };
  }, []);

  return <span ref={aura} className="cursor-aura" aria-hidden="true" data-hidden="true" />;
}
