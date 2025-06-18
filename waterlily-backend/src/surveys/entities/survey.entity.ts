import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../../questions/entities/question.entity';
import { Response } from '../../responses/entities/response.entity';
import { SurveyFeedback } from '../../survey-feedback/entities/survey-feedback.entity';

export enum SurveyStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

@Entity('surveys')
export class Survey {
  @ApiProperty({
    description: 'The unique identifier of the survey',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'The title of the survey',
    example: 'Health and Wellness Assessment',
  })
  @Column()
  public title: string;

  @ApiProperty({
    description: 'A detailed description of the survey',
    example:
      'This survey collects information about your health and lifestyle habits.',
    required: false,
  })
  @Column('text', { nullable: true })
  public description: string;

  @ApiProperty({
    description: 'The current status of the survey',
    enum: SurveyStatus,
    enumName: 'SurveyStatus',
    example: SurveyStatus.PUBLISHED,
    default: SurveyStatus.DRAFT,
  })
  @Column({
    type: 'enum',
    enum: SurveyStatus,
    default: SurveyStatus.DRAFT,
  })
  public status: SurveyStatus;

  @ApiProperty({
    description: 'The timestamp when the survey was created',
    example: '2024-03-15T12:00:00Z',
  })
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the survey was last updated',
    example: '2024-03-15T14:30:00Z',
  })
  @UpdateDateColumn()
  public updatedAt: Date;

  @ApiProperty({
    description: 'The list of questions in this survey',
    type: () => [Question],
  })
  @OneToMany(() => Question, (question) => question.survey)
  public questions: Question[];

  @ApiProperty({
    description: 'The list of responses submitted for this survey',
    type: () => [Response],
  })
  @OneToMany(() => Response, (response) => response.survey)
  public responses: Response[];

  @ApiProperty({
    description: 'The list of feedback received for this survey',
    type: () => [SurveyFeedback],
  })
  @OneToMany(() => SurveyFeedback, (feedback) => feedback.survey)
  public feedbacks: SurveyFeedback[];
}
