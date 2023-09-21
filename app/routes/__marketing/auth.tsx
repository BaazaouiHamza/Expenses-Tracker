import { type ActionFunction, type LinksFunction } from "@remix-run/node"
import authStyles from '../../styles/auth.css'
import AuthForm from "~/components/auth/authForm"
import { validateCredentials } from "~/data/validation.server"
import { CustomError, login, signUp } from "~/data/auth.server"

export default function AuthPage() {
    return <AuthForm />
}

export const action: ActionFunction = async ({ request }) => {
    const searchParams = new URL(request.url).searchParams
    const authMode = searchParams.get('mode') || 'login'

    const formData = await request.formData()
    const credentials = {
        email: formData.get('email'),
        password: formData.get('password'),
    }


    try {
        validateCredentials(credentials)
    } catch (error) {
        return error
    }

    try {
        if (authMode === 'login') {
            return await login(credentials)
        } else {
            return await signUp(credentials)

        }
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                credentials: error.message
            }
        }
    }
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: authStyles }]
}