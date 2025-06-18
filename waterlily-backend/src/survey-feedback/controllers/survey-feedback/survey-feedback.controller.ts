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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { SurveyFeedbackService } from '../../services/survey-feedback/survey-feedback.service';
import { SurveyFeedback } from '../../entities/survey-feedback.entity';

@ApiTags('survey-feedback')
@Controller('survey-feedback')
export class SurveyFeedbackController {
  constructor(private readonly surveyFeedbackService: SurveyFeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new survey feedback' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['userId', 'surveyId', 'rating', 'comment'],
      properties: {
        userId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
          description: 'The ID of the user providing feedback',
        },
        surveyId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
          description: 'The ID of the survey being reviewed',
        },
        rating: {
          type: 'number',
          minimum: 1,
          maximum: 5,
          example: 4,
          description: 'Rating score (1-5)',
        },
        comment: {
          type: 'string',
          example: 'The survey was well structured and easy to understand.',
          description: 'Feedback comment',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The survey feedback has been successfully created.',
    type: SurveyFeedback,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request body or missing required fields.',
  })
  async create(
    @Body()
    createFeedbackDto: {
      userId: string;
      surveyId: string;
      rating: number;
      comment: string;
    },
  ): Promise<SurveyFeedback> {
    return await this.surveyFeedbackService.create(createFeedbackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all survey feedback' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an array of all survey feedback.',
    type: [SurveyFeedback],
  })
  async findAll(): Promise<SurveyFeedback[]> {
    return await this.surveyFeedbackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get survey feedback by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the survey feedback',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the survey feedback with the specified ID.',
    type: SurveyFeedback,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey feedback with the specified ID was not found.',
  })
  async findOne(@Param('id') id: string) {
    return await this.surveyFeedbackService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: "Get all of a user's survey feedback" })
  @ApiParam({
    name: 'userId',
    description: 'The UUID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an array of survey feedback for the specified user.',
    type: [SurveyFeedback],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with the specified ID was not found.',
  })
  async findByUser(@Param('userId') userId: string): Promise<SurveyFeedback[]> {
    return await this.surveyFeedbackService.findByUser(userId);
  }

  @Get('survey/:surveyId')
  @ApiOperation({ summary: 'Get all feedback for a specific survey' })
  @ApiParam({
    name: 'surveyId',
    description: 'The UUID of the survey',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an array of feedback for the specified survey.',
    type: [SurveyFeedback],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey with the specified ID was not found.',
  })
  async findBySurvey(
    @Param('surveyId') surveyId: string,
  ): Promise<SurveyFeedback[]> {
    return await this.surveyFeedbackService.findBySurvey(surveyId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update survey feedback' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the survey feedback to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        rating: {
          type: 'number',
          minimum: 1,
          maximum: 5,
          example: 5,
          description: 'Updated rating score (1-5)',
        },
        comment: {
          type: 'string',
          example: 'Updated: The survey was excellent and very comprehensive.',
          description: 'Updated feedback comment',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The survey feedback has been successfully updated.',
    type: SurveyFeedback,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey feedback with the specified ID was not found.',
  })
  async update(
    @Param('id') id: string,
    @Body()
    updateFeedbackDto: Partial<SurveyFeedback>,
  ) {
    return await this.surveyFeedbackService.update(id, updateFeedbackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete survey feedback' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the survey feedback to delete',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The survey feedback has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey feedback with the specified ID was not found.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.surveyFeedbackService.remove(id);
  }
}
