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
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gradient-to-r from-cyan-200 to-blue-200 dark:from-cyan-700 dark:to-blue-700 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              🖥️ Live Preview
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Interactive demo of the final application
          </p>
        </div>

        <div className="p-6">
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden h-96 min-h-[400px] shadow-inner border-2 border-gray-200 dark:border-gray-600">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-700 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-gray-700 dark:text-gray-300">🚀 Loading Preview...</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Preparing your interactive demo</p>
                </div>
              </div>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
              {/* Error Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                {errorType === 'network' ? (
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                ) : errorType === 'cors' ? (
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 mb-6 w-full max-w-sm border-2 border-gray-200 dark:border-gray-600 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse delay-200"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-400"></div>
                  <div className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-lg text-xs text-center py-2 font-medium">
                    {title} Demo
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400 text-center border border-gray-200 dark:border-gray-600">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="font-medium mb-1">Interactive {title.toLowerCase()} interface would appear here</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold">Follow the tutorial to build it!</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isValidUrl && (
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="mt-6 flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full shadow-lg ${
                hasError ? 'bg-red-500 animate-pulse' : isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 animate-pulse'
              }`}></div>
              <span className={`text-sm font-medium ${
                hasError ? 'text-red-600 dark:text-red-400' : 
                isLoading ? 'text-yellow-600 dark:text-yellow-400' : 
                'text-green-600 dark:text-green-400'
              }`}>
                {hasError ? '🔴 Demo Offline' : isLoading ? '🟡 Loading...' : '🟢 Live Demo'}
              </span>
            </div>
            {isValidUrl && (
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold transition-colors duration-300 group"
              >
                <span>Open Full Screen</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}






















