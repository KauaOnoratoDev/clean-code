import { User } from "@prisma/client";


export interface ICreateUserDTO {
    name: string;
    email: string;
}

export interface IUserRepository {
    createUser({name, email}: ICreateUserDTO): void;
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, data: User): Promise<User>;
    deleteUser(id: string): void;
}
