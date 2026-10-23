"use client";

import { useEffect, useRef } from "react";

/** Event-driven transforms only; the native cursor and scroll behavior remain intact. */
export function AmbientMotion() {
  const follower = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = follower.current;
    const surface = canvas.current;
    const context = surface?.getContext("2d");
    type Spark = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      born: number;
      life: number;
      ring?: boolean;
    };
    let sparks: Spark[] = [];
    let viewportWidth = window.innerWidth,
      viewportHeight = window.innerHeight;
    function resizeCanvas() {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      if (!surface || !context) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      surface.width = Math.round(viewportWidth * ratio);
      surface.height = Math.round(viewportHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    resizeCanvas();
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
    let lastSparkX = 0,
      lastSparkY = 0;
    let down: { x: number; y: number } | null = null;

    function resetCard() {
      card?.style.setProperty("--card-x", "0deg");
      card?.style.setProperty("--card-y", "0deg");
      card = null;
    }
    function render() {
      frame = 0;
      if (reduced.matches || document.hidden) return;
      let moving = false;
      if (context) {
        const now = performance.now();
        context.clearRect(0, 0, viewportWidth, viewportHeight);
        sparks = sparks.filter((spark) => now - spark.born < spark.life);
        sparks.forEach((spark, index) => {
          const age = now - spark.born,
            remaining = 1 - age / spark.life;
          const sx = spark.x + spark.vx * age,
            sy = spark.y + spark.vy * age;
          context.strokeStyle = `rgba(139,114,181,${remaining * 0.3})`;
          context.fillStyle = `rgba(139,114,181,${remaining * 0.5})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.arc(
            sx,
            sy,
            spark.ring ? 5 + (1 - remaining) * 35 : 1.3,
            0,
            Math.PI * 2,
          );
          if (spark.ring) context.stroke();
          else context.fill();
          const previous = sparks[index - 1];
          if (previous && !spark.ring && !previous.ring) {
            const px = previous.x + previous.vx * (now - previous.born),
              py = previous.y + previous.vy * (now - previous.born);
            if (Math.hypot(sx - px, sy - py) < 75) {
              context.beginPath();
              context.moveTo(px, py);
              context.lineTo(sx, sy);
              context.stroke();
            }
          }
        });
        moving = sparks.length > 0;
      }
      if (fine.matches && pointerSeen) {
        x += (targetX - x) * 0.2;
        y += (targetY - y) * 0.2;
        cursor!.style.transform = `translate3d(${x}px,${y}px,0)`;
        moving ||= Math.abs(targetX - x) + Math.abs(targetY - y) > 0.2;
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
      if (label.current)
        label.current.textContent = target?.closest(".case-select")
          ? "VIEW"
          : target?.closest("a,button")
            ? "OPEN"
            : "";
      if (Math.hypot(targetX - lastSparkX, targetY - lastSparkY) > 10) {
        sparks.push({
          x: targetX,
          y: targetY,
          vx: 0,
          vy: -0.004,
          born: performance.now(),
          life: 650,
        });
        sparks = sparks.slice(-32);
        lastSparkX = targetX;
        lastSparkY = targetY;
      }
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
    function pointerDown(event: PointerEvent) {
      down = { x: event.clientX, y: event.clientY };
    }
    function pointerUp(event: PointerEvent) {
      const wasTap =
        down && Math.hypot(event.clientX - down.x, event.clientY - down.y) < 12;
      down = null;
      if (
        !wasTap ||
        reduced.matches ||
        document.documentElement.dataset.arrival === "running"
      )
        return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("input,textarea")) return;
      const now = performance.now();
      sparks.push({
        x: event.clientX,
        y: event.clientY,
        vx: 0,
        vy: 0,
        born: now,
        life: 620,
        ring: true,
      });
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        sparks.push({
          x: event.clientX,
          y: event.clientY,
          vx: Math.cos(angle) * 0.035,
          vy: Math.sin(angle) * 0.035,
          born: now,
          life: 480,
        });
      }
      sparks = sparks.slice(-40);
      schedule();
    }
    function cancelTouch() {
      down = null;
    }
    function resize() {
      resizeCanvas();
      scroll();
    }
    function scroll() {
      cursor!.dataset.interactive = "false";
      if (label.current) label.current.textContent = "";
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
        sparks = [];
        context?.clearRect(0, 0, viewportWidth, viewportHeight);
        cancelAnimationFrame(frame);
        frame = 0;
        scene?.style.setProperty("--scroll-lift", "0px");
        scene?.style.setProperty("--scroll-depth", "0deg");
      } else scroll();
      if (!fine.matches) hide();
    }
    const onVisibility = () => {
      if (document.hidden) {
        hide();
        sparks = [];
        context?.clearRect(0, 0, viewportWidth, viewportHeight);
      } else scroll();
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    document.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("pointerdown", pointerDown, { passive: true });
    document.addEventListener("pointerup", pointerUp, { passive: true });
    document.addEventListener("pointercancel", cancelTouch, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("keydown", hide);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    fine.addEventListener("change", syncMotion);
    reduced.addEventListener("change", syncMotion);
    scroll();
    return () => {
      cancelAnimationFrame(frame);
      resetCard();
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerdown", pointerDown);
      document.removeEventListener("pointerup", pointerUp);
      document.removeEventListener("pointercancel", cancelTouch);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("keydown", hide);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
      fine.removeEventListener("change", syncMotion);
      reduced.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <div className="ambient-motion" aria-hidden="true">
      <canvas ref={canvas} className="signal-trail" />
      <div ref={follower} className="cursor-follower" data-visible="false">
        <span className="cursor-halo" />
        <span className="cursor-ring" />
        <span className="cursor-center" />
        <span className="cursor-orbit" />
        <span className="cursor-label" ref={label} />
      </div>
    </div>
  );
}
