import {v4 as uuid} from 'uuid';
import { User } from "@prisma/client";
import { IUserRepository } from "./IUserRepository";


function userExistsByEmail(email: string, db: User[]): boolean {
    const userExistsByEmail = db.some((user) => user.email === email);

    return userExistsByEmail;
}

class LocalUserRepository implements IUserRepository {
    constructor(private userDb: User[]) {
        this.userDb = [];
    }

    createUser({ name, email }: User): void {
        const id = uuid();
        const user = {name, email, id}
        const userExists = userExistsByEmail(email, this.userDb)

        if (userExists) {
            throw new Error('Usuário já cadastrado!')
        }

        this.userDb.push(user);
    }

    async getUsers(): Promise<User[]> {
        return this.userDb;
    }

    async getUserById(id: string): Promise<User> {
        const user = this.userDb.find((user) => user.id === id);

        if (!user) {
            throw new Error('User not found!');
        }

        return user;
    }

    updateUser(id: string, data: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    deleteUser(id: string): void {
        throw new Error("Method not implemented.");
    }
}

export default LocalUserRepository;