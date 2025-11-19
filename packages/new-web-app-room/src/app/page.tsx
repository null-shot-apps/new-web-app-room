import Link from "next/link";

// Sample course data - in a real app this would come from a database
const courses = [
  {
    id: 'todo-list',
    title: 'Simple Todo List',
    description: 'Learn to build a functional todo list with add, complete, and delete features. Perfect for beginners to understand state management and user interactions.',
    difficulty: 'Beginner',
    duration: '30 min',
    tags: ['React', 'State Management', 'UI/UX']
  },
  // Placeholder for future courses
  {
    id: 'weather-app',
    title: 'Weather Dashboard',
    description: 'Build a beautiful weather app that fetches real-time data and displays forecasts with interactive charts.',
    difficulty: 'Intermediate',
    duration: '45 min',
    tags: ['API Integration', 'Charts', 'Responsive Design'],
    comingSoon: true
  },
  {
    id: 'chat-app',
    title: 'Real-time Chat',
    description: 'Create a live chat application with user authentication, message history, and real-time updates.',
    difficulty: 'Advanced',
    duration: '60 min',
    tags: ['WebSockets', 'Authentication', 'Database'],
    comingSoon: true
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tutorial Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Interactive coding tutorials you can explore and learn from
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {courses.filter(c => !c.comingSoon).length} tutorials available
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                course.comingSoon ? 'opacity-75' : 'hover:scale-105'
              }`}
            >
              {/* Course Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {course.difficulty}
                      </span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  {course.comingSoon && (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                      Coming Soon
                    </span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {course.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                {course.comingSoon ? (
                  <button
                    disabled
                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 py-3 px-4 rounded-lg font-medium cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <Link
                    href={`/course/${course.id}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-colors duration-200"
                  >
                    Start Tutorial
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Each tutorial includes step-by-step guidance, the actual prompts used, and a live preview of the final result.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/course/todo-list"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                Try the Todo List Tutorial
              </Link>
              <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200">
                Browse All Tutorials
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

