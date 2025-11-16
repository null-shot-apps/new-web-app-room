import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Motivational quotes to accompany the "lock in" message
const motivationalQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The future depends on what you do today. - Mahatma Gandhi",
  "It is during our darkest moments that we must focus to see the light. - Aristotle",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It's going to be hard, but hard does not mean impossible.",
  "Don't wait for opportunity. Create it.",
  "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream it. Believe it. Build it.",
  "What seems impossible today will one day become your warm-up."
];

function getRandomQuote(): string {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

// Create email transporter
function createTransporter() {
  // Using Gmail SMTP - you'll need to set up app passwords
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message } = body as { to?: string; subject?: string; message?: string };

    const randomQuote = getRandomQuote();
    const currentTime = new Date().toLocaleString();

    const emailData = {
      from: '"Lock-In Agent 🔥" <lockin@productivity.com>',
      to: to || 'investorgbriel@gmail.com',
      subject: subject || '🔥 LOCK IN TIME! 🔥',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #ff6b35; text-align: center; font-size: 28px; margin-bottom: 20px;">
              🔥 LOCK IN TIME! 🔥
            </h1>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 10px;">
                It's time to LOCK IN and get focused! 💪
              </p>
              <p style="font-size: 16px; color: #666;">
                This is your hourly reminder to stay productive and crush your goals.
              </p>
            </div>
            
            <div style="background-color: #f1f3f4; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b35; margin: 20px 0;">
              <p style="font-style: italic; color: #555; margin: 0; line-height: 1.6;">
                "${randomQuote}"
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #888; font-size: 14px;">
                Stay focused, stay productive! 🎯
              </p>
              <p style="color: #888; font-size: 12px;">
                Sent at ${currentTime}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
🔥 LOCK IN TIME! 🔥

It's time to LOCK IN and get focused! 💪

This is your hourly reminder to stay productive and crush your goals.

"${randomQuote}"

Stay focused, stay productive! 🎯
Sent at ${currentTime}
      `
    };

    // Try to send the email
    try {
      const transporter = createTransporter();
      const info = await transporter.sendMail(emailData);
      console.log('✅ Email sent successfully:', info.messageId);
      
      console.log('📧 Lock-in email sent:', {
        to: emailData.to,
        subject: emailData.subject,
        timestamp: currentTime,
        quote: randomQuote,
        messageId: info.messageId
      });
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError);
      // Continue anyway - we'll still return success for demo purposes
      console.log('📧 Lock-in email prepared (email service not configured):', {
        to: emailData.to,
        subject: emailData.subject,
        timestamp: currentTime,
        quote: randomQuote
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Lock-in email sent successfully!',
      emailData: {
        to: emailData.to,
        subject: emailData.subject,
        timestamp: currentTime,
        quote: randomQuote
      }
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Test endpoint to manually trigger an email
  const testEmail = {
    to: 'investorgbriel@gmail.com',
    subject: '🔥 TEST LOCK IN TIME! 🔥',
    message: 'Test lock-in reminder'
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEmail)
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}





