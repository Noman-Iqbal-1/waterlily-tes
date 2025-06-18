import { Test, TestingModule } from '@nestjs/testing';
import { SurveyFeedbackService } from './survey-feedback.service';

describe('SurveyFeedbackService', () => {
  let service: SurveyFeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyFeedbackService],
    }).compile();

    service = module.get<SurveyFeedbackService>(SurveyFeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
