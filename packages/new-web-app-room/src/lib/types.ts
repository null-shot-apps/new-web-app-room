// Core types for SurveySensei
export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  tokenAddress: string; // "NATIVE" for native token or ERC-20 address
  totalReward: string; // Amount in wei/smallest unit
  targetRespondents: number;
  creatorWallet: string;
  escrowAddress: string;
  status: SurveyStatus;
  createdAt: Date;
  expiresAt?: Date;
  responsesCount: number;
  rewardPerRespondent: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[]; // For multiple choice questions
  required: boolean;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  walletAddress: string;
  answers: Answer[];
  submittedAt: Date;
  rewardPaid: boolean;
}

export interface Answer {
  questionId: string;
  value: string | string[]; // string for text/single choice, array for multiple choice
}

export enum SurveyStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  PAID = 'PAID'
}

export enum QuestionType {
  TEXT = 'TEXT',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  RATING = 'RATING'
}

// MCP Tool interfaces
export interface CreateSurveyRequest {
  title: string;
  description: string;
  questions: Omit<Question, 'id'>[];
  tokenAddress: string;
  totalReward: string;
  targetRespondents: number;
  creatorWallet: string;
  expiresAt?: string; // ISO date string
}

export interface CreateSurveyResponse {
  surveyId: string;
  rewardPerRespondent: string;
  escrowAddress: string;
  status: SurveyStatus;
}

export interface SubmitResponseRequest {
  surveyId: string;
  walletAddress: string;
  answers: Omit<Answer, 'id'>[];
}

export interface SubmitResponseResponse {
  responseId: string;
  status: 'SUCCESS' | 'ERROR';
  message: string;
}

export interface GetSurveyStatusResponse {
  survey: Survey;
  responses: SurveyResponse[];
  canSubmit: boolean;
  message?: string;
}

export interface DistributeRewardsRequest {
  surveyId: string;
}

export interface DistributeRewardsResponse {
  status: 'SUCCESS' | 'ERROR';
  message: string;
  transactionHashes?: string[];
}
