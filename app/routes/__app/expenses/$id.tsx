import { redirect, type ActionFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";


export default function UpdateExpensesPage() {
    const navigate = useNavigate()

    function closeHandler() {
        //navigate programatically
        navigate('..')
    }
    return <Modal onClose={closeHandler} children={<ExpenseForm />} />
}

// export const loader: LoaderFunction = ({ params }) => {
//     console.log("EXPENSE ID LOADER")
//     return getExpense(params.id)
// }

export const action: ActionFunction = async ({ params, request }) => {
    const expenseId = params.id
    if (request.method === 'PATCH') {
        const formData = await request.formData()
        const expenseData = Object.fromEntries(formData)

        try {
            validateExpenseInput(expenseData);
        } catch (error) {
            return error
        }

        await updateExpense(expenseId, expenseData)
        return redirect('/expenses')
    }
    else {
        await deleteExpense(expenseId)
        return redirect('/expenses')
    }


}
