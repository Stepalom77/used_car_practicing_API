import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController{
    @Get()
    getHello(){
      return 'Server up and running ✅'
    }
  }