"use client";
import { useState, FormEvent } from "react";

const FORMSPREE_ID = "xqevpdel";

const inp: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-jost), sans-serif",
  fontSize: 15,
  fontWeight: 300,
  color: "#2A2A28",
  background: "#fff",
  border: "1px solid #E3DCCF",
  borderRadius: 2,
  padding: "13px 14px",
  outline: "none",
};
const lbl: React.CSSProperties = {
  fontFamily: "var(--font-jost), sans-serif",
  fontSize: 11.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#9A958C",
  display: "block",
  marginBottom: 8,
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    data.set("_subject", "General Enquiry — The Bridge Wellness Centre");
    data.set("_formType", "General Enquiry");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div style={{ background: "#F5F0E8", padding: "48px 40px", borderRadius: 3, textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 28, color: "#5C8C6E", marginBottom: 14 }}>
          Message received
        </div>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: "#6E6A64", margin: 0 }}>
          Miriam will respond personally within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
      <div>
        <label style={lbl}>Full name <span style={{ color: "#5C8C6E" }}>*</span></label>
        <input name="name" required type="text" placeholder="First and last name" style={inp} />
      </div>
      <div>
        <label style={lbl}>Email address <span style={{ color: "#5C8C6E" }}>*</span></label>
        <input name="email" required type="email" placeholder="you@email.com" style={inp} />
      </div>
      <div>
        <label style={lbl}>Phone number (optional)</label>
        <input name="phone" type="tel" placeholder="0723 314 805" style={inp} />
      </div>
      <div>
        <label style={lbl}>Your message <span style={{ color: "#5C8C6E" }}>*</span></label>
        <textarea name="message" required rows={5} placeholder="What would you like to know?" style={{ ...inp, resize: "vertical" } as React.CSSProperties} />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "var(--font-jost), sans-serif",
          fontSize: 13.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#fff",
          background: loading ? "#A0BAA8" : "#5C8C6E",
          padding: "16px 30px",
          borderRadius: 2,
          border: "none",
          width: "100%",
          transition: "background 0.2s",
        }}
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
