'use client';

import { useState } from 'react';

export function AddJamForm() {
  const [jamUrl, setJamUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jamUrl.trim()) return;

    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/jam/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jamUrl: jamUrl.trim() }),
      });

      let data;
      try {
        data = await response.json() as { 
          error?: string; 
          details?: string;
          course?: { title: string };
          success?: boolean;
          message?: string;
        };
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response from server. Please try again.');
      }

      if (!response.ok) {
        const errorMessage = data.error || `Server error (${response.status})`;
        const errorDetails = data.details ? `\n\nDetails: ${data.details}` : '';
        throw new Error(errorMessage + errorDetails);
      }

      if (!data.success || !data.course) {
        throw new Error('Invalid response format from server');
      }

      // Reset form
      setJamUrl('');
      
      // Show success message
      const successMessage = `Tutorial "${data.course.title}" generated successfully! Check the course grid for your new tutorial.`;
      alert(successMessage);
      
      // In a real app, you might want to refresh the course list or redirect
      window.location.reload();
    } catch (error) {
      console.error('Error processing Jam:', error);
      
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Show user-friendly error message
      alert(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative group">
      {/* Animated background gradient */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
        {/* Header with icon */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ✨ Add New Jam Tutorial
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            🎯 Paste a public Nullshot Jam URL to generate a structured tutorial and quiz
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <input
              type="url"
              value={jamUrl}
              onChange={(e) => setJamUrl(e.target.value)}
              placeholder="🔗 https://jam.nullshot.dev/your-jam-id"
              className="relative w-full px-6 py-4 border-2 border-indigo-200 dark:border-indigo-700 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl"
              disabled={isProcessing}
            />
          </div>
          
          <button
            type="submit"
            disabled={!jamUrl.trim() || isProcessing}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>🔄 Processing Magic...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Tutorial
              </span>
            )}
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-blue-500 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium">💡 Pro Tip:</p>
              <p className="mt-1">Public Jam URLs only. Private Jams require owner permission.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




