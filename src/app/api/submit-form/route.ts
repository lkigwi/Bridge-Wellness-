import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { createElement, type ReactElement, type JSXElementConstructor } from "react";
import { IntakePDF } from "@/lib/pdf-template";

const resend = new Resend(process.env.RESEND_API_KEY);

function buildHtmlBody(formType: string, data: Record<string, string>): string {
  const rows = Object.entries(data)
    .map(([k, v]) => {
      const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
      return `<tr><td style="padding:6px 12px;color:#9A958C;font-size:12px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 12px;font-size:13px;color:#2A2A28;vertical-align:top">${v}</td></tr>`;
    })
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;color:#2A2A28">
      <div style="background:#2F5D52;padding:24px 28px;border-radius:4px 4px 0 0">
        <p style="margin:0;font-size:13px;color:#A9B6AE;letter-spacing:0.08em;text-transform:uppercase">The Bridge Wellness Centre</p>
        <h1 style="margin:6px 0 0;font-size:22px;color:#FAFAF8;font-weight:400">${formType} — New Intake</h1>
      </div>
      <div style="background:#F5F0E8;padding:16px 28px;border-radius:0 0 4px 4px">
        <p style="margin:0;font-size:13px;color:#6E6A64">A new intake form has been submitted. The full form is attached as a PDF.</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-top:20px;border:1px solid #E3DCCF;border-radius:4px">
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:24px;font-size:11px;color:#A8A39A;text-align:center">Confidential · The Bridge Wellness Centre</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formType, fields } = body as { formType: string; fields: Record<string, string> };

    if (!formType || !fields) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();

    const pdfBuffer = await renderToBuffer(
      createElement(IntakePDF, { formType, data: fields, submittedAt }) as ReactElement<DocumentProps, string | JSXElementConstructor<unknown>>
    );

    const pdfBase64 = pdfBuffer.toString("base64");
    const filename = `${formType.toLowerCase().replace(/ /g, "-")}-intake-${new Date().toISOString().slice(0, 10)}.pdf`;

    await resend.emails.send({
      from: "The Bridge Wellness Centre <onboarding@resend.dev>",
      replyTo: "thebridgewellnesscentre@gmail.com",
      to: "thebridgewellnesscentre@gmail.com",
      subject: `New ${formType} Intake — The Bridge Wellness Centre`,
      html: buildHtmlBody(formType, fields),
      attachments: [
        {
          filename,
          content: pdfBase64,
        },
      ],
    });

    return NextResponse.json({ success: true, pdf: pdfBase64, filename });
  } catch (err) {
    console.error("submit-form error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
