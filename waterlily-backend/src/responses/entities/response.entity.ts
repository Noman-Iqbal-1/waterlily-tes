import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Survey } from '../../surveys/entities/survey.entity';
import { User } from '../../users/entities/user.entity';
import { QuestionResponse } from './question-response.entity';

export enum ResponseStatus {
  COMPLETE = 'COMPLETE',
  INCOMPLETE = 'INCOMPLETE',
}

export enum ReviewStatus {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  PENDING_REVIEW = 'PENDING_REVIEW',
  IN_REVIEW = 'IN_REVIEW',
  REVIEWED = 'REVIEWED',
}

@Entity('responses')
export class Response {
  @ApiProperty({
    description: 'The unique identifier of the response',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The ID of the user who submitted this response',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  userId: string;

  @ApiProperty({
    description: 'The ID of the survey this response belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  surveyId: string;

  @ApiProperty({
    description: 'The timestamp when the response was submitted',
    example: '2024-03-15T12:00:00Z',
    nullable: true,
  })
  @Column({ nullable: true })
  submittedAt: Date;

  @ApiProperty({
    description: 'The current completion status of the response',
    enum: ResponseStatus,
    enumName: 'ResponseStatus',
    example: ResponseStatus.COMPLETE,
    default: ResponseStatus.INCOMPLETE,
  })
  @Column({
    type: 'enum',
    enum: ResponseStatus,
    default: ResponseStatus.INCOMPLETE,
  })
  status: ResponseStatus;

  @ApiProperty({
    description: 'The current review status of the response',
    enum: ReviewStatus,
    enumName: 'ReviewStatus',
    example: ReviewStatus.REVIEWED,
    default: ReviewStatus.NOT_SUBMITTED,
  })
  @Column({
    type: 'enum',
    enum: ReviewStatus,
    default: ReviewStatus.NOT_SUBMITTED,
  })
  reviewStatus: ReviewStatus;

  @ApiProperty({
    description: 'The timestamp when the response was last reviewed',
    example: '2024-03-15T14:30:00Z',
    nullable: true,
  })
  @Column({ nullable: true })
  lastReviewedAt: Date;

  @ApiProperty({
    description: 'The number of times this response has been reviewed',
    example: 2,
    default: 0,
  })
  @Column({ default: 0 })
  reviewCount: number;

  @ApiProperty({
    description: 'The timestamp when the response was created',
    example: '2024-03-15T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the response was last updated',
    example: '2024-03-15T14:30:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'The user who submitted this response',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.responses)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    description: 'The survey this response belongs to',
    type: () => Survey,
  })
  @ManyToOne(() => Survey, (survey) => survey.responses)
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @ApiProperty({
    description: 'The individual question responses in this survey response',
    type: () => [QuestionResponse],
  })
  @OneToMany(
    () => QuestionResponse,
    (questionResponse) => questionResponse.response,
  )
  questionResponses: QuestionResponse[];
}
