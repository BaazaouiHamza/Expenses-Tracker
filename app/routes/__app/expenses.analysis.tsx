import { json, type LoaderFunction } from "@remix-run/node";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import ErrorComponent from "~/components/util/Error";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";




export default function ExpensesAnalysisPage() {
    const expenses = useLoaderData()

    return (<main>
        <Chart expenses={expenses} />
        <ExpenseStatistics expenses={expenses} />
    </main>)
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserSession(request)

    const expenses = await getExpenses(userId)
    if (!expenses || expenses.length === 0) {
        throw json(
            { message: 'Could not load expenses for the requested analysis' },
            { status: 404, statusText: "No expenses found." })
    }
    return expenses
}

export const ErrorBoundary = () => {
    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        return <main>
            <ErrorComponent title={error.statusText}>
                <p>{error.data?.message || 'Something went wrong - could not load expenses.'}</p>
            </ErrorComponent>
        </main>
    }
}
