import bycrypt from 'bcrypt';

export class RegisterUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    
    async excecute({name, email, password}) {
        
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bycrypt.hash(password, 10);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    }
}