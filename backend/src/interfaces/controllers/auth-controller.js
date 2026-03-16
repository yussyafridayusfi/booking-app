import { PrismaUserRepository } from "../../infrastructure/repositories/prisma-user-repository.js";
import { RegisterUser } from "../../application/usecase/register-user.js";

export const register = async (req, res) => {

    try {
        const userRepository = new PrismaUserRepository();
        const registerUser = new RegisterUser(userRepository);

        const user = await registerUser.excecute(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}