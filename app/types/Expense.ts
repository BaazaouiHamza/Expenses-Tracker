export type Expense = {
    id: string
    title: string
    amount: number
    date: string
}

export const Dummy_Expenses: Expense[] = [
    {
        id: 'e1',
        title: "First Expense",
        amount: 12.96,
        date: new Date().toISOString()
    },
    {
        id: 'e2',
        title: "Second Expense",
        amount: 16.96,
        date: new Date().toISOString()
    }
]