import type { LoaderFunction } from "@remix-run/node";
import { Dummy_Expenses } from "~/types/Expense";


export const loader: LoaderFunction = () => {
    return Dummy_Expenses
}