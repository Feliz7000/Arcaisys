import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendContactNotification } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX = { name: 120, email: 200, company: 160, interest: 80, message: 5000 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const company = clean(body.company, MAX.company);
  const interest = clean(body.interest, MAX.interest);
  const rawMessage = clean(body.message, MAX.message);

  if (!name || !email || !rawMessage) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // The contact_messages table has no interest column, so it travels with the message.
  const message = interest ? `[Interested in: ${interest}]\n\n${rawMessage}` : rawMessage;
  const payload = { name, email, company, message };

  let stored = false;
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert([payload]);
    if (error) console.error("Supabase insert failed:", error);
    else stored = true;
  }

  let mailed = false;
  try {
    const result = await sendContactNotification(payload);
    mailed = result.sent;
    if (result.skipped) console.warn("Mail notification skipped:", result.reason);
  } catch (err) {
    console.error("Mail notification failed:", err);
  }

  // Succeed if the message landed somewhere a human will see it.
  if (!stored && !mailed) {
    return NextResponse.json(
      { error: "We couldn't deliver your message right now. Please try again shortly." },
      { status: 503 },
    );
  }
  return NextResponse.json({ success: true, stored, mailed });
}
