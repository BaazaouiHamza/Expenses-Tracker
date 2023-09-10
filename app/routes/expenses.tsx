import type { LinksFunction } from "@remix-run/node";

import { Outlet } from "@remix-run/react";
import expensesStyles from '../styles/expenses.css'

export default function ExpensesLayout() {
    return <main>
        <p>Shared Element!</p>
        <Outlet />
    </main>
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: expensesStyles }]
}