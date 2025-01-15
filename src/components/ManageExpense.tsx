import TransactionManager from "./TransactionManager";
import { useState, useEffect } from "react";

const ManageExpense = () => {
  const [expenseTransactions, setExpenseTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetch("/src/dataset.json")
      .then((response) => response.json())
      .then((data) => setExpenseTransactions(data.expenseTransactions));
  }, []);

  return <TransactionManager category="Expense" transactions={expenseTransactions} setTransactions={setExpenseTransactions} />;
};

export default ManageExpense;