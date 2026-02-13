import React from "react";
import { Link } from "react-router-dom";


function Footer() {
  
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        
        {/* 🔹 Brand & About */}
        <div style={styles.footerCol}>
          <h3 style={styles.footerBrand}>Wowmart</h3>
          <p style={styles.footerText}>
            Creating premium everyday essentials with a focus on quality, 
            sustainability, and timeless design.
          </p>
          <div style={styles.socialIcons}>
            {/* <span>FB</span> <span>IG</span> <span>TW</span> <span>PT</span> */}
          </div>
        </div>

        {/* 🔹 Quick Links */}
        <div style={styles.footerCol}>
          <h4 style={styles.footerHeading}>SHOP</h4>
          <div style={styles.footerLinksRow}>
            <Link to="/" style={styles.footerLink}>New Arrivals</Link>
            <Link to="/" style={styles.footerLink}>Best Sellers</Link>
            <Link to="/" style={styles.footerLink}>Collections</Link>
            <Link to="/" style={styles.footerLink}>Sale</Link>
          </div>
        </div>

        {/* 🔹 Support */}
        <div style={styles.footerCol}>
          <h4 style={styles.footerHeading}>HELP</h4>
          <div style={styles.footerLinksRow}>
            <Link to="/" style={styles.footerLink}>Shipping & Returns</Link>
            <Link to="/" style={styles.footerLink}>Track Order</Link>
            <Link to="/" style={styles.footerLink}>Size Guide</Link>
            <Link to="/" style={styles.footerLink}>Contact Us</Link>
          </div>
        </div>

        {/* 🔹 Newsletter (Makes it look Realistic) */}
        <div style={styles.newsletterCol}>
          <h4 style={styles.footerHeading}>JOIN THE LIST</h4>
          <p style={styles.newsletterText}>Sign up for early access to new drops.</p>
          <div style={styles.inputGroup}>
            <input type="email" placeholder="Email Address" style={styles.input} />
            <button style={styles.subscribeBtn}>JOIN</button>
          </div>
        </div>

      </div>

      {/* 🔹 Bottom Bar */}
      <div style={styles.footerBottom}>
        <div style={styles.bottomInner}>
          <p style={styles.copyText}>© 2026 E-SHOP CLOTHING. ALL RIGHTS RESERVED.</p>
          <div style={styles.paymentIcons}>
            {/* Payment placeholders (Realistic touch) */}
            VISA • MASTER • UPI • AMEX
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

/* ===== 🎨 LUXURY DARK STYLES ===== */

const styles = {
  footer: { 
    background: "#090f0fff", // Pure black for luxury feel
    color: "#fff", 
    padding: "80px 5% 40px 5%", 
    fontFamily: "'Inter', sans-serif" 
  },
  footerInner: { 
    maxWidth: "1400px", 
    margin: "0 auto", 
    display: "flex", 
    gap: "40px", 
    flexWrap: "wrap", 
    justifyContent: "space-between" 
  },
  footerCol: { 
    flex: "1 1 200px", 
    minWidth: "150px" 
  },
  footerBrand: { 
    fontSize: "24px", 
    fontWeight: "900", 
    letterSpacing: "2px", 
    marginBottom: "20px", 
    color: "#fff" 
  },
  footerHeading: { 
    fontSize: "12px", 
    fontWeight: "700", 
    letterSpacing: "1.5px", 
    color: "#fff", 
    marginBottom: "25px",
    textTransform: "uppercase"
  },
  footerText: { 
    color: "#888", 
    fontSize: "14px", 
    lineHeight: "1.6",
    marginBottom: "20px" 
  },
  footerLinksRow: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "12px" 
  },
  footerLink: { 
    color: "#888", 
    textDecoration: "none", 
    fontSize: "13px",
    fontWeight: "400",
    transition: "0.3s",
    ":hover": { color: "#fff" } // Works with CSS modules, for inline use hover state
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    fontSize: "11px",
    fontWeight: "700",
    color: "#fff",
    cursor: "pointer"
  },
  /* --- Newsletter Section --- */
  newsletterCol: {
    flex: "1 1 300px",
    minWidth: "250px"
  },
  newsletterText: {
    color: "#888",
    fontSize: "13px",
    marginBottom: "15px"
  },
  inputGroup: {
    display: "flex",
    borderBottom: "1px solid #333", // Minimalist input
    paddingBottom: "8px"
  },
  input: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "13px",
    width: "100%",
    outline: "none"
  },
  subscribeBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "1px"
  },
  /* --- Bottom Bar --- */
  footerBottom: { 
    marginTop: "80px", 
    borderTop: "1px solid #1a1a1a", 
    paddingTop: "30px" 
  },
  bottomInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px"
  },
  copyText: { 
    color: "#555", 
    fontSize: "11px", 
    letterSpacing: "1px" 
  },
  paymentIcons: {
    color: "#555",
    fontSize: "10px",
    letterSpacing: "2px",
    fontWeight: "700"
  }
};