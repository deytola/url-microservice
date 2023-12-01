import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );
  const config = new DocumentBuilder()
  .setTitle('URL Shortener')
  .setDescription('A URL Shortener Microservice')
  .setVersion('1.0')
  .addBearerAuth()
  .addSecurityRequirements('bearer')
  .build()
  const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document)
  await app.listen(3001);
}
bootstrap();
