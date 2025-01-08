import { User } from "@prisma/client";
import { IUserRepository } from "../../src/repositories/IUserRepository";
import LocalUserRepository from "../../src/repositories/LocalUserRepository";

describe('Repository methods Test', () => {
    let userRepository: IUserRepository;

    function isDefinedName(usersList: User[], name: string): boolean {
        if (usersList[0].name !== name) {
            throw new Error('Name not defined');
        }

        return true;
    }

    beforeAll(() => {
        userRepository = new LocalUserRepository();
    });

    it('createUser method must create the user correctly', async () => {
        userRepository.createUser({
            name: 'test',
            email: 'test@test.com'
        });

        const users = await userRepository.getUsers();
        const definedName = isDefinedName(users, 'test');

        expect(users).toBeDefined();
        expect(definedName).toBeTruthy();
        
    });
});