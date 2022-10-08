import { Controller, Body, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { createUsersDto } from './dtos/create-users.dto';
import { UsersService } from './users.service';
@Controller('/auth')
export class UsersController {
    constructor(private usersService: UsersService){

    }
    @Post('/signup')
    createUser(@Body() body:createUsersDto){
        this.usersService.createUser(body.email, body.password)
    }
}
