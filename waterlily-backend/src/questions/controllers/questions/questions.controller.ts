import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { QuestionsService } from '../../services/questions/questions.service';
import { Question } from '../../entities/question.entity';
import { QuestionType, QuestionCategory } from '../../entities/question.entity';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new question' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'description', 'type', 'category', 'surveyId'],
      properties: {
        title: {
          type: 'string',
          example: 'What is your age?',
          description: 'The question text',
        },
        description: {
          type: 'string',
          example: 'Please enter your current age in years',
          description: 'Additional instructions or context for the question',
        },
        type: {
          type: 'string',
          enum: Object.values(QuestionType),
          example: QuestionType.NUMBER,
          description: 'The type of answer expected for this question',
        },
        category: {
          type: 'string',
          enum: Object.values(QuestionCategory),
          example: QuestionCategory.DEMOGRAPHIC,
          description: 'The category this question belongs to',
        },
        options: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: ['18-24', '25-34', '35-44', '45-54', '55+'],
          description: 'Available options for SELECT or MULTISELECT questions',
        },
        surveyId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
          description: 'The ID of the survey this question belongs to',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The question has been successfully created.',
    type: Question,
  })
  async create(
    @Body()
    createQuestionDto: {
      title: string;
      description: string;
      type: QuestionType;
      category: QuestionCategory;
      options?: string[];
      surveyId: string;
    },
  ): Promise<Question> {
    return await this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an array of all questions.',
    type: [Question],
  })
  async findAll(): Promise<Question[]> {
    return await this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the question',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the question with the specified ID.',
    type: Question,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Question with the specified ID was not found.',
  })
  async findOne(@Param('id') id: string) {
    return await this.questionsService.findOne(id);
  }

  @Get('survey/:surveyId')
  @ApiOperation({ summary: 'Get all questions for a specific survey' })
  @ApiParam({
    name: 'surveyId',
    description: 'The UUID of the survey',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an array of questions for the specified survey.',
    type: [Question],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey with the specified ID was not found.',
  })
  async findBySurvey(@Param('surveyId') surveyId: string): Promise<Question[]> {
    return await this.questionsService.findBySurvey(surveyId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a question' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the question to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Updated: What is your age?',
          description: 'The new question text',
        },
        description: {
          type: 'string',
          example: 'Updated: Please enter your current age in years',
          description: 'Updated instructions or context',
        },
        type: {
          type: 'string',
          enum: Object.values(QuestionType),
          example: QuestionType.NUMBER,
          description: 'The new type of answer expected',
        },
        category: {
          type: 'string',
          enum: Object.values(QuestionCategory),
          example: QuestionCategory.DEMOGRAPHIC,
          description: 'The new category for this question',
        },
        options: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: ['Under 18', '18-24', '25-34', '35-44', '45+'],
          description: 'Updated options for SELECT or MULTISELECT questions',
        },
        order: {
          type: 'number',
          example: 2,
          description: 'The new display order for this question',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The question has been successfully updated.',
    type: Question,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Question with the specified ID was not found.',
  })
  async update(
    @Param('id') id: string,
    @Body()
    updateQuestionDto: {
      title?: string;
      description?: string;
      type?: QuestionType;
      category?: QuestionCategory;
      options?: string[];
      order?: number;
    },
  ) {
    return await this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a question' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the question to delete',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The question has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Question with the specified ID was not found.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.questionsService.remove(id);
  }

  @Put('survey/:surveyId/reorder')
  @ApiOperation({ summary: 'Reorder questions within a survey' })
  @ApiParam({
    name: 'surveyId',
    description: 'The UUID of the survey containing the questions',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['questionIds'],
      properties: {
        questionIds: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Array of question IDs in the desired order',
          example: [
            '123e4567-e89b-12d3-a456-426614174001',
            '123e4567-e89b-12d3-a456-426614174002',
            '123e4567-e89b-12d3-a456-426614174003',
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The questions have been successfully reordered.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey or one of the questions was not found.',
  })
  async reorder(
    @Param('surveyId') surveyId: string,
    @Body('questionIds') questionIds: string[],
  ): Promise<void> {
    await this.questionsService.reorder(surveyId, questionIds);
  }
}
