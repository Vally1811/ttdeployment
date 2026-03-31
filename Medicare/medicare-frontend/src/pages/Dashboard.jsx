import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getUserMedicines,
  getUserHealthRecords,
  getUserReminders
} from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    medicines: 0,
    records: 0,
    reminders: 0
  });

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning 🌅";
    if (hour < 18) return "Good Afternoon ☀️";
    return "Good Evening 🌙";
  };

  // Fetch counts
  const fetchStats = async () => {
    try {
      const [meds, recs, rems] = await Promise.all([
        getUserMedicines(user.id),
        getUserHealthRecords(user.id),
        getUserReminders(user.id)
      ]);

      setStats({
        medicines: meds.data.length,
        records: recs.data.length,
        reminders: rems.data.length
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchStats();
  }, [user]);

  return (
    <div style={container}>

      {/* HEADER */}
      <h1 style={title}>
        {getGreeting()}, {user?.name}! 👋
      </h1>
      <p style={subtitle}>
        Here’s your health overview at a glance.
      </p>

      {/* CARDS */}
      <div style={grid}>

        {/* MEDICINES */}
        <div style={card} onClick={() => navigate("/medicines")}>
          <h2>💊 Medicines</h2>
          <p>Manage your prescriptions</p>
          <h3>{stats.medicines}</h3>
          <span>View Medicines →</span>
        </div>

        {/* HEALTH */}
        <div style={card} onClick={() => navigate("/health-records")}>
          <h2>📊 Health Records</h2>
          <p>Your vitals & history</p>
          <h3>{stats.records}</h3>
          <span>View Records →</span>
        </div>

        {/* REMINDERS */}
        <div style={card} onClick={() => navigate("/reminders")}>
          <h2>🔔 Reminders</h2>
          <p>Stay on track</p>
          <h3>{stats.reminders}</h3>
          <span>View Reminders →</span>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
const container = {
  padding: "30px"
};

const title = {
  fontSize: "32px",
  color: "#fff",
  marginBottom: "10px"
};

const subtitle = {
  color: "#aaa",
  marginBottom: "30px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px"
};

const card = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "15px",
  backdropFilter: "blur(10px)",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
};