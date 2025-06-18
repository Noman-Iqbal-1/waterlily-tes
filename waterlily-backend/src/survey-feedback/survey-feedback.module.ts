import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyFeedbackController } from './controllers/survey-feedback/survey-feedback.controller';
import { SurveyFeedbackService } from './services/survey-feedback/survey-feedback.service';
import { SurveyFeedback } from './entities/survey-feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyFeedback])],
  controllers: [SurveyFeedbackController],
  providers: [SurveyFeedbackService],
  exports: [SurveyFeedbackService],
})
export class SurveyFeedbackModule {}
