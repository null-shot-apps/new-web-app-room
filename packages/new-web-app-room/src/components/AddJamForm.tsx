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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Add New Jam Tutorial
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Paste a public Nullshot Jam URL to generate a structured tutorial and quiz
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1">
          <input
            type="url"
            value={jamUrl}
            onChange={(e) => setJamUrl(e.target.value)}
            placeholder="https://jam.nullshot.dev/your-jam-id"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isProcessing}
          />
        </div>
        <button
          type="submit"
          disabled={!jamUrl.trim() || isProcessing}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            'Generate Tutorial'
          )}
        </button>
      </form>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>
          <strong>Supported:</strong> Public Jam URLs only. Private Jams require owner permission.
        </p>
      </div>
    </div>
  );
}



