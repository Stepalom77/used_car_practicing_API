import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Reports } from './reports.entity';
import { Users } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Reports) private repo:Repository<Reports>){}

    create(reportDto:CreateReportDto, user:Users){
        const report = this.repo.create(reportDto)
        report.user = user
        return this.repo.save(report)
    }

    async changeApproval(id:string, approved:boolean) {
        const report = await this.repo.findOne({where: {id:parseInt(id)}})
        if(!report){
            throw new NotFoundException('There was an error, report not found')
        }
        report.approved = approved
        return this.repo.save(report)
    }
}
