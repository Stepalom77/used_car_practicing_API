import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { Users } from "../user.entity";
declare global {
    namespace Express {
        interface Request {
            currentUser?: Users;
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private usersService;
    constructor(usersService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
