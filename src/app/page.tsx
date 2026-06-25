import Image from "next/image";
import Link from "next/link";

const services = [
  { num: "01", title: "Individual Therapy", short: "Personal space to heal and grow." },
  { num: "02", title: "Marriage Coaching", short: "Rebuild trust and connection." },
  { num: "03", title: "Child & Adolescent Therapy", short: "Gentle support for young hearts." },
  { num: "04", title: "Blended Family Therapy", short: "Weaving two families into one." },
];

export default function Home() {
  return (
    <div className="fade-up" style={{ background: "#FAFAF8" }}>

      {/* Hero */}
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch" }} className="hero-grid">
        <div style={{ padding: "96px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }} className="hero-text">
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 30 }}>
            <div style={{ width: 42, height: 1, background: "#5C8C6E" }} />
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9A958C" }}>
              The Bridge · Wellness Centre
            </div>
          </div>
          <h1 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(40px, 5vw, 62px)", lineHeight: 1.1, color: "#2A2A28", margin: "0 0 28px", fontWeight: 400 }}>
            You Don&apos;t Have To Carry This Alone
          </h1>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17.5, lineHeight: 1.78, color: "#6E6A64", margin: "0 0 40px", maxWidth: 440 }}>
            Professional counseling and coaching with Miriam Gathoni Mwangi, LPC. Quietly steady support for individuals, couples, and families — in Nairobi and across the world.
          </p>
          <div style={{ display: "flex", gap: 14, marginBottom: 36, flexWrap: "wrap" }}>
            <Link href="/contact?service=individual" style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: "#5C8C6E", padding: "17px 30px", borderRadius: 2, textDecoration: "none" }}>
              I Need Counseling
            </Link>
            <Link href="/contact?service=marriage" style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2F5D52", border: "1px solid #C2CFC4", padding: "17px 30px", borderRadius: 2, textDecoration: "none" }}>
              We Need Coaching
            </Link>
          </div>
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 13, letterSpacing: "0.06em", color: "#A8A39A" }}>
            Virtual sessions worldwide · Based in Nairobi, Kenya
          </div>
        </div>

        <div style={{ position: "relative", padding: "40px 48px 40px 0" }} className="hero-image-wrap">
          <div style={{ position: "relative", height: "100%", minHeight: 520 }}>
            <div style={{ position: "absolute", right: 0, top: 24, width: 150, height: 150, background: "#E8E4F0", zIndex: 0 }} />
            <Image src="/hero.jpg" alt="Peaceful nature landscape" fill style={{ objectFit: "cover", zIndex: 1 }} priority />
            <div style={{ position: "absolute", inset: "64px 16px 16px 32px", border: "1px solid rgba(255,255,255,0.55)", zIndex: 2, pointerEvents: "none" }} />
          </div>
        </div>
      </div>

      {/* Intro statement */}
      <div style={{ background: "#F5F0E8" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "92px 48px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 25, color: "#9F94BE", marginBottom: 22 }}>
            a steady place to begin again
          </div>
          <p style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(22px, 3vw, 32px)", lineHeight: 1.5, color: "#2F5D52", margin: 0, fontWeight: 400 }}>
            Healing rarely happens in isolation. The Bridge is a calm, confidential space where your story is met with warmth, skill, and genuine care — one honest conversation at a time.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 48px 40px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 54, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9A958C", marginBottom: 16 }}>
              What we offer
            </div>
            <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(32px, 4vw, 44px)", color: "#2A2A28", margin: 0, fontWeight: 400, lineHeight: 1.14 }}>
              Ways we walk with you
            </h2>
          </div>
          <Link href="/services" style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5C8C6E", borderBottom: "1px solid #C2CFC4", paddingBottom: 4, textDecoration: "none" }}>
            All services →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid #ECE7DE" }} className="services-grid">
          {services.map((s, i) => (
            <Link key={s.num} href="/services" style={{ padding: "40px 26px 44px", borderRight: i < 3 ? "1px solid #ECE7DE" : undefined, borderBottom: "1px solid #ECE7DE", textDecoration: "none", display: "block" }} className="service-card">
              <div style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 14, color: "#B6AED0", letterSpacing: "0.1em", marginBottom: 20 }}>{s.num}</div>
              <div style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 21, color: "#2A2A28", marginBottom: 12, lineHeight: 1.25 }}>{s.title}</div>
              <div style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.7, color: "#8A857D" }}>{s.short}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* About teaser */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 48px 96px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64, alignItems: "center" }} className="about-teaser">
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: -18, bottom: -18, width: 130, height: 130, background: "#DDE8DE", zIndex: 0 }} />
          <Image src="/miriam-portrait.png" alt="Miriam Gathoni Mwangi, LPC" width={560} height={440} style={{ position: "relative", zIndex: 1, display: "block", width: "100%", height: 440, objectFit: "cover", objectPosition: "50% 22%", borderRadius: 12 }} />
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9A958C", marginBottom: 18 }}>
            Your counselor
          </div>
          <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(28px, 3.5vw, 40px)", color: "#2A2A28", margin: "0 0 22px", fontWeight: 400, lineHeight: 1.16 }}>
            Miriam Gathoni Mwangi, LPC
          </h2>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.8, color: "#6E6A64", margin: "0 0 18px" }}>
            A Licensed Professional Counselor with a heart for restoration, Miriam brings warmth, discretion, and clinical depth to every session. Her approach is gentle but purposeful — creating space for you to be fully heard, then walking with you toward real change.
          </p>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.8, color: "#6E6A64", margin: "0 0 30px" }}>
            From her practice in Nairobi, she supports clients across the world through secure virtual sessions.
          </p>
          <Link href="/about" style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5C8C6E", borderBottom: "1px solid #C2CFC4", paddingBottom: 4, textDecoration: "none" }}>
            More about Miriam →
          </Link>
        </div>
      </div>

      {/* Closing CTA */}
      <div style={{ background: "#2F5D52" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "96px 48px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 24, color: "#A7C2B0", marginBottom: 20 }}>
            when you&apos;re ready
          </div>
          <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(32px, 4vw, 46px)", color: "#FAFAF8", margin: "0 0 24px", fontWeight: 400, lineHeight: 1.16 }}>
            Take the first step across the bridge
          </h2>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.8, color: "#CDE0D4", margin: "0 auto 38px", maxWidth: 520 }}>
            Reaching out is often the hardest part. Begin with a brief, no-pressure conversation about what you&apos;re looking for.
          </p>
          <Link href="/contact" style={{ display: "inline-block", fontFamily: "var(--font-jost), sans-serif", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2F5D52", background: "#F5F0E8", padding: "18px 38px", borderRadius: 2, textDecoration: "none" }}>
            Book a Session
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-image-wrap { min-height: 320px !important; padding: 0 !important; }
          .hero-text { padding: 60px 24px !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .about-teaser { grid-template-columns: 1fr !important; gap: 40px !important; padding: 60px 24px !important; }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .hero-text { padding: 48px 20px !important; }
        }
        .service-card:hover { background: #F5F0E8 !important; }
      `}</style>
    </div>
  );
}
