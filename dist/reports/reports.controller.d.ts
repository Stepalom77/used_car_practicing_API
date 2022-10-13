import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { Users } from '../users/user.entity';
import { ApprovedReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportsController {
    private reportService;
    constructor(reportService: ReportsService);
    getEstimate(query: GetEstimateDto): Promise<any>;
    createReport(body: CreateReportDto, user: Users): Promise<import("./reports.entity").Reports>;
    approvedReport(id: string, body: ApprovedReportDto): Promise<import("./reports.entity").Reports>;
}
