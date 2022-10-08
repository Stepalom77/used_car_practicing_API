import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  app.use(cookieSession({
    keys: ['hfbeiefb']
  }))
  await app.listen(7500, () => {
    console.log('Listening on port:7500')
  });
}
bootstrap();
