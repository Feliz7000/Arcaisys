import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

type MailResult =
  | { sent: true; skipped: false; reason?: undefined }
  | { sent: false; skipped: true; reason: string };

function parseRecipients(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function sendContactNotification(payload: ContactPayload): Promise<MailResult> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const recipients = parseRecipients(process.env.CONTACT_NOTIFY_TO);
  const from = process.env.CONTACT_NOTIFY_FROM || user;

  if (!host || !user || !pass || recipients.length === 0 || !from) {
    return {
      sent: false,
      skipped: true,
      reason: "Missing one or more SMTP env vars (SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_NOTIFY_TO, CONTACT_NOTIFY_FROM).",
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: recipients,
    replyTo: payload.email,
    subject: `New Contact Form Submission - ${payload.name}`,
    text: [
      "New message received from the Arcaisys contact form.",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company || "N/A"}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Company:</strong> ${payload.company || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${payload.message.replace(/\n/g, "<br />")}</p>
    `,
  });

  return { sent: true, skipped: false };
}
