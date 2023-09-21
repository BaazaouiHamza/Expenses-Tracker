import type { ActionFunction, LinksFunction } from "@remix-run/node"
import authStyles from '../../styles/auth.css'
import AuthForm from "~/components/auth/authForm"
import { validateCredentials } from "~/data/validation.server"

export default function AuthPage() {
    return <AuthForm />
}

export const action: ActionFunction = async ({ request }) => {
    const searchParams = new URL(request.url).searchParams
    const authMode = searchParams.get('mode') || 'login'

    const formData = await request.formData()
    const credentials = Object.fromEntries(formData)


    try {
        validateCredentials(credentials)
    } catch (error) {
        return error
    }

    if (authMode === 'login') {
        //login
    } else {
        // sign up
    }
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: authStyles }]
}