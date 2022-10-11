import { Controller, Body, Get, Post, Patch, Delete, Param, Query, NotFoundException, Session, UseGuards} from '@nestjs/common';
import { createUsersDto } from './dtos/create-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Users } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';
@Serialize(UserDto)
@Controller('/auth')
export class UsersController {
    constructor(private usersService: UsersService, private authService:AuthService){
    }
    @UseGuards(AuthGuard)
    @Get('/whoami')
    whoAmI(@CurrentUser() user: Users){
            return user
        }
    
    @Post('/signup')
    async create(@Body() body:createUsersDto, @Session() session:any){
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id
        return user
    }
    
    @Post('/signin')
    async signin(@Body() body:createUsersDto, @Session() session:any){
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id
        return user
    }
    @Post('/signout')
    async signout(@Session() session:any){
        session.userId = null
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
