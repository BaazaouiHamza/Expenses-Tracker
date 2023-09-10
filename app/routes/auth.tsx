import type { LinksFunction } from "@remix-run/node"
import authStyles from '../styles/auth.css'

export default function AuthPage() {
    return <h1>Auth Page</h1>
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: authStyles }]
}