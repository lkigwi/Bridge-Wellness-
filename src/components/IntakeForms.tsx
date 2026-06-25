"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";

type FormType = "individual" | "marriage" | "child" | "blended";

const tabs: { id: FormType; label: string }[] = [
  { id: "individual", label: "Individual Therapy" },
  { id: "marriage", label: "Marriage Coaching" },
  { id: "child", label: "Child & Adolescent" },
  { id: "blended", label: "Blended Family" },
];

const FORMSPREE_ID = "YOUR_FORMSPREE_ID"; // Replace with your Formspree form ID from formspree.io

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-jost), sans-serif",
  fontSize: 16,
  fontWeight: 300,
  color: "#2A2A28",
  background: "#fff",
  border: "1px solid #E3DCCF",
  borderRadius: 2,
  padding: "15px 16px",
  outline: "none",
  transition: "border-color 0.2s",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  WebkitAppearance: "none",
  paddingRight: 40,
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-jost), sans-serif",
  fontSize: 12,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#9A958C",
  display: "block",
  marginBottom: 10,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function IndividualForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("_formType", "Individual Therapy");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { onSuccess(); form.reset(); }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 22 }}>
      <input type="hidden" name="_formType" value="Individual Therapy" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Full name">
          <input name="name" type="text" required placeholder="First and last name" style={inputStyle} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required placeholder="you@email.com" style={inputStyle} />
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Phone (optional)">
          <input name="phone" type="tel" placeholder="+254 700 000 000" style={inputStyle} />
        </Field>
        <Field label="Country / location">
          <input name="location" type="text" required placeholder="e.g. Nairobi, Kenya" style={inputStyle} />
        </Field>
      </div>
      <Field label="What brings you to therapy?">
        <textarea name="situation" required rows={4} placeholder="Share as much or as little as you'd like — there's no wrong way to start." style={{ ...inputStyle, resize: "vertical" }} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="How long have you felt this way?">
          <select name="duration" required style={selectStyle}>
            <option value="">Select…</option>
            <option>Less than 3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
            <option>More than a year</option>
          </select>
        </Field>
        <Field label="Previous therapy experience?">
          <select name="previousTherapy" style={selectStyle}>
            <option value="">Select…</option>
            <option>Yes, and it helped</option>
            <option>Yes, but I didn't find it helpful</option>
            <option>No, this is my first time</option>
          </select>
        </Field>
      </div>
      <Field label="Preferred session time">
        <select name="preferredTime" style={selectStyle}>
          <option value="">Select…</option>
          <option>Morning (before 12pm)</option>
          <option>Afternoon (12pm–5pm)</option>
          <option>Evening (after 5pm)</option>
          <option>Flexible</option>
        </select>
      </Field>
      <Field label="Anything else you'd like Miriam to know? (optional)">
        <textarea name="additionalInfo" rows={3} placeholder="Any context that might be helpful." style={{ ...inputStyle, resize: "vertical" }} />
      </Field>
      <SubmitButton loading={loading} />
    </form>
  );
}

function MarriageForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("_formType", "Marriage Coaching");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { onSuccess(); form.reset(); }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 22 }}>
      <input type="hidden" name="_formType" value="Marriage Coaching" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Your full name">
          <input name="yourName" type="text" required placeholder="First and last name" style={inputStyle} />
        </Field>
        <Field label="Partner's full name">
          <input name="partnerName" type="text" required placeholder="First and last name" style={inputStyle} />
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Email">
          <input name="email" type="email" required placeholder="you@email.com" style={inputStyle} />
        </Field>
        <Field label="Phone (optional)">
          <input name="phone" type="tel" placeholder="+254 700 000 000" style={inputStyle} />
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Relationship status">
          <select name="status" required style={selectStyle}>
            <option value="">Select…</option>
            <option>Dating</option>
            <option>Engaged</option>
            <option>Married</option>
          </select>
        </Field>
        <Field label="How long have you been together?">
          <select name="duration" style={selectStyle}>
            <option value="">Select…</option>
            <option>Less than 1 year</option>
            <option>1–3 years</option>
            <option>3–7 years</option>
            <option>7–15 years</option>
            <option>More than 15 years</option>
          </select>
        </Field>
      </div>
      <Field label="Main challenge you'd like to address">
        <textarea name="challenge" required rows={4} placeholder="Tell us what's been weighing on your relationship." style={{ ...inputStyle, resize: "vertical" }} />
      </Field>
      <Field label="Are both partners willing to attend sessions?">
        <select name="bothWilling" style={selectStyle}>
          <option value="">Select…</option>
          <option>Yes, we're both on board</option>
          <option>One of us is uncertain</option>
          <option>Not sure yet</option>
        </select>
      </Field>
      <Field label="Preferred session time">
        <select name="preferredTime" style={selectStyle}>
          <option value="">Select…</option>
          <option>Morning (before 12pm)</option>
          <option>Afternoon (12pm–5pm)</option>
          <option>Evening (after 5pm)</option>
          <option>Flexible</option>
        </select>
      </Field>
      <Field label="Anything else? (optional)">
        <textarea name="additionalInfo" rows={2} placeholder="Any other context that might help." style={{ ...inputStyle, resize: "vertical" }} />
      </Field>
      <SubmitButton loading={loading} />
    </form>
  );
}

function ChildForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("_formType", "Child & Adolescent Therapy");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { onSuccess(); form.reset(); }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 22 }}>
      <input type="hidden" name="_formType" value="Child & Adolescent Therapy" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Parent / guardian name">
          <input name="parentName" type="text" required placeholder="Your full name" style={inputStyle} />
        </Field>
        <Field label="Child's first name">
          <input name="childName" type="text" required placeholder="First name only" style={inputStyle} />
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <Field label="Child's age">
          <input name="childAge" type="number" required min={3} max={19} placeholder="e.g. 12" style={inputStyle} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required placeholder="you@email.com" style={inputStyle} />
        </Field>
        <Field label="Phone (optional)">
          <input name="phone" type="tel" placeholder="+254 700 000 000" style={inputStyle} />
        </Field>
      </div>
      <Field label="What concerns you about your child?">
        <textarea name="concern" required rows={4} placeholder="Describe what you've noticed — behaviourally, emotionally, socially." style={{ ...inputStyle, resize: "vertical" }} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="How long has this been a concern?">
          <select name="duration" style={selectStyle}>
            <option value="">Select…</option>
            <option>Less than 3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
            <option>More than a year</option>
          </select>
        </Field>
        <Field label="Has your child had therapy before?">
          <select name="previousTherapy" style={selectStyle}>
            <option value="">Select…</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </Field>
      </div>
      <Field label="Current school performance">
        <select name="schoolPerformance" style={selectStyle}>
          <option value="">Select…</option>
          <option>Excellent</option>
          <option>Good</option>
          <option>Average</option>
          <option>Struggling</option>
          <option>Not in school</option>
        </select>
      </Field>
      <Field label="Preferred session time">
        <select name="preferredTime" style={selectStyle}>
          <option value="">Select…</option>
          <option>After school (3–6pm)</option>
          <option>Weekend morning</option>
          <option>Weekend afternoon</option>
          <option>Flexible</option>
        </select>
      </Field>
      <SubmitButton loading={loading} />
    </form>
  );
}

function BlendedForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("_formType", "Blended Family Therapy");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { onSuccess(); form.reset(); }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 22 }}>
      <input type="hidden" name="_formType" value="Blended Family Therapy" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Your full name">
          <input name="yourName" type="text" required placeholder="First and last name" style={inputStyle} />
        </Field>
        <Field label="Partner's name (if applicable)">
          <input name="partnerName" type="text" placeholder="First and last name" style={inputStyle} />
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Email">
          <input name="email" type="email" required placeholder="you@email.com" style={inputStyle} />
        </Field>
        <Field label="Phone (optional)">
          <input name="phone" type="tel" placeholder="+254 700 000 000" style={inputStyle} />
        </Field>
      </div>
      <Field label="Briefly describe your family structure">
        <textarea name="familyStructure" required rows={3} placeholder="e.g. 'I have two children, my partner has one, we've been together 2 years.'" style={{ ...inputStyle, resize: "vertical" }} />
      </Field>
      <Field label="Main challenge you'd like to address">
        <textarea name="challenge" required rows={4} placeholder="What's been the hardest part of blending your family?" style={{ ...inputStyle, resize: "vertical" }} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Number of children involved">
          <input name="numChildren" type="number" min={1} max={20} placeholder="e.g. 3" style={inputStyle} />
        </Field>
        <Field label="How long have you been a blended family?">
          <select name="duration" style={selectStyle}>
            <option value="">Select…</option>
            <option>Just getting started</option>
            <option>Less than 1 year</option>
            <option>1–3 years</option>
            <option>3–5 years</option>
            <option>More than 5 years</option>
          </select>
        </Field>
      </div>
      <Field label="Preferred session time">
        <select name="preferredTime" style={selectStyle}>
          <option value="">Select…</option>
          <option>Morning (before 12pm)</option>
          <option>Afternoon (12pm–5pm)</option>
          <option>Evening (after 5pm)</option>
          <option>Flexible</option>
        </select>
      </Field>
      <SubmitButton loading={loading} />
    </form>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <>
      <button
        type="submit"
        disabled={loading}
        style={{
          cursor: loading ? "not-allowed" : "pointer",
          textAlign: "center",
          fontFamily: "var(--font-jost), sans-serif",
          fontSize: 14,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#fff",
          background: loading ? "#A0BAA8" : "#5C8C6E",
          padding: "17px 30px",
          borderRadius: 2,
          border: "none",
          width: "100%",
          transition: "background 0.2s",
        }}
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
      <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12.5, lineHeight: 1.6, color: "#A8A39A", textAlign: "center" }}>
        Your message is private and confidential. Miriam responds personally within 1–2 business days.
      </div>
    </>
  );
}

export default function IntakeForms() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") as FormType | null;
  const [active, setActive] = useState<FormType>(
    serviceParam && tabs.some((t) => t.id === serviceParam) ? serviceParam : "individual"
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (serviceParam && tabs.some((t) => t.id === serviceParam)) {
      setActive(serviceParam);
    }
  }, [serviceParam]);

  const handleSuccess = () => setSubmitted(true);

  if (submitted) {
    return (
      <div style={{ background: "#F5F0E8", padding: "48px", borderRadius: 4, textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 28, color: "#5C8C6E", marginBottom: 12 }}>
          Thank you for reaching out
        </div>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.8, color: "#6E6A64", margin: "0 0 24px" }}>
          Miriam has received your message and will reply personally within 1–2 business days. You don&apos;t have to carry this alone.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C8C6E", background: "none", border: "none", cursor: "pointer", padding: 0, borderBottom: "1px solid #C2CFC4" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: 0, marginBottom: 32, borderBottom: "1px solid #ECE7DE", overflowX: "auto" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActive(tab.id); setSubmitted(false); }}
            style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: active === tab.id ? "#2F5D52" : "#9A958C",
              background: "none",
              border: "none",
              borderBottom: active === tab.id ? "2px solid #5C8C6E" : "2px solid transparent",
              padding: "14px 20px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "color 0.2s, border-color 0.2s",
              fontWeight: active === tab.id ? 500 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active form */}
      {active === "individual" && <IndividualForm onSuccess={handleSuccess} />}
      {active === "marriage" && <MarriageForm onSuccess={handleSuccess} />}
      {active === "child" && <ChildForm onSuccess={handleSuccess} />}
      {active === "blended" && <BlendedForm onSuccess={handleSuccess} />}
    </div>
  );
}
