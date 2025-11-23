'use client';

import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface CourseQuizProps {
  quiz: QuizQuestion[];
}

export function CourseQuiz({ quiz }: CourseQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.length) * 100);

    return (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
          <div className="p-8 border-b border-gradient-to-r from-green-200 to-blue-200 dark:from-green-700 dark:to-blue-700 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                🎉 Quiz Results
              </h2>
            </div>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold mb-4 ${percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                {percentage}%
              </div>
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold shadow-lg ${
                percentage >= 70 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
                percentage >= 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                'bg-gradient-to-r from-red-400 to-pink-500'
              }`}>
                {percentage >= 70 ? '🎉 Excellent!' : percentage >= 50 ? '👍 Good Job!' : '💪 Keep Learning!'}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
                You got <span className="font-bold text-indigo-600 dark:text-indigo-400">{score}</span> out of <span className="font-bold text-indigo-600 dark:text-indigo-400">{quiz.length}</span> questions correct
              </p>
            </div>

            {/* Question Review */}
            <div className="space-y-6 mb-8">
              {quiz.map((question) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div key={question.id} className="relative group/question">
                    <div className={`absolute -inset-1 rounded-xl blur opacity-20 ${
                      isCorrect ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-pink-500'
                    }`}></div>
                    <div className="relative border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          isCorrect ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-red-400 to-pink-500'
                        }`}>
                          {isCorrect ? '✓' : '✗'}
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-relaxed">
                          {question.question}
                        </h4>
                      </div>
                      
                      <div className="space-y-3 mb-4 ml-12">
                        {question.options.map((option, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg text-sm font-medium ${
                              index === question.correctAnswer
                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-200 border-2 border-green-300 dark:border-green-600'
                                : index === userAnswer && !isCorrect
                                ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 dark:from-red-900/40 dark:to-pink-900/40 dark:text-red-200 border-2 border-red-300 dark:border-red-600'
                                : 'bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {index === question.correctAnswer && (
                                <span className="text-green-600 dark:text-green-400 font-bold">✓ Correct</span>
                              )}
                              {index === userAnswer && !isCorrect && (
                                <span className="text-red-600 dark:text-red-400 font-bold">✗ Your Answer</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="ml-12 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mt-0.5">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-bold text-blue-900 dark:text-blue-200 mb-1">💡 Explanation:</p>
                            <p className="text-blue-800 dark:text-blue-300">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retake Quiz
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz[currentQuestion];
  const selectedAnswer = selectedAnswers[question.id];

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
        <div className="p-8 border-b border-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🧠 Knowledge Check
              </h2>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                Question {currentQuestion + 1} of {quiz.length}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                {Math.round(((currentQuestion + 1) / quiz.length) * 100)}%
              </span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-relaxed">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(question.id, index)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedAnswer === index
                    ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-900 dark:text-purple-200 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    selectedAnswer === index
                      ? 'border-purple-500 bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-purple-400'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={selectedAnswer === undefined}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
            >
              <span>{currentQuestion === quiz.length - 1 ? 'Finish Quiz' : 'Next'}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





