import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  addMedicine,
  getUserMedicines,
  deleteMedicine,
} from "../services/api";

const Medicines = () => {
  const { user } = useAuth();

  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    time: "",
    period: "",
    days: "",
  });

  // FETCH
  const fetchMedicines = async () => {
    try {
      const res = await getUserMedicines(user.id);
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchMedicines();
  }, [user]);

  // ADD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMedicine({ ...formData, userId: user.id });
      setFormData({
        name: "",
        dosage: "",
        time: "",
        period: "",
        days: "",
      });
      fetchMedicines();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteMedicine(id);
      fetchMedicines();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={containerStyle}>

      {/* ===== FORM ===== */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>💊 Add Medicine</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            placeholder="Medicine Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <input
            style={inputStyle}
            placeholder="Dosage (e.g. 500mg)"
            value={formData.dosage}
            onChange={(e) =>
              setFormData({ ...formData, dosage: e.target.value })
            }
            required
          />

          <input
            type="time"
            style={inputStyle}
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
            required
          />

          <select
            style={inputStyle}
            value={formData.period}
            onChange={(e) =>
              setFormData({ ...formData, period: e.target.value })
            }
            required
          >
            <option value="">Select Period</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
            <option>Night</option>
          </select>

          <input
            style={inputStyle}
            placeholder="Days (e.g. 7)"
            value={formData.days}
            onChange={(e) =>
              setFormData({ ...formData, days: e.target.value })
            }
            required
          />

          <button style={buttonStyle}>Add Medicine</button>
        </form>
      </div>

      {/* ===== LIST ===== */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>📋 Your Medicines</h2>

        {medicines.length === 0 ? (
          <p style={{ color: "#aaa" }}>No medicines added</p>
        ) : (
          medicines.map((m) => (
            <div key={m.id} style={medicineCard}>
              <div>
                <h3>{m.name}</h3>
                <p>💊 {m.dosage}</p>
                <p>⏰ {m.time} ({m.period})</p>
                <p>📅 {m.days} days</p>
              </div>

              <button
                style={deleteBtn}
                onClick={() => handleDelete(m.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Medicines;
const containerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: "30px",
  padding: "20px"
};

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "15px",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};

const titleStyle = {
  marginBottom: "20px",
  color: "#fff"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
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

const medicineCard = {
  background: "rgba(255,255,255,0.08)",
  padding: "15px",
  borderRadius: "12px",
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderLeft: "4px solid #6366f1"
};

const deleteBtn = {
  background: "transparent",
  border: "1px solid #ef4444",
  color: "#ef4444",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};