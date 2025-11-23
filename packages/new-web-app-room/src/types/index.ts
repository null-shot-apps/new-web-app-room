export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  techStack: string[];
  jamUrl: string;
  duration: string;
  overview: string;
  appUrl: string;
  steps: TutorialStep[];
  quiz: QuizQuestion[];
  thumbnail?: string;
  isDefault?: boolean;
  createdAt: string;
}

export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  code: string;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface JamContent {
  id: string;
  title: string;
  description: string;
  conversation: ConversationMessage[];
  prompts: string[];
  techStack: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  metadata: {
    duration: string;
    steps: number;
  };
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface Tutorial {
  overview: string;
  steps: TutorialStep[];
}

export interface ProcessJamResponse {
  success: boolean;
  course: Course;
  message: string;
}
