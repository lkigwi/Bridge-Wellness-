import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQs | The Bridge Wellness Centre",
  description: "Answers to common questions about working with Miriam Gathoni Mwangi, LPC — virtual sessions, confidentiality, session length, fees, and how to get started.",
};

export default function FAQs() {
  return (
    <div className="fade-up" style={{ background: "#FAFAF8" }}>

      {/* Page header */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 48px 0", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9A958C", marginBottom: 20 }}>
          FAQs
        </div>
        <h1 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(36px, 5vw, 54px)", color: "#2A2A28", margin: "0 auto 24px", fontWeight: 400, lineHeight: 1.14, maxWidth: 680 }}>
          Questions, gently answered
        </h1>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17.5, lineHeight: 1.8, color: "#6E6A64", margin: "0 auto", maxWidth: 540 }}>
          A few things people often wonder before reaching out. If your question isn&apos;t here, you&apos;re always welcome to ask.
        </p>
      </div>

      {/* Accordion */}
      <FAQAccordion />

      {/* Still wondering card */}
      <div style={{ maxWidth: 840, margin: "0 auto", padding: "24px 48px 96px" }}>
        <div style={{ background: "#F5F0E8", padding: 48, borderRadius: 3, textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 24, color: "#9F94BE", marginBottom: 12 }}>
            still wondering?
          </div>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 16.5, lineHeight: 1.8, color: "#6E6A64", margin: "0 0 26px" }}>
            Send your question directly — Miriam reads every message personally.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: 14,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#fff",
              background: "#5C8C6E",
              padding: "16px 34px",
              borderRadius: 2,
              textDecoration: "none",
            }}
          >
            Ask a Question
          </Link>
        </div>
      </div>
    </div>
  );
}
