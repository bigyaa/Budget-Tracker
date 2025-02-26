import React from 'react';
import { useState } from 'react';

const TransactionManager = ({
  category,
  transactions,
  setTransactions,
}: {
  category: string;
  transactions: { description: string; amount: number }[];
  setTransactions: (
    transactions: { description: string; amount: number }[]
  ) => void;
}) => {
  const [transactionData, setTransactionData] = useState({
    description: "",
    amount: "",
    index: -1,
  });

  const handleAddOrUpdate = () => {
    const updatedTransactions = [...transactions];
    const amount = parseFloat(transactionData.amount);

    if (transactionData.index >= 0) {
      updatedTransactions[transactionData.index] = {
        description: transactionData.description,
        amount,
      };
    } else {
      updatedTransactions.push({
        description: transactionData.description,
        amount,
      });
    }

    setTransactions(updatedTransactions);
    setTransactionData({ description: "", amount: "", index: -1 });
  };

  const handleEdit = (index: number) => {
    const { description, amount } = transactions[index];
    setTransactionData({ description, amount: amount.toString(), index });
  };

  const handleDelete = (index: number) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Manage {category}</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {transactionData.index >= 0 ? "Edit" : "Add New"} Transaction
        </h2>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
            value={transactionData.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/4"
            value={transactionData.amount}
            onChange={handleChange}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleAddOrUpdate}
          >
            {transactionData.index >= 0 ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="table-auto w-full border-collapse border border-gray-200 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">
                  {transaction.description}
                </td>
                <td className="border border-gray-300 p-2">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionManager;
