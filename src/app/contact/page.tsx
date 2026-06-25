import type { Metadata } from "next";
import { Suspense } from "react";
import IntakeForms from "@/components/IntakeForms";

export const metadata: Metadata = {
  title: "Contact | The Bridge Wellness Centre",
  description: "Book a session with Miriam Gathoni Mwangi, LPC. Reach out for individual therapy, marriage coaching, child & adolescent therapy, or blended family therapy.",
};

const contactInfo = [
  { label: "Email", value: "hello@bridgewellness.co.ke" },
  { label: "Location", value: "Nairobi, Kenya" },
  { label: "Availability", value: "Monday – Saturday, by appointment" },
  { label: "Response time", value: "Within 1–2 business days" },
];

export default function Contact() {
  return (
    <div className="fade-up" style={{ background: "#FAFAF8" }}>

      {/* Page header */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 48px 0", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9A958C", marginBottom: 20 }}>
          Contact
        </div>
        <h1 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: "clamp(32px, 5vw, 54px)", color: "#2A2A28", margin: "0 auto 24px", fontWeight: 400, lineHeight: 1.14, maxWidth: 680 }}>
          Reach out — there&apos;s no wrong way to start
        </h1>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17.5, lineHeight: 1.8, color: "#6E6A64", margin: "0 auto", maxWidth: 540 }}>
          Share a little about what you&apos;re looking for and Miriam will respond personally, usually within one to two business days.
        </p>
      </div>

      {/* Form + details */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "64px 48px 90px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="contact-grid">

        {/* Intake forms */}
        <div>
          <Suspense fallback={<div style={{ padding: 32, color: "#9A958C", fontFamily: "var(--font-jost), sans-serif" }}>Loading form…</div>}>
            <IntakeForms />
          </Suspense>
        </div>

        {/* Practice details */}
        <div style={{ background: "#F5F0E8", padding: "48px 44px", borderRadius: 3 }}>
          <h2 style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 28, color: "#2F5D52", margin: "0 0 30px", fontWeight: 400 }}>
            Practice details
          </h2>
          {contactInfo.map((ci) => (
            <div key={ci.label} style={{ padding: "20px 0", borderBottom: "1px solid #E3DCCF" }}>
              <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9A958C", marginBottom: 8 }}>
                {ci.label}
              </div>
              <div style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.6, color: "#3E3A34" }}>
                {ci.value}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 30, padding: "22px 24px", background: "#E8E4F0", borderRadius: 3 }}>
            <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 21, color: "#5A4F73", marginBottom: 8 }}>
              Sessions worldwide
            </div>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: "#6A6280" }}>
              All sessions are held over secure video, so you can meet from wherever you feel most at ease — anywhere in the world.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            padding: 40px 24px 60px !important;
          }
        }
      `}</style>
    </div>
  );
}
