import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Survey } from '../../surveys/entities/survey.entity';
import { QuestionResponse } from '../../responses/entities/question-response.entity';

export enum QuestionType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  SELECT = 'SELECT',
  MULTISELECT = 'MULTISELECT',
  BOOLEAN = 'BOOLEAN',
}

export enum QuestionCategory {
  DEMOGRAPHIC = 'DEMOGRAPHIC',
  HEALTH = 'HEALTH',
  FINANCIAL = 'FINANCIAL',
  OTHER = 'OTHER',
}

@Entity('questions')
export class Question {
  @ApiProperty({
    description: 'The unique identifier of the question',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'The ID of the survey this question belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  public surveyId: string;

  @ApiProperty({
    description: 'The title/text of the question',
    example: 'What is your current age?',
  })
  @Column()
  public title: string;

  @ApiProperty({
    description: 'Additional details or instructions for the question',
    example: 'Please enter your age in years.',
  })
  @Column('text')
  private description: string;

  @ApiProperty({
    description: 'The type of question and expected answer format',
    enum: QuestionType,
    enumName: 'QuestionType',
    example: QuestionType.NUMBER,
  })
  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  public type: QuestionType;

  @ApiProperty({
    description: 'Whether an answer is required for this question',
    example: true,
    default: true,
  })
  @Column({ default: true })
  public required: boolean;

  @ApiProperty({
    description: 'The display order of the question in the survey',
    example: 1,
  })
  @Column()
  public order: number;

  @ApiProperty({
    description:
      'Additional configuration options for the question (e.g., select options)',
    example: {
      options: ['18-24', '25-34', '35-44', '45-54', '55+'],
      allowOther: false,
    },
    nullable: true,
  })
  @Column('jsonb', { nullable: true })
  public options: any;

  @ApiProperty({
    description: 'The category of information this question collects',
    enum: QuestionCategory,
    enumName: 'QuestionCategory',
    example: QuestionCategory.DEMOGRAPHIC,
    default: QuestionCategory.OTHER,
  })
  @Column({
    type: 'enum',
    enum: QuestionCategory,
    default: QuestionCategory.OTHER,
  })
  public category: QuestionCategory;

  @ApiProperty({
    description: 'The timestamp when the question was created',
    example: '2024-03-15T12:00:00Z',
  })
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the question was last updated',
    example: '2024-03-15T14:30:00Z',
  })
  @UpdateDateColumn()
  public updatedAt: Date;

  @ApiProperty({
    description: 'The survey this question belongs to',
    type: () => Survey,
  })
  @ManyToOne(() => Survey, (survey) => survey.questions)
  @JoinColumn({ name: 'surveyId' })
  public survey: Survey;

  @ApiProperty({
    description: 'The responses received for this question',
    type: () => [QuestionResponse],
  })
  @OneToMany(() => QuestionResponse, (response) => response.question)
  public responses: QuestionResponse[];
}
