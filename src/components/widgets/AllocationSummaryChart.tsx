import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#E07A5F", "#6A994E", "#F2CC8F"];

const AllocationSummaryChart = ({
  data,
}: {
  data: { category: string; value: number }[];
}) => {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Allocation Summary
      </h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default AllocationSummaryChart;
