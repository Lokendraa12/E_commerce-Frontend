import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  
  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await register(name, email, password, mobile);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay"></div>

      <div className="register-card">
        <img src="/logo.png" alt="WowMart" className="register-logo" />

        <h2>Create your WowMart account</h2>
        <p className="subtitle">Join India’s smart shopping community</p>

        <form onSubmit={submit}>
          <input
            required
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            required
            placeholder="Mobile Number"
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            required
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          <button type="submit">Create Account</button>
        </form>

        <p className="bottom-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}
