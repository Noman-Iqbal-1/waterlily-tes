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
import { Question } from '../../questions/entities/question.entity';
import { Response } from './response.entity';
// Removed all getters and setters and changed private to public
@Entity('question_responses')
export class QuestionResponse {
  @ApiProperty({
    description: 'The unique identifier of the question response',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'The ID of the survey response this answer belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  public responseId: string;

  @ApiProperty({
    description: 'The ID of the question being answered',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  public questionId: string;

  @ApiProperty({
    description: 'The answer value for the question',
    example: {
      text: 'My answer text',
      selectedOptions: ['option1', 'option2'],
      numericValue: 42,
      dateValue: '2024-03-15',
      booleanValue: true,
    },
  })
  @Column('jsonb')
  public value: any;

  @ApiProperty({
    description: 'The timestamp when the answer was created',
    example: '2024-03-15T12:00:00Z',
  })
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the answer was last updated',
    example: '2024-03-15T14:30:00Z',
  })
  @UpdateDateColumn()
  public updatedAt: Date;

  @ApiProperty({
    description: 'The survey response this answer belongs to',
    type: () => Response,
  })
  @ManyToOne(() => Response, (response) => response.questionResponses)
  @JoinColumn({ name: 'responseId' })
  public response: Response;

  @ApiProperty({
    description: 'The question being answered',
    type: () => Question,
  })
  @ManyToOne(() => Question, (question) => question.responses)
  @JoinColumn({ name: 'questionId' })
  public question: Question;
}
