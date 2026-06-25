"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do you offer virtual sessions?",
    a: "Yes. All sessions are held over secure, confidential video, so you can meet with Miriam from wherever you feel most comfortable — in Nairobi or anywhere in the world.",
  },
  {
    q: "How long is each session?",
    a: "Sessions typically run 50 to 60 minutes. For couples and families, longer sessions can be arranged when helpful.",
  },
  {
    q: "How do I get started?",
    a: "Simply send a message through the contact page. Miriam will reply personally to arrange a brief introductory conversation before your first session.",
  },
  {
    q: "Is everything I share confidential?",
    a: "Completely. What you bring to sessions stays private, held within the bounds of professional ethics and the law. Your trust is treated with the utmost care.",
  },
  {
    q: "How many sessions will I need?",
    a: "It varies from person to person. Some find clarity in a handful of sessions; others value longer-term support. We'll regularly revisit what feels right for you.",
  },
  {
    q: "Do you work with clients outside Kenya?",
    a: "Yes. Miriam supports clients internationally through secure virtual sessions, and is glad to accommodate different time zones where possible.",
  },
  {
    q: "What are your fees?",
    a: "Fees are shared during your introductory conversation, so they can be discussed in the context of your needs and the type of support you're seeking.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 840, margin: "0 auto", padding: "64px 48px 40px" }}>
      {faqs.map((f, i) => (
        <div
          key={i}
          onClick={() => setOpen(open === i ? null : i)}
          style={{ cursor: "pointer", borderBottom: "1px solid #ECE7DE", padding: "28px 0" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
            <div style={{ fontFamily: "var(--font-marcellus), serif", fontSize: 21, color: "#2A2A28", lineHeight: 1.35 }}>
              {f.q}
            </div>
            <div
              style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: 24,
                color: "#5C8C6E",
                lineHeight: 1,
                minWidth: 22,
                textAlign: "center",
                transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.25s",
                flexShrink: 0,
              }}
            >
              +
            </div>
          </div>
          {open === i && (
            <p
              style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontWeight: 300,
                fontSize: 16.5,
                lineHeight: 1.85,
                color: "#6E6A64",
                margin: "16px 0 4px",
                maxWidth: 680,
              }}
            >
              {f.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
