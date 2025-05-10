import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

export function SwaggerIntialize(app: INestApplication<any>) {
  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.getOrThrow<string>('swagger.title'))
    .setDescription(configService.getOrThrow<string>('swagger.description'))
    .setVersion(configService.getOrThrow<string>('app.version'))
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  const theme = new SwaggerTheme();

  const swaggerOptions = {
    swaggerOptions: {
      operationsSorter: (
        a: { get: (str: string) => string },
        b: { get: (str: string) => string },
      ) => {
        const methodsOrder = [
          'get',
          'post',
          'put',
          'patch',
          'delete',
          'options',
          'trace',
        ];
        let result =
          methodsOrder.indexOf(a.get('method')) -
          methodsOrder.indexOf(b.get('method'));
        if (result === 0) result = a.get('path').localeCompare(b.get('path'));
        return result;
      },
    },
    explorer: true,
    customCss: theme.getBuffer(configService.getOrThrow('swagger.theme')),
  };

  SwaggerModule.setup(
    configService.getOrThrow<string>('swagger.path'),
    app,
    swaggerDocument,
    swaggerOptions,
  );
}
