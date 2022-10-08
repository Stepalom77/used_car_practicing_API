import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private repo:Repository<Users>){
    }

    createUser(email:string, password:string){
        const user = this.repo.create({email, password})
        return this.repo.save(user)
    }

    findUsers(email:string){
        return  this.repo.find({where:{email}})
    }

    async findUser(id:number){
        const foundUser = await this.repo.findOne({where:{id}})
        return foundUser
    }

    async updateUser(id:number, attrs:Partial<Users>){
        let updatedUser = await this.repo.findOne({where:{id}})
        Object.assign(updatedUser, attrs)
        return this.repo.save(updatedUser)
    }

    async deleteUser(id:number){
        let deletedUser = await this.repo.findOne({where:{id}})
        return this.repo.remove(deletedUser)
    }
}
