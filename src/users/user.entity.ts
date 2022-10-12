import { Reports } from "src/reports/reports.entity";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate, OneToMany } from "typeorm";


@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;
    
    @Column()
    password:string

    @OneToMany(() => Reports, (report) => report.user)
    reports: Reports[]

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