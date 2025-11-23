'use client';

import { useState } from 'react';

interface EmbeddedWebviewProps {
  url: string;
  title: string;
  fallbackImage?: string;
  className?: string;
}

export function EmbeddedWebview({ url, title, fallbackImage, className = '' }: EmbeddedWebviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center p-6 ${className}`}>
        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
          Unable to load the embedded demo
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open in New Tab
        </a>
      </div>
    );
  }

  return (
    <div className={`relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading demo...</p>
          </div>
        </div>
      )}
      
      <iframe
        src={url}
        title={title}
        className="w-full h-full border-0"
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        loading="lazy"
      />
      
      {/* Overlay with external link */}
      <div className="absolute top-2 right-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-sm"
          title="Open in new tab"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
