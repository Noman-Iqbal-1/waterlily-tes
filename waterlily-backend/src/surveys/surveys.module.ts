import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveysController } from './controllers/surveys/surveys.controller';
import { SurveysService } from './services/surveys/surveys.service';
import { Survey } from './entities/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  controllers: [SurveysController],
  providers: [SurveysService],
  exports: [SurveysService],
})
export class SurveysModule {}
