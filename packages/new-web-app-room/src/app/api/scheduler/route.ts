import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory scheduler for demonstration
// In production, you'd use a proper job queue like Bull, Agenda, or cloud-based cron
let schedulerInterval: NodeJS.Timeout | null = null;
let isRunning = false;

async function sendLockInEmail() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
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

    const result = await response.json();
    console.log('Lock-in email result:', result);
    return result;
  } catch (error) {
    console.error('Error sending lock-in email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function GET() {
  return NextResponse.json({
    isRunning,
    message: isRunning ? 'Scheduler is running' : 'Scheduler is stopped',
    nextEmailTime: isRunning ? new Date(Date.now() + 3600000).toISOString() : null
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body as { action: string };

    switch (action) {
      case 'start':
        if (isRunning) {
          return NextResponse.json({ 
            success: false, 
            message: 'Scheduler is already running' 
          });
        }

        // Send first email immediately
        await sendLockInEmail();

        // Then schedule hourly emails
        schedulerInterval = setInterval(async () => {
          await sendLockInEmail();
        }, 3600000); // 1 hour

        isRunning = true;

        return NextResponse.json({
          success: true,
          message: 'Hourly email scheduler started successfully!',
          nextEmailTime: new Date(Date.now() + 3600000).toISOString()
        });

      case 'stop':
        if (schedulerInterval) {
          clearInterval(schedulerInterval);
          schedulerInterval = null;
        }
        isRunning = false;

        return NextResponse.json({
          success: true,
          message: 'Email scheduler stopped'
        });

      case 'test':
        // Start test mode - emails every minute
        if (schedulerInterval) {
          clearInterval(schedulerInterval);
        }

        // Send first email immediately
        await sendLockInEmail();

        // Then schedule emails every minute for testing
        schedulerInterval = setInterval(async () => {
          await sendLockInEmail();
        }, 60000); // 1 minute

        isRunning = true;

        return NextResponse.json({
          success: true,
          message: 'Test mode started - emails every minute!',
          nextEmailTime: new Date(Date.now() + 60000).toISOString()
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Scheduler API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


