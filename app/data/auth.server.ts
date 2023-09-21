import { prisma } from "./database.server"
import { hash } from 'bcryptjs'
export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export const signUp = async ({ email, password }) => {
    const existingUser = await prisma.user.findFirst({ where: { email } })
    if (existingUser) {
        const error = new CustomError('A user with the provided email address exists already.', 422)
        throw error
    }

    const passwordHash = await hash(password, 12)

    await prisma.user.create({
        data: {
            email: email,
            password: passwordHash
        }
    })
}