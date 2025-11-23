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
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
        <div className="p-8 border-b border-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-700 dark:to-purple-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🚀 Tutorial Steps
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Follow these interactive steps to build the application from scratch
          </p>
        </div>

        <div className="divide-y divide-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-800 dark:to-purple-800">
          {steps.map((step) => (
            <div key={step.id} className="p-6 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 transition-all duration-300">
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full flex items-center justify-between text-left group/step"
              >
                <div className="flex items-center gap-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover/step:scale-110 transition-all duration-300 ${
                    expandedStep === step.id 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse-glow' 
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    {step.id}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover/step:text-indigo-600 dark:group-hover/step:text-indigo-400 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  expandedStep === step.id 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rotate-180' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 group-hover/step:bg-indigo-100 dark:group-hover/step:bg-indigo-900'
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expandedStep === step.id && (
                <div className="mt-8 ml-18 space-y-6 animate-fade-in-up">
                  {/* Code Block */}
                  <div className="relative group/code">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-xs text-gray-400 font-bold tracking-wider">💻 CODE</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(step.code)}
                          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-all duration-300 font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </button>
                      </div>
                      <pre className="text-sm text-gray-100 overflow-x-auto leading-relaxed">
                        <code className="language-javascript">{step.code}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="relative group/explanation">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-20"></div>
                    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200">
                          💡 Explanation
                        </h4>
                      </div>
                      <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
                        {step.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


