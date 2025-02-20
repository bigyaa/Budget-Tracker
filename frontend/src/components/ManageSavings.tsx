import { useEffect, useState } from 'react';

import TransactionManager from './TransactionManager';

const ManageSavings = () => {
  const [savingsTransactions, setSavingsTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetch("/src/dataset.json")
      .then((response) => response.json())
      .then((data) => setSavingsTransactions(data.savingsTransactions));
  }, []);

  return <TransactionManager category="Savings" transactions={savingsTransactions} setTransactions={setSavingsTransactions} />;
};

export default ManageSavings;