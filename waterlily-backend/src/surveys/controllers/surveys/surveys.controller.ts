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
import { SurveysService } from '../../services/surveys/surveys.service';
import { Survey } from '../../entities/survey.entity';

@ApiTags('surveys')
@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new survey' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Health Assessment Survey',
          description: 'The title of the survey',
        },
        description: {
          type: 'string',
          example: 'A comprehensive health assessment questionnaire',
          description: 'A detailed description of the survey',
        },
      },
      required: ['title'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The survey has been successfully created.',
    type: Survey,
  })
  async create(
    @Body() createSurveyDto: { title: string; description: string },
  ): Promise<Survey> {
    return await this.surveysService.create(createSurveyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all surveys' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an array of all surveys.',
    type: [Survey],
  })
  async findAll(): Promise<Survey[]> {
    return await this.surveysService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a survey by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the survey',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the survey with the specified ID.',
    type: Survey,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey with the specified ID was not found.',
  })
  async findOne(@Param('id') id: string) {
    return await this.surveysService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a survey' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the survey to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Updated Health Assessment',
          description: 'The new title of the survey',
        },
        description: {
          type: 'string',
          example: 'Updated health assessment questionnaire',
          description: 'The new description of the survey',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The survey has been successfully updated.',
    type: Survey,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey with the specified ID was not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateSurveyDto: { title?: string; description?: string },
  ) {
    return await this.surveysService.update(id, updateSurveyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a survey' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the survey to delete',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The survey has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey with the specified ID was not found.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.surveysService.remove(id);
  }

  @Put(':id/publish')
  @ApiOperation({ summary: 'Publish a survey' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the survey to publish',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The survey has been successfully published.',
    type: Survey,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey with the specified ID was not found.',
  })
  async publish(@Param('id') id: string) {
    return await this.surveysService.publish(id);
  }

  @Put(':id/archive')
  @ApiOperation({ summary: 'Archive a survey' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the survey to archive',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The survey has been successfully archived.',
    type: Survey,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey with the specified ID was not found.',
  })
  async archive(@Param('id') id: string) {
    return await this.surveysService.archive(id);
  }
}
