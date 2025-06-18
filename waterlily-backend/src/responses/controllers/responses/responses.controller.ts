import {
  Controller,
  Get,
  Post,
  Body,
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
import { ResponsesService } from '../../services/responses/responses.service';
import { Response } from '../../entities/response.entity';

@ApiTags('responses')
@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new survey response' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['userId', 'surveyId', 'answers'],
      properties: {
        userId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
          description: 'The ID of the user submitting the response',
        },
        surveyId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
          description: 'The ID of the survey being responded to',
        },
        answers: {
          type: 'array',
          items: {
            type: 'object',
            required: ['questionId', 'answer'],
            properties: {
              questionId: {
                type: 'string',
                example: '123e4567-e89b-12d3-a456-426614174000',
                description: 'The ID of the question being answered',
              },
              answer: {
                type: 'string',
                example: 'My answer text',
                description: 'The answer value for the question',
              },
            },
          },
          description: 'Array of answers to survey questions',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The survey response has been successfully created.',
    type: Response,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request body or missing required fields.',
  })
  async create(
    @Body()
    createResponseDto: {
      userId: string;
      surveyId: string;
      answers: Array<{
        questionId: string;
        answer: string;
      }>;
    },
  ) {
    return await this.responsesService.create(createResponseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all survey responses' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an array of all survey responses.',
    type: [Response],
  })
  async findAll(): Promise<Response[]> {
    return await this.responsesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a survey response by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the survey response',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the survey response with the specified ID.',
    type: Response,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey response with the specified ID was not found.',
  })
  async findOne(@Param('id') id: string) {
    return await this.responsesService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: "Get all of a user's survey responses" })
  @ApiParam({
    name: 'userId',
    description: 'The UUID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an array of survey responses for the specified user.',
    type: [Response],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with the specified ID was not found.',
  })
  async findByUser(@Param('userId') userId: string): Promise<Response[]> {
    return await this.responsesService.findByUser(userId);
  }

  @Get('survey/:surveyId')
  @ApiOperation({ summary: 'Get all responses for a specific survey' })
  @ApiParam({
    name: 'surveyId',
    description: 'The UUID of the survey',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an array of responses for the specified survey.',
    type: [Response],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey with the specified ID was not found.',
  })
  async findBySurvey(@Param('surveyId') surveyId: string): Promise<Response[]> {
    return await this.responsesService.findBySurvey(surveyId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a survey response' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the survey response to delete',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The survey response has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey response with the specified ID was not found.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.responsesService.remove(id);
  }
}
