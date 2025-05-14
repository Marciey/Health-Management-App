import React, { useState } from "react";
import { motion } from "framer-motion";

const doctors = [
  { name: "Dr. Alice Smith", specialty: "Cardiologist", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Dr. John Doe", specialty: "Dermatologist", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Dr. Priya Patel", specialty: "Pediatrician", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Dr. Michael Lee", specialty: "Orthopedic", img: "https://randomuser.me/api/portraits/men/65.jpg" },
  { name: "Dr. Sarah Kim", specialty: "Neurologist", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Dr. David Brown", specialty: "General Physician", img: "https://randomuser.me/api/portraits/men/75.jpg" },
];

export default function Doctors() {
  const [search, setSearch] = useState("");
  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Doctors Directory</h2>
        <input className="mb-8 p-3 border rounded w-full" placeholder="Search doctors..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((doc, i) => (
            <motion.div key={i} className="flex flex-col items-center gap-2 bg-blue-50 rounded-xl shadow p-6 hover:scale-105 transition cursor-pointer" whileHover={{ scale: 1.05 }}>
              <img src={doc.img} alt={doc.name} className="w-20 h-20 rounded-full border-4 border-blue-200 mb-2" />
              <div className="font-bold text-blue-800 text-lg">{doc.name}</div>
              <div className="text-sm text-gray-600">{doc.specialty}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 