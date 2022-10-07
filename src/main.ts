import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7500, () => {
    console.log('Listening on port:7500')
  });
}
bootstrap();
