'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [status, setStatus] = useState<any>(null);
  const [lastEmailSent, setLastEmailSent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the email scheduler and fetch status
  useEffect(() => {
    // Import and initialize the scheduler
    import('../lib/email-scheduler').then((module) => {
      const scheduler = module.hourlyEmailScheduler;
      setStatus(scheduler.getStatus());
      console.log('📧 Email scheduler initialized from React component');
    });

    // Fetch status from API
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status');
        const data = await response.json() as { success: boolean; scheduler: any };
        if (data.success) {
          setStatus(data.scheduler);
        }
      } catch (error) {
        console.error('Failed to fetch status:', error);
      }
    };

    fetchStatus();
    
    // Refresh status every 30 seconds
    const statusInterval = setInterval(fetchStatus, 30000);
    
    return () => clearInterval(statusInterval);
  }, []);

  const sendTestEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'investorgbriel@gmail.com',
          subject: '🔥 TEST LOCK IN TIME! 🔥',
          message: 'Test lock-in reminder'
        })
      });

      const result = await response.json() as { success: boolean; error?: string };
      
      if (result.success) {
        setLastEmailSent(new Date().toLocaleString());
        alert('✅ Test email sent successfully!');
      } else {
        alert('❌ Failed to send test email: ' + result.error);
      }
    } catch (error) {
      alert('❌ Error sending test email: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const triggerHourlyReminder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cron/hourly-reminder', {
        method: 'POST',
      });

      const result = await response.json() as { success: boolean; error?: string };
      
      if (result.success) {
        setLastEmailSent(new Date().toLocaleString());
        alert('✅ Hourly reminder sent successfully!');
      } else {
        alert('❌ Failed to send hourly reminder: ' + result.error);
      }
    } catch (error) {
      alert('❌ Error sending hourly reminder: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🔥 Lock-In Email Agent 🔥
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Hourly productivity reminders sent to <strong>investorgbriel@gmail.com</strong>
          </p>
          <p className="text-lg text-gray-500">
            Stay focused, stay productive! 💪
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              📊 System Status
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-semibold text-green-800">Email Service</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status?.isRunning 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-red-200 text-red-800'
                }`}>
                  {status?.isRunning ? '✅ Active' : '❌ Stopped'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-semibold text-blue-800">Target Email</span>
                <span className="text-blue-600 text-sm">
                  {status?.targetEmail || 'investorgbriel@gmail.com'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <span className="font-semibold text-purple-800">Frequency</span>
                <span className="text-purple-600 font-medium">Every Hour</span>
              </div>

              {status?.nextEmailTime && (
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span className="font-semibold text-orange-800">Next Email</span>
                  <span className="text-orange-600 text-sm">{status.nextEmailTime}</span>
                </div>
              )}

              {lastEmailSent && (
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="font-semibold text-yellow-800">Last Test Email</span>
                  <span className="text-yellow-600 text-sm">{lastEmailSent}</span>
                </div>
              )}

              {status?.startedAt && (
                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                  <span className="font-semibold text-indigo-800">Started At</span>
                  <span className="text-indigo-600 text-sm">{status.startedAt}</span>
                </div>
              )}
            </div>
          </div>

          {/* Controls Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              🎮 Controls
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={sendTestEmail}
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    📧 Send Test Email
                  </>
                )}
              </button>

              <button
                onClick={triggerHourlyReminder}
                disabled={isLoading}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    ⚡ Trigger Hourly Reminder
                  </>
                )}
              </button>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Note:</strong> The system automatically sends hourly reminders. 
                  Use the buttons above to test the email functionality.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            ✨ Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-bold text-gray-800 mb-2">Hourly Reminders</h3>
              <p className="text-gray-600 text-sm">Automatic emails sent every hour to keep you focused</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-bold text-gray-800 mb-2">Random Quotes</h3>
              <p className="text-gray-600 text-sm">Motivational quotes included with each reminder</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">Stay Productive</h3>
              <p className="text-gray-600 text-sm">Consistent reminders to maintain focus and productivity</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            🚀 Your productivity agent is running 24/7 to keep you locked in!
          </p>
        </div>
      </div>
    </div>
  );
}







