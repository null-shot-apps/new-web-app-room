'use client';

import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { CourseHeader } from '@/components/CourseHeader';
import { TutorialSteps } from '@/components/TutorialSteps';
import { AppPreview } from '@/components/AppPreview';
import { CourseQuiz } from '@/components/CourseQuiz';
import { Course } from '@/types';

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourse();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/courses/${id}`);
      const data = await response.json() as { error?: string; course: Course };

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch course');
      }

      setCourse(data.course);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="bg-white dark:bg-gray-800 h-32"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg h-32"></div>
                <div className="bg-white dark:bg-gray-800 rounded-lg h-96"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg h-96"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Course Not Found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {error ? 'There was an error loading the course.' : 'The requested course could not be found.'}
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Course Header */}
      <CourseHeader course={course} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tutorial Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Course Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {course.overview}
              </p>
            </div>

            {/* Tutorial Steps */}
            <TutorialSteps steps={course.steps} />

            {/* Quiz Section */}
            <CourseQuiz quiz={course.quiz} />
          </div>

          {/* Right Column - App Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <AppPreview appUrl={course.appUrl} title={course.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






