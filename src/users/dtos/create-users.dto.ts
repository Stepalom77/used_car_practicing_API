import { IsEmail, IsString } from "class-validator";

export class createUsersDto {
    @IsEmail()
    email:string;

    @IsString()
    password:string
}