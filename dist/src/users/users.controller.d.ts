import { createUsersDto } from './dtos/create-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Users } from './user.entity';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    whoAmI(user: Users): Users;
    create(body: createUsersDto, session: any): Promise<Users>;
    signin(body: createUsersDto, session: any): Promise<Users>;
    signout(session: any): Promise<void>;
    findAll(email: string): Promise<Users[]>;
    findOne(id: string): Promise<Users>;
    delete(id: string): Promise<Users>;
    update(id: string, body: UpdateUserDto): Promise<Users>;
}
