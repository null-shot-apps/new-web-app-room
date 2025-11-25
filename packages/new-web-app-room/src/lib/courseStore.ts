import { Course } from '@/types';

// In-memory store for demo purposes
// In a real app, this would be a database
class CourseStore {
  private courses: Course[] = [
    {
      id: '1',
      title: 'Simple Todo List',
      description: 'Learn the basics of React state management and CRUD operations by building a todo app from scratch.',
      difficulty: 'beginner',
      techStack: ['React', 'TypeScript', 'Tailwind'],
      jamUrl: 'https://jam.nullshot.dev/todo-example',
      duration: '45 min',
      overview: 'In this tutorial, you\'ll build a fully functional todo list application. You\'ll learn how to manage component state, handle user input, implement CRUD operations, and style your app with Tailwind CSS. This is perfect for beginners who want to understand React fundamentals through a practical project.',
      appUrl: 'https://codesandbox.io/embed/react-todo-app-typescript-forked-8x9kj?fontsize=14&hidenavigation=1&theme=dark&view=preview',
      isDefault: true,
      createdAt: '2024-01-01T00:00:00Z',
      steps: [
        {
          id: 1,
          title: 'Project Setup',
          description: 'Initialize the React project and install dependencies',
          code: 'npx create-react-app todo-app --template typescript',
          explanation: 'We start by creating a new React project with TypeScript support for better type safety.'
        },
        {
          id: 2,
          title: 'Create Todo Interface',
          description: 'Define the TypeScript interface for our todo items',
          code: `interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}`,
          explanation: 'Defining clear interfaces helps us maintain type safety throughout our application.'
        },
        {
          id: 3,
          title: 'State Management',
          description: 'Set up React state to manage our todo list',
          code: `const [todos, setTodos] = useState<Todo[]>([]);
const [inputValue, setInputValue] = useState('');`,
          explanation: 'We use React hooks to manage both our todo list and the input field state.'
        },
        {
          id: 4,
          title: 'Add Todo Function',
          description: 'Implement the function to add new todos',
          code: `const addTodo = () => {
  if (inputValue.trim()) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date()
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  }
};`,
          explanation: 'This function creates a new todo item and adds it to our state array.'
        }
      ],
      quiz: [
        {
          id: 1,
          question: 'What React hook is used to manage component state?',
          options: ['useEffect', 'useState', 'useContext', 'useReducer'],
          correctAnswer: 1,
          explanation: 'useState is the primary hook for managing local component state in React.'
        },
        {
          id: 2,
          question: 'Why do we use the spread operator (...) when updating the todos array?',
          options: [
            'To make the code shorter',
            'To avoid mutating the original array',
            'To improve performance',
            'To add TypeScript support'
          ],
          correctAnswer: 1,
          explanation: 'React requires immutable updates to state. The spread operator creates a new array instead of modifying the existing one.'
        }
      ]
    },
    {
      id: '2',
      title: 'Weather Dashboard',
      description: 'Build a beautiful weather app with API integration, geolocation, and responsive design.',
      difficulty: 'intermediate',
      techStack: ['React', 'TypeScript', 'API Integration', 'Tailwind'],
      jamUrl: 'https://jam.nullshot.dev/weather-dashboard',
      duration: '75 min',
      overview: 'Create a comprehensive weather dashboard that fetches real-time weather data, displays forecasts, and uses geolocation. You\'ll learn API integration, error handling, responsive design, and modern React patterns.',
      appUrl: 'https://codesandbox.io/embed/weather-app-react-typescript-forked-9k2l3?fontsize=14&hidenavigation=1&theme=dark&view=preview',
      isDefault: true,
      createdAt: '2024-01-02T00:00:00Z',
      steps: [
        {
          id: 1,
          title: 'API Setup',
          description: 'Configure weather API and environment variables',
          code: 'const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;',
          explanation: 'We securely store API keys in environment variables for security.'
        },
        {
          id: 2,
          title: 'Fetch Weather Data',
          description: 'Create functions to fetch weather information',
          code: `const fetchWeather = async (city: string) => {
  const response = await fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}\`);
  return response.json();
};`,
          explanation: 'This function makes API calls to get current weather data for any city.'
        }
      ],
      quiz: [
        {
          id: 1,
          question: 'Why should API keys be stored in environment variables?',
          options: ['For better performance', 'For security reasons', 'To make code shorter', 'For TypeScript support'],
          correctAnswer: 1,
          explanation: 'Environment variables keep sensitive information like API keys secure and out of your source code.'
        }
      ]
    },
    {
      id: '3',
      title: 'E-commerce Store',
      description: 'Build a full-featured online store with cart functionality, payment integration, and admin panel.',
      difficulty: 'advanced',
      techStack: ['Next.js', 'TypeScript', 'Stripe', 'Database', 'Authentication'],
      jamUrl: 'https://jam.nullshot.dev/ecommerce-store',
      duration: '180 min',
      overview: 'Develop a complete e-commerce solution with product catalog, shopping cart, user authentication, payment processing, and order management. This advanced tutorial covers full-stack development with modern tools.',
      appUrl: 'https://codesandbox.io/embed/ecommerce-nextjs-typescript-forked-7h8k9?fontsize=14&hidenavigation=1&theme=dark&view=preview',
      isDefault: true,
      createdAt: '2024-01-03T00:00:00Z',
      steps: [
        {
          id: 1,
          title: 'Next.js Setup',
          description: 'Initialize Next.js project with TypeScript and Tailwind',
          code: 'npx create-next-app@latest ecommerce-store --typescript --tailwind --eslint',
          explanation: 'Next.js provides server-side rendering and excellent developer experience for React applications.'
        },
        {
          id: 2,
          title: 'Database Schema',
          description: 'Design the database schema for products and orders',
          code: `interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
}`,
          explanation: 'A well-designed schema is crucial for scalable e-commerce applications.'
        }
      ],
      quiz: [
        {
          id: 1,
          question: 'What is the main advantage of Next.js over Create React App?',
          options: ['Better styling', 'Server-side rendering', 'Smaller bundle size', 'Easier setup'],
          correctAnswer: 1,
          explanation: 'Next.js provides server-side rendering, which improves SEO and initial page load performance.'
        }
      ]
    },
    {
      id: '4',
      title: 'Chat Application',
      description: 'Create a real-time chat app with WebSocket connections, user authentication, and message history.',
      difficulty: 'intermediate',
      techStack: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      jamUrl: 'https://jam.nullshot.dev/chat-app',
      duration: '120 min',
      overview: 'Build a modern chat application with real-time messaging, user presence indicators, typing indicators, and persistent message history. Learn WebSocket programming and real-time communication.',
      appUrl: 'https://codesandbox.io/embed/chat-app-socketio-react-forked-5m6n7?fontsize=14&hidenavigation=1&theme=dark&view=preview',
      isDefault: true,
      createdAt: '2024-01-04T00:00:00Z',
      steps: [
        {
          id: 1,
          title: 'Socket.io Setup',
          description: 'Configure WebSocket connection for real-time communication',
          code: `import io from 'socket.io-client';
const socket = io('http://localhost:3001');`,
          explanation: 'Socket.io enables real-time bidirectional communication between client and server.'
        }
      ],
      quiz: [
        {
          id: 1,
          question: 'What protocol does Socket.io use for real-time communication?',
          options: ['HTTP', 'WebSocket', 'TCP', 'UDP'],
          correctAnswer: 1,
          explanation: 'Socket.io primarily uses WebSocket protocol for real-time communication, with fallbacks for older browsers.'
        }
      ]
    },
    {
      id: '5',
      title: 'Portfolio Website',
      description: 'Design and build a stunning personal portfolio with animations, dark mode, and responsive design.',
      difficulty: 'beginner',
      techStack: ['React', 'Tailwind', 'Framer Motion', 'TypeScript'],
      jamUrl: 'https://jam.nullshot.dev/portfolio-site',
      duration: '90 min',
      overview: 'Create a professional portfolio website that showcases your projects and skills. Learn modern design principles, animations with Framer Motion, and responsive layouts.',
      appUrl: 'https://codesandbox.io/embed/portfolio-react-framer-motion-forked-4k5l6?fontsize=14&hidenavigation=1&theme=dark&view=preview',
      isDefault: true,
      createdAt: '2024-01-05T00:00:00Z',
      steps: [
        {
          id: 1,
          title: 'Layout Structure',
          description: 'Create the main layout components and navigation',
          code: `const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};`,
          explanation: 'A consistent layout structure provides the foundation for your portfolio design.'
        }
      ],
      quiz: [
        {
          id: 1,
          question: 'What is Framer Motion used for in React applications?',
          options: ['State management', 'Animations and transitions', 'API calls', 'Routing'],
          correctAnswer: 1,
          explanation: 'Framer Motion is a popular library for creating smooth animations and transitions in React applications.'
        }
      ]
    }
  ];

  getAllCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  updateCourse(id: string, updates: Partial<Course>): boolean {
    const index = this.courses.findIndex(course => course.id === id);
    if (index !== -1) {
      this.courses[index] = { ...this.courses[index], ...updates };
      return true;
    }
    return false;
  }

  deleteCourse(id: string): boolean {
    const index = this.courses.findIndex(course => course.id === id);
    if (index !== -1) {
      this.courses.splice(index, 1);
      return true;
    }
    return false;
  }

  getCoursesByTechStack(techStack: string): Course[] {
    return this.courses.filter(course => 
      course.techStack.some(tech => 
        tech.toLowerCase().includes(techStack.toLowerCase())
      )
    );
  }

  getCoursesByDifficulty(difficulty: string): Course[] {
    return this.courses.filter(course => course.difficulty === difficulty);
  }
}

// Export singleton instance
export const courseStore = new CourseStore();


