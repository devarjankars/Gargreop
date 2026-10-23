import {
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Database,
  ShieldCheck,
  Award,
  MapPin,
  Linkedin,
  Phone,
  Download,
} from "lucide-react";
import {
  Header,
  Reveal,
  Metrics,
  Assistant,
  Projects,
  Timeline,
  ContactButton,
} from "@/components/interactive";
import { SignalSculpture } from "@/components/signal-sculpture";
import { BrandStar } from "@/components/brand-star";
import { HeroCopy } from "@/components/hero-copy";

const competencies = [
  {
    icon: Sparkles,
    number: "01",
    title: "Intelligence that works.",
    copy: "Bringing AI into the everyday decisions that move work forward.",
    skills: [
      "Agentic AI & LLM Integration",
      "Power Automate",
      "SharePoint Workflow Automation",
    ],
  },
  {
    icon: Database,
    number: "02",
    title: "Data with direction.",
    copy: "Engineering reliable foundations for insights people can act on.",
    skills: [
      "SQL · BigQuery · Python",
      "Power BI · DAX · Tableau",
      "ETL/ELT · Data Modelling",
    ],
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Confidence by design.",
    copy: "Making risk visible and connecting control gaps to better decisions.",
    skills: [
      "Audit & Fraud-Risk Analytics",
      "Risk & Controls",
      "Root Cause Analysis · CAPA",
    ],
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <section id="home" className="hero section-wrap">
          <div className="hero-topline">
            <span className="eyebrow">
              <span className="status-dot" /> INDEPENDENT THINKING. ENTERPRISE
              IMPACT.
            </span>
            <span className="location">
              <MapPin size={13} /> Bengaluru, India
            </span>
          </div>
          <div className="hero-layout">
            <HeroCopy />
            <SignalSculpture />
          </div>
          <div className="hero-footnote">
            <span>BUSINESS INTELLIGENCE / AUDIT ANALYTICS / AGENTIC AI</span>
            <a href="#about">
              A LITTLE CONTEXT <ArrowDown size={14} />
            </a>
          </div>
        </section>

        <div className="company-band">
          <div className="section-wrap">
            <span>EXPERIENCE SHAPED AT</span>
            <div>
              <b>
                Accenture
                <span>
                  <ArrowUpRight size={11} />
                </span>
              </b>
              <b>Commvault</b>
              <b>
                amazon<span className="amazon-smile">⌣</span>
              </b>
            </div>
            <span>2015 — PRESENT</span>
          </div>
        </div>

        <section
          id="about"
          className="section-wrap about-section section-space"
        >
          <Reveal>
            <div className="section-marker">
              <span>01 / THE PERSPECTIVE</span>
              <span>MORE THAN THE NUMBERS</span>
            </div>
            <div className="about-layout">
              <p className="eyebrow">
                A LITTLE ABOUT ME <ArrowUpRight size={15} />
              </p>
              <div>
                <h2>
                  Good analytics tells you
                  <br />
                  what happened.
                  <br />
                  <span className="serif-word">
                    Great analytics moves you forward.
                  </span>
                </h2>
                <p className="about-copy">
                  I’m Sonu, an analytics lead who enjoys connecting the dots
                  others might miss. Across Accenture, Commvault, and Amazon,
                  I’ve built data pipelines, made enterprise risk more visible,
                  and brought AI into the audit conversation.
                </p>
                <p className="about-copy">
                  My approach is simple: understand the problem, build with
                  purpose, and make the result useful to the people who depend
                  on it.
                </p>
              </div>
            </div>
          </Reveal>
          <Metrics />
        </section>

        <section id="work" className="section-wrap section-space work-section">
          <Reveal>
            <div className="section-marker">
              <span>02 / SELECTED WORK</span>
              <span>THINKING, MADE TANGIBLE</span>
            </div>
            <div className="section-heading">
              <h2>
                Small details.
                <br />
                <span className="serif-word">Meaningful shifts.</span>
              </h2>
              <p>
                A selection of systems, workflows, and insights
                <br />
                built to make a measurable difference.
              </p>
            </div>
            <Projects />
          </Reveal>
        </section>

        <section id="innovation" className="innovation-section">
          <div className="section-wrap">
            <div className="section-marker">
              <span>03 / THE NEXT CHAPTER</span>
              <span>HUMAN QUESTIONS. CONNECTED INTELLIGENCE.</span>
            </div>
            <Reveal className="spotlight-layout">
              <div>
                <span className="eyebrow">
                  <Sparkles size={14} /> AGENTIC AI × AUDIT INTELLIGENCE
                </span>
                <h2>
                  What if your data
                  <br />
                  <span className="serif-word">could answer back?</span>
                </h2>
                <p className="section-copy">
                  A simple question. A clearer way forward.
                </p>
                <p className="muted">
                  I developed an Agentic AI Audit Assistant connected to the IA3
                  status tracker. It brings audit status, ownership, and current
                  handlers into a natural-language conversation.
                </p>
                <div className="spotlight-points">
                  <span>
                    <span>01</span> Ask in everyday language
                  </span>
                  <span>
                    <span>02</span> Connect the audit context
                  </span>
                  <span>
                    <span>03</span> Get straight to the next step
                  </span>
                </div>
                <p className="small-note">
                  Try the interaction here with fictional sample records.
                  <br />
                  This demo does not connect to IA3 or a live AI model.
                </p>
              </div>
              <Assistant />
            </Reveal>
          </div>
        </section>

        <section id="experience" className="section-wrap section-space">
          <Reveal>
            <div className="section-marker">
              <span>04 / THE JOURNEY</span>
              <span>A DECADE OF BUILDING FORWARD</span>
            </div>
            <div className="section-heading">
              <h2>
                Different chapters.
                <br />
                <span className="serif-word">One curious mind.</span>
              </h2>
              <p>
                Enterprise scale. Hands-on depth.
                <br />
                People, platforms, and progress.
              </p>
            </div>
            <Timeline />
            <a className="resume-link" href="/Sonu-Garg-Resume.pdf" download>
              For the full story, download my résumé <Download size={15} />
            </a>
          </Reveal>
        </section>

        <section id="expertise" className="section-wrap section-space">
          <Reveal>
            <div className="section-marker">
              <span>05 / THE TOOLKIT</span>
              <span>TECHNICAL DEPTH. BUSINESS CONTEXT.</span>
            </div>
            <div className="section-heading">
              <h2>
                Three lenses.
                <br />
                <span className="serif-word">One connected view.</span>
              </h2>
              <p>
                The right tools matter.
                <br />
                Knowing what to do with them matters more.
              </p>
            </div>
            <div className="competency-grid">
              {competencies.map((card) => (
                <article className="competency" key={card.title}>
                  <div className="competency-top">
                    <card.icon size={27} />
                    <span>{card.number}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                  <ul>
                    {card.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="credentials-grid">
              <div>
                <span className="eyebrow">ALWAYS A STUDENT</span>
                <h3>Learning never stands still.</h3>
                <div className="certifications">
                  {[
                    "Agentic AI",
                    "Generative AI",
                    "Snowflake",
                    "Python",
                    "SQL",
                    "Advanced Excel · Amazon",
                  ].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <p className="education">
                  BE, Electronics & Communication
                  <br />
                  <span>Jai Narain College of Technology, Bhopal</span>
                </p>
              </div>
              <div className="recognition">
                <span className="eyebrow">A FEW THINGS I’M PROUD OF</span>
                <div>
                  <Award />
                  <p>
                    <strong>Accenture Encore Award</strong>
                    <span>FY26 Q1 · Star of the Business</span>
                  </p>
                </div>
                <div>
                  <Award />
                  <p>
                    <strong>Amazon Star Trek & A-Team Awards</strong>
                    <span>Process excellence & successful launches</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-wrap">
            <Reveal>
              <div className="contact-top">
                <span className="eyebrow">
                  <span className="status-dot" /> GOOD WORK STARTS WITH A
                  CONVERSATION
                </span>
                <span className="contact-star" aria-hidden="true">
                  <BrandStar />
                </span>
              </div>
              <h2>
                Something complex
                <br />
                on your mind?
                <br />
                <a href="mailto:sonugarg072@gmail.com">
                  <span className="serif-word">Let’s make it clear.</span>
                  <ArrowUpRight />
                </a>
              </h2>
              <div className="contact-bottom">
                <a
                  className="contact-email"
                  href="mailto:sonugarg072@gmail.com"
                >
                  sonugarg072@gmail.com <ArrowUpRight size={17} />
                </a>
                <div className="contact-links">
                  <ContactButton />
                  <a
                    href="https://www.linkedin.com/in/sonu-garg95/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={14} /> LinkedIn <ArrowUpRight size={14} />
                  </a>
                  <a href="tel:+919399815359">
                    <Phone size={14} /> Call me
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="section-wrap">
        <a className="wordmark" href="#home">
          sonu garg
          <span>
            <BrandStar />
          </span>
        </a>
        <p>© {new Date().getFullYear()} Sonu Garg · Thoughtfully connected.</p>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </>
  );
}
