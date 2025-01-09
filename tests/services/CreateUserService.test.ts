import CreateUserService from "../../src/services/CreateUserService";


describe('CreateUserService Test', () => {
    let createUserService: CreateUserService;
    
    const dataUserTest = {
        name: 'test_name',
        email: 'email_test@email.com'
    }
    
    beforeAll(() => {
        createUserService = new CreateUserService(global.userRepository);

    });

    it('The CreateUser service must run correctly', async () => {
        await createUserService.execute(dataUserTest);
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