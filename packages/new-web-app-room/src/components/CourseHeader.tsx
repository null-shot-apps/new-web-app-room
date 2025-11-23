import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  techStack: string[];
  jamUrl: string;
  duration: string;
}

interface CourseHeaderProps {
  course: Course;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            ← Back to Courses
          </Link>
        </nav>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Title and Description */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {course.description}
              </p>
            </div>

            {/* Course Meta */}
            <div className="flex flex-wrap items-center gap-4">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${difficultyColors[course.difficulty as keyof typeof difficultyColors]}`}>
                {course.difficulty}
              </span>
              
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {course.duration}
              </span>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {course.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* View Jam CTA */}
          <div className="ml-6">
            <a
              href={course.jamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Original Jam
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
