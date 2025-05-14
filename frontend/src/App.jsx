import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Appointments from "./pages/Appointments";
import Reminders from "./pages/Reminders";
import Doctors from "./pages/Doctors";

function Placeholder({ title }) {
  return <div className="min-h-screen flex items-center justify-center text-3xl font-bold text-blue-700">{title} Page (Coming Soon)</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/doctors" element={<Doctors />} />
    </Routes>
  );
}
