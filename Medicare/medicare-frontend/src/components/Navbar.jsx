import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "10px", background: "#eee" }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/medicines">Medicines</Link> |{" "}
      <Link to="/health-records">Health</Link> |{" "}
      <Link to="/reminders">Reminders</Link>

      {user && (
        <button onClick={logout} style={{ float: "right" }}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;