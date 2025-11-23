import { CourseGrid } from "@/components/CourseGrid";
import { AddJamForm } from "@/components/AddJamForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Nullshot Jam Tutorials
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Learn from real coding sessions - structured tutorials from public Jams
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                For developers & AI-assisted builders
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Jam Section */}
        <div className="mb-8">
          <AddJamForm />
        </div>

        {/* Course Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Available Courses
            </h2>
            <div className="flex items-center space-x-4">
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                <option value="">All Tech Stacks</option>
                <option value="react">React</option>
                <option value="nextjs">Next.js</option>
                <option value="vue">Vue</option>
                <option value="python">Python</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <CourseGrid />
        </div>
      </main>
    </div>
  );
}



