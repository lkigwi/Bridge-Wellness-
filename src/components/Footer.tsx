import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#27332E" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "72px 48px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gap: 48,
            paddingBottom: 48,
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div
              style={{
                background: "#FAFAF8",
                padding: "8px 12px",
                borderRadius: 3,
                display: "inline-block",
                marginBottom: 22,
              }}
            >
              <Image
                src="/logo.jpg"
                alt="The Bridge Wellness Centre"
                width={120}
                height={44}
                style={{ height: 44, width: "auto", display: "block" }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontWeight: 300,
                fontSize: 15,
                lineHeight: 1.8,
                color: "#A9B6AE",
                margin: 0,
                maxWidth: 300,
              }}
            >
              A calm, confidential space for healing — with Miriam Gathoni
              Mwangi, LPC. Nairobi, Kenya, and online worldwide.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#7E8F84",
                marginBottom: 20,
              }}
            >
              Explore
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 13,
                fontFamily: "var(--font-jost), sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: "#CBD5CD",
              }}
            >
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{ color: "#CBD5CD", textDecoration: "none" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#7E8F84",
                marginBottom: 20,
              }}
            >
              Connect
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 13,
                fontFamily: "var(--font-jost), sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: "#CBD5CD",
              }}
            >
              <span>hello@bridgewellness.co.ke</span>
              <span>Nairobi, Kenya</span>
              <span>Virtual sessions worldwide</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 26,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: 13,
              fontWeight: 300,
              color: "#7E8F84",
            }}
          >
            © 2026 The Bridge Wellness Centre. All rights reserved.
          </div>
          <div
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontSize: 17,
              color: "#9FB0A4",
            }}
          >
            You don&apos;t have to carry this alone.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
