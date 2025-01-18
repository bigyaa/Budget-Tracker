import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import Login from "./components/Login";
import Register from "./components/Register";
// Lazy loading is a technique that delays the loading of resources until they are needed.
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const ManageIncome = React.lazy(() => import("./components/ManageIncome"));
const ManageExpense = React.lazy(() => import("./components/ManageExpense"));
const ManageSavings = React.lazy(() => import("./components/ManageSavings"));

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
  }, []);

   return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />      <Route path="/manage-income" element={<ManageIncome />} />
      <Route path="/manage-expenses" element={<ManageExpense />} />
      <Route path="/manage-savings" element={<ManageSavings />} />{" "}
    </Routes>
  );
}

export default App;
