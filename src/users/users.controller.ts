import { Controller, Body, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { createUsersDto } from './dtos/create-users.dto';
@Controller('auth')
export class UsersController {
    @Post('/signup')
    createUser(@Body() body:createUsersDto){
        console.log(body)
    }
}
