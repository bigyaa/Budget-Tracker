import React from 'react';
import { Cell, Pie, PieChart } from 'recharts';

const data = [
  { name: "Rent", value: 1000 },
  { name: "Groceries", value: 800 },
  { name: "Utilities", value: 400 },
  { name: "Entertainment", value: 300 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d84c88"];

const ExpenseChartWidget = () => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-bold mb-4">Expense Breakdown</h2>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ExpenseChartWidget;