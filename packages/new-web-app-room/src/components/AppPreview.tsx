'use client';

import { useState } from 'react';

interface AppPreviewProps {
  appUrl: string;
  title: string;
}

export function AppPreview({ appUrl, title }: AppPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Live Preview
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Interactive demo of the final application
        </p>
      </div>

      <div className="p-4">
        <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden h-96 min-h-[400px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                Loading preview...
              </div>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Preview Unavailable
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                The live preview couldn&apos;t be loaded. You can still follow the tutorial steps above.
              </p>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in New Tab
              </a>
            </div>
          ) : (
            <iframe
              src={appUrl}
              title={`${title} Preview`}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>

        {/* Preview Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Live Demo
          </div>
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Open Full Screen →
          </a>
        </div>
      </div>
    </div>
  );
}


