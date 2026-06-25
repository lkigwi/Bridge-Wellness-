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

// form submission handled via /api/submit-form

/* ─── Shared styles ─── */
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
  transition: "border-color 0.2s",
};
const sel: React.CSSProperties = {
  ...inp,
  appearance: "none",
  WebkitAppearance: "none",
  paddingRight: 36,
  cursor: "pointer",
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239A958C' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
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
const ta: React.CSSProperties = { ...inp, resize: "vertical" };

/* ─── Reusable atoms ─── */
function F({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={lbl}>
        {label}
        {required && <span style={{ color: "#5C8C6E", marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function Sec({ num, title }: { num: number; title: string }) {
  return (
    <div style={{ background: "#2F5D52", padding: "10px 16px", marginBottom: 4, marginTop: 20, borderRadius: 2 }}>
      <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12.5, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>
        {num} | {title}
      </span>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-row">
      {children}
    </div>
  );
}

function Row3({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }} className="form-row3">
      {children}
    </div>
  );
}

function RadioGroup({ name, options, value, onChange }: { name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 20px", paddingTop: 4 }}>
      {options.map((opt) => (
        <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 14.5, color: "#3E3A34" }}>
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            style={{ accentColor: "#5C8C6E", width: 15, height: 15, cursor: "pointer" }}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function CheckGroup({ options, checked, onChange }: { options: string[]; checked: string[]; onChange: (v: string[]) => void }) {
  function toggle(opt: string) {
    onChange(checked.includes(opt) ? checked.filter((c) => c !== opt) : [...checked, opt]);
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", paddingTop: 4 }} className="check-group">
      {options.map((opt) => (
        <label key={opt} style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 14.5, color: "#3E3A34", lineHeight: 1.4 }}>
          <input
            type="checkbox"
            checked={checked.includes(opt)}
            onChange={() => toggle(opt)}
            style={{ accentColor: "#5C8C6E", width: 15, height: 15, cursor: "pointer", marginTop: 2, flexShrink: 0 }}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 13.5, lineHeight: 1.65, color: "#8A857D", margin: "0", fontStyle: "italic" }}>
      {children}
    </p>
  );
}

function RatingGroup({ name, label, low, high }: { name: string; label: string; low: string; high: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "10px 0", borderBottom: "1px solid #ECE7DE" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 14.5, color: "#3E3A34" }}>{label}</div>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 11.5, color: "#A8A39A", marginTop: 2 }}>1 = {low} · 5 = {high}</div>
      </div>
      <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", fontFamily: "var(--font-jost), sans-serif", fontSize: 13, color: "#9A958C" }}>
            <input type="radio" name={name} value={String(n)} style={{ accentColor: "#5C8C6E", cursor: "pointer" }} />
            {n}
          </label>
        ))}
      </div>
    </div>
  );
}

function SubmitBtn({ loading }: { loading: boolean }) {
  return (
    <>
      <button
        type="submit"
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer", textAlign: "center", fontFamily: "var(--font-jost), sans-serif", fontSize: 13.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: loading ? "#A0BAA8" : "#5C8C6E", padding: "16px 30px", borderRadius: 2, border: "none", width: "100%", transition: "background 0.2s" }}
      >
        {loading ? "Sending…" : "Submit Form"}
      </button>
      <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, lineHeight: 1.6, color: "#A8A39A", textAlign: "center", margin: 0 }}>
        All information is private and confidential. Miriam responds personally within 1–2 business days.
      </p>
    </>
  );
}

async function submitForm(formType: string, data: FormData): Promise<{ pdf: string; filename: string } | null> {
  const fields: Record<string, string> = {};
  data.forEach((val, key) => {
    if (!key.startsWith("_")) {
      const v = val.toString().trim();
      if (v) fields[key] = v;
    }
  });
  try {
    const res = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType, fields }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function downloadPDF(base64: string, filename: string) {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ══════════════════════════════════════════════════════════════
   1. INDIVIDUAL THERAPY
══════════════════════════════════════════════════════════════ */
function IndividualForm({ onSuccess }: { onSuccess: (pdf: string, filename: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState("");
  const [gender, setGender] = useState("");
  const [relStatus, setRelStatus] = useState("");
  const [livingSituation, setLivingSituation] = useState("");
  const [hasChildren, setHasChildren] = useState("");
  const [employed, setEmployed] = useState("");
  const [faith, setFaith] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [appetite, setAppetite] = useState("");
  const [physActivity, setPhysActivity] = useState("");
  const [mhDiagnosis, setMhDiagnosis] = useState("");
  const [onMedication, setOnMedication] = useState("");
  const [otherProvider, setOtherProvider] = useState("");
  const [medConditions, setMedConditions] = useState("");
  const [familyMH, setFamilyMH] = useState("");
  const [prevTherapy, setPrevTherapy] = useState("");
  const [therapyApproaches, setTherapyApproaches] = useState<string[]>([]);
  const [therapistPref, setTherapistPref] = useState("");
  const [homework, setHomework] = useState("");
  const [spirituality, setSpirituality] = useState("");
  const [selfHarm, setSelfHarm] = useState("");
  const [harmOthers, setHarmOthers] = useState("");
  const [unsafeHome, setUnsafeHome] = useState("");
  const [substanceUse, setSubstanceUse] = useState("");

  const concernOptions = [
    "Anxiety / worry", "Depression / low mood", "Grief / loss",
    "Relationship difficulties", "Work / career stress", "Life transitions",
    "Trauma / past experiences", "Self-esteem / identity", "Anger management",
    "Family of origin issues", "Loneliness / isolation", "Burnout / exhaustion",
    "Work-life balance", "Major decision-making", "Other",
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("concernsList", concerns.join(", ") || "None selected");
    data.set("therapyApproaches", therapyApproaches.join(", ") || "None selected");
    const result = await submitForm("Individual Therapy", data);
    setLoading(false);
    if (result) {
      onSuccess(result.pdf, result.filename); form.reset();
      setConcerns([]); setTherapyApproaches([]);
      setFormat(""); setGender(""); setRelStatus(""); setLivingSituation("");
      setHasChildren(""); setEmployed(""); setFaith(""); setAppetite(""); setPhysActivity("");
      setMhDiagnosis(""); setOnMedication(""); setOtherProvider(""); setMedConditions(""); setFamilyMH("");
      setPrevTherapy(""); setTherapistPref(""); setHomework(""); setSpirituality("");
      setSelfHarm(""); setHarmOthers(""); setUnsafeHome(""); setSubstanceUse("");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
      <Note>Welcome. This form helps your therapist understand what you&apos;re carrying and what kind of support you&apos;re looking for. There are no right or wrong answers — simply share what feels relevant and true for you right now.</Note>

      <Sec num={1} title="Contact Information" />
      <Row>
        <F label="Full name" required><input name="name" type="text" required placeholder="First and last name" style={inp} /></F>
        <F label="Date of birth"><input name="dob" type="date" style={inp} /></F>
      </Row>
      <Row3>
        <F label="Phone number"><input name="phone" type="tel" placeholder="+254 700 000 000" style={inp} /></F>
        <F label="Email address" required><input name="email" type="email" required placeholder="you@email.com" style={inp} /></F>
        <F label="Preferred contact method">
          <select name="preferredContact" style={sel}>
            <option value="">Select…</option>
            <option>Email</option>
            <option>Phone call</option>
            <option>WhatsApp</option>
            <option>Any</option>
          </select>
        </F>
      </Row3>
      <Row>
        <F label="City / Country"><input name="city" type="text" placeholder="e.g. Nairobi, Kenya" style={inp} /></F>
        <F label="Occupation / Field of work"><input name="occupation" type="text" placeholder="e.g. Nurse, Teacher, Student" style={inp} /></F>
      </Row>
      <F label="Preferred session format">
        <RadioGroup name="_format" options={["In-person", "Telehealth / Virtual", "Either works"]} value={format} onChange={setFormat} />
        <input type="hidden" name="sessionFormat" value={format} />
      </F>
      <Row3>
        <F label="Best day(s) to meet"><input name="bestDays" type="text" placeholder="e.g. Mon, Wed, Sat" style={inp} /></F>
        <F label="Preferred session time"><input name="preferredTime" type="text" placeholder="e.g. Evenings" style={inp} /></F>
        <F label="Emergency contact name & phone"><input name="emergencyContact" type="text" placeholder="Name — +254 700 000 000" style={inp} /></F>
      </Row3>

      <Sec num={2} title="About You" />
      <F label="Gender">
        <RadioGroup name="_gender" options={["Male", "Female"]} value={gender} onChange={setGender} />
        <input type="hidden" name="gender" value={gender} />
      </F>
      <F label="Relationship status">
        <RadioGroup name="_relStatus" options={["Single", "Dating", "Married", "Separated / Divorced", "Widowed"]} value={relStatus} onChange={setRelStatus} />
        <input type="hidden" name="relationshipStatus" value={relStatus} />
      </F>
      <F label="Living situation">
        <RadioGroup name="_living" options={["Alone", "With spouse", "With family", "Other"]} value={livingSituation} onChange={setLivingSituation} />
        <input type="hidden" name="livingSituation" value={livingSituation} />
      </F>
      <F label="Do you have children?">
        <RadioGroup name="_children" options={["Yes — living with me", "Yes — not in my home", "No"]} value={hasChildren} onChange={setHasChildren} />
        <input type="hidden" name="hasChildren" value={hasChildren} />
      </F>
      {hasChildren.startsWith("Yes") && (
        <F label="Ages and any relevant context (optional)">
          <input name="childrenContext" type="text" placeholder="e.g. Two kids, ages 4 and 8" style={inp} />
        </F>
      )}
      <F label="Are you currently employed?">
        <RadioGroup name="_employed" options={["Full-time", "Part-time", "Self-employed", "Student", "Unemployed"]} value={employed} onChange={setEmployed} />
        <input type="hidden" name="employmentStatus" value={employed} />
      </F>
      <F label="Do you have a faith or spiritual background that is important to you?">
        <RadioGroup name="_faith" options={["Yes", "No", "Prefer to discuss in session"]} value={faith} onChange={setFaith} />
        <input type="hidden" name="faithBackground" value={faith} />
      </F>

      <Sec num={3} title="Reason for Seeking Therapy" />
      <F label="In your own words, what brings you to therapy at this time?" required>
        <textarea name="mainConcern" required rows={4} placeholder="Share as much or as little as feels right — there are no wrong answers." style={ta} />
      </F>
      <F label="Areas of concern — check all that apply">
        <CheckGroup options={concernOptions} checked={concerns} onChange={setConcerns} />
        <input type="hidden" name="concernsList" value={concerns.join(", ")} />
      </F>
      {concerns.includes("Other") && (
        <F label="If you selected 'Other,' please describe">
          <textarea name="otherConcernDetail" rows={2} placeholder="Please describe" style={ta} />
        </F>
      )}

      <Sec num={4} title="Current Functioning" />
      <Note>Rate each area from 1 (significant difficulty) to 5 (doing well).</Note>
      <div style={{ display: "grid", gap: 0, border: "1px solid #ECE7DE", borderRadius: 2, padding: "4px 14px" }}>
        <RatingGroup name="sleepQuality" label="Sleep quality" low="Very poor" high="Restful" />
        <RatingGroup name="energyLevels" label="Energy levels day-to-day" low="Constantly drained" high="Generally energized" />
        <RatingGroup name="concentration" label="Ability to concentrate / focus" low="Very difficult" high="No difficulty" />
        <RatingGroup name="emotionalReg" label="Emotional regulation (managing feelings)" low="Very difficult" high="Managing well" />
        <RatingGroup name="relationships" label="Quality of close relationships" low="Very strained" high="Healthy & supportive" />
        <div style={{ borderBottom: "none" }}>
          <RatingGroup name="dailyFunctioning" label="Satisfaction with daily functioning" low="Struggling significantly" high="Functioning well" />
        </div>
      </div>
      <F label="Appetite / eating">
        <RadioGroup name="_appetite" options={["Significantly decreased", "Somewhat decreased", "Normal", "Somewhat increased", "Significantly increased"]} value={appetite} onChange={setAppetite} />
        <input type="hidden" name="appetite" value={appetite} />
      </F>
      <F label="Physical activity">
        <RadioGroup name="_physActivity" options={["None currently", "Occasionally", "Regularly"]} value={physActivity} onChange={setPhysActivity} />
        <input type="hidden" name="physicalActivity" value={physActivity} />
      </F>

      <Sec num={5} title="Mental Health & Medical Background" />
      <F label="Have you received a mental health diagnosis?">
        <RadioGroup name="_mhDiagnosis" options={["Yes", "No", "Unsure"]} value={mhDiagnosis} onChange={setMhDiagnosis} />
        <input type="hidden" name="mhDiagnosis" value={mhDiagnosis} />
      </F>
      {mhDiagnosis === "Yes" && (
        <F label="Please list (e.g., depression, anxiety, PTSD, ADHD)">
          <input name="mhDiagnosisList" type="text" placeholder="Diagnosis/es" style={inp} />
        </F>
      )}
      <F label="Are you currently taking any medication?">
        <RadioGroup name="_medication" options={["Yes", "No"]} value={onMedication} onChange={setOnMedication} />
        <input type="hidden" name="onMedication" value={onMedication} />
      </F>
      {onMedication === "Yes" && (
        <F label="Medication(s) and prescribing provider">
          <input name="medicationDetails" type="text" placeholder="Medication name and prescriber" style={inp} />
        </F>
      )}
      <F label="Are you currently working with any other mental health provider?">
        <RadioGroup name="_otherProvider" options={["Yes", "No"]} value={otherProvider} onChange={setOtherProvider} />
        <input type="hidden" name="otherProvider" value={otherProvider} />
      </F>
      {otherProvider === "Yes" && (
        <F label="Provider type and focus (optional)">
          <input name="otherProviderDetail" type="text" placeholder="e.g. Psychiatrist — medication management" style={inp} />
        </F>
      )}
      <F label="Do you have any significant medical conditions?">
        <RadioGroup name="_medConditions" options={["Yes", "No"]} value={medConditions} onChange={setMedConditions} />
        <input type="hidden" name="medicalConditions" value={medConditions} />
      </F>
      {medConditions === "Yes" && (
        <F label="Brief description">
          <textarea name="medicalConditionsDetail" rows={2} placeholder="Condition and treating provider" style={ta} />
        </F>
      )}
      <F label="Family history of mental health concerns?">
        <RadioGroup name="_familyMH" options={["Yes", "No", "Unsure"]} value={familyMH} onChange={setFamilyMH} />
        <input type="hidden" name="familyMentalHealth" value={familyMH} />
      </F>

      <Sec num={6} title="Therapy History" />
      <F label="Have you been in therapy before?">
        <RadioGroup name="_prevTherapy" options={["Yes", "No — this is my first time"]} value={prevTherapy} onChange={setPrevTherapy} />
        <input type="hidden" name="previousTherapy" value={prevTherapy} />
      </F>
      {prevTherapy === "Yes" && (
        <>
          <F label="Approximately how long ago, and for how long?">
            <input name="prevTherapyDuration" type="text" placeholder="e.g. 2 years ago, for about 6 months" style={inp} />
          </F>
          <F label="What was helpful or unhelpful? (optional)">
            <textarea name="prevTherapyFeedback" rows={2} placeholder="Any context that might help Miriam." style={ta} />
          </F>
        </>
      )}
      <F label="What therapeutic approach(es) have you experienced? — check all that apply">
        <CheckGroup
          options={["CBT", "Talk therapy", "EMDR", "DBT", "Faith-based", "Unsure", "Other"]}
          checked={therapyApproaches}
          onChange={setTherapyApproaches}
        />
        <input type="hidden" name="therapyApproaches" value={therapyApproaches.join(", ")} />
      </F>

      <Sec num={7} title="Goals & Therapeutic Preferences" />
      <F label="What do you hope to gain from therapy? What does success look like for you?" required>
        <textarea name="goals" required rows={3} placeholder="Describe what healing, growth, or relief would look like for you." style={ta} />
      </F>
      <F label="I prefer a therapist who:">
        <RadioGroup name="_therapistPref" options={["Is more directive / structured", "Follows my lead", "A balance of both"]} value={therapistPref} onChange={setTherapistPref} />
        <input type="hidden" name="therapistPreference" value={therapistPref} />
      </F>
      <F label="How do you feel about homework or exercises between sessions?">
        <RadioGroup name="_homework" options={["Open to it", "Prefer minimal", "Prefer none"]} value={homework} onChange={setHomework} />
        <input type="hidden" name="homeworkPreference" value={homework} />
      </F>
      <F label="Is incorporating faith or spirituality into sessions important to you?">
        <RadioGroup name="_spirituality" options={["Yes, please", "If relevant", "Not at this time"]} value={spirituality} onChange={setSpirituality} />
        <input type="hidden" name="faithInSessions" value={spirituality} />
      </F>
      <F label="Is there anything else you'd like your therapist to know before your first session? (optional)">
        <textarea name="additionalInfo" rows={3} placeholder="Any other context that would be helpful." style={ta} />
      </F>
      <F label="How did you hear about this practice?">
        <input name="referral" type="text" placeholder="e.g. Google, a friend, social media" style={inp} />
      </F>

      <Sec num={8} title="Safety & Wellbeing" />
      <Note>Your safety is a priority. These questions are standard and confidential. If you need immediate support, please contact a crisis line or emergency services.</Note>
      <F label="Are you currently having thoughts of harming yourself?">
        <RadioGroup name="_selfHarm" options={["No", "Yes", "Prefer to discuss"]} value={selfHarm} onChange={setSelfHarm} />
        <input type="hidden" name="selfHarmThoughts" value={selfHarm} />
      </F>
      <F label="Are you currently having thoughts of harming others?">
        <RadioGroup name="_harmOthers" options={["No", "Yes", "Prefer to discuss"]} value={harmOthers} onChange={setHarmOthers} />
        <input type="hidden" name="harmOthersThoughts" value={harmOthers} />
      </F>
      <F label="Are you currently in an unsafe home situation?">
        <RadioGroup name="_unsafeHome" options={["No", "Yes", "Prefer to discuss"]} value={unsafeHome} onChange={setUnsafeHome} />
        <input type="hidden" name="unsafeHomeSituation" value={unsafeHome} />
      </F>
      <F label="Is substance use currently affecting your life?">
        <RadioGroup name="_substanceUse" options={["No", "Yes", "Prefer to discuss"]} value={substanceUse} onChange={setSubstanceUse} />
        <input type="hidden" name="substanceUseAffecting" value={substanceUse} />
      </F>
      <F label="Any additional context about your safety or wellbeing (optional)">
        <textarea name="safetyAdditional" rows={2} placeholder="Anything else Miriam should know." style={ta} />
      </F>
      <SubmitBtn loading={loading} />
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. MARRIAGE / COUPLES COACHING
══════════════════════════════════════════════════════════════ */
function CouplesForm({ onSuccess }: { onSuccess: (pdf: string, filename: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [children, setChildren] = useState("");
  const [indivTherapy, setIndivTherapy] = useState("");
  const [couplesTherapy, setCouplesTherapy] = useState("");
  const [willing, setWilling] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [dvSafety, setDvSafety] = useState("");
  const [crisis, setCrisis] = useState("");

  const concernOptions = [
    "Communication / conflict", "Intimacy / connection", "Trust / infidelity",
    "Life transitions", "Parenting differences", "Financial stress",
    "Pre-marital preparation", "Separation / divorce", "Other",
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("primaryConcerns", concerns.join(", ") || "None selected");
    const result = await submitForm("Marriage Coaching", data);
    setLoading(false);
    if (result) { onSuccess(result.pdf, result.filename); form.reset(); setConcerns([]); setChildren(""); setIndivTherapy(""); setCouplesTherapy(""); setWilling(""); setDvSafety(""); setCrisis(""); }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
      <Sec num={1} title="Contact Information" />
      <Row>
        <F label="Partner 1 — Full name" required><input name="partner1Name" type="text" required placeholder="First and last name" style={inp} /></F>
        <F label="Partner 2 — Full name" required><input name="partner2Name" type="text" required placeholder="First and last name" style={inp} /></F>
      </Row>
      <Row>
        <F label="Primary phone number"><input name="phone" type="tel" placeholder="+254 700 000 000" style={inp} /></F>
        <F label="Email address" required><input name="email" type="email" required placeholder="you@email.com" style={inp} /></F>
      </Row>
      <Row3>
        <F label="City" required><input name="city" type="text" required placeholder="e.g. Nairobi" style={inp} /></F>
        <F label="Preferred consultation date"><input name="preferredDate" type="date" style={inp} /></F>
        <F label="Preferred time"><input name="preferredTime" type="text" placeholder="e.g. Evenings" style={inp} /></F>
      </Row3>

      <Sec num={2} title="Relationship Background" />
      <Row>
        <F label="How long have you been together?" required><input name="togetherness" type="text" required placeholder="e.g. 4 years" style={inp} /></F>
        <F label="Married / Engaged / Domestic partners?"><input name="relationshipStatus" type="text" placeholder="e.g. Married since 2021" style={inp} /></F>
      </Row>
      <F label="Do you have children together?">
        <RadioGroup name="_children" options={["Yes", "No", "Expecting"]} value={children} onChange={setChildren} />
        <input type="hidden" name="childrenTogether" value={children} />
      </F>
      {children === "Yes" && (
        <F label="Ages of children (optional)"><input name="childrenAges" type="text" placeholder="e.g. 3, 6, 11" style={inp} /></F>
      )}

      <Sec num={3} title="Reason for Seeking Therapy" />
      <F label="In a few sentences, what is bringing you to therapy at this time?" required>
        <textarea name="reason" required rows={4} placeholder="Both partners are encouraged to share — together or separately." style={ta} />
      </F>
      <F label="Primary concerns — check all that apply">
        <CheckGroup options={concernOptions} checked={concerns} onChange={setConcerns} />
        <input type="hidden" name="primaryConcerns" value={concerns.join(", ")} />
      </F>

      <Sec num={4} title="Therapy History" />
      <F label="Have either of you been in individual therapy before?">
        <RadioGroup name="_indivTherapy" options={["Yes — Partner 1", "Yes — Partner 2", "Yes — Both", "No"]} value={indivTherapy} onChange={setIndivTherapy} />
        <input type="hidden" name="individualTherapy" value={indivTherapy} />
      </F>
      <F label="Have you attended couples therapy before?">
        <RadioGroup name="_couplesTherapy" options={["Yes", "No"]} value={couplesTherapy} onChange={setCouplesTherapy} />
        <input type="hidden" name="previousCouplesTherapy" value={couplesTherapy} />
      </F>
      {couplesTherapy === "Yes" && (
        <F label="What was helpful or unhelpful from previous therapy? (optional)">
          <textarea name="previousTherapyFeedback" rows={2} placeholder="Any context that might help Miriam." style={ta} />
        </F>
      )}

      <Sec num={5} title="Goals & Fit" />
      <F label="What would a successful outcome look like for your relationship?" required>
        <textarea name="successOutcome" required rows={3} placeholder="Describe what you hope your relationship looks and feels like after therapy." style={ta} />
      </F>
      <F label="Are both partners willing to attend sessions?">
        <RadioGroup name="_willing" options={["Yes", "Not sure", "One partner hesitant"]} value={willing} onChange={setWilling} />
        <input type="hidden" name="bothWilling" value={willing} />
      </F>
      <F label="How did you hear about this practice?">
        <input name="referral" type="text" placeholder="e.g. Google, a friend, Instagram" style={inp} />
      </F>

      <Sec num={6} title="Safety & Wellbeing" />
      <Note>Your safety matters. These questions help ensure therapy is the right level of support for your situation.</Note>
      <F label="Is there any current domestic violence or safety concern?">
        <RadioGroup name="_dvSafety" options={["No", "Yes", "Prefer to discuss on the call"]} value={dvSafety} onChange={setDvSafety} />
        <input type="hidden" name="domesticSafety" value={dvSafety} />
      </F>
      <F label="Is either partner currently in crisis or experiencing suicidal thoughts?">
        <RadioGroup name="_crisis" options={["No", "Yes", "Prefer to discuss on the call"]} value={crisis} onChange={setCrisis} />
        <input type="hidden" name="currentCrisis" value={crisis} />
      </F>
      <SubmitBtn loading={loading} />
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════
   3. CHILD & ADOLESCENT THERAPY
══════════════════════════════════════════════════════════════ */
function ChildForm({ onSuccess }: { onSuccess: (pdf: string, filename: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [guardianRole, setGuardianRole] = useState("");
  const [familyChanges, setFamilyChanges] = useState<string[]>([]);
  const [siblings, setSiblings] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [whoIdentified, setWhoIdentified] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [functioning, setFunctioning] = useState<string[]>([]);
  const [pregnancy, setPregnancy] = useState("");
  const [milestones, setMilestones] = useState("");
  const [medConditions, setMedConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [trauma, setTrauma] = useState("");
  const [mhDiagnosis, setMhDiagnosis] = useState("");
  const [prevTherapy, setPrevTherapy] = useState("");
  const [familyMH, setFamilyMH] = useState("");
  const [otherProvider, setOtherProvider] = useState("");
  const [academic, setAcademic] = useState("");
  const [friendships, setFriendships] = useState("");
  const [adultRelations, setAdultRelations] = useState("");
  const [bullying, setBullying] = useState("");
  const [childAware, setChildAware] = useState("");
  const [parentIncluded, setParentIncluded] = useState("");
  const [schoolCoord, setSchoolCoord] = useState("");
  const [selfHarmThoughts, setSelfHarmThoughts] = useState("");
  const [selfHarm, setSelfHarm] = useState("");
  const [violence, setViolence] = useState("");
  const [safeEnv, setSafeEnv] = useState("");
  const [substanceChild, setSubstanceChild] = useState("");

  const areaOptions = [
    "Anxiety / excessive worry", "Sadness / depression", "Anger / aggression",
    "Behavioral challenges", "School refusal / avoidance", "Academic difficulties",
    "Social / peer difficulties", "Family conflict", "Trauma / abuse exposure",
    "Grief / loss", "Self-esteem / confidence", "Eating / body image",
    "Sleep difficulties", "ADHD / attention concerns", "Self-harm",
    "Substance use", "Identity / sexuality concerns", "Other",
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("familyChanges", familyChanges.join(", ") || "No major changes");
    data.set("whoIdentifiedTherapy", whoIdentified.join(", "));
    data.set("concernAreas", areas.join(", ") || "None selected");
    data.set("functioningAffected", functioning.join(", "));
    const result = await submitForm("Child & Adolescent Therapy", data);
    setLoading(false);
    if (result) {
      onSuccess(result.pdf, result.filename); form.reset();
      setAreas([]); setFamilyChanges([]); setWhoIdentified([]); setFunctioning([]);
      setGender(""); setLanguage(""); setGuardianRole(""); setSiblings(""); setParentContact("");
      setPregnancy(""); setMilestones(""); setMedConditions(""); setMedications(""); setTrauma("");
      setMhDiagnosis(""); setPrevTherapy(""); setFamilyMH(""); setOtherProvider("");
      setAcademic(""); setFriendships(""); setAdultRelations(""); setBullying("");
      setChildAware(""); setParentIncluded(""); setSchoolCoord("");
      setSelfHarmThoughts(""); setSelfHarm(""); setViolence(""); setSafeEnv(""); setSubstanceChild("");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
      <Note>This form is completed by a parent or legal guardian on behalf of the child or adolescent. Your honesty helps Miriam provide the most appropriate and effective care.</Note>

      <Sec num={1} title="Child / Adolescent Information" />
      <Row>
        <F label="Child's full name" required><input name="childFullName" type="text" required placeholder="First and last name" style={inp} /></F>
        <F label="Preferred name or nickname"><input name="preferredName" type="text" placeholder="If different from above" style={inp} /></F>
      </Row>
      <Row3>
        <F label="Date of birth"><input name="childDOB" type="date" style={inp} /></F>
        <F label="Age" required><input name="childAge" type="number" required min={3} max={19} placeholder="e.g. 12" style={inp} /></F>
        <F label="Grade / School year"><input name="gradeYear" type="text" placeholder="e.g. Grade 7" style={inp} /></F>
      </Row3>
      <Row>
        <F label="School name"><input name="schoolName" type="text" placeholder="Name of school" style={inp} /></F>
        <F label="City" required><input name="city" type="text" required placeholder="e.g. Nairobi" style={inp} /></F>
      </Row>
      <F label="Gender identity (as the child identifies)">
        <RadioGroup name="_gender" options={["Girl", "Boy", "Non-binary / other"]} value={gender} onChange={setGender} />
        <input type="hidden" name="childGender" value={gender} />
      </F>
      <F label="Child's primary language">
        <RadioGroup name="_language" options={["English", "Swahili", "Other"]} value={language} onChange={setLanguage} />
        <input type="hidden" name="primaryLanguage" value={language} />
      </F>
      {language === "Other" && (
        <F label="Please specify language"><input name="otherLanguage" type="text" placeholder="Language name" style={inp} /></F>
      )}

      <Sec num={2} title="Parent / Guardian Information" />
      <Row>
        <F label="Your full name" required><input name="guardianName" type="text" required placeholder="First and last name" style={inp} /></F>
        <F label="Relationship to child" required><input name="relationship" type="text" required placeholder="e.g. Mother, Legal guardian" style={inp} /></F>
      </Row>
      <Row>
        <F label="Phone number"><input name="phone" type="tel" placeholder="+254 700 000 000" style={inp} /></F>
        <F label="Email address" required><input name="email" type="email" required placeholder="you@email.com" style={inp} /></F>
      </Row>
      <F label="Preferred contact method">
        <select name="preferredContact" style={sel}>
          <option value="">Select…</option>
          <option>Email</option>
          <option>Phone call</option>
          <option>WhatsApp</option>
          <option>Any</option>
        </select>
      </F>
      <F label="You are the child's:">
        <RadioGroup name="_guardianRole" options={["Biological parent", "Adoptive parent", "Step-parent", "Legal guardian", "Other"]} value={guardianRole} onChange={setGuardianRole} />
        <input type="hidden" name="guardianRole" value={guardianRole} />
      </F>

      <Sec num={3} title="Family & Household" />
      <F label="Who lives in the child's primary home?" required>
        <textarea name="householdMembers" required rows={2} placeholder="e.g. Mother, Father, sister (age 8)" style={ta} />
      </F>
      <F label="Significant recent family changes — check all that apply">
        <CheckGroup
          options={["Divorce / separation", "Remarriage / new partner", "New sibling", "Move / relocation", "Death / loss", "Other", "No major changes"]}
          checked={familyChanges}
          onChange={setFamilyChanges}
        />
        <input type="hidden" name="familyChanges" value={familyChanges.join(", ")} />
      </F>
      {familyChanges.some((c) => c !== "No major changes") && familyChanges.length > 0 && (
        <F label="Please briefly describe the changes">
          <textarea name="familyChangesDetail" rows={2} placeholder="Brief description" style={ta} />
        </F>
      )}
      <F label="Does the child have siblings?">
        <RadioGroup name="_siblings" options={["Yes — living with child", "Yes — living elsewhere", "No"]} value={siblings} onChange={setSiblings} />
        <input type="hidden" name="siblings" value={siblings} />
      </F>
      {siblings.startsWith("Yes") && (
        <F label="Siblings' names and ages (optional)"><input name="siblingsDetail" type="text" placeholder="e.g. James (10), Amara (7)" style={inp} /></F>
      )}
      <F label="Does the child have regular contact with both parents?">
        <RadioGroup name="_parentContact" options={["Yes", "No — limited or no contact with one parent", "N/A"]} value={parentContact} onChange={setParentContact} />
        <input type="hidden" name="parentContact" value={parentContact} />
      </F>

      <Sec num={4} title="Reason for Seeking Therapy" />
      <F label="In your own words, what concerns are prompting you to seek therapy for your child?" required>
        <textarea name="mainConcern" required rows={4} placeholder="Describe what you've been noticing — behaviourally, emotionally, socially." style={ta} />
      </F>
      <F label="When did you first notice these concerns?">
        <textarea name="onsetConcerns" rows={2} placeholder="e.g. About 3 months ago, after the start of the school term" style={ta} />
      </F>
      <F label="Who identified the need for therapy? — check all that apply">
        <CheckGroup
          options={["Parent(s)", "School / teacher", "Pediatrician / doctor", "Child themselves", "Other"]}
          checked={whoIdentified}
          onChange={setWhoIdentified}
        />
        <input type="hidden" name="whoIdentifiedTherapy" value={whoIdentified.join(", ")} />
      </F>
      <F label="Areas of concern — check all that apply">
        <CheckGroup options={areaOptions} checked={areas} onChange={setAreas} />
        <input type="hidden" name="concernAreas" value={areas.join(", ")} />
      </F>
      <F label="Have these concerns affected the child's functioning at:">
        <CheckGroup options={["Home", "School", "With peers", "Multiple settings"]} checked={functioning} onChange={setFunctioning} />
        <input type="hidden" name="functioningAffected" value={functioning.join(", ")} />
      </F>

      <Sec num={5} title="Developmental & Medical History" />
      <F label="Were there any significant concerns during pregnancy or birth?">
        <RadioGroup name="_pregnancy" options={["No", "Yes"]} value={pregnancy} onChange={setPregnancy} />
        <input type="hidden" name="pregnancyConcerns" value={pregnancy} />
      </F>
      {pregnancy === "Yes" && (
        <F label="Briefly describe"><textarea name="pregnancyDetail" rows={2} style={ta} /></F>
      )}
      <F label="Did the child meet developmental milestones (walking, talking, etc.)?">
        <RadioGroup name="_milestones" options={["Yes, on track", "Some delays", "Significant delays"]} value={milestones} onChange={setMilestones} />
        <input type="hidden" name="developmentalMilestones" value={milestones} />
      </F>
      {(milestones === "Some delays" || milestones === "Significant delays") && (
        <F label="Please describe the delays"><textarea name="milestonesDetail" rows={2} style={ta} /></F>
      )}
      <F label="Does the child have any diagnosed medical conditions?">
        <RadioGroup name="_medConditions" options={["No", "Yes"]} value={medConditions} onChange={setMedConditions} />
        <input type="hidden" name="medicalConditions" value={medConditions} />
      </F>
      {medConditions === "Yes" && (
        <F label="Diagnosis and treating provider"><input name="medConditionsDetail" type="text" placeholder="Condition and doctor's name" style={inp} /></F>
      )}
      <F label="Does the child take any medications?">
        <RadioGroup name="_medications" options={["No", "Yes"]} value={medications} onChange={setMedications} />
        <input type="hidden" name="medications" value={medications} />
      </F>
      {medications === "Yes" && (
        <F label="Medication(s), dosage, and prescribing provider"><input name="medicationsDetail" type="text" placeholder="Medication details" style={inp} /></F>
      )}
      <F label="Has the child experienced any significant trauma or adverse experiences?">
        <RadioGroup name="_trauma" options={["No", "Yes", "Suspected but unsure"]} value={trauma} onChange={setTrauma} />
        <input type="hidden" name="traumaHistory" value={trauma} />
      </F>
      {trauma === "Yes" && (
        <F label="Please describe to the extent you are comfortable sharing">
          <textarea name="traumaDetail" rows={3} placeholder="Share only what feels safe to share." style={ta} />
        </F>
      )}

      <Sec num={6} title="Mental Health & Therapy History" />
      <F label="Has the child received a mental health diagnosis?">
        <RadioGroup name="_mhDiagnosis" options={["No", "Yes", "Unsure"]} value={mhDiagnosis} onChange={setMhDiagnosis} />
        <input type="hidden" name="mhDiagnosis" value={mhDiagnosis} />
      </F>
      {mhDiagnosis === "Yes" && (
        <F label="Diagnosis and when it was made"><input name="mhDiagnosisDetail" type="text" placeholder="e.g. ADHD, diagnosed at age 8" style={inp} /></F>
      )}
      <F label="Has the child been in therapy before?">
        <RadioGroup name="_prevTherapy" options={["No", "Yes"]} value={prevTherapy} onChange={setPrevTherapy} />
        <input type="hidden" name="previousTherapy" value={prevTherapy} />
      </F>
      {prevTherapy === "Yes" && (
        <>
          <F label="Type of therapy, provider, and approximate dates"><input name="prevTherapyDetail" type="text" placeholder="e.g. Play therapy with Dr. Ouma, 2023" style={inp} /></F>
          <F label="What was helpful or unhelpful? (optional)"><textarea name="prevTherapyFeedback" rows={2} style={ta} /></F>
        </>
      )}
      <F label="Is there a family history of mental health concerns?">
        <RadioGroup name="_familyMH" options={["No", "Yes", "Unsure"]} value={familyMH} onChange={setFamilyMH} />
        <input type="hidden" name="familyMentalHealth" value={familyMH} />
      </F>
      {familyMH === "Yes" && (
        <F label="Relationship and condition (optional)"><input name="familyMHDetail" type="text" placeholder="e.g. Father — anxiety" style={inp} /></F>
      )}
      <F label="Is the child currently working with any other provider?">
        <RadioGroup name="_otherProvider" options={["No", "Yes"]} value={otherProvider} onChange={setOtherProvider} />
        <input type="hidden" name="otherProvider" value={otherProvider} />
      </F>
      {otherProvider === "Yes" && (
        <F label="Provider name and role"><input name="otherProviderDetail" type="text" placeholder="e.g. Dr. Kamau — psychiatrist" style={inp} /></F>
      )}

      <Sec num={7} title="School & Social Functioning" />
      <F label="How is the child currently doing academically?">
        <RadioGroup name="_academic" options={["Excelling", "On track", "Struggling slightly", "Struggling significantly"]} value={academic} onChange={setAcademic} />
        <input type="hidden" name="academicPerformance" value={academic} />
      </F>
      <F label="Does the child have close friendships?">
        <RadioGroup name="_friendships" options={["Yes — several", "Yes — one or two", "Struggling to maintain friendships", "Very isolated"]} value={friendships} onChange={setFriendships} />
        <input type="hidden" name="friendships" value={friendships} />
      </F>
      <F label="How does the child generally relate to adults?">
        <RadioGroup name="_adultRelations" options={["Cooperative", "Occasionally defiant", "Frequently defiant", "Withdrawn"]} value={adultRelations} onChange={setAdultRelations} />
        <input type="hidden" name="adultRelationships" value={adultRelations} />
      </F>
      <F label="Is there any bullying involved (as victim or participant)?">
        <RadioGroup name="_bullying" options={["No", "Yes — being bullied", "Yes — bullying others", "Both"]} value={bullying} onChange={setBullying} />
        <input type="hidden" name="bullying" value={bullying} />
      </F>
      <F label="Describe the child's strengths — what do they enjoy and what are they good at? (optional)">
        <textarea name="childStrengths" rows={2} placeholder="e.g. Creative, loves drawing, kind with younger children" style={ta} />
      </F>

      <Sec num={8} title="The Child's Perspective & Your Goals" />
      <F label="Does the child know they are coming to therapy?">
        <RadioGroup name="_childAware" options={["Yes, and they are willing", "Yes, but hesitant", "Yes, and resistant", "Not yet told"]} value={childAware} onChange={setChildAware} />
        <input type="hidden" name="childAware" value={childAware} />
      </F>
      <F label="In the child's own words (if they've shared) — what do they think the problem is? (optional)">
        <textarea name="childPerspective" rows={2} placeholder="What has your child said about what's going on?" style={ta} />
      </F>
      <F label="As a parent/guardian, what does a successful outcome look like?" required>
        <textarea name="successOutcome" required rows={3} placeholder="Describe what you hope your child and family will look and feel like after therapy." style={ta} />
      </F>
      <F label="Would you like to be included in some sessions?">
        <RadioGroup name="_parentIncluded" options={["Yes — regularly", "Occasionally for updates", "As needed", "Prefer not to"]} value={parentIncluded} onChange={setParentIncluded} />
        <input type="hidden" name="parentIncluded" value={parentIncluded} />
      </F>
      <F label="Do you want the therapist to coordinate with the child's school?">
        <RadioGroup name="_schoolCoord" options={["Yes", "Only if necessary", "No"]} value={schoolCoord} onChange={setSchoolCoord} />
        <input type="hidden" name="schoolCoordination" value={schoolCoord} />
      </F>

      <Sec num={9} title="Safety & Wellbeing" />
      <Note>These questions are standard and confidential within legal limits. Therapists are mandated reporters — legally required to report suspected abuse, neglect, or imminent risk of harm to a minor.</Note>
      <F label="Is the child currently expressing thoughts of self-harm or suicide?">
        <RadioGroup name="_selfHarmThoughts" options={["No", "Yes", "Unsure / possible"]} value={selfHarmThoughts} onChange={setSelfHarmThoughts} />
        <input type="hidden" name="selfHarmThoughts" value={selfHarmThoughts} />
      </F>
      <F label="Has the child engaged in self-harm?">
        <RadioGroup name="_selfHarm" options={["No", "Yes — currently", "Yes — in the past"]} value={selfHarm} onChange={setSelfHarm} />
        <input type="hidden" name="selfHarm" value={selfHarm} />
      </F>
      <F label="Is the child exposed to violence or abuse at home or elsewhere?">
        <RadioGroup name="_violence" options={["No", "Yes", "Suspected"]} value={violence} onChange={setViolence} />
        <input type="hidden" name="violenceExposure" value={violence} />
      </F>
      <F label="Is the child currently in a safe living environment?">
        <RadioGroup name="_safeEnv" options={["Yes", "No", "Unsure"]} value={safeEnv} onChange={setSafeEnv} />
        <input type="hidden" name="safeEnvironment" value={safeEnv} />
      </F>
      <F label="Is substance use a concern for the child?">
        <RadioGroup name="_substanceChild" options={["No", "Yes", "Suspected"]} value={substanceChild} onChange={setSubstanceChild} />
        <input type="hidden" name="substanceUse" value={substanceChild} />
      </F>
      <F label="Any additional safety concerns or context? (optional)">
        <textarea name="safetyAdditional" rows={2} placeholder="Anything else Miriam should know." style={ta} />
      </F>
      <F label="How did you hear about this practice?">
        <input name="referral" type="text" placeholder="e.g. Google, a friend, pediatrician referral" style={inp} />
      </F>
      <SubmitBtn loading={loading} />
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. BLENDED FAMILY THERAPY
══════════════════════════════════════════════════════════════ */
function BlendedForm({ onSuccess }: { onSuccess: (pdf: string, filename: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [relStatus, setRelStatus] = useState("");
  const [secondMarriage, setSecondMarriage] = useState("");
  const [childrenTogether, setChildrenTogether] = useState("");
  const [specialNeeds, setSpecialNeeds] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [connection, setConnection] = useState("");
  const [conflictFreq, setConflictFreq] = useState("");
  const [indivTherapy, setIndivTherapy] = useState("");
  const [couplesTherapy, setCouplesTherapy] = useState("");
  const [childrenTherapy, setChildrenTherapy] = useState("");
  const [coParenting, setCoParenting] = useState("");
  const [willing, setWilling] = useState("");
  const [childrenInSessions, setChildrenInSessions] = useState("");
  const [dvSafety, setDvSafety] = useState("");
  const [mhCrisis, setMhCrisis] = useState("");
  const [childrenRisk, setChildrenRisk] = useState("");
  const [substanceUse, setSubstanceUse] = useState("");
  const [format, setFormat] = useState("");

  const concernOptions = [
    "Co-parenting conflicts", "Step-parent / stepchild relationship", "Discipline differences",
    "Loyalty conflicts in children", "Communication between households", "Sibling / step-sibling conflict",
    "Financial stress (child support, expenses)", "Different parenting styles", "Lack of united front as a couple",
    "Relationship with ex-partners", "Children's adjustment to blended family", "Intimacy / connection as a couple",
    "Other",
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("primaryConcerns", concerns.join(", ") || "None selected");
    const result = await submitForm("Blended Family Therapy", data);
    setLoading(false);
    if (result) {
      onSuccess(result.pdf, result.filename); form.reset(); setConcerns([]);
      setRelStatus(""); setSecondMarriage(""); setChildrenTogether(""); setSpecialNeeds("");
      setConnection(""); setConflictFreq(""); setIndivTherapy(""); setCouplesTherapy("");
      setChildrenTherapy(""); setCoParenting(""); setWilling(""); setChildrenInSessions("");
      setDvSafety(""); setMhCrisis(""); setChildrenRisk(""); setSubstanceUse(""); setFormat("");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
      <Note>Thank you for reaching out. Blended families bring unique strengths and unique challenges. This form helps Miriam understand your family's story. Please complete as a couple or individually — either is fine.</Note>

      <Sec num={1} title="Contact Information" />
      <Row>
        <F label="Partner 1 — Full name" required><input name="partner1Name" type="text" required placeholder="First and last name" style={inp} /></F>
        <F label="Partner 2 — Full name"><input name="partner2Name" type="text" placeholder="First and last name (optional)" style={inp} /></F>
      </Row>
      <Row>
        <F label="Primary phone number"><input name="phone" type="tel" placeholder="+254 700 000 000" style={inp} /></F>
        <F label="Email address" required><input name="email" type="email" required placeholder="you@email.com" style={inp} /></F>
      </Row>
      <Row3>
        <F label="City" required><input name="city" type="text" required placeholder="e.g. Nairobi" style={inp} /></F>
        <F label="Best day(s) to meet"><input name="bestDays" type="text" placeholder="e.g. Mon, Sat" style={inp} /></F>
        <F label="Preferred session time"><input name="preferredTime" type="text" placeholder="e.g. Evenings" style={inp} /></F>
      </Row3>
      <F label="Preferred session format">
        <RadioGroup name="_format" options={["In-person", "Telehealth / Virtual", "Either works"]} value={format} onChange={setFormat} />
        <input type="hidden" name="sessionFormat" value={format} />
      </F>

      <Sec num={2} title="Your Relationship" />
      <Row>
        <F label="How long have you been together?" required><input name="togetherness" type="text" required placeholder="e.g. 3 years" style={inp} /></F>
        <F label="How long have you lived together?"><input name="livingTogether" type="text" placeholder="e.g. 1 year" style={inp} /></F>
      </Row>
      <F label="Current relationship status">
        <RadioGroup name="_relStatus" options={["Dating", "Engaged", "Married", "Domestic partners"]} value={relStatus} onChange={setRelStatus} />
        <input type="hidden" name="relationshipStatus" value={relStatus} />
      </F>
      {(relStatus === "Married" || relStatus === "Engaged") && (
        <F label="When did you marry / become engaged?"><input name="marriageDate" type="text" placeholder="Month and year" style={inp} /></F>
      )}
      <F label="Is this a second (or subsequent) marriage for either partner?">
        <RadioGroup name="_secondMarriage" options={["Yes — Partner 1", "Yes — Partner 2", "Yes — Both", "No"]} value={secondMarriage} onChange={setSecondMarriage} />
        <input type="hidden" name="secondMarriage" value={secondMarriage} />
      </F>

      <Sec num={3} title="Children & Household Composition" />
      <Note>Understanding your household structure helps Miriam consider the full family system, not just the couple relationship.</Note>

      <div style={{ background: "#F5F0E8", padding: "16px 18px", borderRadius: 2 }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, fontWeight: 500, color: "#2F5D52", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Partner 1&apos;s Children</div>
        <div style={{ display: "grid", gap: 14 }}>
          <Row3>
            <F label="Number of children"><input name="p1NumChildren" type="number" min={0} placeholder="0" style={inp} /></F>
            <F label="Ages"><input name="p1ChildrenAges" type="text" placeholder="e.g. 5, 8, 12" style={inp} /></F>
            <F label="Primary residence"><input name="p1Residence" type="text" placeholder="e.g. With us" style={inp} /></F>
          </Row3>
          <F label="Custody / parenting arrangement">
            <select name="p1Custody" style={sel}>
              <option value="">Select…</option>
              <option>Primary with Partner 1</option>
              <option>Shared / joint</option>
              <option>Primary with other parent</option>
              <option>N/A</option>
            </select>
          </F>
          <F label="Other parent involvement (optional)"><input name="p1OtherParent" type="text" placeholder="Brief description" style={inp} /></F>
        </div>
      </div>

      <div style={{ background: "#F5F0E8", padding: "16px 18px", borderRadius: 2 }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 12, fontWeight: 500, color: "#2F5D52", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Partner 2&apos;s Children</div>
        <div style={{ display: "grid", gap: 14 }}>
          <Row3>
            <F label="Number of children"><input name="p2NumChildren" type="number" min={0} placeholder="0" style={inp} /></F>
            <F label="Ages"><input name="p2ChildrenAges" type="text" placeholder="e.g. 3, 7" style={inp} /></F>
            <F label="Primary residence"><input name="p2Residence" type="text" placeholder="e.g. Shared" style={inp} /></F>
          </Row3>
          <F label="Custody / parenting arrangement">
            <select name="p2Custody" style={sel}>
              <option value="">Select…</option>
              <option>Primary with Partner 2</option>
              <option>Shared / joint</option>
              <option>Primary with other parent</option>
              <option>N/A</option>
            </select>
          </F>
          <F label="Other parent involvement (optional)"><input name="p2OtherParent" type="text" placeholder="Brief description" style={inp} /></F>
        </div>
      </div>

      <F label="Do you have biological or adopted children together?">
        <RadioGroup name="_childrenTogether" options={["Yes", "No", "Expecting"]} value={childrenTogether} onChange={setChildrenTogether} />
        <input type="hidden" name="childrenTogether" value={childrenTogether} />
      </F>
      {childrenTogether === "Yes" && (
        <F label="Ages and any relevant details"><input name="childrenTogetherDetail" type="text" placeholder="e.g. Twin girls, age 2" style={inp} /></F>
      )}
      <F label="Total number of people living in the household (full-time or part-time)">
        <input name="householdTotal" type="number" min={1} placeholder="e.g. 6" style={inp} />
      </F>
      <F label="Do any children have special needs, diagnoses, or significant challenges?">
        <RadioGroup name="_specialNeeds" options={["No", "Yes"]} value={specialNeeds} onChange={setSpecialNeeds} />
        <input type="hidden" name="specialNeeds" value={specialNeeds} />
      </F>
      {specialNeeds === "Yes" && (
        <F label="Brief description (optional)"><textarea name="specialNeedsDetail" rows={2} style={ta} /></F>
      )}

      <Sec num={4} title="Blended Family Challenges & Concerns" />
      <F label="What are your primary concerns? — check all that apply">
        <CheckGroup options={concernOptions} checked={concerns} onChange={setConcerns} />
        <input type="hidden" name="primaryConcerns" value={concerns.join(", ")} />
      </F>
      <F label="Describe the most pressing challenge your family is facing right now:" required>
        <textarea name="pressingChallenge" required rows={4} placeholder="In your own words — there are no right or wrong answers." style={ta} />
      </F>
      <F label="How long have these challenges been present?">
        <input name="challengeDuration" type="text" placeholder="e.g. About 18 months, since we moved in together" style={inp} />
      </F>

      <Sec num={5} title="The Couple Relationship" />
      <F label="What brought you together and what do you value most about your relationship? (optional)">
        <textarea name="relationshipStrengths" rows={3} placeholder="Share what matters most to you as a couple." style={ta} />
      </F>
      <F label="How would you describe your current level of connection?">
        <RadioGroup name="_connection" options={["Very connected", "Somewhat connected", "Disconnected", "In crisis"]} value={connection} onChange={setConnection} />
        <input type="hidden" name="connectionLevel" value={connection} />
      </F>
      <F label="How often do conflicts about the children affect the couple relationship?">
        <RadioGroup name="_conflictFreq" options={["Rarely", "Sometimes", "Often", "Almost always"]} value={conflictFreq} onChange={setConflictFreq} />
        <input type="hidden" name="conflictFrequency" value={conflictFreq} />
      </F>
      <F label="What do you hope therapy will do for your relationship specifically?">
        <textarea name="relationshipGoal" rows={3} placeholder="What would be different if therapy went well?" style={ta} />
      </F>

      <Sec num={6} title="Therapy & Support History" />
      <F label="Have either of you had individual therapy?">
        <RadioGroup name="_indivTherapy" options={["Yes — Partner 1", "Yes — Partner 2", "Yes — Both", "No"]} value={indivTherapy} onChange={setIndivTherapy} />
        <input type="hidden" name="individualTherapy" value={indivTherapy} />
      </F>
      <F label="Have you done couples therapy before?">
        <RadioGroup name="_couplesTherapy" options={["Yes", "No"]} value={couplesTherapy} onChange={setCouplesTherapy} />
        <input type="hidden" name="previousCouplesTherapy" value={couplesTherapy} />
      </F>
      <F label="Have any children been in therapy?">
        <RadioGroup name="_childrenTherapy" options={["Yes", "No"]} value={childrenTherapy} onChange={setChildrenTherapy} />
        <input type="hidden" name="childrenPreviousTherapy" value={childrenTherapy} />
      </F>
      <F label="Have you worked with a co-parenting mediator or counselor?">
        <RadioGroup name="_coParenting" options={["Yes", "No"]} value={coParenting} onChange={setCoParenting} />
        <input type="hidden" name="coParentingSupport" value={coParenting} />
      </F>
      <F label="What has been helpful — or unhelpful — in any past therapy or support? (optional)">
        <textarea name="pastTherapyFeedback" rows={2} placeholder="Any context that might help Miriam tailor her approach." style={ta} />
      </F>

      <Sec num={7} title="Goals for Therapy" />
      <F label="If therapy is successful, what will be different 6 months from now?" required>
        <textarea name="successOutcome" required rows={3} placeholder="Describe what healing and harmony would look like for your family." style={ta} />
      </F>
      <F label="Are both partners motivated and willing to attend sessions?">
        <RadioGroup name="_willing" options={["Yes — both", "One partner hesitant", "Not sure"]} value={willing} onChange={setWilling} />
        <input type="hidden" name="bothWilling" value={willing} />
      </F>
      <F label="Would you want to include children in any sessions?">
        <RadioGroup name="_childrenSessions" options={["Yes — all children", "Yes — select children", "Not at this time", "Unsure"]} value={childrenInSessions} onChange={setChildrenInSessions} />
        <input type="hidden" name="childrenInSessions" value={childrenInSessions} />
      </F>
      <F label="How did you hear about this practice?">
        <input name="referral" type="text" placeholder="e.g. Google, a friend, Instagram" style={inp} />
      </F>

      <Sec num={8} title="Safety & Wellbeing" />
      <Note>These questions help ensure therapy is the right and safest level of support for your family. Your answers are confidential.</Note>
      <F label="Is there any current domestic violence or safety concern in the home?">
        <RadioGroup name="_dvSafety" options={["No", "Yes", "Prefer to discuss"]} value={dvSafety} onChange={setDvSafety} />
        <input type="hidden" name="domesticSafety" value={dvSafety} />
      </F>
      <F label="Is either partner currently experiencing a mental health crisis?">
        <RadioGroup name="_mhCrisis" options={["No", "Yes", "Prefer to discuss"]} value={mhCrisis} onChange={setMhCrisis} />
        <input type="hidden" name="mentalHealthCrisis" value={mhCrisis} />
      </F>
      <F label="Are any children currently at risk or in an unsafe situation?">
        <RadioGroup name="_childrenRisk" options={["No", "Yes", "Prefer to discuss"]} value={childrenRisk} onChange={setChildrenRisk} />
        <input type="hidden" name="childrenAtRisk" value={childrenRisk} />
      </F>
      <F label="Is substance use a current concern in the household?">
        <RadioGroup name="_substanceUse" options={["No", "Yes", "Prefer to discuss"]} value={substanceUse} onChange={setSubstanceUse} />
        <input type="hidden" name="substanceUse" value={substanceUse} />
      </F>
      <SubmitBtn loading={loading} />
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
function SuccessMessage({ onReset, pdf, filename }: { onReset: () => void; pdf: string; filename: string }) {
  return (
    <div style={{ background: "#F5F0E8", padding: "48px 40px", borderRadius: 4, textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 28, color: "#5C8C6E", marginBottom: 14 }}>
        Thank you for reaching out
      </div>
      <p style={{ fontFamily: "var(--font-jost), sans-serif", fontWeight: 300, fontSize: 17, lineHeight: 1.8, color: "#6E6A64", margin: "0 0 28px", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
        Miriam has received your form and will reply personally within 1–2 business days. You don&apos;t have to carry this alone.
      </p>
      <button
        onClick={() => downloadPDF(pdf, filename)}
        style={{ display: "inline-block", fontFamily: "var(--font-jost), sans-serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "#5C8C6E", padding: "14px 28px", borderRadius: 2, border: "none", cursor: "pointer", marginBottom: 20 }}
      >
        Download your copy (PDF)
      </button>
      <div>
        <button onClick={onReset} style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A958C", background: "none", border: "none", cursor: "pointer", padding: 0, borderBottom: "1px solid #C2CFC4" }}>
          Submit another enquiry
        </button>
      </div>
    </div>
  );
}

export default function IntakeForms() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") as FormType | null;
  const [active, setActive] = useState<FormType>("individual");
  const [submitted, setSubmitted] = useState(false);
  const [submittedPdf, setSubmittedPdf] = useState<{ pdf: string; filename: string } | null>(null);

  useEffect(() => {
    if (serviceParam && tabs.some((t) => t.id === serviceParam)) setActive(serviceParam);
  }, [serviceParam]);

  function handleSuccess(pdf: string, filename: string) {
    setSubmittedPdf({ pdf, filename });
    setSubmitted(true);
  }

  function handleReset() {
    setSubmitted(false);
    setSubmittedPdf(null);
  }

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid #ECE7DE", overflowX: "auto" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActive(tab.id); handleReset(); }}
            style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: 12.5,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: active === tab.id ? "#2F5D52" : "#9A958C",
              background: "none",
              border: "none",
              borderBottom: active === tab.id ? "2px solid #5C8C6E" : "2px solid transparent",
              padding: "13px 18px",
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

      {submitted && submittedPdf ? (
        <SuccessMessage onReset={handleReset} pdf={submittedPdf.pdf} filename={submittedPdf.filename} />
      ) : (
        <>
          {active === "individual" && <IndividualForm onSuccess={handleSuccess} />}
          {active === "marriage" && <CouplesForm onSuccess={handleSuccess} />}
          {active === "child" && <ChildForm onSuccess={handleSuccess} />}
          {active === "blended" && <BlendedForm onSuccess={handleSuccess} />}
        </>
      )}

      <style>{`
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
          .form-row3 { grid-template-columns: 1fr !important; }
          .check-group { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
