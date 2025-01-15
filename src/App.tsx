import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ManageIncome from "./components/ManageIncome";
import ManageExpense from "./components/ManageExpense";
import ManageSavings from "./components/ManageSavings";

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
