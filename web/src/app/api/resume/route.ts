import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const runtime = "nodejs";

export async function GET() {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  page.drawText("Resume (Placeholder)", {
    x: 72,
    y: 720,
    size: 28,
    font,
    color: rgb(0.15, 0.15, 0.17),
  });
  page.drawText(
    "Replace this auto-generated PDF with your real resume via the Admin system.",
    {
      x: 72,
      y: 680,
      size: 12,
      font,
      color: rgb(0.35, 0.35, 0.38),
    }
  );

  const bytes = await pdf.save();
  const body = Buffer.from(bytes);

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="resume.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
