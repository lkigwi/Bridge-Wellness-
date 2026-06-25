import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import IntakeForms from "@/components/IntakeForms";

export const metadata: Metadata = {
  title: "Services | The Bridge Wellness Centre",
  description: "Individual therapy, marriage coaching, child & adolescent therapy, and blended family therapy with Miriam Gathoni Mwangi, LPC — in Nairobi and worldwide.",
};

const services = [
  {
    num: "01",
    title: "Individual Therapy",
    long: "A confidential, one-to-one space to work through anxiety, depression, grief, burnout, or the quiet weight of life transitions. Together we make sense of what you're feeling and rebuild a steadier sense of self.",
    tags: ["Anxiety & stress", "Depression", "Grief & loss", "Self-worth", "Life transitions"],
  },
  {
    num: "02",
    title: "Marriage Coaching",
    long: "For couples who want to feel close again. We work on communication, trust, conflict, and intimacy — whether you're repairing after a rupture, preparing for marriage, or simply wanting to grow together.",
    tags: ["Communication", "Rebuilding trust", "Conflict", "Intimacy", "Premarital"],
  },
  {
    num: "03",
    title: "Child & Adolescent Therapy",
    long: "Age-attuned, compassionate support for children and teens navigating big emotions, anxiety, behavioral challenges, school pressure, or questions of identity — with parents gently guided along the way.",
    tags: ["Big emotions", "Anxiety", "Behavior", "School stress", "Identity"],
  },
  {
    num: "04",
    title: "Blended Family Therapy",
    long: "Bringing two families together takes patience and grace. We work through step-parenting, co-parenting, loyalty and belonging, and the day-to-day rhythms that help everyone feel they truly have a place.",
    tags: ["Step-parenting", "Co-parenting", "Belonging", "New routines"],
  },
];

const steps = [
  { num: "1", title: "Reach out", body: "Send a short message about what's bringing you here. No detail is too small — or too big." },
  { num: "2", title: "Intro conversation", body: "We meet for a brief, no-pressure call to see if working together feels right for you." },
  { num: "3", title: "Begin together", body: "We schedule your first session and start, gently, wherever you are today." },
];

export default function Services() {
  return (
    <div className="fade-up" style={{ background: "#FAFAF8" }}>

      {/* Page header */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 48px 0", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9A958C", marginBottom: 20 }}>
          Services
        </div>
        <h1 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(36px, 5vw, 54px)", color: "#2A2A28", margin: "0 auto 24px", fontWeight: 400, lineHeight: 1.14, maxWidth: 720 }}>
          Support shaped around your life
        </h1>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17.5, lineHeight: 1.8, color: "#6E6A64", margin: "0 auto", maxWidth: 560 }}>
          Whether you come on your own or alongside the people you love, each path begins the same way — with being truly heard.
        </p>
      </div>

      {/* Service rows */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 48px 40px" }}>
        {services.map((s) => (
          <div key={s.num} style={{ display: "grid", gridTemplateColumns: "0.42fr 0.58fr", gap: 56, alignItems: "center", padding: "56px 0", borderTop: "1px solid #ECE7DE" }} className="service-row">
            <div>
              <div style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 15, color: "#B6AED0", letterSpacing: "0.12em", marginBottom: 18 }}>{s.num}</div>
              <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(24px, 3vw, 34px)", color: "#2A2A28", margin: "0 0 14px", fontWeight: 400, lineHeight: 1.2 }}>{s.title}</h2>
              <div style={{ width: 48, height: 1, background: "#5C8C6E" }} />
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.85, color: "#6E6A64", margin: "0 0 22px" }}>{s.long}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {s.tags.map((t) => (
                  <span key={t} style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 13, letterSpacing: "0.04em", color: "#2F5D52", background: "#EDEAE2", border: "1px solid #E3DCCF", padding: "8px 16px", borderRadius: 100 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={{ background: "#F5F0E8", marginTop: 48 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "90px 48px" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9A958C", marginBottom: 16 }}>
              Getting started
            </div>
            <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#2A2A28", margin: 0, fontWeight: 400 }}>
              How it works
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="steps-grid">
            {steps.map((st) => (
              <div key={st.num} style={{ textAlign: "center", padding: "0 16px" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid #C2CFC4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", fontFamily: "var(--font-marcellus), serif", fontSize: 20, color: "#5C8C6E" }}>
                  {st.num}
                </div>
                <div style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 21, color: "#2A2A28", marginBottom: 10 }}>{st.title}</div>
                <div style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.75, color: "#8A857D" }}>{st.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intake forms */}
      <div style={{ background: "#FAFAF8" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "90px 48px" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9A958C", marginBottom: 16 }}>
              Book a session
            </div>
            <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#2A2A28", margin: "0 0 18px", fontWeight: 400 }}>
              Begin your journey
            </h2>
            <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.8, color: "#6E6A64", margin: "0 auto", maxWidth: 520 }}>
              Select the service that fits your situation and complete the intake form below. Miriam will be in touch within 1–2 business days.
            </p>
          </div>
          <Suspense fallback={<div style={{ padding: 32, color: "#9A958C", fontFamily: "var(--font-jost), sans-serif", textAlign: "center" }}>Loading form…</div>}>
            <IntakeForms />
          </Suspense>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#2F5D52" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "84px 48px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(26px, 3.5vw, 40px)", color: "#FAFAF8", margin: "0 0 18px", fontWeight: 400 }}>
            Not sure which fits?
          </h2>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: "#A9B6AE", margin: "0 0 30px" }}>
            Send us a general enquiry and we&apos;ll help you find the right path.
          </p>
          <Link href="/contact" style={{ display: "inline-block", fontFamily: "var(--font-jost), sans-serif", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2F5D52", background: "#F5F0E8", padding: "18px 38px", borderRadius: 2, textDecoration: "none" }}>
            Get in Touch
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .service-row { grid-template-columns: 1fr !important; gap: 28px !important; padding: 40px 0 !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 900px) {
          .intake-forms-section { padding: 60px 24px !important; }
        }
      `}</style>
    </div>
  );
}
