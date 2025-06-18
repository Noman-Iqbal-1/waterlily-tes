import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../entities/question.entity';
import { QuestionType, QuestionCategory } from '../../entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(data: {
    title: string;
    description: string;
    type: QuestionType;
    category: QuestionCategory;
    options?: string[];
    surveyId: string;
  }): Promise<Question> {
    // Find the highest order number for the survey
    const highestOrder = await this.questionRepository
      .createQueryBuilder('question')
      .where('question.surveyId = :surveyId', { surveyId: data.surveyId })
      .orderBy('question.order', 'DESC')
      .getOne();

    // Set the order to be one more than the highest existing order, or 1 if no questions exist
    const order = highestOrder ? highestOrder.order + 1 : 1;

    const question = this.questionRepository.create({
      ...data,
      order,
    });
    return await this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find({
      relations: ['survey'],
    });
  }

  async findOne(id: string) {
    return await this.questionRepository.findOne({
      where: { id },
      relations: ['survey'],
    });
  }

  async findBySurvey(surveyId: string) {
    return await this.questionRepository.find({
      where: { survey: { id: surveyId } },
      order: { order: 'ASC' },
    });
  }

  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      type?: QuestionType;
      category?: QuestionCategory;
      options?: string[];
      order?: number;
    },
  ) {
    await this.questionRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.questionRepository.delete(id);
  }

  async reorder(surveyId: string, questionIds: string[]): Promise<void> {
    await Promise.all(
      questionIds.map((id, index) =>
        this.questionRepository.update(id, { order: index + 1 }),
      ),
    );
  }
}
