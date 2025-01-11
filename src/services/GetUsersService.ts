import { IUserRepository } from "../repositories/IUserRepository";

class GetUsersService {
    constructor(private userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    execute() {
        return this.userRepository.getUsers();
    }
}

export default GetUsersService;
