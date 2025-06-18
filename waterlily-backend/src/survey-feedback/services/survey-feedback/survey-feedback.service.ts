import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyFeedback } from '../../entities/survey-feedback.entity';

@Injectable()
export class SurveyFeedbackService {
  constructor(
    @InjectRepository(SurveyFeedback)
    private readonly surveyFeedbackRepository: Repository<SurveyFeedback>,
  ) {}

  async create(data: {
    userId: string;
    surveyId: string;
    rating: number;
    comment: string;
  }) {
    const feedback = this.surveyFeedbackRepository.create({
      reviewerId: data.userId,
      surveyId: data.surveyId,
      feedback: `Rating: ${data.rating}\n${data.comment}`,
    });
    return await this.surveyFeedbackRepository.save(feedback);
  }

  async findAll(): Promise<SurveyFeedback[]> {
    return await this.surveyFeedbackRepository.find({
      relations: ['user', 'survey'],
    });
  }

  async findOne(id: string) {
    return await this.surveyFeedbackRepository.findOne({
      where: { id },
      relations: ['user', 'survey'],
    });
  }

  async findByUser(userId: string): Promise<SurveyFeedback[]> {
    return await this.surveyFeedbackRepository.find({
      where: { reviewer: { id: userId } },
      relations: ['survey'],
    });
  }

  async findBySurvey(surveyId: string): Promise<SurveyFeedback[]> {
    return await this.surveyFeedbackRepository.find({
      where: { survey: { id: surveyId } },
      relations: ['user'],
    });
  }

  async update(id: string, data: Partial<SurveyFeedback>) {
    await this.surveyFeedbackRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.surveyFeedbackRepository.delete(id);
  }
}
