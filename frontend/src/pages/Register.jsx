import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const bgImage = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/appointments");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-6 text-green-700 drop-shadow">Register</h2>
        <form className="w-full" onSubmit={handleRegister}>
          <input className="w-full mb-4 p-3 border-2 border-green-300 rounded focus:ring-2 focus:ring-green-400 transition" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full mb-4 p-3 border-2 border-green-300 rounded focus:ring-2 focus:ring-green-400 transition" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-gradient-to-r from-green-500 via-yellow-400 to-pink-500 hover:from-green-600 hover:to-pink-600 text-white p-3 rounded-xl font-bold shadow transition mb-2" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
        </form>
        <div className="mt-2 text-sm">
          Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
} 