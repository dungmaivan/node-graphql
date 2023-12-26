import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(
    `Welcome to nestjs, Application is running on: ${await app.getUrl()}`,
  );
}
bootstrap();
