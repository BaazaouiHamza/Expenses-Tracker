import type { LinksFunction } from "@remix-run/node";

import { Outlet } from "@remix-run/react";
import expensesStyles from '../styles/expenses.css'
import ExpensesList from "~/components/expenses/ExpensesList";
import { Dummy_Expenses } from "~/types/Expense";

export default function ExpensesLayout() {
    return (
        <>
            <Outlet />
            <main>
                <ExpensesList expenses={Dummy_Expenses} />
            </main>
        </>
    )
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: expensesStyles }]
}