import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import { onAuthStateChanged } from "@firebase/auth";
// Lazy loading is a technique that delays the loading of resources until they are needed.
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const ManageIncome = React.lazy(() => import("./components/ManageIncome"));
const ManageExpense = React.lazy(() => import("./components/ManageExpense"));
const ManageSavings = React.lazy(() => import("./components/ManageSavings"));

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />{" "}
      <Route path="/manage-income" element={<ManageIncome />} />
      <Route
        path="/manage-expenses"
        element={user ? <ManageExpense /> : <Navigate to="/login" />}
      />
      <Route
        path="/manage-savings"
        element={user ? <ManageSavings /> : <Navigate to="/login" />}
      />{" "}
      <Route
        path="/manage-income"
        element={user ? <ManageIncome /> : <Navigate to="/login" />}
      />{" "}
    </Routes>
  );
}

export default App;
