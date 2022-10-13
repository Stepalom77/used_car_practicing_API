import { Repository } from 'typeorm';
import { Users } from './user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<Users>);
    createUser(email: string, password: string): Promise<Users>;
    findUsers(email: string): Promise<Users[]>;
    findUser(id: number): Promise<Users>;
    updateUser(id: number, attrs: Partial<Users>): Promise<Users>;
    deleteUser(id: number): Promise<Users>;
}
