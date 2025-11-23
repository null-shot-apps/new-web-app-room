'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Course } from '@/types';

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 dark:text-red-400 mb-4">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium">Failed to load courses</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
        </div>
        <button
          onClick={fetchCourses}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          {/* Thumbnail */}
          <div className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            {course.isDefault && (
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                {course.title}
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[course.difficulty as keyof typeof difficultyColors]}`}>
                {course.difficulty}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {course.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1 mb-4">
              {course.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>{course.duration}</span>
              <span>{course.steps.length} steps</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                href={`/course/${course.id}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md text-center transition-colors"
              >
                Start Tutorial
              </Link>
              <a
                href={course.jamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium py-2 px-4 rounded-md transition-colors"
                title="View Original Jam"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}




