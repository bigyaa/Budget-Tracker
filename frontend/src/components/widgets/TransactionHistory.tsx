const transactions = [
    { id: 1, name: "Rent", amount: -1000, date: "2025-01-01" },
    { id: 2, name: "Salary", amount: 5000, date: "2025-01-01" },
    { id: 3, name: "Groceries", amount: -800, date: "2025-01-02" },
  ];
  
  const TransactionHistory = () => {
    return (
      <div className="bg-white shadow rounded p-6 flex-1">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <ul>
          {transactions.map((txn) => (
            <li key={txn.id} className="flex justify-between border-b py-2">
              <span>{txn.name}</span>
              <span
                className={`font-bold ${
                  txn.amount < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TransactionHistory;