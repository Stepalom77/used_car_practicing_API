import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/user.entity';
import { Reports } from './reports/reports.entity';
const  cookieSession = require('cookie-session');
@Module({
  imports:[TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db.sqlite',
    entities: [Users, Reports],
    synchronize:true
  }) ,UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_PIPE,
    useValue:  new ValidationPipe({
      whitelist: true
    })
  }]
})
export class AppModule {
  configure(consumer:MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: ['hfbeiefb']
    }))
    .forRoutes('*')
  }
}