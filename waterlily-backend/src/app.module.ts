import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SurveysModule } from './surveys/surveys.module';
import { QuestionsModule } from './questions/questions.module';
import { ResponsesModule } from './responses/responses.module';
import { SurveyFeedbackModule } from './survey-feedback/survey-feedback.module';
import { User } from './users/entities/user.entity';
import { Survey } from './surveys/entities/survey.entity';
import { Question } from './questions/entities/question.entity';
import { Response } from './responses/entities/response.entity';
import { QuestionResponse } from './responses/entities/question-response.entity';
import { SurveyFeedback } from './survey-feedback/entities/survey-feedback.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          User,
          Survey,
          Question,
          Response,
          QuestionResponse,
          SurveyFeedback,
        ],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    SurveysModule,
    QuestionsModule,
    ResponsesModule,
    SurveyFeedbackModule,
  ],
})
export class AppModule {}
