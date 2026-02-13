import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function FakePaymentModal({ amount, onSuccess, onClose }) {
  const [timeLeft, setTimeLeft] = useState(300);
  const [verifying, setVerifying] = useState(false);
  const [paid, setPaid] = useState(false);

  const upiLink = `upi://pay?pa=wowmart@upi&pn=WowMart&am=${amount}&cu=INR`;

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);
  

  const handleFakePayment = () => {
    setVerifying(true);

    setTimeout(() => {
      setVerifying(false);
      setPaid(true);

      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2500);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const transactionId = "WM" + Math.floor(Math.random() * 1000000000);

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* HEADER */}
        {/* HEADER */}
<div style={header}>
  <div style={brandBox}>
    <img src="/logo.png" alt="Logo" style={logoImg} />
    <div>
      <h3 style={secureTitle}>Secure UPI Payment</h3>
      <small style={brandSub}>Powered by WowMart</small>
    </div>
  </div>
  <span style={closeBtn} onClick={onClose}>✕</span>
</div>


        {!paid ? (
          <div style={content}>
            <p style={scanText}>Scan QR using any UPI App</p>

            <div style={qrBox}>
              <QRCodeCanvas value={upiLink} size={190} />
            </div>

            <h2 style={amountText}>₹ {amount}</h2>

            <p style={timerStyle}>
              Expires in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </p>

            <div style={securityBadge}>
              🔒 End-to-End Encrypted & Secure
            </div>

            {verifying ? (
              <div style={{ marginTop: 25 }}>
                <div style={spinner}></div>
                <p style={{ color: "#555" }}>Verifying Payment...</p>
              </div>
            ) : (
              <button onClick={handleFakePayment} style={payBtn}>
                I Have Paid
              </button>
            )}

            <button onClick={onClose} style={cancelBtn}>
              Cancel Payment
            </button>
          </div>
        ) : (
          <div style={successContainer}>
            <div style={successIcon}>✓</div>
            <h2 style={successTitle}>Payment Successful</h2>
            <p style={{ color: "#666", marginBottom: 5 }}>Transaction ID</p>
            <b style={{ letterSpacing: 1 }}>{transactionId}</b>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(6px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10000,
};

const modal = {
  width: 400,
  background: "#ffffff",
  borderRadius: 22,
  overflow: "hidden",
  boxShadow: "0 25px 70px rgba(0,0,0,0.25)",
  animation: "fadeIn 0.3s ease",
};

const header = {
  background: "linear-gradient(135deg,#0d47a1,#1976d2)",
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#fff",
};

const brandBox = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const logoImg = {
  width: 60,
  height: 60,
  borderRadius: "50%",
  objectFit: "cover",
  background: "#fff",
};

const brandTitle = {
  margin: 0,
  fontSize: 18,
};

const secureTitle = {
  margin: 0,
  fontSize: 17,
  fontWeight: 600,
  letterSpacing: 0.3,
};

const brandSub = {
  color: "#e3f2fd",
  fontSize: 12,
  opacity: 0.9,
};


const closeBtn = {
  cursor: "pointer",
  fontSize: 18,
};

const content = {
  padding: "30px 25px 35px",
  textAlign: "center",
};

const scanText = {
  color: "#555",
  marginBottom: 20,
  fontSize: 14,
};

const qrBox = {
  margin: "0 auto 20px",
  width: 220,
  padding: 18,
  borderRadius: 18,
  background: "#f4f7ff",
};

const amountText = {
  margin: "10px 0 5px",
  fontSize: 28,
  color: "#0d47a1",
};

const timerStyle = {
  fontSize: 13,
  color: "#d32f2f",
  marginBottom: 10,
};

const securityBadge = {
  fontSize: 13,
  color: "#2e7d32",
  marginBottom: 25,
};

const payBtn = {
  padding: 14,
  width: "100%",
  background: "linear-gradient(135deg,#0d47a1,#1976d2)",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  fontWeight: 600,
  cursor: "pointer",
  marginBottom: 12,
};

const cancelBtn = {
  padding: 13,
  width: "100%",
  background: "#f1f3f6",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  color: "#555",
};

const successContainer = {
  padding: 45,
  textAlign: "center",
};

const successIcon = {
  width: 80,
  height: 80,
  borderRadius: "50%",
  background: "#2e7d32",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 36,
  margin: "0 auto 20px",
};

const successTitle = {
  marginBottom: 10,
  color: "#2e7d32",
};

const spinner = {
  width: 40,
  height: 40,
  border: "4px solid #eee",
  borderTop: "4px solid #1976d2",
  borderRadius: "50%",
  margin: "0 auto 10px",
  animation: "spin 1s linear infinite",
};

/* Animations */
const style = document.createElement("style");
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
`;
document.head.appendChild(style);
