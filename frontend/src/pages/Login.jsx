import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const bgImage = "https://images.unsplash.com/photo-1511174511562-5f97f4f4b3c4?auto=format&fit=crop&w=1200&q=80";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/appointments");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-700 drop-shadow">Login</h2>
        <form className="w-full" onSubmit={handleLogin}>
          <input className="w-full mb-4 p-3 border-2 border-blue-300 rounded focus:ring-2 focus:ring-blue-400 transition" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full mb-4 p-3 border-2 border-blue-300 rounded focus:ring-2 focus:ring-blue-400 transition" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 rounded-xl font-bold shadow transition mb-2" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        <div className="mt-2 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
} 