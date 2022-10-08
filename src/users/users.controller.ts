import { Controller, Body, Get, Post, Patch, Delete, Param, Query, NotFoundException } from '@nestjs/common';
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
    async findOne(@Param('id') id:string){
        const user = await this.usersService.findUser(parseInt(id))
        if(!user){
            throw new NotFoundException('The user you are trying to find does not exists')
        }
        return user
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id:string){
        const deletedUser = await this.usersService.findUser(parseInt(id))
        if(!deletedUser){
            throw new NotFoundException('The user you are trying to delete does not exists')
        }
        return this.usersService.deleteUser(parseInt(id))
    }

    @Patch('/update/:id')
    async update(@Param('id') id:string, @Body() body:UpdateUserDto){
        const updatedUser = await this.usersService.findUser(parseInt(id))
        if(!updatedUser){
            throw new NotFoundException('The user you are trying to update does not exists')
        }
        return this.usersService.updateUser(parseInt(id), body)
    }
}
