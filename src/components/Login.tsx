import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase-config';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Google Authentication
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  // Email/Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            Sign in with Google
          </button>
        </div>

        <p className="text-center mt-4">
          <button className="text-blue-600 underline" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </button>
        </p>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button className="text-blue-600 underline" onClick={() => navigate("/register")}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;