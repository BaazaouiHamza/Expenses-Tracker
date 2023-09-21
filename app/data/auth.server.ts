import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./database.server"
import { hash, compare } from 'bcryptjs'
export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

const SESSION_SECRET = process.env.SESSION_SECRET

const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === "production",
        secrets: [SESSION_SECRET],
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: true
    }
})

const createUserSession = async (userId, redirectPath) => {
    const session = await sessionStorage.getSession()
    session.set('userId', userId)
    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session)
        }
    })
}

export const getUserFromSession = async (request: Request) => {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'))

    const userId = session.get('userId')

    if (!userId) {
        return null
    }

    return userId
}

export const signUp = async ({ email, password }) => {
    const existingUser = await prisma.user.findFirst({ where: { email } })
    if (existingUser) {
        const error = new CustomError('A user with the provided email address exists already.', 422)
        throw error
    }

    const passwordHash = await hash(password, 12)

    const user = await prisma.user.create({
        data: {
            email: email,
            password: passwordHash
        }
    })

    return createUserSession(user.id, "/expenses")
}

export const login = async ({ email, password }) => {
    const existingUser = await prisma.user.findFirst({ where: { email } })

    if (!existingUser) {
        const error = new CustomError('Could not log you in,please check the provided credentials.', 401)
        throw error
    }

    const passwordCorrect = await compare(password, existingUser.password)
    if (!passwordCorrect) {
        const error = new CustomError('Could not log you in,please check the provided credentials.', 401)
        throw error
    }

    return createUserSession(existingUser.id, '/expenses')
}