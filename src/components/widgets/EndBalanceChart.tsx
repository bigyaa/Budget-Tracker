import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const EndBalanceChart = ({
  data,
}: {
  data: { month: string; balance: number }[];
}) => {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        End Balance Per Month
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="balance" fill="#6A994E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EndBalanceChart;
