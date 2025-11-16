import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Import the scheduler to get its status
    const { hourlyEmailScheduler } = await import('../../../lib/email-scheduler');
    
    const status = hourlyEmailScheduler.getStatus();
    
    return NextResponse.json({
      success: true,
      scheduler: status,
      systemTime: new Date().toLocaleString(),
      uptime: process.uptime(),
      message: status.isRunning ? 'Email scheduler is active' : 'Email scheduler is stopped'
    });

  } catch (error) {
    console.error('Error getting scheduler status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get scheduler status',
        systemTime: new Date().toLocaleString()
      },
      { status: 500 }
    );
  }
}
