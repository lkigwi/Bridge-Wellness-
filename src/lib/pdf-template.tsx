import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { FORM_SECTIONS, SectionDef } from "./intake-sections";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#FAFAF8",
    padding: "40px 44px 56px",
    fontSize: 10,
    color: "#2A2A28",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E3DCCF",
    borderBottomStyle: "solid",
  },
  orgName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
    color: "#2F5D52",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  formTitle: {
    fontSize: 11,
    color: "#6E6A64",
    marginBottom: 2,
  },
  meta: {
    fontSize: 8.5,
    color: "#9A958C",
    marginTop: 4,
  },
  section: {
    marginBottom: 12,
  },
  sectionBar: {
    backgroundColor: "#2F5D52",
    padding: "5px 10px",
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  fieldRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  field: {
    flex: 1,
  },
  fieldWide: {
    flex: 2,
  },
  label: {
    fontSize: 7.5,
    color: "#9A958C",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 3,
    fontFamily: "Helvetica-Bold",
  },
  value: {
    fontSize: 10,
    color: "#2A2A28",
    lineHeight: 1.5,
  },
  empty: {
    fontSize: 10,
    color: "#C5C1BB",
    fontFamily: "Helvetica-Oblique",
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 44,
    right: 44,
    borderTopWidth: 1,
    borderTopColor: "#E3DCCF",
    borderTopStyle: "solid",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7.5,
    color: "#A8A39A",
  },
  confidential: {
    fontSize: 7.5,
    color: "#A8A39A",
    fontFamily: "Helvetica-Bold",
  },
});

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

function FieldPair({ fields, data }: { fields: { label: string; name: string; wide?: boolean }[]; data: Record<string, string> }) {
  const rows: typeof fields[] = [];
  let i = 0;
  while (i < fields.length) {
    const f = fields[i];
    if (f.wide) {
      rows.push([f]);
      i++;
    } else if (i + 1 < fields.length && !fields[i + 1].wide) {
      rows.push([f, fields[i + 1]]);
      i += 2;
    } else {
      rows.push([f]);
      i++;
    }
  }

  return (
    <>
      {rows.map((row, ri) => {
        const hasValue = row.some((f) => data[f.name]);
        if (!hasValue) return null;
        return (
          <View key={ri} style={styles.fieldRow}>
            {row.map((f) => {
              const val = data[f.name];
              if (!val) return null;
              return (
                <View key={f.name} style={f.wide ? styles.fieldWide : styles.field}>
                  <Text style={styles.label}>{f.label}</Text>
                  <Text style={styles.value}>{val}</Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </>
  );
}

function Section({ sec, data }: { sec: SectionDef; data: Record<string, string> }) {
  const hasAny = sec.fields.some((f) => data[f.name]);
  if (!hasAny) return null;
  return (
    <View style={styles.section}>
      <View style={styles.sectionBar}>
        <Text style={styles.sectionTitle}>{sec.title}</Text>
      </View>
      <FieldPair fields={sec.fields} data={data} />
    </View>
  );
}

export function IntakePDF({
  formType,
  data,
  submittedAt,
}: {
  formType: string;
  data: Record<string, string>;
  submittedAt: string;
}) {
  const sections = FORM_SECTIONS[formType] ?? [];

  return (
    <Document
      title={`${formType} Intake — The Bridge Wellness Centre`}
      author="The Bridge Wellness Centre"
      subject={`${formType} Intake Form`}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.orgName}>THE BRIDGE WELLNESS CENTRE</Text>
          <Text style={styles.formTitle}>{formType} — Intake Form</Text>
          <Text style={styles.meta}>Submitted: {formatDate(submittedAt)}</Text>
        </View>

        {/* Sections */}
        {sections.map((sec) => (
          <Section key={sec.title} sec={sec} data={data} />
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Miriam Gathoni Mwangi, LPC · thebridgewellnesscentre@gmail.com · 0723 314 805</Text>
          <Text style={styles.confidential}>CONFIDENTIAL</Text>
        </View>
      </Page>
    </Document>
  );
}
