import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import HealthRecords from "./pages/HealthRecords";
import Reminders from "./pages/Reminders";

function App() {
  return (
    <AuthProvider> {/* ✅ IMPORTANT */}
      <Router>
        <Routes>

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/health-records" element={<HealthRecords />} />
          <Route path="/reminders" element={<Reminders />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;