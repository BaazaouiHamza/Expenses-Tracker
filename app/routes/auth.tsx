import type { LinksFunction } from "@remix-run/node"
import authStyles from '../styles/auth.css'
import AuthForm from "~/components/auth/authForm"

export default function AuthPage() {
    return <AuthForm />
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: authStyles }]
}