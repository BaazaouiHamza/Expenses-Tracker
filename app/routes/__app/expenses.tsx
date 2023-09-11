import { Outlet } from "@remix-run/react";
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
