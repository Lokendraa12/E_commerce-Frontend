import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay} className="login-overlay"></div>

      <div style={styles.card} className="login-card">
        {/* Logo */}
        <img src="/logo.png" alt="WowMart" style={styles.logo} />

        <h2 style={styles.title}>Sign in to WowMart</h2>
        <p style={styles.subtitle}>
          Shop smarter. Faster. Better.
        </p>

        <form onSubmit={submit} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={styles.btn}>
            Login
          </button>

          <p style={styles.bottomText}>
            New to WowMart?
            <Link to="/register" style={styles.link}>
              {" "}
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
  },

  card: {
    position: "relative",
    width: "380px",
    padding: "35px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.95)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    textAlign: "center",
    zIndex: 1,
  },
   
  logo: {
    width: "100px",
    marginBottom: "12px",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#555",
  },

  form: {
    marginTop: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    padding: "13px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
  },

  btn: {
    marginTop: "8px",
    padding: "13px",
    borderRadius: "8px",
    background: "#111",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },

  bottomText: {
    marginTop: "14px",
    fontSize: "14px",
  },

  link: {
    color: "#0f4c81",
    fontWeight: "600",
    textDecoration: "none",
  },

  
};
