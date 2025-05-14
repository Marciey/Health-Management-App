import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/login");
      setUser(u);
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "reminders"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setReminders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    if (!newReminder) {
      setError("Please enter a reminder.");
      return;
    }
    try {
      await addDoc(collection(db, "reminders"), {
        uid: user.uid,
        text: newReminder
      });
      setNewReminder("");
    } catch (err) {
      setError("Failed to add reminder.");
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "reminders", id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-pink-700 mb-6">Reminders</h2>
        <form className="flex gap-4 mb-8" onSubmit={handleAdd}>
          <input className="flex-1 p-2 border rounded" placeholder="Add reminder..." value={newReminder} onChange={e => setNewReminder(e.target.value)} required />
          <button type="submit" className="bg-pink-500 text-white px-6 py-2 rounded font-bold hover:bg-pink-600 transition">Add</button>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <h3 className="text-xl font-semibold mb-4">Your Reminders</h3>
        {loading ? <div>Loading...</div> : reminders.length === 0 ? <div>No reminders yet.</div> : (
          <ul className="space-y-4">
            {reminders.map(r => (
              <li key={r.id} className="flex items-center justify-between bg-pink-50 rounded-lg p-4 shadow">
                <div className="font-bold text-pink-800">{r.text}</div>
                <button className="text-red-500 hover:underline" onClick={() => handleDelete(r.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 