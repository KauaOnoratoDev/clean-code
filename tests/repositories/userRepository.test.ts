import { User } from "@prisma/client";
import { IUserRepository } from "../../src/repositories/IUserRepository";
import LocalUserRepository from "../../src/repositories/LocalUserRepository";


/**
 * Para testar outro repositorio de usuarios, trocar a instancia userRepository
 * para receber o repositorio desejado
 */


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

    async function returnUserIdByName( userName: string): Promise<string> {
         const usersList = await userRepository.getUsers();
        
        const filteredUser = usersList.find(user => user.name === userName);

        if (!filteredUser) {
            throw new Error('User not found');
        }

        const userId = filteredUser.id;
        return userId;
    } 

    beforeAll(() => {
        userRepository = new LocalUserRepository(); // Colocar repositorio desejado

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
                expect(error.message).toBe('Already registered user!');
            }
        }
    });


    it('getUserById method must return the user correctly', async () => {
        const usersList = await userRepository.getUsers();
        const userId = await returnUserIdByName('name_test');

        const user = await userRepository.getUserById(userId);

        expect(user).toBeDefined();
        expect(user.name).toBe('name_test');
    });


    it('updateUser method must update the user correctly', async () => {
        const newData = {
            name: 'updated_name',
            email: 'updated_email'
        }
        const userId = await returnUserIdByName('name_test');
        const updatedUser = await userRepository.updateUser(userId, newData);

        expect( updatedUser.name).toBe(newData.name);
        expect(updatedUser.email).toBe(newData.email);
    });


    it('updateUser method should not update a user that does not exist', 
        async () => {
            const userId = 'nonExistingUserId';
            
            try {
                await userRepository.updateUser(userId, dataUserTest);
            } catch (error) {
                if (error instanceof Error) {
                    expect(error.message).toBe('User not found!');
                }
            }
    });
});