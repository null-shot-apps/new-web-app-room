import { NextRequest, NextResponse } from 'next/server';
import { courseStore } from '@/lib/courseStore';
import { Course } from '@/types';

// Mock function to simulate Jam content extraction
async function extractJamContent(jamUrl: string) {
  // In a real implementation, this would:
  // 1. Parse the Jam URL to extract the Jam ID
  // 2. Call Nullshot API or scrape the public Jam page
  // 3. Extract conversation history, prompts, and metadata
  
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract Jam ID from URL for more realistic mock data
    const jamId = extractJamIdFromUrl(jamUrl);
    
    // Simulate different project types based on URL patterns
    const projectTypes = [
      {
        title: 'Custom Todo App',
        description: 'Building a todo application with custom features',
        techStack: ['React', 'TypeScript', 'Tailwind'],
        difficulty: 'beginner' as const,
        duration: '45 min'
      },
      {
        title: 'Weather Dashboard',
        description: 'Creating a weather app with API integration',
        techStack: ['React', 'TypeScript', 'API Integration'],
        difficulty: 'intermediate' as const,
        duration: '60 min'
      },
      {
        title: 'E-commerce Store',
        description: 'Building a full-featured online store',
        techStack: ['Next.js', 'TypeScript', 'Stripe', 'Database'],
        difficulty: 'advanced' as const,
        duration: '120 min'
      }
    ];
    
    // Select project type based on jam ID hash
    const projectIndex = Math.abs(jamId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % projectTypes.length;
    const project = projectTypes[projectIndex];
    
    // For demo purposes, return mock data
    return {
      id: jamId,
      title: project.title,
      description: project.description,
      conversation: [
        { role: 'user' as const, content: `I want to build a ${project.title.toLowerCase()}` },
        { role: 'assistant' as const, content: `I'll help you create a ${project.title.toLowerCase()} with ${project.techStack.join(', ')}...` },
        { role: 'user' as const, content: 'What should we start with?' },
        { role: 'assistant' as const, content: 'Let\'s begin by setting up the project structure and installing the necessary dependencies.' }
      ],
      prompts: [
        `Create a new ${project.techStack[0]} project`,
        'Set up the basic component structure',
        'Implement core functionality',
        'Add styling and responsive design',
        'Test and optimize the application'
      ],
      techStack: project.techStack,
      difficulty: project.difficulty,
      metadata: {
        duration: project.duration,
        steps: 5
      }
    };
  } catch (error) {
    console.error('Error in extractJamContent:', error);
    throw new Error(`Failed to extract content from Jam URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper function to extract Jam ID from URL
function extractJamIdFromUrl(jamUrl: string): string {
  try {
    const url = new URL(jamUrl);
    const pathParts = url.pathname.split('/').filter(part => part.length > 0);
    
    // Handle different URL formats
    if (url.hostname.includes('jam.nullshot')) {
      // Format: jam.nullshot.ai/jam-id
      return pathParts[0] || 'default-jam';
    } else if (url.pathname.includes('/jam/')) {
      // Format: nullshot.ai/jam/jam-id or nullshot.ai/en/jam/jam-id
      const jamIndex = pathParts.indexOf('jam');
      return pathParts[jamIndex + 1] || 'default-jam';
    }
    
    // Fallback
    return pathParts[pathParts.length - 1] || 'default-jam';
  } catch (error) {
    console.error('Error extracting Jam ID:', error);
    return 'mock-jam-' + Date.now();
  }
}

// Mock function to generate tutorial from Jam content
async function generateTutorial(jamContent: any) {
  // In a real implementation, this would:
  // 1. Send the Jam content to an AI service (OpenAI, Claude, etc.)
  // 2. Generate structured tutorial steps
  // 3. Create code examples and explanations
  
  try {
    // Validate input
    if (!jamContent || !jamContent.title || !jamContent.techStack) {
      throw new Error('Invalid jam content provided for tutorial generation');
    }
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const primaryTech = jamContent.techStack[0] || 'React';
    const isAdvanced = jamContent.difficulty === 'advanced';
    const isIntermediate = jamContent.difficulty === 'intermediate';
    
    // Generate steps based on project complexity
    const baseSteps = [
      {
        id: 1,
        title: 'Project Setup',
        description: `Initialize the ${jamContent.title} project and install dependencies`,
        code: primaryTech === 'Next.js' 
          ? 'npx create-next-app@latest my-app --typescript --tailwind --eslint'
          : 'npx create-react-app my-app --template typescript',
        explanation: `We start with a ${primaryTech} template with TypeScript for better development experience and type safety.`
      },
      {
        id: 2,
        title: 'Core Component Structure',
        description: 'Build the main application components',
        code: generateComponentCode(jamContent.title, primaryTech),
        explanation: 'Define the core interfaces and create the main component with proper state management.'
      },
      {
        id: 3,
        title: 'Implement Core Functionality',
        description: 'Add the main features and business logic',
        code: generateFunctionalityCode(jamContent.title),
        explanation: 'Implement the core features that make the application functional and interactive.'
      }
    ];
    
    // Add complexity-based steps
    if (isIntermediate || isAdvanced) {
      baseSteps.push({
        id: 4,
        title: 'API Integration',
        description: 'Connect to external services and APIs',
        code: generateApiCode(jamContent.title),
        explanation: 'Integrate with external APIs to fetch and manage data dynamically.'
      });
    }
    
    if (isAdvanced) {
      baseSteps.push({
        id: 5,
        title: 'Advanced Features',
        description: 'Add authentication, database, and deployment',
        code: generateAdvancedCode(jamContent.title),
        explanation: 'Implement advanced features like user authentication, data persistence, and production deployment.'
      });
    }
    
    // Always add styling step
    baseSteps.push({
      id: baseSteps.length + 1,
      title: 'Styling and Polish',
      description: 'Add responsive design and visual enhancements',
      code: generateStylingCode(jamContent.techStack),
      explanation: 'Apply modern styling techniques to create a polished, responsive user interface.'
    });
    
    return {
      overview: `Learn to build ${jamContent.title} step by step. This ${jamContent.difficulty}-level tutorial covers ${jamContent.techStack.join(', ')} development including component creation, state management, ${isIntermediate || isAdvanced ? 'API integration, ' : ''}${isAdvanced ? 'authentication, ' : ''}and modern styling techniques.`,
      steps: baseSteps
    };
  } catch (error) {
    console.error('Error in generateTutorial:', error);
    throw new Error(`Failed to generate tutorial: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper functions for generating code examples
function generateComponentCode(title: string, tech: string): string {
  const componentName = title.replace(/\s+/g, '');
  
  if (tech === 'Next.js') {
    return `'use client';

import { useState } from 'react';

interface ${componentName}Item {
  id: string;
  name: string;
  status: 'active' | 'completed';
  createdAt: Date;
}

export default function ${componentName}() {
  const [items, setItems] = useState<${componentName}Item[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">${title}</h1>
      {/* Component content */}
    </div>
  );
}`;
  }
  
  return `import { useState } from 'react';

interface ${componentName}Item {
  id: string;
  name: string;
  status: 'active' | 'completed';
  createdAt: Date;
}

function ${componentName}() {
  const [items, setItems] = useState<${componentName}Item[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">${title}</h1>
      {/* Component content */}
    </div>
  );
}

export default ${componentName};`;
}

function generateFunctionalityCode(_title: string): string {
  return `// Core functionality implementation
const addItem = () => {
  if (inputValue.trim()) {
    const newItem = {
      id: Date.now().toString(),
      name: inputValue.trim(),
      status: 'active' as const,
      createdAt: new Date()
    };
    setItems(prev => [...prev, newItem]);
    setInputValue('');
  }
};

const toggleItem = (id: string) => {
  setItems(prev => prev.map(item => 
    item.id === id 
      ? { ...item, status: item.status === 'active' ? 'completed' : 'active' }
      : item
  ));
};

const deleteItem = (id: string) => {
  setItems(prev => prev.filter(item => item.id !== id));
};`;
}

function generateApiCode(title: string): string {
  return `// API integration example
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    setItems(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const saveItem = async (item: ${title.replace(/\s+/g, '')}Item) => {
  try {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    
    if (!response.ok) throw new Error('Failed to save');
    
    const savedItem = await response.json();
    return savedItem;
  } catch (error) {
    console.error('Failed to save item:', error);
    throw error;
  }
};`;
}

function generateAdvancedCode(title: string): string {
  return `// Advanced features implementation
import { useAuth } from '@/hooks/useAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Authentication
const { user, login, logout } = useAuth();

// Persistent storage
const [items, setItems] = useLocalStorage('${title.toLowerCase()}-items', []);

// Error boundary
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundaryComponent
      fallback={<div>Something went wrong. Please try again.</div>}
    >
      {children}
    </ErrorBoundaryComponent>
  );
};

// Performance optimization
const MemoizedItem = React.memo(({ item, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <span className={item.status === 'completed' ? 'line-through' : ''}>
        {item.name}
      </span>
      <div>
        <button onClick={() => onToggle(item.id)}>Toggle</button>
        <button onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    </div>
  );
});`;
}

function generateStylingCode(techStack: string[]): string {
  const hasTailwind = techStack.some(tech => tech.toLowerCase().includes('tailwind'));
  
  if (hasTailwind) {
    return `// Tailwind CSS styling
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        My Application
      </h1>
      
      <div className="space-y-4">
        {items.map(item => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className={
              \`text-sm font-medium \${
                item.status === 'completed' 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-900'
              }\`
            }>
              {item.name}
            </span>
            
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Toggle
              </button>
              <button className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>`;
  }
  
  return `// CSS Modules styling
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.card {
  max-width: 400px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header {
  padding: 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.2s;
}

.item:hover {
  background-color: #f8f9fa;
}`;
}

// Mock function to generate quiz questions
async function generateQuiz(jamContent: any, tutorial: any) {
  // In a real implementation, this would generate quiz questions based on the tutorial content
  
  try {
    // Validate inputs
    if (!jamContent || !tutorial || !tutorial.steps) {
      throw new Error('Invalid content provided for quiz generation');
    }
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const techStack = jamContent.techStack || ['React'];
    const difficulty = jamContent.difficulty || 'beginner';
    const primaryTech = techStack[0];
    
    // Generate questions based on tech stack and difficulty
    const questions = [];
    
    // Always include fundamental questions
    questions.push({
      id: 1,
      question: `What ${primaryTech} hook is used for managing component state?`,
      options: ['useEffect', 'useState', 'useContext', 'useReducer'],
      correctAnswer: 1,
      explanation: `useState is the primary hook for managing local component state in ${primaryTech} functional components.`
    });
    
    if (techStack.includes('TypeScript')) {
      questions.push({
        id: questions.length + 1,
        question: 'Why is TypeScript beneficial in React development?',
        options: [
          'It makes the code run faster',
          'It provides type safety and better IDE support',
          'It reduces bundle size',
          'It\'s required for React'
        ],
        correctAnswer: 1,
        explanation: 'TypeScript provides compile-time type checking and enhanced IDE features like autocomplete and refactoring.'
      });
    }
    
    if (techStack.includes('Tailwind')) {
      questions.push({
        id: questions.length + 1,
        question: 'What is the main advantage of using Tailwind CSS?',
        options: [
          'Smaller CSS file size',
          'Utility-first approach for rapid styling',
          'Better browser compatibility',
          'Automatic responsive design'
        ],
        correctAnswer: 1,
        explanation: 'Tailwind CSS uses a utility-first approach that allows for rapid prototyping and consistent design systems.'
      });
    }
    
    // Add difficulty-specific questions
    if (difficulty === 'intermediate' || difficulty === 'advanced') {
      questions.push({
        id: questions.length + 1,
        question: 'What is the purpose of the useEffect hook?',
        options: [
          'To manage component state',
          'To handle side effects and lifecycle events',
          'To create custom hooks',
          'To optimize component performance'
        ],
        correctAnswer: 1,
        explanation: 'useEffect is used to handle side effects like API calls, subscriptions, and cleanup in functional components.'
      });
    }
    
    if (difficulty === 'advanced') {
      questions.push({
        id: questions.length + 1,
        question: 'Which pattern is best for managing complex application state?',
        options: [
          'Multiple useState hooks',
          'useReducer with context',
          'Global variables',
          'Local storage only'
        ],
        correctAnswer: 1,
        explanation: 'useReducer combined with Context API provides a scalable solution for complex state management in React applications.'
      });
      
      questions.push({
        id: questions.length + 1,
        question: 'What is the benefit of code splitting in React applications?',
        options: [
          'Easier debugging',
          'Reduced initial bundle size and faster loading',
          'Better SEO',
          'Improved type safety'
        ],
        correctAnswer: 1,
        explanation: 'Code splitting allows you to split your bundle into smaller chunks, reducing the initial load time and improving performance.'
      });
    }
    
    // Add a project-specific question based on the tutorial
    if (tutorial.steps && tutorial.steps.length > 0) {
      const firstStep = tutorial.steps[0];
      questions.push({
        id: questions.length + 1,
        question: `According to the tutorial, what is the first step in building ${jamContent.title}?`,
        options: [
          'Writing tests',
          firstStep.title,
          'Deploying to production',
          'Creating documentation'
        ],
        correctAnswer: 1,
        explanation: `The tutorial starts with "${firstStep.title}" to establish a solid foundation for the project.`
      });
    }
    
    // Ensure we have at least 4 questions and at most 6
    const finalQuestions = questions.slice(0, 6);
    if (finalQuestions.length < 4) {
      // Add generic questions to reach minimum
      finalQuestions.push({
        id: finalQuestions.length + 1,
        question: 'What is a key principle of React development?',
        options: [
          'Always use class components',
          'Components should be reusable and composable',
          'Avoid using hooks',
          'Write all logic in one component'
        ],
        correctAnswer: 1,
        explanation: 'React emphasizes building reusable, composable components that can be combined to create complex UIs.'
      });
    }
    
    return finalQuestions;
  } catch (error) {
    console.error('Error in generateQuiz:', error);
    throw new Error(`Failed to generate quiz questions: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Step 1: Parse and validate request body
    let body;
    try {
      body = await request.json() as { jamUrl: string };
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body. Expected JSON with jamUrl field.' },
        { status: 400 }
      );
    }

    let jamUrl = body.jamUrl;

    if (!jamUrl) {
      return NextResponse.json(
        { error: 'Jam URL is required' },
        { status: 400 }
      );
    }

    // Step 2: Normalize and validate URL
    try {
      jamUrl = jamUrl.trim();
      
      // Remove any trailing slashes and query parameters for validation
      const cleanUrl = jamUrl.split('?')[0].replace(/\/$/, '');
      
      // Flexible URL validation - accept various Nullshot Jam URL formats
      const validPatterns = [
        /^https?:\/\/jam\.nullshot\.ai\/[^\/\s]+$/i,
        /^https?:\/\/nullshot\.ai\/jam\/[^\/\s]+$/i,
        /^https?:\/\/nullshot\.ai\/en\/jam\/[^\/\s]+$/i,
        /^https?:\/\/jam\.nullshot\.dev\/[^\/\s]+$/i,
        /^https?:\/\/nullshot\.dev\/jam\/[^\/\s]+$/i
      ];

      const isValidUrl = validPatterns.some(pattern => pattern.test(cleanUrl));

      if (!isValidUrl) {
        console.error('Invalid URL format:', jamUrl);
        return NextResponse.json(
          { 
            error: 'Invalid Jam URL format. Please provide a valid Nullshot Jam URL.',
            details: 'Supported formats: jam.nullshot.ai/id, nullshot.ai/jam/id, nullshot.ai/en/jam/id'
          },
          { status: 400 }
        );
      }
    } catch (urlError) {
      console.error('URL validation error:', urlError);
      return NextResponse.json(
        { error: 'Failed to validate URL format.' },
        { status: 400 }
      );
    }

    // Step 3: Extract Jam content
    let jamContent;
    try {
      console.log('Extracting Jam content from:', jamUrl);
      jamContent = await extractJamContent(jamUrl);
      
      if (!jamContent || !jamContent.id || !jamContent.title) {
        throw new Error('Invalid Jam content structure');
      }
    } catch (extractError) {
      console.error('Failed to extract Jam content:', extractError);
      return NextResponse.json(
        { 
          error: 'Failed to extract content from Jam URL. Please verify the URL is accessible and public.',
          details: extractError instanceof Error ? extractError.message : 'Unknown extraction error'
        },
        { status: 422 }
      );
    }

    // Step 4: Generate tutorial
    let tutorial;
    try {
      console.log('Generating tutorial for:', jamContent.title);
      tutorial = await generateTutorial(jamContent);
      
      if (!tutorial || !tutorial.overview || !Array.isArray(tutorial.steps)) {
        throw new Error('Invalid tutorial structure generated');
      }
    } catch (tutorialError) {
      console.error('Failed to generate tutorial:', tutorialError);
      return NextResponse.json(
        { 
          error: 'Failed to generate tutorial content.',
          details: tutorialError instanceof Error ? tutorialError.message : 'Unknown tutorial generation error'
        },
        { status: 500 }
      );
    }

    // Step 5: Generate quiz
    let quiz;
    try {
      console.log('Generating quiz questions...');
      quiz = await generateQuiz(jamContent, tutorial);
      
      if (!Array.isArray(quiz) || quiz.length === 0) {
        throw new Error('No quiz questions generated');
      }
    } catch (quizError) {
      console.error('Failed to generate quiz:', quizError);
      return NextResponse.json(
        { 
          error: 'Failed to generate quiz questions.',
          details: quizError instanceof Error ? quizError.message : 'Unknown quiz generation error'
        },
        { status: 500 }
      );
    }

    // Step 6: Create and validate course object
    let course: Course;
    try {
      course = {
        id: jamContent.id,
        title: jamContent.title,
        description: jamContent.description,
        difficulty: jamContent.difficulty as 'beginner' | 'intermediate' | 'advanced',
        techStack: jamContent.techStack || [],
        jamUrl: jamUrl,
        duration: jamContent.metadata?.duration || '30 min',
        overview: tutorial.overview,
        steps: tutorial.steps,
        quiz: quiz,
        appUrl: `https://demo.nullshot.dev/${jamContent.id}`,
        createdAt: new Date().toISOString()
      };

      // Validate required fields
      const requiredFields = ['id', 'title', 'description', 'difficulty', 'techStack', 'jamUrl', 'duration', 'overview', 'steps', 'quiz'];
      const missingFields = requiredFields.filter(field => !course[field as keyof Course]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required course fields: ${missingFields.join(', ')}`);
      }
    } catch (courseError) {
      console.error('Failed to create course object:', courseError);
      return NextResponse.json(
        { 
          error: 'Failed to create course structure.',
          details: courseError instanceof Error ? courseError.message : 'Unknown course creation error'
        },
        { status: 500 }
      );
    }

    // Step 7: Save course to store
    try {
      courseStore.addCourse(course);
      console.log('Course generated and saved successfully:', course.title);
    } catch (storeError) {
      console.error('Failed to save course to store:', storeError);
      return NextResponse.json(
        { 
          error: 'Failed to save course. Please try again.',
          details: storeError instanceof Error ? storeError.message : 'Unknown storage error'
        },
        { status: 500 }
      );
    }

    // Step 8: Return success response
    return NextResponse.json({
      success: true,
      course: course,
      message: 'Tutorial generated successfully!'
    });

  } catch (error) {
    // Catch-all error handler
    console.error('Unexpected error in POST /api/jam/process:', error);
    
    // Don't expose internal error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred while processing the Jam.',
        details: isDevelopment && error instanceof Error ? error.message : 'Please try again later.'
      },
      { status: 500 }
    );
  }
}


















