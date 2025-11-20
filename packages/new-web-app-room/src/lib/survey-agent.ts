import SurveySenseiMCP from './mcp-server';
import { 
  Survey, 
  SurveyStatus, 
  CreateSurveyRequest, 
  SubmitResponseRequest,
  QuestionType 
} from './types';

// Survey Agent - orchestrates MCP tools and provides business logic
export class SurveyAgent {
  
  // Create a new survey with validation and setup
  async createSurvey(params: {
    title: string;
    description: string;
    questions: Array<{
      type: QuestionType;
      text: string;
      options?: string[];
      required?: boolean;
    }>;
    tokenAddress: string;
    totalReward: string;
    targetRespondents: number;
    creatorWallet: string;
    expiresAt?: string;
  }) {
    // Validate inputs
    if (!params.title.trim()) {
      throw new Error('Survey title is required');
    }
    
    if (!params.description.trim()) {
      throw new Error('Survey description is required');
    }
    
    if (params.questions.length === 0) {
      throw new Error('At least one question is required');
    }
    
    if (params.targetRespondents < 1) {
      throw new Error('Target respondents must be at least 1');
    }
    
    if (BigInt(params.totalReward) <= 0) {
      throw new Error('Total reward must be greater than 0');
    }
    
    if (!params.creatorWallet.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error('Invalid creator wallet address');
    }

    // Validate token address
    if (params.tokenAddress !== 'NATIVE' && !params.tokenAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error('Invalid token address');
    }

    // Validate questions
    for (const question of params.questions) {
      if (!question.text.trim()) {
        throw new Error('All questions must have text');
      }
      
      if ([QuestionType.SINGLE_CHOICE, QuestionType.MULTIPLE_CHOICE].includes(question.type)) {
        if (!question.options || question.options.length < 2) {
          throw new Error('Choice questions must have at least 2 options');
        }
      }
    }

    // Create survey using MCP tool
    const request: CreateSurveyRequest = {
      title: params.title,
      description: params.description,
      questions: params.questions.map(q => ({
        type: q.type,
        text: q.text,
        options: q.options,
        required: q.required ?? true
      })),
      tokenAddress: params.tokenAddress,
      totalReward: params.totalReward,
      targetRespondents: params.targetRespondents,
      creatorWallet: params.creatorWallet,
      expiresAt: params.expiresAt
    };

    const result = await SurveySenseiMCP.createSurvey(request);
    
    return {
      ...result,
      shareUrl: `/survey/${result.surveyId}`,
      statusUrl: `/survey/${result.surveyId}/status`
    };
  }

  // Submit a response with validation
  async submitResponse(params: {
    surveyId: string;
    walletAddress: string;
    answers: Array<{
      questionId: string;
      value: string | string[];
    }>;
  }) {
    // Validate wallet address
    if (!params.walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error('Invalid wallet address');
    }

    // Get survey to validate answers
    const surveyStatus = await SurveySenseiMCP.getSurveyStatus(params.surveyId, params.walletAddress);
    const survey = surveyStatus.survey;

    // Validate all required questions are answered
    const requiredQuestions = survey.questions.filter(q => q.required);
    const answeredQuestions = params.answers.map(a => a.questionId);
    
    for (const question of requiredQuestions) {
      if (!answeredQuestions.includes(question.id)) {
        throw new Error(`Question "${question.text}" is required`);
      }
    }

    // Validate answer formats
    for (const answer of params.answers) {
      const question = survey.questions.find(q => q.id === answer.questionId);
      if (!question) {
        throw new Error(`Invalid question ID: ${answer.questionId}`);
      }

      // Validate answer based on question type
      switch (question.type) {
        case QuestionType.TEXT:
          if (typeof answer.value !== 'string') {
            throw new Error(`Text question "${question.text}" requires a string answer`);
          }
          break;
          
        case QuestionType.SINGLE_CHOICE:
          if (typeof answer.value !== 'string' || !question.options?.includes(answer.value)) {
            throw new Error(`Single choice question "${question.text}" requires a valid option`);
          }
          break;
          
        case QuestionType.MULTIPLE_CHOICE:
          if (!Array.isArray(answer.value) || 
              !answer.value.every(v => question.options?.includes(v))) {
            throw new Error(`Multiple choice question "${question.text}" requires valid options`);
          }
          break;
          
        case QuestionType.RATING:
          const rating = parseInt(answer.value as string);
          if (isNaN(rating) || rating < 1 || rating > 5) {
            throw new Error(`Rating question "${question.text}" requires a number between 1 and 5`);
          }
          break;
      }
    }

    // Submit response using MCP tool
    const request: SubmitResponseRequest = {
      surveyId: params.surveyId,
      walletAddress: params.walletAddress,
      answers: params.answers
    };

    const result = await SurveySenseiMCP.submitResponse(request);
    
    // If survey is now complete, trigger reward distribution
    if (result.status === 'SUCCESS') {
      const updatedStatus = await SurveySenseiMCP.getSurveyStatus(params.surveyId);
      if (updatedStatus.survey.status === SurveyStatus.COMPLETED) {
        // Auto-trigger reward distribution
        setTimeout(async () => {
          try {
            await this.distributeRewards(params.surveyId);
          } catch (error) {
            console.error('Failed to auto-distribute rewards:', error);
          }
        }, 1000); // Small delay to ensure consistency
      }
    }

    return result;
  }

  // Get survey details and status
  async getSurveyDetails(surveyId: string, walletAddress?: string) {
    const result = await SurveySenseiMCP.getSurveyStatus(surveyId, walletAddress);
    
    return {
      ...result,
      shareUrl: `/survey/${surveyId}`,
      statusUrl: `/survey/${surveyId}/status`,
      progress: {
        current: result.survey.responsesCount,
        target: result.survey.targetRespondents,
        percentage: Math.round((result.survey.responsesCount / result.survey.targetRespondents) * 100)
      }
    };
  }

  // Distribute rewards (can be called manually or auto-triggered)
  async distributeRewards(surveyId: string) {
    const result = await SurveySenseiMCP.distributeRewards({ surveyId });
    return result;
  }

  // Get all active surveys for browsing
  async getActiveSurveys() {
    const allSurveys = await SurveySenseiMCP.getAllSurveys();
    return allSurveys
      .filter(survey => survey.status === SurveyStatus.ACTIVE)
      .map(survey => ({
        ...survey,
        shareUrl: `/survey/${survey.id}`,
        progress: {
          current: survey.responsesCount,
          target: survey.targetRespondents,
          percentage: Math.round((survey.responsesCount / survey.targetRespondents) * 100)
        }
      }));
  }

  // Get surveys created by a specific wallet
  async getCreatorSurveys(creatorWallet: string) {
    const surveys = await SurveySenseiMCP.getSurveysByCreator(creatorWallet);
    return surveys.map(survey => ({
      ...survey,
      shareUrl: `/survey/${survey.id}`,
      statusUrl: `/survey/${survey.id}/status`,
      progress: {
        current: survey.responsesCount,
        target: survey.targetRespondents,
        percentage: Math.round((survey.responsesCount / survey.targetRespondents) * 100)
      }
    }));
  }

  // Helper method to format reward amounts
  formatReward(amount: string, tokenAddress: string): string {
    const value = BigInt(amount);
    
    if (tokenAddress === 'NATIVE') {
      // Convert from wei to ETH (assuming 18 decimals)
      const eth = Number(value) / Math.pow(10, 18);
      return `${eth} ETH`;
    } else {
      // For ERC-20 tokens, assume 18 decimals (could be made configurable)
      const tokens = Number(value) / Math.pow(10, 18);
      return `${tokens} tokens`;
    }
  }

  // Helper method to estimate gas costs (mock implementation)
  async estimateGasCosts(surveyId: string): Promise<{
    distributionCost: string;
    totalCost: string;
  }> {
    const surveyStatus = await SurveySenseiMCP.getSurveyStatus(surveyId);
    const responseCount = surveyStatus.survey.responsesCount;
    
    // Mock gas estimation (in practice, would call blockchain)
    const gasPerTransfer = 21000; // Basic transfer
    const gasPrice = 20000000000; // 20 gwei
    const distributionCost = (gasPerTransfer * responseCount * gasPrice).toString();
    
    return {
      distributionCost,
      totalCost: distributionCost
    };
  }
}

// Export singleton instance
export const surveyAgent = new SurveyAgent();
