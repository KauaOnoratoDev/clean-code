import { User } from "@prisma/client";
import { IUserRepository } from "../../src/repositories/IUserRepository";
import GetUsersService from "../../src/services/GetUsersService";

describe('Get Users Service Test', () => {
    let userRepository: IUserRepository;
    let getUsersService: GetUsersService;
    
    beforeAll(() => {
        userRepository = global.userRepository;
        userRepository.createUser({name: 'test', email: 'test@test.com'});
        getUsersService = new GetUsersService(userRepository);
    });

    function checkArraySize(array: User[]) {
        return array.length;
    }

    it('', async () => {
        const usersList = await getUsersService.execute();
        const usersListSize = checkArraySize(usersList);

        expect(usersListSize).toBeGreaterThan(0);
    });

});