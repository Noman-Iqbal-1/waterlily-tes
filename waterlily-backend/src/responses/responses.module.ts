import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesController } from './controllers/responses/responses.controller';
import { ResponsesService } from './services/responses/responses.service';
import { Response } from './entities/response.entity';
import { QuestionResponse } from './entities/question-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response, QuestionResponse])],
  controllers: [ResponsesController],
  providers: [ResponsesService],
  exports: [ResponsesService],
})
export class ResponsesModule {}
