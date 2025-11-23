'use client';

import { useState } from 'react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  code: string;
  explanation: string;
}

interface TutorialStepsProps {
  steps: TutorialStep[];
}

export function TutorialSteps({ steps }: TutorialStepsProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Tutorial Steps
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Follow these steps to build the application from scratch
        </p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {steps.map((step) => (
          <div key={step.id} className="p-6">
            <button
              onClick={() => toggleStep(step.id)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                  {step.id}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedStep === step.id ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedStep === step.id && (
              <div className="mt-4 ml-12">
                {/* Code Block */}
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 font-medium">CODE</span>
                    <button
                      onClick={() => copyToClipboard(step.code)}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="text-sm text-gray-100 overflow-x-auto">
                    <code>{step.code}</code>
                  </pre>
                </div>

                {/* Explanation */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
                    Explanation
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    {step.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
