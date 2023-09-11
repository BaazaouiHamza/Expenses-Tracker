import { Link, Outlet } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { Dummy_Expenses } from "~/types/Expense";

export default function ExpensesLayout() {
    return (
        <>
            <Outlet />
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus />
                        <span>Add Expense</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload />
                        <span>Load Raw Data</span>
                    </a>
                </section>
                <ExpensesList expenses={Dummy_Expenses} />
            </main>
        </>
    )
}
