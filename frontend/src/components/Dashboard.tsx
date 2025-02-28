import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase-config";
import AllocationSummaryChart from "./widgets/AllocationSummaryChart";
import CashFlowTable from "./widgets/CashFlowTable";
import EndBalanceChart from "./widgets/EndBalanceChart";
import IncomeGoalProgress from "./widgets/IncomeGoalProgress";
import PercentageBreakdownTable from "./widgets/PercentageBreakdownTable";

// Define proper types for the data
interface DashboardData {
  startDate: string;
  incomeGoal: string;
  totalIncome: string;
  leftToReachGoal: string;
  incomeGoalProgress: any;
  endBalance: any;
  allocationSummary: any;
  cashFlow: any;
  percentageBreakdown: any;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/src/dataset.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (path: string) => () => navigate(path);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  if (!data) return <div className="text-center p-8">No data available</div>;

  const SummaryCard: React.FC<{ title: string; value: string }> = ({
    title,
    value,
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-sm font-medium text-gray-500">{title}</h2>
      <p className="text-2xl font-semibold text-gray-800 mt-2">{value}</p>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Annual Overview</h2>
      </div>

      {/* Category Management Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {[
          { label: "Manage Income", path: "/manage-income", color: "blue" },
          {
            label: "Manage Expenses",
            path: "/manage-expenses",
            color: "green",
          },
          { label: "Manage Savings", path: "/manage-savings", color: "yellow" },
        ].map((button) => (
          <button
            key={button.path}
            className={`bg-${button.color}-600 text-white px-6 py-4 rounded-lg hover:bg-${button.color}-700 text-lg transition-colors`}
            onClick={handleNavigation(button.path)}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <SummaryCard title="Start Date" value={data.startDate} />
        <SummaryCard title="Income Goal" value={data.incomeGoal} />
        <SummaryCard title="Total Income" value={data.totalIncome} />
        <SummaryCard title="Left to Reach Goal" value={data.leftToReachGoal} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <IncomeGoalProgress data={data.incomeGoalProgress} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <EndBalanceChart data={data.endBalance} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <AllocationSummaryChart data={data.allocationSummary} />
        </div>
      </div>

      {/* Tables Section */}
      {["cashFlow", "percentageBreakdown"].map((type, index) => (
        <div key={type} className="bg-white p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {type === "cashFlow" ? "Cash Flow by Month" : "% by Month"}
          </h2>
          {type === "cashFlow" ? (
            <CashFlowTable data={data.cashFlow} />
          ) : (
            <PercentageBreakdownTable data={data.percentageBreakdown} />
          )}
        </div>
      ))}

      {/* Navigate to CRUD Management */}
      <div className="mt-10 text-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => handleNavigation("/manage-data")}
        >
          Manage Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
