import TransactionManager from "./TransactionManager";
import { useState, useEffect } from "react";

const ManageExpenses = () => {
  const [expensesTransactions, setExpensesTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetch("/src/dataset.json")
      .then((response) => response.json())
      .then((data) => setExpensesTransactions(data.expensesTransactions));
  }, []);

  return <TransactionManager category="Expenses" transactions={expensesTransactions} setTransactions={setExpensesTransactions} />;
};

export default ManageExpenses;