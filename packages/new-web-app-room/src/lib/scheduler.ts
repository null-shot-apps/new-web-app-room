// Email scheduler service for hourly lock-in reminders

class EmailScheduler {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  async sendLockInEmail() {
    try {
      const response = await fetch('/api/send-email', {
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

      const result = await response.json() as { success: boolean; error?: string };
      
      if (result.success) {
        console.log('✅ Lock-in email sent successfully at:', new Date().toLocaleString());
      } else {
        console.error('❌ Failed to send lock-in email:', result.error);
      }

      return result;
    } catch (error) {
      console.error('❌ Error sending lock-in email:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  start() {
    if (this.isRunning) {
      console.log('📧 Email scheduler is already running');
      return;
    }

    console.log('🚀 Starting hourly lock-in email scheduler...');
    
    // Send first email immediately
    this.sendLockInEmail();

    // Then send every hour (3600000 milliseconds = 1 hour)
    this.intervalId = setInterval(() => {
      this.sendLockInEmail();
    }, 3600000); // 1 hour

    this.isRunning = true;
    console.log('✅ Hourly lock-in email scheduler started successfully!');
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('⏹️ Email scheduler stopped');
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      nextEmailTime: this.isRunning ? new Date(Date.now() + 3600000).toLocaleString() : null
    };
  }

  // For testing - send email every minute instead of every hour
  startTestMode() {
    if (this.isRunning) {
      this.stop();
    }

    console.log('🧪 Starting test mode - emails every minute...');
    
    // Send first email immediately
    this.sendLockInEmail();

    // Then send every minute for testing
    this.intervalId = setInterval(() => {
      this.sendLockInEmail();
    }, 60000); // 1 minute

    this.isRunning = true;
    console.log('✅ Test mode scheduler started - emails every minute!');
  }
}

// Create singleton instance
export const emailScheduler = new EmailScheduler();

// Auto-start the scheduler when this module is imported
if (typeof window === 'undefined') {
  // Only run on server side
  emailScheduler.start();
}

