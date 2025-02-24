import React from 'react';
const PercentageBreakdownTable = ({
  data,
}: {
  data: { month: string; needs: number; wants: number; savings: number }[];
}) => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-200 text-center">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 p-2">Month</th>
          <th className="border border-gray-300 p-2">Needs (%)</th>
          <th className="border border-gray-300 p-2">Wants (%)</th>
          <th className="border border-gray-300 p-2">Savings (%)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td className="border border-gray-300 p-2">{row.month}</td>
            <td className="border border-gray-300 p-2">{row.needs}%</td>
            <td className="border border-gray-300 p-2">{row.wants}%</td>
            <td className="border border-gray-300 p-2">{row.savings}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PercentageBreakdownTable;
