import TransactionManager from "./TransactionManager";
import { useState, useEffect } from "react";

const ManageIncome = () => {
  const [incomeTransactions, setIncomeTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetch("/src/dataset.json")
      .then((response) => response.json())
      .then((data) => setIncomeTransactions(data.incomeTransactions));
  }, []);

  return <TransactionManager category="Income" transactions={incomeTransactions} setTransactions={setIncomeTransactions} />;
};

export default ManageIncome;