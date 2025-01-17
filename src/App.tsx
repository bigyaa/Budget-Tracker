import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
// Lazy loading is a technique that delays the loading of resources until they are needed.
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const ManageIncome = React.lazy(() => import("./components/ManageIncome"));
const ManageExpense = React.lazy(() => import("./components/ManageExpense"));
const ManageSavings = React.lazy(() => import("./components/ManageSavings"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/manage-income" element={<ManageIncome />} />
      <Route path="/manage-expenses" element={<ManageExpense />} />
      <Route path="/manage-savings" element={<ManageSavings />} />{" "}
    </Routes>
  );
}

export default App;
