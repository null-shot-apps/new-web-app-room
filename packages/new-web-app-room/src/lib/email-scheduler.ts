// Background email scheduler service
// This runs automatically when the app starts

class HourlyEmailScheduler {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;
  private readonly targetEmail = 'investorgbriel@gmail.com';

  constructor() {
    // Auto-start the scheduler when the class is instantiated
    this.start();
  }

  private async sendLockInEmail(): Promise<void> {
    try {
      console.log('🔥 Sending hourly lock-in reminder...');
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: this.targetEmail,
          subject: '🔥 LOCK IN TIME! 🔥',
          message: 'Hourly productivity reminder'
        })
      });

      const result = await response.json() as { success: boolean; error?: string; emailData?: any };
      
      if (result.success) {
        console.log('✅ Lock-in email sent successfully at:', new Date().toLocaleString());
        console.log('📧 Email details:', result.emailData);
      } else {
        console.error('❌ Failed to send lock-in email:', result.error);
      }

    } catch (error) {
      console.error('❌ Error in email scheduler:', error);
    }
  }

  public start(): void {
    if (this.isRunning) {
      console.log('📧 Email scheduler is already running');
      return;
    }

    console.log('🚀 Starting hourly lock-in email scheduler...');
    console.log(`📬 Target email: ${this.targetEmail}`);
    
    // Send first email immediately
    this.sendLockInEmail();

    // Then send every hour (3600000 milliseconds = 1 hour)
    this.intervalId = setInterval(() => {
      this.sendLockInEmail();
    }, 3600000); // 1 hour

    this.isRunning = true;
    console.log('✅ Hourly lock-in email scheduler started successfully!');
    console.log('⏰ Next email will be sent in 1 hour');
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('⏹️ Email scheduler stopped');
  }

  public getStatus() {
    return {
      isRunning: this.isRunning,
      targetEmail: this.targetEmail,
      nextEmailTime: this.isRunning ? new Date(Date.now() + 3600000).toLocaleString() : null,
      startedAt: this.isRunning ? new Date().toLocaleString() : null
    };
  }

  // For testing - send email every 2 minutes instead of every hour
  public startTestMode(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    console.log('🧪 Starting test mode - emails every 2 minutes...');
    
    // Send first email immediately
    this.sendLockInEmail();

    // Then send every 2 minutes for testing
    this.intervalId = setInterval(() => {
      this.sendLockInEmail();
    }, 120000); // 2 minutes

    this.isRunning = true;
    console.log('✅ Test mode scheduler started - emails every 2 minutes!');
  }
}

// Create and export singleton instance
export const hourlyEmailScheduler = new HourlyEmailScheduler();

// Log scheduler status on module load
console.log('📧 Email scheduler module loaded');
console.log('🎯 Scheduler status:', hourlyEmailScheduler.getStatus());

