import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const doctors = [
  "Dr. Alice Smith (Cardiologist)",
  "Dr. John Doe (Dermatologist)",
  "Dr. Priya Patel (Pediatrician)",
  "Dr. Michael Lee (Orthopedic)"
];

export default function Appointments() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctor, setDoctor] = useState("");
  const [appointments, setAppointments] = useState([]);
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
    const q = query(collection(db, "appointments"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setAppointments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    if (!date || !time || !doctor) {
      setError("Please fill all fields.");
      return;
    }
    try {
      await addDoc(collection(db, "appointments"), {
        uid: user.uid,
        date,
        time,
        doctor
      });
      setDate(""); setTime(""); setDoctor("");
    } catch (err) {
      setError("Failed to add appointment.");
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "appointments", id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Appointments</h2>
        <form className="flex flex-col md:flex-row gap-4 mb-8" onSubmit={handleAdd}>
          <input type="date" className="p-2 border rounded flex-1" value={date} onChange={e => setDate(e.target.value)} required />
          <input type="time" className="p-2 border rounded flex-1" value={time} onChange={e => setTime(e.target.value)} required />
          <select className="p-2 border rounded flex-1" value={doctor} onChange={e => setDoctor(e.target.value)} required>
            <option value="">Select Doctor</option>
            {doctors.map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition">Add</button>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <h3 className="text-xl font-semibold mb-4">Your Appointments</h3>
        {loading ? <div>Loading...</div> : appointments.length === 0 ? <div>No appointments yet.</div> : (
          <ul className="space-y-4">
            {appointments.map(a => (
              <li key={a.id} className="flex items-center justify-between bg-blue-50 rounded-lg p-4 shadow">
                <div>
                  <div className="font-bold text-blue-800">{a.doctor}</div>
                  <div className="text-gray-700">{a.date} at {a.time}</div>
                </div>
                <button className="text-red-500 hover:underline" onClick={() => handleDelete(a.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 