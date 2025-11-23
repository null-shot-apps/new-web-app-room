'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Course } from '@/types';

const difficultyColors = {
  beginner: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg',
  intermediate: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg',
  advanced: 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg'
};

const difficultyIcons = {
  beginner: '🌱',
  intermediate: '🚀',
  advanced: '⚡'
};

export function CourseGrid() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      const data = await response.json() as { error?: string; courses: Course[] };

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch courses');
      }

      setCourses(data.courses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse"></div>
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 animate-pulse">
              <div className="h-56 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 rounded-t-2xl"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-7 w-20 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-700 dark:to-purple-700 rounded-full"></div>
                  <div className="h-7 w-24 bg-gradient-to-r from-pink-200 to-red-200 dark:from-pink-700 dark:to-red-700 rounded-full"></div>
                </div>
                <div className="h-12 bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-700 dark:to-indigo-700 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 max-w-md mx-auto">
            <div className="text-red-500 mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
            </div>
            <button
              onClick={fetchCourses}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course, index) => (
        <div
          key={course.id}
          className="group relative transform hover:scale-105 transition-all duration-500"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Animated gradient border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
            {/* Thumbnail with gradient overlay */}
            <div className="relative h-56 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 via-purple-600/80 to-pink-600/80"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium opacity-90">Interactive Tutorial</p>
                </div>
              </div>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-700"></div>
              </div>
              
              {course.isDefault && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce">
                  ⭐ Featured
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {course.title}
                </h3>
                <span className={`text-xs px-3 py-1.5 rounded-full font-bold whitespace-nowrap ${difficultyColors[course.difficulty as keyof typeof difficultyColors]}`}>
                  {difficultyIcons[course.difficulty as keyof typeof difficultyIcons]} {course.difficulty}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                {course.description}
              </p>

              {/* Tech Stack with colorful badges */}
              <div className="flex flex-wrap gap-2">
                {course.techStack.map((tech, techIndex) => {
                  const colors = [
                    'bg-gradient-to-r from-blue-500 to-cyan-500',
                    'bg-gradient-to-r from-green-500 to-emerald-500',
                    'bg-gradient-to-r from-purple-500 to-pink-500',
                    'bg-gradient-to-r from-orange-500 to-red-500',
                    'bg-gradient-to-r from-indigo-500 to-purple-500'
                  ];
                  return (
                    <span
                      key={tech}
                      className={`text-xs text-white font-medium px-3 py-1.5 rounded-full shadow-lg ${colors[techIndex % colors.length]} transform hover:scale-110 transition-transform duration-200`}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>

              {/* Stats with icons */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{course.steps.length} steps</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Link
                  href={`/course/${course.id}`}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a1 1 0 001 1h4M9 10V9a1 1 0 011-1h4a1 1 0 011 1v1M9 10H8a1 1 0 00-1 1v3a1 1 0 001 1h1m10-4h1a1 1 0 011 1v3a1 1 0 01-1 1h-1m-10 0V9a1 1 0 011-1h4a1 1 0 011 1v10M9 21h6" />
                    </svg>
                    Start Tutorial
                  </span>
                </Link>
                <a
                  href={course.jamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  title="View Original Jam"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}








