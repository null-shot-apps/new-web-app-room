import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // This endpoint will be called by a cron service every hour
    console.log('Hourly reminder cron job triggered at:', new Date().toISOString());

    // Call our email sending API
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'investorgbriel@gmail.com',
        subject: '🔥 LOCK IN TIME! 🔥',
        message: 'Hourly productivity reminder'
      })
    });

    const emailResult = await emailResponse.json() as { success: boolean; error?: string };

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Hourly lock-in reminder sent successfully!',
        timestamp: new Date().toISOString()
      });
    } else {
      throw new Error('Failed to send email');
    }

  } catch (error) {
    console.error('Error in hourly reminder cron:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send hourly reminder',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}

