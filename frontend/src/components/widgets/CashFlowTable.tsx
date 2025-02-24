import React from 'react';
const CashFlowTable = ({ data }: { data: { category: string; total: number; monthly: number[] }[] }) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    return (
      <table className="table-auto w-full border-collapse border border-gray-200 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Total</th>
            {months.map((month) => (
              <th key={month} className="border border-gray-300 p-2">{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td className="border border-gray-300 p-2">{row.category}</td>
              <td className="border border-gray-300 p-2">${row.total.toFixed(2)}</td>
              {row.monthly.map((value, monthIdx) => (
                <td key={monthIdx} className="border border-gray-300 p-2">${value.toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default CashFlowTable;