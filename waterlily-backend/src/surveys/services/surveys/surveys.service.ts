import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../../entities/survey.entity';
import { SurveyStatus } from '../../entities/survey.entity';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async create(data: { title: string; description: string }): Promise<Survey> {
    const survey = this.surveyRepository.create({
      ...data,
      status: SurveyStatus.DRAFT,
    });
    return await this.surveyRepository.save(survey);
  }

  async findAll(): Promise<Survey[]> {
    return await this.surveyRepository.find({
      relations: ['questions'],
    });
  }

  async findOne(id: string) {
    return await this.surveyRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  async update(
    id: string,
    data: { title?: string; description?: string; status?: SurveyStatus },
  ) {
    await this.surveyRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.surveyRepository.delete(id);
  }

  async publish(id: string) {
    await this.surveyRepository.update(id, { status: SurveyStatus.PUBLISHED });
    return this.findOne(id);
  }

  async archive(id: string) {
    await this.surveyRepository.update(id, { status: SurveyStatus.ARCHIVED });
    return this.findOne(id);
  }
}
