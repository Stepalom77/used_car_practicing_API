import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Reports } from './reports.entity';
import { Users } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Reports) private repo:Repository<Reports>){}

    create(reportDto:CreateReportDto, user:Users){
        const report = this.repo.create(reportDto)
        report.user = user
        return this.repo.save(report)
    }

    createEstimate({make, model, lng, lat, year, mileage}:GetEstimateDto){
        return this.repo.createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make', {make})
        .andWhere('model = :model', {model})
        .andWhere('lng - :lng BETWEEN -5 AND 5', {lng})
        .andWhere('lat - :lat BETWEEN -5 AND 5', {lat})
        .andWhere('year - :year BETWEEN -3 AND 3', {year})
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({mileage})
        .limit(3)
        .getRawOne()
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
