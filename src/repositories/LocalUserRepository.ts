import {v4 as uuid} from 'uuid';
import { User } from "@prisma/client";
import { ICreateUserDTO, IUserRepository } from "./IUserRepository";


function userExistsByEmail(email: string, db: User[]): boolean {
    const userExistsByEmail = db.some((user) => user.email === email);

    return userExistsByEmail;
}

class LocalUserRepository implements IUserRepository {
    private userDb: User[]

    constructor() {
        this.userDb = [];
    }

    createUser({ name, email }: ICreateUserDTO): void {
        const id = uuid();
        const user = {name, email, id}
        const userExists = userExistsByEmail(email, this.userDb)

        if (userExists) {
            throw new Error('Already registered user!')
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