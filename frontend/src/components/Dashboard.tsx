import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase-config';
import AllocationSummaryChart from './widgets/AllocationSummaryChart';
import CashFlowTable from './widgets/CashFlowTable';
import EndBalanceChart from './widgets/EndBalanceChart';
import IncomeGoalProgress from './widgets/IncomeGoalProgress';
import PercentageBreakdownTable from './widgets/PercentageBreakdownTable';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/src/dataset.json");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Annual Overview</h1>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {/* Category Management Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <button
          className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 text-lg"
          onClick={() => navigate("/manage-income")}
        >
          Manage Income
        </button>
        <button
          className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 text-lg"
          onClick={() => navigate("/manage-expenses")}
        >
          Manage Expenses
        </button>
        <button
          className="bg-yellow-600 text-white px-6 py-4 rounded-lg hover:bg-yellow-700 text-lg"
          onClick={() => navigate("/manage-savings")}
        >
          Manage Savings
        </button>
      </div>

      {/* Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        {/* Start Date */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-sm font-medium text-gray-500">Start Date</h2>
          <p className="text-2xl font-semibold text-gray-800 mt-2">
            {data.startDate}
          </p>
        </div>

        {/* Income Goal */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-sm font-medium text-gray-500">Income Goal</h2>
          <p className="text-2xl font-semibold text-gray-800 mt-2">
            {data.incomeGoal}
          </p>
        </div>

        {/* Total Income */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-sm font-medium text-gray-500">Total Income</h2>
          <p className="text-2xl font-semibold text-gray-800 mt-2">
            {data.totalIncome}
          </p>
        </div>

        {/* Left to Reach Goal */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-sm font-medium text-gray-500">
            Left to Reach Goal
          </h2>
          <p className="text-2xl font-semibold text-gray-800 mt-2">
            {data.leftToReachGoal}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Income Goal Progress Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <IncomeGoalProgress data={data.incomeGoalProgress} />
        </div>

        {/* End Balance Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow-md ">
          <EndBalanceChart data={data.endBalance} />
        </div>

        {/* Allocation Summary Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <AllocationSummaryChart data={data.allocationSummary} />
        </div>
      </div>

      {/* Cash Flow Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Cash Flow by Month
        </h2>
        <CashFlowTable data={data.cashFlow} />
      </div>

      {/* Percentage Breakdown Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">% by Month</h2>
        <PercentageBreakdownTable data={data.percentageBreakdown} />
      </div>

      {/* Navigate to CRUD Management */}
      <div className="mt-10 text-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/manage-data")}
        >
          Manage Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
