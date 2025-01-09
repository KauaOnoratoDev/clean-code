import { IUserRepository } from "../repositories/IUserRepository";


interface IRequest {
    name: string;
    email: string;
}

class CreateUserService {
    constructor(private userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute({name, email}: IRequest) {
        try {
            this.userRepository.createUser({name, email})
        } catch (error) {
            throw error;
        }
    }
}

export default CreateUserService;
