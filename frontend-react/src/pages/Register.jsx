import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {

      const res = await registerUser({
        username: form.username,
        email: form.email,
        password: form.password
      });

      if (res.msg === "User already exists") {
        setError(res.msg);
      } else {

        alert("Registration Successful!");

        navigate("/login");
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="register-container">

      <div className="register-header">
        <h1>🔥 FLAME2-DT</h1>
        <p>Create your account</p>
      </div>

      <div className="register-card">
        <h2>Register</h2>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleRegister}>

          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="login-link">
          Already registered? <Link to="/login">Sign in</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;