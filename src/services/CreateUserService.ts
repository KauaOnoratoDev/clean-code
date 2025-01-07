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
        this.userRepository.createUser({name, email})
    }
}

export default CreateUserService;
