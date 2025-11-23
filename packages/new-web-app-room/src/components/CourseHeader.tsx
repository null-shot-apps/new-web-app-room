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
  beginner: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg',
  intermediate: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg',
  advanced: 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg'
};

const difficultyIcons = {
  beginner: '🌱',
  intermediate: '🚀',
  advanced: '⚡'
};

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 shadow-2xl border-b border-white/20 overflow-hidden">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-100 hover:text-white font-medium transition-colors duration-300 group"
          >
            <svg className="w-4 h-4 group-hover:animate-bounce-horizontal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Courses
          </Link>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1 space-y-6">
            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg animate-text-reveal">
                {course.title}
              </h1>
              <p className="text-xl text-indigo-100 leading-relaxed max-w-3xl animate-text-reveal" style={{ animationDelay: '0.2s' }}>
                {course.description}
              </p>
            </div>

            {/* Course Meta */}
            <div className="flex flex-wrap items-center gap-4 animate-text-reveal" style={{ animationDelay: '0.4s' }}>
              <span className={`text-sm px-4 py-2 rounded-full font-bold ${difficultyColors[course.difficulty as keyof typeof difficultyColors]} transform hover:scale-110 transition-transform duration-200`}>
                {difficultyIcons[course.difficulty as keyof typeof difficultyIcons]} {course.difficulty}
              </span>
              
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-white font-medium">{course.duration}</span>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {course.techStack.map((tech, index) => {
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
                      className={`text-sm text-white font-medium px-3 py-1.5 rounded-full shadow-lg ${colors[index % colors.length]} transform hover:scale-110 transition-transform duration-200`}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* View Jam CTA */}
          <div className="lg:ml-6 animate-text-reveal" style={{ animationDelay: '0.6s' }}>
            <a
              href={course.jamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl border border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Original Jam
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-6 text-indigo-50 dark:text-gray-800" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </header>
  );
}


