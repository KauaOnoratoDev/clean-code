import LocalUserRepository from "../../src/repositories/LocalUserRepository";
import CreateUserService from "../../src/services/CreateUserService";


/**
 * Para testar outro repositorio, trocar a classe da instancia userRepository
 */

describe('CreateUserService Test', () => {
    const userRepository = new LocalUserRepository(); // Trocar para testes
    const createUserService = new CreateUserService(userRepository);

    const dataUserTest = {
        name: 'test_name',
        email: 'email_test@email.com'
    }

    it('The CreateUser service must run correctly', async () => {
        createUserService.execute(dataUserTest);
        expect(createUserService).toBeDefined();
        
        try {
            await createUserService.execute(dataUserTest) //Tentando adicionar mesmo user
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe('Already registered user!')
            }
        }
    });
});