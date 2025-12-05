import { useState } from "react";
import axios from "axios";
import "./Login.css"; // optional for extra styling

export default function Login() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!id || !pwd) {
      setError("⚠ Please enter both ID and Password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", {
        id,
        password: pwd,
      });

      if (res.data.success) {
        setError("");
        alert("Login Success");
        // redirect to homepage
        window.location.href = "/";
      } else {
        setError("❌ Invalid ID or Password");
      }
    } catch (err) {
      setError("❌ Server error, try again later");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
        backgroundImage: "url('../assets/LoginBack.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "400px",
          borderRadius: "20px",
          border: "none",
          background: "#ffffffee",
        }}
      >
        {/* Title */}
        <h1
          className="text-center mb-4"
          style={{
            color: "#1b5e20",
            fontWeight: "bold",
            textShadow: "1px 1px #c8e6c9",
          }}
        >
          Login
        </h1>

        {/* ID */}
        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#2e7d32", fontWeight: 600 }}
          >
            👤 ID
          </label>
          <input
            type="text"
            className="form-control border-success"
            placeholder="Enter your ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#2e7d32", fontWeight: 600 }}
          >
            🔒 Password
          </label>
          <input
            type="password"
            className="form-control border-success"
            placeholder="Enter your password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <div className="d-grid mb-3">
          <button
            className="btn"
            onClick={handleLogin}
            style={{
              background: "linear-gradient(45deg,#a5d6a7,#81c784)",
              border: "none",
              fontWeight: "bold",
              color: "#1b5e20",
              borderRadius: "30px",
              padding: "10px 0",
            }}
          >
            Login
          </button>
        </div>

        {/* Error Label */}
        {error && (
          <div
            className="text-center fw-bold mt-2"
            style={{ color: "#d32f2f" }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}