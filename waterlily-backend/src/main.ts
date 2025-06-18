import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Waterlily API')
    .setDescription('The Waterlily user intake form system API documentation')
    .setVersion('1.0')
    .setBasePath('/')
    .addTag('surveys', 'Survey management endpoints')
    .addTag('questions', 'Survey question management endpoints')
    .addTag('responses', 'Survey response management endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('survey-feedback', 'Survey feedback management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
