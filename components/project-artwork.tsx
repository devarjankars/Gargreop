import {
  ArrowUpRight,
  Check,
  Database,
  Sparkles,
  ShieldCheck,
  Workflow,
} from "lucide-react";

/** Abstract project illustrations, never screenshots of confidential client systems. */
export function ProjectArtwork({ number }: { number: string }) {
  return (
    <div className={`project-artwork artwork-${number}`} aria-hidden="true">
      <div className="artwork-grid" />
      <span className="artwork-caption">
        {
          (
            {
              "01": "CONVERSATIONAL INTELLIGENCE",
              "02": "WORKFLOWS, REIMAGINED",
              "03": "ASSURANCE IN FOCUS",
              "04": "FROM LEGACY TO CLARITY",
              "05": "FIND YOUR SIGNAL",
              "06": "CONTROL BY DESIGN",
            } as Record<string, string>
          )[number]
        }
      </span>
      {number === "01" ? (
        <div className="art-chat">
          <span className="art-chat-icon">
            <Sparkles size={22} />
          </span>
          <div className="art-bubble">
            What’s the status of the HR audit?
            <ArrowUpRight size={14} />
          </div>
          <div className="art-reply">
            <span />
            <span />
            <span />
          </div>
          <span className="art-mini-label">ASK. CONNECT. UNDERSTAND.</span>
        </div>
      ) : number === "02" ? (
        <div className="art-workflow">
          <span>
            <Database size={22} />
          </span>
          <i />
          <span className="flow-center">
            <Workflow size={28} />
          </span>
          <i />
          <span>
            <Check size={22} />
          </span>
          <b>Fewer follow-ups. More flow.</b>
        </div>
      ) : number === "03" || number === "06" ? (
        <div className="art-assurance">
          <div className="radar-ring ring-a" />
          <div className="radar-ring ring-b" />
          <div className="radar-ring ring-c" />
          <ShieldCheck size={40} />
          {["HR", "FINANCE", "PAYROLL", "PROCUREMENT"].map((s, i) => (
            <span key={s} className={`radar-label radar-${i}`}>
              {s}
            </span>
          ))}
        </div>
      ) : number === "04" ? (
        <div className="art-pipeline">
          <span>TYPE B</span>
          <div className="pipeline-lines">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span>
            TYPE A <ArrowUpRight size={16} />
          </span>
          <b>A stronger foundation for insight.</b>
        </div>
      ) : (
        <div className="art-bars">
          {[28, 45, 36, 64, 49, 78, 66, 94, 80, 112, 100, 135].map((h, i) => (
            <span key={i} style={{ height: h }} />
          ))}
          <b>Signals into strategy.</b>
        </div>
      )}
      <span className="artwork-index">SG — {number} / SELECTED WORK</span>
    </div>
  );
}
