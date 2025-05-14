import React from "react";
import { Link } from "react-router-dom";

const heroImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

const testimonials = [
  {
    name: "Jane Doe",
    text: "This app made managing my health so much easier! Highly recommended.",
    img: "https://randomuser.me/api/portraits/women/50.jpg"
  },
  {
    name: "John Smith",
    text: "Booking appointments and finding doctors is a breeze now.",
    img: "https://randomuser.me/api/portraits/men/51.jpg"
  },
  {
    name: "Priya Patel",
    text: "The reminders feature keeps me on track with my medications.",
    img: "https://randomuser.me/api/portraits/women/52.jpg"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="flex items-center justify-between px-8 py-6 bg-transparent">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-blue-800">HealthApp</span>
        </div>
        <nav className="flex gap-6 text-lg font-semibold">
          <Link to="/appointments" className="hover:text-blue-600">Appointments</Link>
          <Link to="/reminders" className="hover:text-blue-600">Reminders</Link>
          <Link to="/doctors" className="hover:text-blue-600">Doctors Directory</Link>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
          <Link to="/register" className="hover:text-green-600">Register</Link>
        </nav>
      </header>
      <main className="flex flex-col md:flex-row items-center justify-between px-8 py-16">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">Health.<br />Powered by You.</h1>
          <p className="text-xl text-gray-700 mb-8">Supporting better health outcomes and clinical excellence with intelligent technology.</p>
          <a href="#" className="inline-block px-8 py-4 bg-blue-900 text-white rounded-full text-lg font-bold shadow hover:bg-blue-700 transition">Download App</a>
        </div>
        <img src={heroImage} alt="Hero" className="w-full max-w-lg rounded-2xl shadow-lg mt-10 md:mt-0" />
      </main>
      <section className="bg-white py-16 px-8 rounded-t-3xl shadow-lg mt-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">Testimonials</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-blue-50 rounded-xl shadow p-6 max-w-xs flex flex-col items-center">
              <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mb-4 border-4 border-blue-200" />
              <p className="text-lg text-gray-700 mb-2">"{t.text}"</p>
              <span className="font-bold text-blue-700">- {t.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 