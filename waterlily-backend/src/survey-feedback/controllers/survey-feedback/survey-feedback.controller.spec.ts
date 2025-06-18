import { Test, TestingModule } from '@nestjs/testing';
import { SurveyFeedbackController } from './survey-feedback.controller';

describe('SurveyFeedbackController', () => {
  let controller: SurveyFeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyFeedbackController],
    }).compile();

    controller = module.get<SurveyFeedbackController>(SurveyFeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
