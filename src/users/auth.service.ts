import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { NotFoundError } from "rxjs";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){
    }

    async signup(email:string, password:string){
        //See if email is in use
        const users = await this.usersService.findUsers(email)
        if(users.length) {
            throw new BadRequestException('The email is already in use')
        }

        //Hash user password
        //Generate a salt
        const salt = randomBytes(8).toString('hex')

        //Hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer

        //Join the hashed result and the salt together

        const result = salt + '.' + hash.toString('hex')

        //create a new user and save it
        const user = await this.usersService.createUser(email, result)
        //return the user
        return user

    }

    async signin(email:string, password:string){
        const [users] = await this.usersService.findUsers(email)
        if(!users){
            throw new NotFoundException('There was an error, the user you are looking for does not exists')
        }

        const [salt, storedHash] = users.password.split('.')
        const hash = (await scrypt(password, salt, 32)) as Buffer

        if (storedHash !== hash.toString('hex')){
            throw new BadRequestException('The password is incorrect')
        } 
        return users
    }
}