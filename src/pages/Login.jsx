import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

          <div style={styles.passwordWrapper}>
  <input
    style={styles.input}
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <span
    style={styles.eyeIcon}
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M3.587 13.779c1.78 1.769 4.883 4.22 8.413 4.22s6.634-2.451 8.413-4.22c.47-.467.705-.7.854-1.159c.107-.327.107-.913 0-1.24c-.15-.458-.385-.692-.854-1.159C18.633 8.452 15.531 6 12 6c-3.53 0-6.634 2.452-8.413 4.221c-.47.467-.705.7-.854 1.159c-.107.327-.107.913 0 1.24c.15.458.384.692.854 1.159"></path><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path></g></svg> : <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"></path></svg>}
  </span>
</div>


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
    width: "100%",
  },
  passwordWrapper: {
  position: "relative",
  display: "flex",
  alignItems: "center",
},

eyeIcon: {
  position: "absolute",
  right: "15px",
  cursor: "pointer",
  fontSize: "18px",
  userSelect: "none",
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
