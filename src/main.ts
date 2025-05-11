import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from 'helmet';
import fastifyCsrf from '@fastify/csrf-protection';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('POS Server')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  app.enableCors({
    origin: (origin, callback) => callback(null, true),
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: '*',
    credentials: true,
    preflightContinue: true,
  });
  app.use(helmet());

  await app.register(fastifyCsrf);

  await app.listen(6009, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
