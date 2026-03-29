import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addReminder, getUserReminders } from '../services/api';

const Reminders = () => {
  const { user } = useAuth();

  const [reminders, setReminders] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    date: ''
  });

  const fetchReminders = async () => {
    try {
      const res = await getUserReminders(user.id);
      setReminders(res.data);
    } catch (error) {
      console.error("Failed to fetch reminders", error);
    }
  };

  useEffect(() => {
    if (user?.id) fetchReminders();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReminder({
        ...formData,
        userId: user.id
      });

      setFormData({ title: '', time: '', date: '' });
      fetchReminders();
    } catch (error) {
      console.error("Failed to add reminder", error);
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '30px',
      padding: '20px'
    }}>

      {/* ===== FORM ===== */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>Set Reminder</h2>

        <form onSubmit={handleSubmit}>

          <input
            style={inputStyle}
            placeholder="Reminder Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <input
            style={inputStyle}
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />

          <input
            style={inputStyle}
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <button style={buttonStyle} type="submit">
            Create Reminder
          </button>

        </form>
      </div>

      {/* ===== LIST ===== */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>Your Reminders</h2>

        {reminders.length === 0 ? (
          <p style={{ color: "#aaa" }}>No reminders yet</p>
        ) : (
          reminders.map((reminder) => (
            <div key={reminder.id} style={reminderCard}>
              <h3 style={{ margin: 0 }}>{reminder.title}</h3>
              <p>⏰ {reminder.time}</p>
              <p>📅 {reminder.date}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Reminders;
const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "15px",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};

const titleStyle = {
  marginBottom: "20px",
  fontSize: "22px",
  color: "#fff"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#0f172a",
  color: "#fff"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const reminderCard = {
  background: "rgba(255,255,255,0.08)",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  borderLeft: "4px solid #6366f1"
};