import { User } from "@prisma/client";
import { IUserRepository } from "../../src/repositories/IUserRepository";
import LocalUserRepository from "../../src/repositories/LocalUserRepository";

describe('Repository methods Test', () => {
    let userRepository: IUserRepository;

    const dataUserTest = {
        name: 'test',
        email: 'test@test.com'
    }

    function isDefinedName(usersList: User[], name: string): boolean {
        const user = usersList.some(user => user.name === name);
        
        if (!user) {
            throw new Error('Name not defined');
        }

        return user;
    }

    function returnUserId(userslist: User[], userName: string): string {
        const filteredUser = userslist.find(user => user.name === userName);

        if (!filteredUser) {
            throw new Error('User not found');
        }

        const userId = filteredUser.id;
        return userId;
    } 

    beforeAll(() => {
        userRepository = new LocalUserRepository();

        userRepository.createUser({
            name: 'name_test',
            email: 'emailTest@email.com'
        });
    });


    it('createUser method must create the user correctly', async () => {
        userRepository.createUser(dataUserTest);

        const users = await userRepository.getUsers();
        const definedName = isDefinedName(users, 'test');

        expect(users).toBeDefined();
        expect(definedName).toBeTruthy();
        
    });


    it('createUser method should not create an existing user', async () => {
        try {
            userRepository.createUser(dataUserTest);
        } catch(error) {
            if (error instanceof Error) {
                expect(error.message).toBe('Already registered user!')
            }
        }
    });


    it('getUserById method must return the user correctly', async () => {
        const usersList = await userRepository.getUsers();
        const userId = returnUserId(usersList, 'name_test')

        const user = await userRepository.getUserById(userId);

        expect(user).toBeDefined();
        expect(user.name).toBe('name_test');
    });
});