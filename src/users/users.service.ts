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
}
