import { useState } from 'react';

const TransactionManager = ({
  category,
  transactions,
  setTransactions,
}: { category: string; transactions: { description: string; amount: number }[]; setTransactions: (transactions: { description: string; amount: number }[]) => void }) => {
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
  });
  const [editData, setEditData] = useState({
    index: -1,
    updatedTransaction: { description: "", amount: "" },
  });
  const [isEdit, setIsEdit] = useState(false);

  // Add or update a transaction
  const handleAddOrUpdate = () => {
    const updatedTransactions = [...transactions];
    if (isEdit) {
      updatedTransactions[editData.index] = {
        ...editData.updatedTransaction,
        amount: parseFloat(editData.updatedTransaction.amount),
      };
      setIsEdit(false);
    } else {
      updatedTransactions.push({
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
      });
    }
    setTransactions(updatedTransactions);
    setNewTransaction({ description: "", amount: "" });
    setEditData({
      index: -1,
      updatedTransaction: { description: "", amount: "" },
    });
  };

  // Edit a transaction
  const handleEdit = (index: number) => {
    setIsEdit(true);
    setEditData({ index, updatedTransaction: transactions[index] });
  };

  // Delete a transaction
  const handleDelete = (index: number) => {
    const updatedTransactions = transactions.filter((_, i: number) => i !== index);
    setTransactions(updatedTransactions);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Manage {category}</h1>
      </div>

      {/* Add Transaction */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit" : "Add New"} Transaction
        </h2>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Description"
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
            value={
              isEdit
                ? editData.updatedTransaction.description
                : newTransaction.description
            }
            onChange={(e) =>
              isEdit
                ? setEditData({
                    ...editData,
                    updatedTransaction: {
                      ...editData.updatedTransaction,
                      description: e.target.value,
                    },
                  })
                : setNewTransaction({
                    ...newTransaction,
                    description: e.target.value,
                  })
            }
          />
          <input
            type="number"
            placeholder="Amount"
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/4"
            value={
              isEdit
                ? editData.updatedTransaction.amount
                : newTransaction.amount
            }
            onChange={(e) =>
              isEdit
                ? setEditData({
                    ...editData,
                    updatedTransaction: {
                      ...editData.updatedTransaction,
                      amount: e.target.value,
                    },
                  })
                : setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value,
                  })
            }
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleAddOrUpdate}
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Transactions Table */}
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
            {transactions.map((transaction: { description: string; amount: number }, index: number) => (
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
