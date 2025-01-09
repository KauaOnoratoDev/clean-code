import LocalUserRepository from "./src/repositories/LocalUserRepository";
import { IUserRepository } from "./src/repositories/IUserRepository";

declare global {
    var userRepository: IUserRepository;
}

beforeAll(() => {
    // Trocar classe para testar outros repositorios
    global.userRepository = new LocalUserRepository();
});

