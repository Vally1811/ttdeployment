import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addHealthRecord, getUserHealthRecords as getHealthRecords } from "../services/api";

const HealthRecords = () => {
  const { user } = useAuth();

  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    value: ""
  });

  // FETCH RECORDS
  const fetchRecords = async () => {
    try {
      const res = await getHealthRecords(user.id); // same name as your old code
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records", err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchRecords();
  }, [user]);

  // ADD RECORD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHealthRecord({
        ...formData,
        userId: user.id
      });

      setFormData({ type: "", value: "" });
      fetchRecords();
    } catch (err) {
      console.error("Error adding record", err);
    }
  };

  return (
    <div style={containerStyle}>

      {/* FORM */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>➕ Add Health Record</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            placeholder="Type (BP / Sugar)"
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            required
          />

          <input
            style={inputStyle}
            placeholder="Value"
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
            required
          />

          <button style={buttonStyle}>Save Record</button>
        </form>
      </div>

      {/* LIST */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>📊 Your Health Records</h2>

        {records.length === 0 ? (
          <p style={{ color: "#aaa" }}>No records yet</p>
        ) : (
          records.map((r) => (
            <div key={r.id} style={recordCard}>
              <h3>{r.type}</h3>
              <p>📅 {new Date(r.recordedAt).toLocaleString()}</p>
              <p>💡 Value: {r.value}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HealthRecords;

// STYLES
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

const recordCard = {
  background: "rgba(255,255,255,0.08)",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  borderLeft: "4px solid #22c55e"
};