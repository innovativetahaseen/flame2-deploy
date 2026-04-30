import { useState, useEffect } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

const [form, setForm] = useState({
username: "",
password: ""
});

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

// If user already logged in → redirect to dashboard
useEffect(() => {
const token = localStorage.getItem("token");
if (token) {
navigate("/dashboard");
}
}, [navigate]);

const handleSubmit = async (e) => {
e.preventDefault();


if (!form.username || !form.password) {
  setError("Please enter username and password");
  return;
}

if (form.password.length < 4) {
  setError("Password must be at least 4 characters");
  return;
}

setError("");
setLoading(true);

try {

  const data = await loginUser(form);

  if (data.access_token) {

    // Save token
    localStorage.setItem("token", data.access_token);

    // Redirect to dashboard
    navigate("/dashboard");

  } else {
    setError("Username or password does not match");
  }

} catch (err) {
  setError("Login failed. Try again.");
}

setLoading(false);


};

return (


<div
  style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right,#020617,#0f172a)",
    color: "white"
  }}
>

  <div
    style={{
      background: "#1e293b",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 0 20px rgba(0,0,0,0.5)",
      width: "320px"
    }}
  >

    <h2 style={{ textAlign: "center" }}>🔐 Login</h2>

    {error && (
      <p style={{ color: "#f87171", textAlign: "center" }}>
        {error}
      </p>
    )}

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br /><br />

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          background: loading ? "#6b7280" : "#f97316",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          color: "white",
          fontWeight: "bold"
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>

    <p style={{ textAlign: "center", marginTop: "15px" }}>
      Don’t have an account?{" "}
      <span
        onClick={() => navigate("/register")}
        style={{
          color: "#f97316",
          cursor: "pointer"
        }}
      >
        Register
      </span>
    </p>

  </div>

</div>


);
}

export default Login;
