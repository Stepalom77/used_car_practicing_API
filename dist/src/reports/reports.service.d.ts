import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Reports } from './reports.entity';
import { Users } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Reports>);
    create(reportDto: CreateReportDto, user: Users): Promise<Reports>;
    createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto): Promise<any>;
    changeApproval(id: string, approved: boolean): Promise<Reports>;
}
