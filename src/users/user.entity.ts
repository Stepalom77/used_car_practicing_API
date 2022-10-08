import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;
    
    @Column()
    password:string

    @AfterInsert()
    logInsert(){
        console.log('Insert User with id ' +  this.id)
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Update User with id ' + this.id)
    }

    @AfterRemove()
    logDelete(){
        console.log('Delete User with id ' + this.id)
    }
}