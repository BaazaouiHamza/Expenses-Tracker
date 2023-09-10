import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import { Dummy_Expenses } from "~/types/Expense";




export default function ExpensesAnalysisPage() {
    return <main>
        <Chart expenses={Dummy_Expenses} />
        <ExpenseStatistics expenses={Dummy_Expenses} />
    </main>
}