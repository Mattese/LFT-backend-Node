import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  const port = process.env.PORT ?? 8080;

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('LFT Backend API')
    .setDescription('API documentation for LFT Backend')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`, 'Local development server')
    .addTag('user', 'User management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  console.log(`\n🚀 Server is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  if (process.env.WITH_STUDIO === 'true') {
    console.log(`🗄️  Prisma Studio: http://localhost:5555`);
  }
}
void bootstrap();
