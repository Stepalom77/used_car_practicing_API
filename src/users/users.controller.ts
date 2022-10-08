import { Controller, Body, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { createUsersDto } from './dtos/create-users.dto';
import { UsersService } from './users.service';
@Controller('/auth')
export class UsersController {
    constructor(private usersService: UsersService){

    }
    @Post('/signup')
    create(@Body() body:createUsersDto){
        return this.usersService.createUser(body.email, body.password)
    }

    @Get('get-users')
    findAll(){
        //this.usersService.findUsers()
    }

    @Get('/:id')
    findOne(@Param('id') id:string){
        return this.usersService.findUser(parseInt(id))
    }
}
