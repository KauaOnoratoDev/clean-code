import { User } from "@prisma/client";


export interface IUserRepository {
    createUser({name, email}: User): void;
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, data: User): Promise<User>;
    deleteUser(id: string): void;
}
