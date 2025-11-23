'use client';

import { useState, useEffect, useRef } from 'react';

interface AppPreviewProps {
  appUrl: string;
  title: string;
}

export function AppPreview({ appUrl, title }: AppPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<'network' | 'cors' | 'notfound' | 'unknown'>('unknown');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeoutRef = useRef<number | null>(null);

  // Validate URL format
  useEffect(() => {
    try {
      new URL(appUrl);
      setIsValidUrl(true);
    } catch {
      setIsValidUrl(false);
      setHasError(true);
      setErrorType('notfound');
      setIsLoading(false);
    }
  }, [appUrl]);

  // Check if URL is accessible
  useEffect(() => {
    if (!isValidUrl) return;

    const checkUrlAccessibility = async () => {
      try {
        // Try to fetch the URL to check if it's accessible
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        await fetch(appUrl, {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
      } catch (error) {
        // If fetch fails, we'll let the iframe handle it
        console.log('URL check failed, will attempt iframe load:', error);
      }
    };

    checkUrlAccessibility();
  }, [appUrl, isValidUrl]);

  const handleIframeLoad = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    setIsLoading(false);
    setHasError(true);
    setErrorType('network');
  };

  // Set a timeout for loading
  useEffect(() => {
    if (isValidUrl && isLoading) {
      loadTimeoutRef.current = window.setTimeout(() => {
        setIsLoading(false);
        setHasError(true);
        setErrorType('network');
      }, 10000);
    }

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [isLoading, isValidUrl]);

  // Listen for iframe communication errors
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handle iframe communication
      if (event.data && typeof event.data === 'object') {
        if (event.data.type === 'iframe-error') {
          setIsLoading(false);
          setHasError(true);
          setErrorType('cors');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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
              {/* Error Icon */}
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                {errorType === 'network' ? (
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                ) : errorType === 'cors' ? (
                  <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>

              {/* Error Title */}
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {errorType === 'network' && 'Demo Temporarily Unavailable'}
                {errorType === 'cors' && 'Embedding Restricted'}
                {errorType === 'notfound' && 'Demo Not Found'}
                {errorType === 'unknown' && 'Preview Unavailable'}
              </h4>

              {/* Error Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-sm">
                {errorType === 'network' && 'The demo app is currently offline or experiencing connectivity issues. Please try again later.'}
                {errorType === 'cors' && 'This demo cannot be embedded due to security restrictions, but you can view it in a new tab.'}
                {errorType === 'notfound' && 'The demo URL is invalid or the app has been moved. Please check the course details.'}
                {errorType === 'unknown' && 'The live preview couldn\'t be loaded. You can still follow the tutorial steps above.'}
              </p>

              {/* Fallback Demo */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 w-full max-w-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded text-xs text-center py-1">
                    {title} Demo
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded p-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                  📝 Interactive {title.toLowerCase()} interface would appear here
                  <br />
                  <span className="text-blue-600 dark:text-blue-400">Follow the tutorial to build it!</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isValidUrl && (
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in New Tab
                  </a>
                )}
                <button
                  onClick={() => {
                    setHasError(false);
                    setIsLoading(true);
                    if (iframeRef.current) {
                      iframeRef.current.src = iframeRef.current.src;
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={isValidUrl ? appUrl : ''}
              title={`${title} Preview`}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
            />
          )}
        </div>

        {/* Preview Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div className={`w-2 h-2 rounded-full ${
              hasError ? 'bg-red-500' : isLoading ? 'bg-yellow-500' : 'bg-green-500'
            }`}></div>
            {hasError ? 'Demo Offline' : isLoading ? 'Loading...' : 'Live Demo'}
          </div>
          {isValidUrl && (
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Open Full Screen →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
















