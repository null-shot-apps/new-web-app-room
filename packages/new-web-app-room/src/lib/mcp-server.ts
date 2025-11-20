import { 
  Survey, 
  SurveyResponse, 
  SurveyStatus, 
  CreateSurveyRequest, 
  CreateSurveyResponse,
  SubmitResponseRequest,
  SubmitResponseResponse,
  GetSurveyStatusResponse,
  DistributeRewardsRequest,
  DistributeRewardsResponse,
  Question
} from './types';

// In-memory storage for MVP (replace with database in production)
class SurveyStore {
  private surveys: Map<string, Survey> = new Map();
  private responses: Map<string, SurveyResponse[]> = new Map();

  // Generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Create a new survey
  createSurvey(request: CreateSurveyRequest): CreateSurveyResponse {
    const surveyId = this.generateId();
    const rewardPerRespondent = (BigInt(request.totalReward) / BigInt(request.targetRespondents)).toString();
    
    // For MVP, use a single shared escrow address
    const escrowAddress = "0x742d35Cc6634C0532925a3b8D0C9C0E3C5C5C5C5"; // Mock escrow address

    const questions: Question[] = request.questions.map(q => ({
      ...q,
      id: this.generateId()
    }));

    const survey: Survey = {
      id: surveyId,
      title: request.title,
      description: request.description,
      questions,
      tokenAddress: request.tokenAddress,
      totalReward: request.totalReward,
      targetRespondents: request.targetRespondents,
      creatorWallet: request.creatorWallet,
      escrowAddress,
      status: SurveyStatus.ACTIVE,
      createdAt: new Date(),
      expiresAt: request.expiresAt ? new Date(request.expiresAt) : undefined,
      responsesCount: 0,
      rewardPerRespondent
    };

    this.surveys.set(surveyId, survey);
    this.responses.set(surveyId, []);

    return {
      surveyId,
      rewardPerRespondent,
      escrowAddress,
      status: SurveyStatus.ACTIVE
    };
  }

  // Submit a response to a survey
  submitResponse(request: SubmitResponseRequest): SubmitResponseResponse {
    const survey = this.surveys.get(request.surveyId);
    if (!survey) {
      return {
        responseId: '',
        status: 'ERROR',
        message: 'Survey not found'
      };
    }

    // Check if survey is active
    if (survey.status !== SurveyStatus.ACTIVE) {
      return {
        responseId: '',
        status: 'ERROR',
        message: 'Survey is not active'
      };
    }

    // Check if expired
    if (survey.expiresAt && new Date() > survey.expiresAt) {
      survey.status = SurveyStatus.EXPIRED;
      this.surveys.set(request.surveyId, survey);
      return {
        responseId: '',
        status: 'ERROR',
        message: 'Survey has expired'
      };
    }

    // Check if wallet already submitted
    const existingResponses = this.responses.get(request.surveyId) || [];
    const alreadySubmitted = existingResponses.some(r => r.walletAddress === request.walletAddress);
    if (alreadySubmitted) {
      return {
        responseId: '',
        status: 'ERROR',
        message: 'Wallet has already submitted a response'
      };
    }

    // Check if quota is full
    if (survey.responsesCount >= survey.targetRespondents) {
      return {
        responseId: '',
        status: 'ERROR',
        message: 'Survey has reached maximum responses'
      };
    }

    // Create response
    const responseId = this.generateId();
    const response: SurveyResponse = {
      id: responseId,
      surveyId: request.surveyId,
      walletAddress: request.walletAddress,
      answers: request.answers,
      submittedAt: new Date(),
      rewardPaid: false
    };

    // Update storage
    existingResponses.push(response);
    this.responses.set(request.surveyId, existingResponses);
    
    survey.responsesCount++;
    
    // Check if survey is complete
    if (survey.responsesCount >= survey.targetRespondents) {
      survey.status = SurveyStatus.COMPLETED;
    }
    
    this.surveys.set(request.surveyId, survey);

    return {
      responseId,
      status: 'SUCCESS',
      message: 'Response submitted successfully'
    };
  }

  // Get survey status and details
  getSurveyStatus(surveyId: string, walletAddress?: string): GetSurveyStatusResponse | null {
    const survey = this.surveys.get(surveyId);
    if (!survey) {
      return null;
    }

    const responses = this.responses.get(surveyId) || [];
    
    let canSubmit = false;
    let message = '';

    if (survey.status === SurveyStatus.ACTIVE) {
      if (survey.expiresAt && new Date() > survey.expiresAt) {
        survey.status = SurveyStatus.EXPIRED;
        this.surveys.set(surveyId, survey);
        message = 'Survey has expired';
      } else if (survey.responsesCount >= survey.targetRespondents) {
        message = 'Survey has reached maximum responses';
      } else if (walletAddress && responses.some(r => r.walletAddress === walletAddress)) {
        message = 'You have already submitted a response';
      } else {
        canSubmit = true;
        message = 'Survey is active and accepting responses';
      }
    } else {
      message = `Survey is ${survey.status.toLowerCase()}`;
    }

    return {
      survey,
      responses,
      canSubmit,
      message
    };
  }

  // Distribute rewards to participants
  distributeRewards(request: DistributeRewardsRequest): DistributeRewardsResponse {
    const survey = this.surveys.get(request.surveyId);
    if (!survey) {
      return {
        status: 'ERROR',
        message: 'Survey not found'
      };
    }

    if (survey.status !== SurveyStatus.COMPLETED) {
      return {
        status: 'ERROR',
        message: 'Survey is not completed yet'
      };
    }

    const responses = this.responses.get(request.surveyId) || [];
    
    // Mock transaction hashes for reward distribution
    const transactionHashes: string[] = [];
    
    // Update response records to mark rewards as paid
    responses.forEach(response => {
      if (!response.rewardPaid) {
        response.rewardPaid = true;
        // Mock transaction hash
        transactionHashes.push(`0x${Math.random().toString(16).substring(2).padStart(64, '0')}`);
      }
    });

    this.responses.set(request.surveyId, responses);
    
    // Update survey status
    survey.status = SurveyStatus.PAID;
    this.surveys.set(request.surveyId, survey);

    return {
      status: 'SUCCESS',
      message: `Rewards distributed to ${responses.length} participants`,
      transactionHashes
    };
  }

  // Get all surveys (for browsing)
  getAllSurveys(): Survey[] {
    return Array.from(this.surveys.values());
  }

  // Get surveys by creator
  getSurveysByCreator(creatorWallet: string): Survey[] {
    return Array.from(this.surveys.values()).filter(s => s.creatorWallet === creatorWallet);
  }
}

// Singleton store instance
const surveyStore = new SurveyStore();

// MCP Server Tools
export class SurveySenseiMCP {
  // Tool: survey.create
  static async createSurvey(request: CreateSurveyRequest): Promise<CreateSurveyResponse> {
    try {
      return surveyStore.createSurvey(request);
    } catch (error) {
      throw new Error(`Failed to create survey: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Tool: survey.submit_response
  static async submitResponse(request: SubmitResponseRequest): Promise<SubmitResponseResponse> {
    try {
      return surveyStore.submitResponse(request);
    } catch (error) {
      throw new Error(`Failed to submit response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Tool: survey.get_status
  static async getSurveyStatus(surveyId: string, walletAddress?: string): Promise<GetSurveyStatusResponse> {
    try {
      const result = surveyStore.getSurveyStatus(surveyId, walletAddress);
      if (!result) {
        throw new Error('Survey not found');
      }
      return result;
    } catch (error) {
      throw new Error(`Failed to get survey status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Tool: survey.distribute_rewards
  static async distributeRewards(request: DistributeRewardsRequest): Promise<DistributeRewardsResponse> {
    try {
      return surveyStore.distributeRewards(request);
    } catch (error) {
      throw new Error(`Failed to distribute rewards: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Additional helper methods
  static async getAllSurveys(): Promise<Survey[]> {
    return surveyStore.getAllSurveys();
  }

  static async getSurveysByCreator(creatorWallet: string): Promise<Survey[]> {
    return surveyStore.getSurveysByCreator(creatorWallet);
  }
}

export default SurveySenseiMCP;
