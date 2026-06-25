import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Miriam | The Bridge Wellness Centre",
  description: "Meet Miriam Gathoni Mwangi, LPC — a Licensed Professional Counselor with over a decade of experience supporting individuals, couples, and families in Nairobi, Kenya and worldwide.",
};

const values = [
  {
    num: "i",
    title: "You set the pace",
    body: "Healing isn't rushed. We move at a rhythm that feels safe, never pushing past what you're ready for.",
  },
  {
    num: "ii",
    title: "No judgment, ever",
    body: "Whatever you bring is met with warmth and respect. This is a place to be honest without fear.",
  },
  {
    num: "iii",
    title: "Real, lasting change",
    body: "Comfort matters — and so does progress. We work toward tools and insight you carry well beyond our sessions.",
  },
];

const creds = [
  { num: "01", text: "Licensed Professional Counselor (LPC), practicing in Nairobi, Kenya." },
  { num: "02", text: "Over a decade supporting individuals, couples, and families through change." },
  { num: "03", text: "Evidence-based, client-centered approach drawing on CBT, emotionally focused, and family-systems work." },
  { num: "04", text: "Experienced in secure virtual care for clients across multiple countries and time zones." },
];

export default function About() {
  return (
    <div className="fade-up" style={{ background: "#FAFAF8" }}>

      {/* Page header */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 48px 0", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9A958C", marginBottom: 20 }}>
          About
        </div>
        <h1 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(36px, 5vw, 54px)", color: "#2A2A28", margin: "0 auto", fontWeight: 400, lineHeight: 1.14, maxWidth: 760 }}>
          Compassion, met with professional care
        </h1>
      </div>

      {/* Bio split */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "72px 48px 24px", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 70, alignItems: "start" }} className="bio-grid">
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", right: -18, top: -18, width: 140, height: 140, background: "#E8E4F0", zIndex: 0 }} />
          <Image
            src="/miriam-portrait.png"
            alt="Miriam Gathoni Mwangi, LPC"
            width={560}
            height={540}
            style={{ position: "relative", zIndex: 1, display: "block", width: "100%", height: 540, objectFit: "cover", objectPosition: "50% 20%", borderRadius: 12 }}
          />
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 34, color: "#2F5D52", margin: "0 0 8px", fontWeight: 400 }}>
            Miriam Gathoni Mwangi
          </h2>
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A958C", marginBottom: 28 }}>
            Licensed Professional Counselor
          </div>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.85, color: "#6E6A64", margin: "0 0 18px" }}>
            For more than a decade, Miriam has walked alongside people in their most tender seasons — grief, anxiety, strained marriages, the quiet ache of feeling unseen. She believes every person carries the capacity to heal, and that the right support can make that healing possible.
          </p>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.85, color: "#6E6A64", margin: "0 0 18px" }}>
            Her work is grounded in evidence-based practice and softened by deep human warmth. Sessions are unhurried and judgment-free — a place to set down what you&apos;ve been carrying and find a way forward that feels true to you.
          </p>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.85, color: "#6E6A64", margin: "0 0 32px" }}>
            Based in Nairobi, Miriam serves clients locally and internationally through secure, confidential virtual sessions.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#ECE7DE", border: "1px solid #ECE7DE" }}>
            <div style={{ background: "#FAFAF8", padding: "24px 26px" }}>
              <div style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 30, color: "#5C8C6E" }}>10+</div>
              <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 13, color: "#8A857D", letterSpacing: "0.04em" }}>Years of practice</div>
            </div>
            <div style={{ background: "#FAFAF8", padding: "24px 26px" }}>
              <div style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 30, color: "#5C8C6E" }}>Global</div>
              <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 13, color: "#8A857D", letterSpacing: "0.04em" }}>Clients worldwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div style={{ background: "#F5F0E8", marginTop: 64 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "90px 48px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9A958C", marginBottom: 16 }}>
              How I work
            </div>
            <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#2A2A28", margin: 0, fontWeight: 400 }}>
              A few things I hold to
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="values-grid">
            {values.map((v) => (
              <div key={v.num} style={{ background: "#FAFAF8", padding: "40px 34px", borderTop: "2px solid #5C8C6E" }}>
                <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 26, color: "#B6AED0", marginBottom: 18 }}>{v.num}</div>
                <div style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 22, color: "#2A2A28", marginBottom: 12 }}>{v.title}</div>
                <div style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.75, color: "#8A857D" }}>{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Credentials */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 64 }} className="creds-grid">
          <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 34, color: "#2A2A28", margin: 0, fontWeight: 400, lineHeight: 1.2 }}>
            Credentials &amp; approach
          </h2>
          <div style={{ fontFamily: "var(--font-jost), sans-serif" }}>
            {creds.map((c) => (
              <div key={c.num} style={{ display: "flex", gap: 24, padding: "22px 0", borderBottom: "1px solid #ECE7DE" }}>
                <div style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 14, color: "#B6AED0", minWidth: 34 }}>{c.num}</div>
                <div style={{ fontWeight: 300, fontSize: 16.5, lineHeight: 1.7, color: "#5A554E" }}>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#2F5D52" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "84px 48px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#FAFAF8", margin: "0 0 26px", fontWeight: 400 }}>
            Let&apos;s talk about where you are
          </h2>
          <Link href="/contact" style={{ display: "inline-block", fontFamily: "var(--font-jost), sans-serif", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2F5D52", background: "#F5F0E8", padding: "18px 38px", borderRadius: 2, textDecoration: "none" }}>
            Book a Session
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bio-grid { grid-template-columns: 1fr !important; padding: 48px 24px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .creds-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
