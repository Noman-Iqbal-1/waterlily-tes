import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Response } from '../../responses/entities/response.entity';
import { SurveyFeedback } from '../../survey-feedback/entities/survey-feedback.entity';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
    uniqueItems: true,
  })
  @Column({ unique: true })
  public email: string;

  @ApiProperty({
    description: 'The timestamp when the user was created',
    example: '2024-03-15T12:00:00Z',
  })
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the user was last updated',
    example: '2024-03-15T14:30:00Z',
  })
  @UpdateDateColumn()
  public updatedAt: Date;

  @ApiProperty({
    description: 'The survey responses submitted by this user',
    type: () => [Response],
  })
  @OneToMany(() => Response, (response) => response.user)
  public responses: Response[];

  @ApiProperty({
    description: 'The survey feedback reviews provided by this user',
    type: () => [SurveyFeedback],
  })
  @OneToMany(() => SurveyFeedback, (feedback) => feedback.reviewer)
  public reviewedFeedbacks: SurveyFeedback[];
}
