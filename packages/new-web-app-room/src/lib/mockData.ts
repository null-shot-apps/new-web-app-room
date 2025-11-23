import { Course, Jam, Tutorial, Quiz } from '@/types';

// Mock Jams
export const mockJams: Jam[] = [
  {
    id: 'jam-1',
    url: 'https://nullshot.com/jam/simple-todo-app',
    title: 'Simple Todo List App',
    description: 'Building a clean, functional todo list with React and local storage',
    author: 'Alex Chen',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isPublic: true,
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Local Storage'],
    difficulty: 'beginner',
    projectType: 'Web App',
    thumbnailUrl: '/images/todo-app-thumb.jpg',
    demoUrl: 'https://demo.nullshot.com/todo-app',
    status: 'processed'
  },
  {
    id: 'jam-2',
    url: 'https://nullshot.com/jam/weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Real-time weather app with location detection and 5-day forecast',
    author: 'Sarah Kim',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    isPublic: true,
    techStack: ['Next.js', 'TypeScript', 'OpenWeather API', 'Geolocation'],
    difficulty: 'intermediate',
    projectType: 'Web App',
    thumbnailUrl: '/images/weather-dashboard-thumb.jpg',
    demoUrl: 'https://demo.nullshot.com/weather-dashboard',
    status: 'processed'
  },
  {
    id: 'jam-3',
    url: 'https://nullshot.com/jam/expense-tracker',
    title: 'Personal Expense Tracker',
    description: 'Track expenses with categories, charts, and monthly reports',
    author: 'Mike Rodriguez',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    isPublic: true,
    techStack: ['React', 'Chart.js', 'IndexedDB', 'PWA'],
    difficulty: 'intermediate',
    projectType: 'Web App',
    thumbnailUrl: '/images/expense-tracker-thumb.jpg',
    demoUrl: 'https://demo.nullshot.com/expense-tracker',
    status: 'processed'
  },
  {
    id: 'jam-4',
    url: 'https://nullshot.com/jam/chat-app',
    title: 'Real-time Chat Application',
    description: 'WebSocket-powered chat with rooms, user authentication, and emoji support',
    author: 'Emma Thompson',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    isPublic: true,
    techStack: ['Node.js', 'Socket.io', 'Express', 'MongoDB'],
    difficulty: 'advanced',
    projectType: 'Full Stack',
    thumbnailUrl: '/images/chat-app-thumb.jpg',
    demoUrl: 'https://demo.nullshot.com/chat-app',
    status: 'processed'
  },
  {
    id: 'jam-5',
    url: 'https://nullshot.com/jam/recipe-finder',
    title: 'Recipe Finder & Meal Planner',
    description: 'Search recipes, save favorites, and plan weekly meals with shopping lists',
    author: 'David Park',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    isPublic: true,
    techStack: ['Vue.js', 'Vuex', 'Recipe API', 'Local Storage'],
    difficulty: 'intermediate',
    projectType: 'Web App',
    thumbnailUrl: '/images/recipe-finder-thumb.jpg',
    demoUrl: 'https://demo.nullshot.com/recipe-finder',
    status: 'processed'
  },
  {
    id: 'jam-6',
    url: 'https://nullshot.com/jam/portfolio-generator',
    title: 'Dynamic Portfolio Generator',
    description: 'Create beautiful developer portfolios with customizable themes and sections',
    author: 'Lisa Wang',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    isPublic: true,
    techStack: ['React', 'Styled Components', 'GitHub API', 'Netlify'],
    difficulty: 'beginner',
    projectType: 'Web App',
    thumbnailUrl: '/images/portfolio-generator-thumb.jpg',
    demoUrl: 'https://demo.nullshot.com/portfolio-generator',
    status: 'processed'
  }
];

// Mock Tutorials
export const mockTutorials: Tutorial[] = [
  {
    id: 'tutorial-1',
    jamId: 'jam-1',
    title: 'Building a Simple Todo List App',
    description: 'Learn to create a functional todo list with React, TypeScript, and local storage persistence.',
    overview: 'In this tutorial, you\'ll build a complete todo application from scratch. We\'ll cover React hooks, TypeScript interfaces, local storage integration, and responsive design with Tailwind CSS.',
    steps: [
      {
        id: 'step-1-1',
        tutorialId: 'tutorial-1',
        sequence: 1,
        title: 'Project Setup and Structure',
        content: 'Set up a new React project with TypeScript and configure Tailwind CSS for styling.',
        codeExample: 'npx create-react-app todo-app --template typescript',
        explanation: 'We start by creating a new React project with TypeScript support to ensure type safety throughout our application.',
        relatedPromptIds: ['prompt-1-1', 'prompt-1-2']
      },
      {
        id: 'step-1-2',
        tutorialId: 'tutorial-1',
        sequence: 2,
        title: 'Define Todo Interface and State',
        content: 'Create TypeScript interfaces for our todo items and set up the main component state.',
        codeExample: `interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}`,
        explanation: 'Defining clear interfaces helps us maintain type safety and makes our code more maintainable.',
        relatedPromptIds: ['prompt-1-3', 'prompt-1-4']
      }
    ],
    estimatedTime: 45,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    jamId: 'jam-1',
    tutorialId: 'tutorial-1',
    quizId: 'quiz-1',
    title: 'Simple Todo List App',
    shortDescription: 'Build a clean, functional todo list with React and local storage',
    thumbnailUrl: '/images/todo-app-thumb.jpg',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Beginner'],
    difficulty: 'beginner',
    estimatedTime: 45,
    isPublished: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'course-2',
    jamId: 'jam-2',
    tutorialId: 'tutorial-2',
    quizId: 'quiz-2',
    title: 'Weather Dashboard',
    shortDescription: 'Real-time weather app with location detection and 5-day forecast',
    thumbnailUrl: '/images/weather-dashboard-thumb.jpg',
    category: 'Frontend',
    tags: ['Next.js', 'API Integration', 'Intermediate'],
    difficulty: 'intermediate',
    estimatedTime: 90,
    isPublished: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'course-3',
    jamId: 'jam-3',
    tutorialId: 'tutorial-3',
    quizId: 'quiz-3',
    title: 'Personal Expense Tracker',
    shortDescription: 'Track expenses with categories, charts, and monthly reports',
    thumbnailUrl: '/images/expense-tracker-thumb.jpg',
    category: 'Frontend',
    tags: ['React', 'Charts', 'PWA'],
    difficulty: 'intermediate',
    estimatedTime: 120,
    isPublished: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: 'course-4',
    jamId: 'jam-4',
    tutorialId: 'tutorial-4',
    quizId: 'quiz-4',
    title: 'Real-time Chat Application',
    shortDescription: 'WebSocket-powered chat with rooms, user authentication, and emoji support',
    thumbnailUrl: '/images/chat-app-thumb.jpg',
    category: 'Full Stack',
    tags: ['Node.js', 'Socket.io', 'Advanced'],
    difficulty: 'advanced',
    estimatedTime: 180,
    isPublished: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: 'course-5',
    jamId: 'jam-5',
    tutorialId: 'tutorial-5',
    quizId: 'quiz-5',
    title: 'Recipe Finder & Meal Planner',
    shortDescription: 'Search recipes, save favorites, and plan weekly meals with shopping lists',
    thumbnailUrl: '/images/recipe-finder-thumb.jpg',
    category: 'Frontend',
    tags: ['Vue.js', 'API Integration', 'Intermediate'],
    difficulty: 'intermediate',
    estimatedTime: 100,
    isPublished: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: 'course-6',
    jamId: 'jam-6',
    tutorialId: 'tutorial-6',
    quizId: 'quiz-6',
    title: 'Dynamic Portfolio Generator',
    shortDescription: 'Create beautiful developer portfolios with customizable themes and sections',
    thumbnailUrl: '/images/portfolio-generator-thumb.jpg',
    category: 'Frontend',
    tags: ['React', 'GitHub API', 'Beginner'],
    difficulty: 'beginner',
    estimatedTime: 60,
    isPublished: true,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20')
  }
];

// Helper function to get course with related data
export function getCourseWithData(courseId: string) {
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) return null;

  const jam = mockJams.find(j => j.id === course.jamId);
  const tutorial = mockTutorials.find(t => t.id === course.tutorialId);

  return {
    course,
    jam,
    tutorial
  };
}

// Helper function to get courses by category
export function getCoursesByCategory(category?: string) {
  if (!category) return mockCourses;
  return mockCourses.filter(course => course.category === category);
}

// Helper function to get courses by difficulty
export function getCoursesByDifficulty(difficulty?: string) {
  if (!difficulty) return mockCourses;
  return mockCourses.filter(course => course.difficulty === difficulty);
}
