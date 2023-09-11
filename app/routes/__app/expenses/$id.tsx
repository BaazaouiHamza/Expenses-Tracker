import type { LoaderFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { getExpense } from "~/data/expenses.server";

export default function UpdateExpensesPage() {
    const navigate = useNavigate()

    function closeHandler() {
        //navigate programatically
        navigate('..')
    }
    return <Modal onClose={closeHandler} children={<ExpenseForm />} />
}

export const loader: LoaderFunction = ({ params }) => {
    return getExpense(params.id)
}