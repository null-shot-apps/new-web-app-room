import { CourseGrid } from '@/components/CourseGrid';
import { AddJamForm } from '@/components/AddJamForm';
import { mockCourses } from '@/lib/mockData';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Nullshot Jam Academy
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Learn from real AI-assisted development sessions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <AddJamForm />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Transform Jam Sessions into Structured Learning
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how real developers build applications with AI assistance. 
            Each course is generated from actual Nullshot Jam sessions, complete with 
            step-by-step tutorials and interactive quizzes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {mockCourses.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Courses Available</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              12+
            </div>
            <div className="text-gray-600 dark:text-gray-300">Tech Stacks Covered</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-300">Real-World Projects</div>
          </div>
        </div>

        {/* Course Grid */}
        <CourseGrid courses={mockCourses} />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>&copy; 2024 Nullshot Jam Academy. Powered by real AI development sessions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

