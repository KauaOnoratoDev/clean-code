import {v4 as uuid} from 'uuid';
import { User } from "@prisma/client";
import { IUserDTO, IUserRepository } from "./IUserRepository";


function userExistsByEmail(email: string, db: User[]): boolean {
    const userExistsByEmail = db.some((user) => user.email === email);

    return userExistsByEmail;
}

class LocalUserRepository implements IUserRepository {
    private userDb: User[]

    constructor() {
        this.userDb = [];
    }

    createUser({ name, email }: IUserDTO): void {
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

    async updateUser(id: string, data: IUserDTO): Promise<User> {
        const userIndex = this.userDb.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            throw new Error('User not found!');
        }

        const updatedUser = this.userDb[userIndex] = {id, ...data};
        return updatedUser;
    }

    deleteUser(id: string): void {
        const userIndex = this.userDb.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new Error('User not found!');
        }

        this.userDb.splice(userIndex, 1);
    }
}

export default LocalUserRepository;