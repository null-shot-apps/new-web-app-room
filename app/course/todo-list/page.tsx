import Link from 'next/link'

export default function TodoListCourse() {
  const prompts = [
    {
      id: 1,
      title: "Initial Setup",
      prompt: "Create a simple todo list app with React. I want to be able to add new tasks, mark them as complete, and delete them.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Add Styling",
      prompt: "Make the todo list look more modern with better styling. Add some colors and improve the layout.",
      timestamp: "1 hour 45 min ago"
    },
    {
      id: 3,
      title: "Add Categories",
      prompt: "Add the ability to categorize todos into different groups like 'Work', 'Personal', 'Shopping'.",
      timestamp: "1 hour 30 min ago"
    },
    {
      id: 4,
      title: "Priority Levels",
      prompt: "Add priority levels (High, Medium, Low) to each todo item with color coding.",
      timestamp: "1 hour 15 min ago"
    },
    {
      id: 5,
      title: "Due Dates",
      prompt: "Add due date functionality so users can set deadlines for their tasks.",
      timestamp: "1 hour ago"
    },
    {
      id: 6,
      title: "Local Storage",
      prompt: "Make the todos persist in local storage so they don't disappear when the page refreshes.",
      timestamp: "45 min ago"
    },
    {
      id: 7,
      title: "Search & Filter",
      prompt: "Add search functionality and filters to help users find specific todos quickly.",
      timestamp: "30 min ago"
    },
    {
      id: 8,
      title: "Final Polish",
      prompt: "Add some final touches - animations, better mobile responsiveness, and a dark mode toggle.",
      timestamp: "15 min ago"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with CTA */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back to Courses
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Todo List Tutorial</h1>
            </div>
            <a
              href="https://nullshot.ai/jam/4189c980-2b37-487c-916c-c82e7863ff2d/thread/2ccc3850-f377-4276-9520-ea9d62c79362"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Go to Jam →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Overview and Prompts */}
          <div className="space-y-8">
            {/* Tutorial Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tutorial Overview</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Learn how to build a complete todo list application from scratch using modern web development techniques. 
                  This tutorial covers everything from basic functionality to advanced features like categories, priorities, and persistence.
                </p>
                
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Difficulty</h3>
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Beginner
                    </span>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Duration</h3>
                    <span className="text-gray-700">~2 hours</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Building interactive React components
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    State management and event handling
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Local storage for data persistence
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Modern CSS styling and responsive design
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Search and filtering functionality
                  </li>
                </ul>
              </div>
            </div>

            {/* Prompts Used */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Prompts Used in This Tutorial</h2>
              <div className="space-y-4">
                {prompts.map((prompt, index) => (
                  <div key={prompt.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full">
                          Step {index + 1}
                        </span>
                        <h3 className="font-semibold text-gray-900">{prompt.title}</h3>
                      </div>
                      <span className="text-sm text-gray-500">{prompt.timestamp}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-12">
                      "{prompt.prompt}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Live Preview</h2>
                <p className="text-gray-600 text-sm mt-1">See the final result of this tutorial</p>
              </div>
              
              <div className="p-6">
                <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ height: '600px' }}>
                  <iframe
                    src="https://google.com"
                    className="w-full h-full border-0"
                    title="Todo List App Preview"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Try it yourself!</h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Click the "Go to Jam" button above to open the interactive development environment 
                    and build this todo list step by step.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">React</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">JavaScript</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">CSS</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">Local Storage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
