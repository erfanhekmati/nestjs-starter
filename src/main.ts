import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerIntialize } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const configService = app.get(ConfigService);

  SwaggerIntialize(app);

  const PORT = configService.getOrThrow<number>('app.port');
  await app.listen(PORT);

  Logger.log(`App is listening on port ${PORT} ...`, 'Bootstrap');
}
bootstrap();
