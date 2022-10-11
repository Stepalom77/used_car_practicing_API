import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { Users } from "./user.entity";
import { UsersService } from "./users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('AuthService', () => {
    let service:AuthService
    let fakeUsersService:Partial<UsersService>

beforeEach(async () => {
        //Create fake copy of UsersService
        const users: Users[] = []
         fakeUsersService = {
            findUsers: (email:string) => {
                const filteredUsers = users.filter(user => user.email === email)
                return Promise.resolve(filteredUsers)
            },
            createUser: (email:string, password:string) => {
                const user = {id: Math.floor(Math.random() * 999999), email, password} as Users
                users.push(user)
                return Promise.resolve(user)
            }
        }
        const module =  await Test.createTestingModule({
            providers: [AuthService,
            {
                provide: UsersService,
                useValue: fakeUsersService,
            },
        ],
        }).compile()
    
         service = module.get(AuthService)
})



it('can create an instance of auth service', async () => {
    expect(service).toBeDefined()
})

it('creates a new user with a salted and hashed password', async () => {
    console.log(service)
    const user = await service.signup('ste@email.com', '12345')
    expect(user.password).not.toEqual('12345')
    const [salt, hash] = user.password.split('.')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
})

it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('ste@email.com', '12345')
    await expect(service.signup('ste@email.com', '12345')).rejects.toThrow(BadRequestException)
})

it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('ste@email.com', '12345'),
    ).rejects.toThrow(NotFoundException)
})

it('throws if an invalid password is provided', async () => {
    await service.signup('ste@email.com', '12345')
    await expect(service.signin('ste@email.com', '123456'),
    ).rejects.toThrow(BadRequestException)
})

it('returns a user if correct password is provided', async () => {
    await service.signup('ste@email.com', '12345')
    const user = await service.signin('ste@email.com', '12345')
    expect(user).toBeDefined()
})
})