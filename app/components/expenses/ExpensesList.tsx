import ExpenseListItem from './ExpenseListItem';
import type { Expense } from '~/types/Expense';

type Props = {
  expenses: Expense[]
}

const ExpensesList: React.FC<Props> = ({ expenses }) => {

  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;