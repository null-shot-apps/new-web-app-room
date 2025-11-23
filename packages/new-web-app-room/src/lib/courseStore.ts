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
      appUrl: 'https://todo-demo.nullshot.dev',
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
