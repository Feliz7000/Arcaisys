import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendContactNotification } from '@/lib/mailer';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Insert into Supabase table "contact_messages"
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        { name, email, company, message }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save message to database.' },
        { status: 500 }
      );
    }

    let mailStatus: { sent: boolean; skipped?: boolean; reason?: string } = { sent: false, skipped: true, reason: 'Not attempted' };
    try {
      mailStatus = await sendContactNotification({ name, email, company, message });
      if (mailStatus.skipped) {
        console.warn('Mail notification skipped:', mailStatus.reason);
      }
    } catch (mailError) {
      // Keep contact capture resilient even if SMTP is temporarily unavailable.
      console.error('Mail notification error:', mailError);
      mailStatus = {
        sent: false,
        skipped: false,
        reason: mailError instanceof Error ? mailError.message : 'Unknown mail error',
      };
    }

    return NextResponse.json({ success: true, data, mailStatus }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
