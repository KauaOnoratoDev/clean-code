import { User } from "@prisma/client";


export interface IUserDTO {
    name: string;
    email: string;
}

export interface IUserRepository {
    createUser({name, email}: IUserDTO): void;
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, data: IUserDTO): Promise<User>;
    deleteUser(id: string): void;
}
