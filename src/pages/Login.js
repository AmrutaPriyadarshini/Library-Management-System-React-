import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (id === "Amruta" && pwd === "Amruta@678") {
      sessionStorage.setItem("isLogin", "yes"); // same as Session in C#
      navigate("/StudentReg"); // redirect to StudentReg.jsx
    } else {
      setError("Invalid ID or Password.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">User ID</label>
          <input type="text" className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>

        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
}
