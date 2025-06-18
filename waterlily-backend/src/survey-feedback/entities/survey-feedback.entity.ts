import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Survey } from '../../surveys/entities/survey.entity';

export enum FeedbackStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('survey_feedbacks')
export class SurveyFeedback {
  @ApiProperty({
    description: 'The unique identifier of the survey feedback',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'The ID of the survey this feedback is for',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  public surveyId: string;

  @ApiProperty({
    description: 'The ID of the user reviewing this response',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  public reviewerId: string;

  @ApiProperty({
    description: 'The current status of the feedback',
    enum: FeedbackStatus,
    enumName: 'FeedbackStatus',
    example: FeedbackStatus.APPROVED,
    default: FeedbackStatus.PENDING,
  })
  @Column({
    type: 'enum',
    enum: FeedbackStatus,
    default: FeedbackStatus.PENDING,
  })
  public status: FeedbackStatus;

  @ApiProperty({
    description: 'The feedback text provided by the reviewer',
    example:
      'The responses indicate a high risk factor in the health assessment.',
  })
  @Column('text')
  public feedback: string;

  @ApiProperty({
    description: 'The date when the feedback was reviewed',
    example: '2024-03-15',
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  public reviewedAt: Date | null;

  @ApiProperty({
    description: 'The timestamp when the feedback was created',
    example: '2024-03-15T12:00:00Z',
  })
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the feedback was last updated',
    example: '2024-03-15T14:30:00Z',
  })
  @UpdateDateColumn()
  public updatedAt: Date;

  @ApiProperty({
    description: 'The survey this feedback is associated with',
    type: () => Survey,
  })
  @ManyToOne(() => Survey, (survey) => survey.feedbacks)
  @JoinColumn({ name: 'surveyId' })
  public survey: Survey;

  @ApiProperty({
    description: 'The user who reviewed and provided the feedback',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.reviewedFeedbacks)
  @JoinColumn({ name: 'reviewerId' })
  public reviewer: User;
}
