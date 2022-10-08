import { Controller, Body, Get, Post, Patch, Delete, Param, Query } from '@nestjs/common';
import { createUsersDto } from './dtos/create-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
@Controller('/auth')
export class UsersController {
    constructor(private usersService: UsersService){

    }
    @Post('/signup')
    create(@Body() body:createUsersDto){
        return this.usersService.createUser(body.email, body.password)
    }

    @Get()
    findAll(@Query('email') email:string){
        return this.usersService.findUsers(email)
    }

    @Get('/:id')
    findOne(@Param('id') id:string){
        return this.usersService.findUser(parseInt(id))
    }

    @Delete('/delete/:id')
    delete(@Param('id') id:string){
        return this.usersService.deleteUser(parseInt(id))
    }

    @Patch('/update/:id')
    update(@Param('id') id:string, @Body() body:UpdateUserDto){
        return this.usersService.updateUser(parseInt(id), body)
    }
}
