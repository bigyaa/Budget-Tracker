import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { onAuthStateChanged, User } from '@firebase/auth';

import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import Register from './components/Register';
import { auth } from './firebase-config';

// Lazy loading components
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const ManageIncome = React.lazy(() => import("./components/ManageIncome"));
const ManageExpense = React.lazy(() => import("./components/ManageExpense"));
const ManageSavings = React.lazy(() => import("./components/ManageSavings"));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    Loading...
  </div>
);

// Protected route component
interface ProtectedRouteProps {
  element: React.ReactNode;
  user: User | null;
}

const ProtectedRoute = ({ element, user }: ProtectedRouteProps) => {
  return user ? element : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute user={user} element={<Dashboard />} />} />
        <Route path="/manage-income" element={<ProtectedRoute user={user} element={<ManageIncome />} />} />
        <Route path="/manage-expenses" element={<ProtectedRoute user={user} element={<ManageExpense />} />} />
        <Route path="/manage-savings" element={<ProtectedRoute user={user} element={<ManageSavings />} />} />
        
        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
