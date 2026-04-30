import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to right,#020617,#0f172a)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center"
      }}
    >

      <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
        🔥 FLAME2-DT
      </h1>

      <p style={{ marginBottom: "30px", color: "#94a3b8" }}>
        Dual Modality Forest Fire Detection System
      </p>

      <div>

        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 25px",
            marginRight: "10px",
            background: "#f97316",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "12px 25px",
            background: "#1e293b",
            border: "1px solid #f97316",
            borderRadius: "6px",
            color: "#f97316",
            cursor: "pointer"
          }}
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default Home;