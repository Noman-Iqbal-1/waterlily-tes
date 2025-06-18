import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from '../../entities/response.entity';
import { QuestionResponse } from '../../entities/question-response.entity';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
    @InjectRepository(QuestionResponse)
    private readonly questionResponseRepository: Repository<QuestionResponse>,
  ) {}

  async create(data: {
    userId: string;
    surveyId: string;
    answers: Array<{
      questionId: string;
      answer: string;
    }>;
  }) {
    const response = await this.responseRepository.save(
      this.responseRepository.create({
        user: { id: data.userId },
        survey: { id: data.surveyId },
      }),
    );

    // await Promise.all(
    //   data.answers.map((answer) =>
    //     this.questionResponseRepository.save(
    //       this.questionResponseRepository.create({
    //         response: { id: response.id },
    //         question: { id: answer.questionId },
    //         answer: answer.answer,
    //       }),
    //     ),
    //   ),
    // );

    return this.findOne(response.id);
  }

  async findAll(): Promise<Response[]> {
    return await this.responseRepository.find({
      relations: [
        'user',
        'survey',
        'questionResponses',
        'questionResponses.question',
      ],
    });
  }

  async findOne(id: string) {
    return await this.responseRepository.findOne({
      where: { id },
      relations: [
        'user',
        'survey',
        'questionResponses',
        'questionResponses.question',
      ],
    });
  }

  async findByUser(userId: string): Promise<Response[]> {
    return await this.responseRepository.find({
      where: { user: { id: userId } },
      relations: ['survey', 'questionResponses', 'questionResponses.question'],
    });
  }

  async findBySurvey(surveyId: string): Promise<Response[]> {
    return await this.responseRepository.find({
      where: { survey: { id: surveyId } },
      relations: ['user', 'questionResponses', 'questionResponses.question'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.responseRepository.delete(id);
  }
}
