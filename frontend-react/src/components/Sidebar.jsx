import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#0f172a",
        color: "white",
        height: "100vh",
        padding: "20px"
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>🔥 FLAME2</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          🏠 Dashboard
        </Link>

        <Link to="/detection" style={{ color: "white", textDecoration: "none" }}>
          📷 Detection
        </Link>

        <Link to="/sensor" style={{ color: "white", textDecoration: "none" }}>
          🌡 Sensor
        </Link>

        <Link to="/history" style={{ color: "white", textDecoration: "none" }}>
          📊 History
        </Link>

        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
          ℹ About
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;