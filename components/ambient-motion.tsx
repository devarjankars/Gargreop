"use client";

import { useEffect, useRef } from "react";

/** Event-driven transforms only; the native cursor and scroll behavior remain intact. */
export function AmbientMotion() {
  const follower = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = follower.current;
    if (!cursor) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene = document.querySelector<HTMLElement>(".signal-scene");
    let card: HTMLElement | null = null;
    let frame = 0;
    let targetX = 0,
      targetY = 0,
      x = 0,
      y = 0;
    let pointerSeen = false;
    let depth = 0;
    let desiredDepth = 0;

    function resetCard() {
      card?.style.setProperty("--card-x", "0deg");
      card?.style.setProperty("--card-y", "0deg");
      card = null;
    }
    function render() {
      frame = 0;
      if (reduced.matches || document.hidden) return;
      let moving = false;
      if (fine.matches && pointerSeen) {
        x += (targetX - x) * 0.2;
        y += (targetY - y) * 0.2;
        cursor!.style.transform = `translate3d(${x}px,${y}px,0)`;
        moving = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.2;
      }
      if (scene) {
        depth += (desiredDepth - depth) * 0.14;
        scene.style.setProperty("--scroll-lift", `${-depth * 38}px`);
        scene.style.setProperty("--scroll-depth", `${depth * 9}deg`);
        moving ||= Math.abs(desiredDepth - depth) > 0.001;
      }
      if (moving) schedule();
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(render);
    }
    function hide() {
      cursor!.dataset.visible = "false";
      pointerSeen = false;
      resetCard();
    }
    function pointer(event: PointerEvent) {
      if (
        !fine.matches ||
        reduced.matches ||
        event.pointerType !== "mouse" ||
        document.documentElement.dataset.arrival === "running"
      )
        return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!pointerSeen) {
        x = targetX;
        y = targetY;
      }
      pointerSeen = true;
      cursor!.dataset.visible = "true";
      const target = event.target instanceof Element ? event.target : null;
      cursor!.dataset.interactive = String(!!target?.closest("a,button"));
      if (target?.closest("input,textarea")) cursor!.dataset.visible = "false";
      const next = target?.closest<HTMLElement>(".project-artwork") ?? null;
      if (card !== next) {
        resetCard();
        card = next;
      }
      if (card) {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty(
          "--card-x",
          `${((event.clientY - bounds.top - bounds.height / 2) / bounds.height) * -5}deg`,
        );
        card.style.setProperty(
          "--card-y",
          `${((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 5}deg`,
        );
      }
      schedule();
    }
    function scroll() {
      desiredDepth = Math.min(
        Math.max(window.scrollY / Math.max(window.innerHeight * 0.85, 1), 0),
        1,
      );
      resetCard();
      schedule();
    }
    function syncMotion() {
      if (reduced.matches) {
        hide();
        cancelAnimationFrame(frame);
        frame = 0;
        scene?.style.setProperty("--scroll-lift", "0px");
        scene?.style.setProperty("--scroll-depth", "0deg");
      } else scroll();
      if (!fine.matches) hide();
    }
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    document.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("keydown", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll, { passive: true });
    fine.addEventListener("change", syncMotion);
    reduced.addEventListener("change", syncMotion);
    scroll();
    return () => {
      cancelAnimationFrame(frame);
      resetCard();
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("keydown", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      fine.removeEventListener("change", syncMotion);
      reduced.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <div className="ambient-motion" aria-hidden="true">
      <div ref={follower} className="cursor-follower" data-visible="false">
        <span className="cursor-halo" />
        <span className="cursor-ring" />
        <span className="cursor-center" />
      </div>
    </div>
  );
}
