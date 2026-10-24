import Image from "next/image";
import portrait from "@/public/images/sonu-garg-portrait.webp";
import {
  ArrowUpRight,
  ShieldCheck,
  Users,
  Layers3,
  Sparkles,
  MapPin,
} from "lucide-react";
import { BrandStar } from "./brand-star";
import { Metrics, Reveal } from "./interactive";

export function ExecutiveBrief() {
  return (
    <section
      id="about"
      className="section-wrap executive-brief section-space"
      aria-labelledby="brief-title"
    >
      <Reveal className="profile-introduction">
        <div className="section-marker">
          <span>01 / EXECUTIVE BRIEF</span>
          <span>THE PERSON BEHIND THE ANALYTICS</span>
        </div>
        <div className="brief-profile">
          <figure className="brief-portrait">
            <div className="brief-portrait-frame">
              <Image
                src={portrait}
                alt="Sonu Garg, BI and Analytics Lead"
                fill
                sizes="(max-width: 760px) 280px, (max-width: 1100px) 34vw, 380px"
                placeholder="blur"
                className="brief-portrait-image"
              />
            </div>
            <span className="portrait-location">
              <MapPin size={11} /> Bengaluru, India
            </span>
            <span className="portrait-coordinate" aria-hidden="true">
              PROFILE / SONU GARG
            </span>
            <figcaption className="brief-portrait-caption">
              <span className="profile-caption-mark">
                <BrandStar />
              </span>
              <div>
                <strong>Sonu Garg</strong>
                <span>BI & Analytics Lead</span>
              </div>
            </figcaption>
          </figure>
          <div className="brief-profile-copy">
            <span className="eyebrow">ABOUT / SONU GARG</span>
            <h2 id="brief-title">
              Hi, I’m Sonu.
              <br />
              <span className="serif-word">I work through the details.</span>
            </h2>
            <p>
              I lead BI and audit analytics at Accenture. I work with audit
              teams to check the data, spot control gaps, and build reports they
              can use.
            </p>
            <p>
              I also manage and mentor two analysts. Before Accenture, I worked
              at Commvault and Amazon.
            </p>
            <div className="profile-work-note">
              <span className="profile-work-icon">
                <Sparkles size={19} />
              </span>
              <div>
                <span className="profile-work-label">ONE THING I’VE BUILT</span>
                <h3>An easier way to check an audit.</h3>
                <p>
                  An assistant connected to IA3 that answers questions about
                  audit status and ownership.
                </p>
                <a href="#innovation">
                  Try the demo <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
            <a className="brief-profile-link" href="#experience">
              Explore my experience <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </Reveal>
      <Metrics />
      <div className="brief-bento">
        <article className="brief-lead">
          <div className="brief-card-top">
            <span>CURRENT CHAPTER</span>
            <Layers3 size={20} />
          </div>
          <span className="brief-company">
            Accenture <ArrowUpRight size={16} />
          </span>
          <h3>
            Building intelligence.
            <br />
            Developing people.
          </h3>
          <p>
            BI Engineering Lead, connecting audit teams, business stakeholders,
            and engineering around reliable analytics and practical automation.
          </p>
          <div className="brief-lead-bottom">
            <span>JAN 2024 — PRESENT</span>
            <a href="#experience" aria-label="Explore Sonu’s career">
              <ArrowUpRight size={19} />
            </a>
          </div>
        </article>
        <article className="brief-fact">
          <div className="brief-card-top">
            <span>RISK, IN CONTEXT</span>
            <ShieldCheck size={20} />
          </div>
          <strong>
            04<span>business functions</span>
          </strong>
          <p>
            Fraud-risk analytics across the functions that keep an enterprise
            moving.
          </p>
          <div className="brief-functions">
            {["HR", "Finance", "Procurement", "Payroll"].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </article>
        <article className="brief-fact brief-people">
          <div className="brief-card-top">
            <span>LEADERSHIP, HANDS-ON</span>
            <Users size={20} />
          </div>
          <strong>
            02<span>analysts managed & mentored</span>
          </strong>
          <p>
            Part of a five-member analytics team, building shared standards for
            analysis, validation, documentation, and reporting.
          </p>
          <a className="brief-inline-link" href="#expertise">
            Explore my expertise <ArrowUpRight size={14} />
          </a>
        </article>
      </div>
      <div className="brief-signoff">
        <p>
          Experience shaped across{" "}
          <strong>Accenture, Commvault & Amazon.</strong>
        </p>
        <a href="/Sonu-Garg-Resume.pdf" download>
          THE FULL RÉSUMÉ <ArrowUpRight size={13} />
        </a>
      </div>
    </section>
  );
}
