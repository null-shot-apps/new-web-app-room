'use client';

import { Tutorial, Jam } from '@/types';
import { useState } from 'react';

interface TutorialViewProps {
  tutorial: Tutorial;
  jam: Jam;
}

export function TutorialView({ tutorial, jam }: TutorialViewProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set(['step-1-1'])); // First step expanded by default

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const toggleStepExpansion = (stepId: string) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const progressPercentage = (completedSteps.size / tutorial.steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tutorial Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {tutorial.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {tutorial.description}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress: {completedSteps.size} of {tutorial.steps.length} steps completed
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Tutorial Overview */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Overview</h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            {tutorial.overview}
          </p>
        </div>
      </div>

      {/* Tutorial Steps */}
      <div className="space-y-4">
        {tutorial.steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isExpanded = expandedSteps.has(step.id);
          
          return (
            <div key={step.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {/* Step Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => toggleStepExpansion(step.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Step Number/Checkmark */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.sequence
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Step {step.sequence} of {tutorial.steps.length}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStepComplete(step.id);
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        isCompleted
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {isCompleted ? 'Completed' : 'Mark Complete'}
                    </button>
                    
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="pt-6 space-y-4">
                    {/* Step Content */}
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300">
                        {step.content}
                      </p>
                    </div>

                    {/* Code Example */}
                    {step.codeExample && (
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm font-medium">Code Example</span>
                          <button 
                            onClick={() => navigator.clipboard.writeText(step.codeExample || '')}
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                            title="Copy code"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{step.codeExample}</code>
                        </pre>
                      </div>
                    )}

                    {/* Explanation */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Explanation</h4>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">
                        {step.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedSteps.size === tutorial.steps.length && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-8 text-center">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
            Congratulations! 🎉
          </h3>
          <p className="text-green-800 dark:text-green-200 mb-4">
            You've completed the tutorial! Ready to test your knowledge with the quiz?
          </p>
          <button 
            onClick={() => {
              // Switch to quiz tab - you might want to pass this as a prop
              const quizTab = document.querySelector('[data-tab="quiz"]') as HTMLButtonElement;
              quizTab?.click();
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Take the Quiz
          </button>
        </div>
      )}
    </div>
  );
}
