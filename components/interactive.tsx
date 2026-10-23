"use client";
import { BrandStar } from "./brand-star";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Send,
  Sparkles,
  ChevronDown,
  Check,
  Menu,
  X,
} from "lucide-react";
import { projects, filters, experience, type Category } from "@/lib/data";
import { ProjectArtwork } from "./project-artwork";
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-pending");
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="header">
      <div className="nav-wrap">
        <a href="#home" aria-label="Sonu Garg home" className="wordmark">
          sonu garg
          <span>
            <BrandStar />
          </span>
        </a>
        <nav
          aria-label="Main navigation"
          className={open ? "navigation open" : "navigation"}
        >
          {[
            ["Case studies", "work"],
            ["AI lab", "innovation"],
            ["Experience", "experience"],
            ["Expertise", "expertise"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Let’s connect <ArrowUpRight size={15} />
          </a>
        </nav>
        <button
          className="menu-button"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
const metricItems = [
  {
    target: 11,
    suffix: "+",
    label: "Years of experience",
    note: "Built on real-world complexity",
    final: "11+",
  },
  {
    target: 50,
    upper: 60,
    label: "Audits supported / year",
    note: "Analytics at enterprise scale",
    final: "50–60",
  },
  {
    target: 40,
    suffix: "%",
    label: "Less report preparation time",
    note: "More room for meaningful work",
    final: "40%",
  },
];

function ImpactMetric({ item }: { item: (typeof metricItems)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  // Render the true value on the server: unavailable JS never leaves a zero.
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let inside = false;
    const finish = () => {
      cancelAnimationFrame(frame);
      setProgress(1);
    };
    const animate = () => {
      cancelAnimationFrame(frame);
      if (motion.matches || document.hidden) {
        setProgress(1);
        return;
      }
      setProgress(0);
      let start: number | null = null;
      const tick = (now: number) => {
        if (start === null) start = now;
        const elapsed = Math.min((now - start) / 1250, 1);
        setProgress(1 - Math.pow(1 - elapsed, 3));
        if (elapsed < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        if (visible && !inside) animate();
        else if (!visible && inside) finish();
        inside = visible;
      },
      { threshold: [0, 0.35], rootMargin: "0px 0px -30px 0px" },
    );
    observer.observe(element);
    const onMotion = () => {
      if (motion.matches) finish();
    };
    const onVisibility = () => {
      if (document.hidden) finish();
      else if (inside) animate();
    };
    motion.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  const value = item.upper
    ? `${Math.round(item.target * progress)}–${Math.round(item.upper * progress)}`
    : `${Math.round(item.target * progress)}${item.suffix}`;
  return (
    <div className="metric" ref={ref} data-counting={progress < 1}>
      <strong>
        <span className="sr-only">{item.final}</span>
        <span className="metric-value" aria-hidden="true">
          {value}
        </span>
        <ArrowUpRight className="metric-arrow" size={22} aria-hidden="true" />
      </strong>
      <p>{item.label}</p>
      <small>{item.note}</small>
    </div>
  );
}

export function Metrics() {
  return (
    <div className="metrics">
      {metricItems.map((item) => (
        <ImpactMetric key={item.label} item={item} />
      ))}
    </div>
  );
}
export function Assistant() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function ask(value: string) {
    if (!value.trim() || busy) return;
    setQuery(value);
    setBusy(true);
    setAnswer("");
    timer.current = setTimeout(() => {
      const q = value.toLowerCase();
      setAnswer(
        q.includes("hr")
          ? "The HR audit is in progress. Priya Sharma is the assigned owner, and the current handler is the HR Controls team. The next milestone is evidence review."
          : q.includes("payroll")
            ? "The sample Payroll audit is assigned to Rahul Mehta. The Payroll Controls team is the current handler, and evidence review is pending."
            : q.includes("finance")
              ? "The sample Finance audit is in review. Ananya Rao is the assigned owner, with the Finance Assurance team handling the current review."
              : "Try asking about the HR audit, the Finance audit, or the Payroll audit owner. This demo uses fictional records and does not access IA3 or an LLM.",
      );
      setBusy(false);
    }, 750);
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    ask(query);
  }
  return (
    <div className="assistant glass">
      <div className="assistant-top">
        <div className="ai-icon">
          <Sparkles size={19} />
        </div>
        <div>
          <strong>Audit copilot</strong>
          <p>IA3 intelligence, in plain language</p>
        </div>
        <span className="demo-label">SIMULATED DEMO</span>
      </div>
      <div className="chat-body">
        <span className="chat-label">ASSISTANT</span>
        <p className="chat-welcome">
          Your next audit insight starts
          <br />
          with a simple question.
        </p>
        <div className="suggestions">
          {["Check status of HR audit", "Who owns the Payroll audit?"].map(
            (q) => (
              <button key={q} disabled={busy} onClick={() => ask(q)}>
                {q}
                <ArrowUpRight size={13} />
              </button>
            ),
          )}
        </div>
        <div role="status" aria-live="polite" className="answer">
          {busy ? (
            <span className="thinking">Reviewing demo records…</span>
          ) : (
            answer && (
              <>
                <span className="chat-label">DEMO RESPONSE</span>
                <p>{answer}</p>
                <small>
                  <Check size={12} /> Fictional data · no live system access
                </small>
              </>
            )
          )}
        </div>
      </div>
      <form className="chat-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="query">
          Ask the simulated audit assistant
        </label>
        <input
          id="query"
          maxLength={300}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about an audit…"
        />
        <button disabled={busy || !query.trim()} aria-label="Send query">
          <Send size={17} />
        </button>
      </form>
    </div>
  );
}
export function Projects() {
  const [filter, setFilter] = useState<Category>("All");
  const [selected, setSelected] = useState("01");
  const visible = projects.filter(
    (p) => filter === "All" || p.category === filter,
  );
  const active = visible.find((p) => p.number === selected) ?? visible[0];
  return (
    <>
      <div className="work-toolbar">
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setSelected(
                  projects.find((p) => f === "All" || p.category === f)!.number,
                );
              }}
              className={filter === f ? "selected" : ""}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="work-count" role="status">
          {String(visible.length).padStart(2, "0")} CASE STUDIES
        </span>
      </div>
      <div className="case-workspace">
        <div className="case-directory">
          <div className="case-directory-heading">
            <span>THE COLLECTION</span>
            <span>
              SELECT TO EXPLORE <ArrowDown size={11} />
            </span>
          </div>
          <div
            className="case-index"
            role="group"
            aria-label="Choose a case study"
          >
            {visible.map((p) => (
              <button
                key={p.number}
                className={`case-select ${active.number === p.number ? "active" : ""}`}
                aria-pressed={active.number === p.number}
                aria-controls="selected-case-study"
                onClick={() => setSelected(p.number)}
              >
                <span className="case-number">{p.number}</span>
                <span className="case-select-copy">
                  <strong>{p.name}</strong>
                  <span>{p.category}</span>
                </span>
                <ArrowUpRight size={17} />
              </button>
            ))}
          </div>
          <div className="case-directory-note">
            <span className="case-note-mark" aria-hidden="true">
              <ArrowRight size={20} />
            </span>
            <p>
              Built in real enterprise environments.
              <br />
              Shared through illustrative visuals.
            </p>
          </div>
        </div>
        <article
          id="selected-case-study"
          className="case-paper"
          aria-labelledby={`case-title-${active.number}`}
        >
          <div className="case-cover" key={`cover-${active.number}`}>
            <ProjectArtwork number={active.number} />
            <span className="case-cover-badge">CASE / {active.number}</span>
          </div>
          <div className="case-content" key={active.number}>
            <div className="case-meta">
              <span>{active.category}</span>
              <span>{active.number === "05" ? "COMMVAULT" : "ACCENTURE"}</span>
            </div>
            <h3 id={`case-title-${active.number}`}>{active.title}</h3>
            <div className="case-context">
              <span>THE CONTEXT</span>
              <p>{active.context}</p>
            </div>
            <div className="case-detail-grid">
              <div>
                <span>THE APPROACH</span>
                <p>{active.approach}</p>
              </div>
              <div>
                <span>MY CONTRIBUTION</span>
                <p>{active.contribution}</p>
              </div>
            </div>
            <div className="case-result">
              <span>DELIVERED OUTCOME</span>
              <strong>{active.outcome}</strong>
              <ArrowUpRight size={22} />
            </div>
            <div className="case-bottom">
              <div className="tags">
                {active.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a
                className="case-cta"
                href={active.number === "01" ? "#innovation" : "#contact"}
              >
                {active.number === "01"
                  ? "Try the audit copilot"
                  : "Let’s discuss this work"}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </article>
      </div>
      <span className="sr-only" role="status">
        {active.name} case study selected.
      </span>
      <p className="project-note">
        Selected professional contributions · illustrative visuals · internal
        systems remain confidential.
      </p>
      <noscript>
        <div className="case-static-list">
          {projects.slice(1).map((p) => (
            <article key={p.number}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <strong>{p.outcome}</strong>
            </article>
          ))}
        </div>
      </noscript>
    </>
  );
}
export function Timeline() {
  const [active, setActive] = useState(0);
  return (
    <div className="timeline">
      {experience.map((e, i) => (
        <article
          key={e.company}
          className={`timeline-item ${active === i ? "active" : ""}`}
        >
          <button
            className="timeline-trigger"
            onClick={() => setActive(active === i ? -1 : i)}
            aria-expanded={active === i}
            aria-controls={`experience-${i}`}
          >
            <span className="timeline-index">0{i + 1}</span>
            <span className="company-role">
              <strong>{e.company}</strong>
              <span>{e.role}</span>
            </span>
            <span className="timeline-date">{e.date}</span>
            <ChevronDown size={19} />
          </button>
          <div
            id={`experience-${i}`}
            hidden={active !== i}
            className="timeline-content"
          >
            <p>{e.detail}</p>
            <ul>
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
export function ContactButton() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <button
      className="copy-button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText("sonugarg072@gmail.com");
          setCopied(true);
          setFailed(false);
        } catch {
          setFailed(true);
        }
      }}
    >
      {copied ? (
        <>
          <Check size={15} /> Email copied
        </>
      ) : failed ? (
        "sonugarg072@gmail.com"
      ) : (
        <>
          Copy email <ArrowRight size={15} />
        </>
      )}
    </button>
  );
}
