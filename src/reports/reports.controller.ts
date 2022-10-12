import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Users } from '../users/user.entity';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService){}
    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body:CreateReportDto, @CurrentUser() user:Users) {
        return this.reportService.create(body, user)
    }
}
