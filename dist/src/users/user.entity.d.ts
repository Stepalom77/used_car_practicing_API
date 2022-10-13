import { Reports } from "../reports/reports.entity";
export declare class Users {
    id: number;
    email: string;
    password: string;
    admin: boolean;
    reports: Reports[];
    logInsert(): void;
    logUpdate(): void;
    logDelete(): void;
}
