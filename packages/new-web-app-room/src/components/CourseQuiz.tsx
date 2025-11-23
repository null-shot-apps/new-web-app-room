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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Quiz Results
          </h2>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className={`text-4xl font-bold mb-2 ${percentage >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
              {percentage}%
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              You got {score} out of {quiz.length} questions correct
            </p>
          </div>

          {/* Question Review */}
          <div className="space-y-4 mb-6">
            {quiz.map((question) => {
              const userAnswer = selectedAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    {question.question}
                  </h4>
                  
                  <div className="space-y-2 mb-3">
                    {question.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded text-sm ${
                          index === question.correctAnswer
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : index === userAnswer && !isCorrect
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {option}
                        {index === question.correctAnswer && (
                          <span className="ml-2 text-green-600 dark:text-green-400">✓</span>
                        )}
                        {index === userAnswer && !isCorrect && (
                          <span className="ml-2 text-red-600 dark:text-red-400">✗</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              onClick={resetQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz[currentQuestion];
  const selectedAnswer = selectedAnswers[question.id];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Knowledge Check
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentQuestion + 1} of {quiz.length}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(question.id, index)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-200'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={selectedAnswer === undefined}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-6 py-2 rounded-lg transition-colors"
          >
            {currentQuestion === quiz.length - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

