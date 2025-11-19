import Link from "next/link";
import { notFound } from "next/navigation";

// Course data - in a real app this would come from a database
const courseData = {
  'todo-list': {
    title: 'Simple Todo List',
    description: 'Learn to build a functional todo list application from scratch. This tutorial covers essential concepts like state management, user interactions, and modern UI design patterns.',
    difficulty: 'Beginner',
    duration: '30 min',
    steps: 5,
    learningPoints: [
      'Adding and managing dynamic content',
      'Handling user input and form submissions',
      'State management with React hooks',
      'Creating interactive UI components',
      'Modern CSS styling techniques'
    ],
    prompts: [
      {
        id: 1,
        prompt: "Create a simple todo list app with the ability to add new tasks",
        description: "Initial setup with basic add functionality"
      },
      {
        id: 2,
        prompt: "Add the ability to mark tasks as complete with a checkbox",
        description: "Implementing task completion state"
      },
      {
        id: 3,
        prompt: "Add a delete button to remove tasks from the list",
        description: "Adding task removal functionality"
      },
      {
        id: 4,
        prompt: "Style the todo list to look modern and clean",
        description: "Improving the visual design and user experience"
      },
      {
        id: 5,
        prompt: "Add a counter showing total tasks and completed tasks",
        description: "Adding progress tracking features"
      }
    ]
  }
};

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = courseData[params.courseId as keyof typeof courseData];
  
  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with CTA */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                ← Back to Tutorials
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {course.title} Tutorial
              </h1>
            </div>
            <Link
              href="https://nullshot.ai/jam/4189c980-2b37-487c-916c-c82e7863ff2d/thread/2ccc3850-f377-4276-9520-ea9d62c79362"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Go to Jam</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tutorial Overview and Prompts */}
          <div className="lg:col-span-1 space-y-8">
            {/* Tutorial Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Tutorial Overview
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {course.difficulty}
                  </span>
                  <span>{course.duration}</span>
                  <span>{course.steps} steps</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {course.description}
                </p>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">What you&apos;ll learn:</h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {course.learningPoints.map((point, index) => (
                      <li key={index}>• {point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Tutorial Prompts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Tutorial Prompts
              </h2>
              <div className="space-y-4">
                {course.prompts.map((prompt, index) => (
                  <div
                    key={prompt.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          &ldquo;{prompt.prompt}&rdquo;
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {prompt.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Pro tip:</strong> These are the exact prompts used to build this tutorial. Try using similar prompts in your own projects!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - App Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Live Preview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Embedded App Preview */}
              <div className="relative">
                <iframe 
                  src="https://google.com"
                  className="w-full h-[600px] border-0"
                  title="Live Preview"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







