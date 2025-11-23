// Core data models for the Nullshot Jam tutorial platform

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Jam {
  id: string;
  url: string;
  title: string;
  description: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  techStack: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  projectType: string;
  thumbnailUrl?: string;
  demoUrl?: string;
  status: 'pending' | 'processed' | 'failed';
}

export interface Prompt {
  id: string;
  jamId: string;
  sequence: number;
  content: string;
  response: string;
  timestamp: Date;
  type: 'user_request' | 'clarification' | 'implementation' | 'debugging';
}

export interface Tutorial {
  id: string;
  jamId: string;
  title: string;
  description: string;
  overview: string;
  steps: TutorialStep[];
  estimatedTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface TutorialStep {
  id: string;
  tutorialId: string;
  sequence: number;
  title: string;
  content: string;
  codeExample?: string;
  explanation: string;
  relatedPromptIds: string[];
}

export interface Quiz {
  id: string;
  jamId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  sequence: number;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'scenario';
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Course {
  id: string;
  jamId: string;
  tutorialId: string;
  quizId: string;
  title: string;
  shortDescription: string;
  thumbnailUrl?: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  tutorialProgress: number; // percentage completed
  quizScore?: number;
  quizAttempts: number;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Jam processing pipeline types
export interface JamProcessingJob {
  id: string;
  jamUrl: string;
  status: 'pending' | 'fetching' | 'analyzing' | 'generating_tutorial' | 'generating_quiz' | 'completed' | 'failed';
  progress: number;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JamContent {
  title: string;
  description: string;
  author: string;
  conversation: ConversationMessage[];
  metadata: {
    techStack: string[];
    projectType: string;
    difficulty: string;
    estimatedTime: number;
  };
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'prompt' | 'response' | 'code' | 'explanation';
}

// UI Component types
export interface CourseCardProps {
  course: Course;
  jam: Jam;
  onSelect: (courseId: string) => void;
}

export interface CourseGridProps {
  courses: Course[];
  loading?: boolean;
  onCourseSelect: (courseId: string) => void;
}

export interface TutorialViewProps {
  tutorial: Tutorial;
  jam: Jam;
  userProgress?: UserProgress;
  onStepComplete: (stepId: string) => void;
}

export interface QuizViewProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
  onRetry: () => void;
}

export interface EmbeddedWebviewProps {
  url: string;
  title: string;
  fallbackImage?: string;
  className?: string;
}
