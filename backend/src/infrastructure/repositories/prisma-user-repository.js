import prisma from '../database/prisma.js';

export class PrismaUserRepository {

    async findByEmail(email) {
        return prisma.users.findUnique({
            where: { email }
        });
    }
    
    async create(data) {
        return prisma.users.create({
            data
        });
    }

}