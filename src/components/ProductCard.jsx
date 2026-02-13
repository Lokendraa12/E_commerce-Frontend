import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const styles = {
    card: {
      width: "100%",
      background: "#fff",
      borderRadius: "12px",
      overflow: "hidden",
      position: "relative",
      border: "1px solid #eee",
      transition: "0.3s",
    },

    cardHover: {
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
      transform: "translateY(-4px)",
    },

    badge: {
      position: "absolute",
      top: 12,
      left: 12,
      background: "#ff4d4d",
      color: "#fff",
      padding: "4px 10px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: "bold",
      zIndex: 5,
    },

    img: {
      width: "100%",
      height: "260px",
      objectFit: "cover",
    },

    info: {
      padding: "14px",
    },

    name: {
      fontSize: "15px",
      fontWeight: 600,
      color: "#333",
    },

    price: {
      marginTop: "4px",
      fontSize: "16px",
      fontWeight: "bold",
    },

    oldPrice: {
      marginLeft: "8px",
      color: "#888",
      textDecoration: "line-through",
      fontSize: "14px",
    },

    actions: {
      marginTop: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    viewLink: {
      color: "#007bff",
      textDecoration: "none",
      fontSize: "14px",
    },

    buyBtn: {
      padding: "6px 12px",
      background: "#0d6efd",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  return (
    <div
      className="card"
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
        e.currentTarget.style.transform = styles.cardHover.transform;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {product.isFeatured && <span style={styles.badge}>SALE</span>}

      <img
        style={styles.img}
        src={product.images?.[0] || "https://via.placeholder.com/640x480"}
        alt={product.name}
      />

      <div style={styles.info}>
        <h3 style={styles.name}>{product.name}</h3>

        <div style={styles.price}>
          ₹{product.discountPrice || product.price}
          {product.discountPrice && (
            <span style={styles.oldPrice}>₹{product.price}</span>
          )}
        </div>

        <div style={styles.actions}>
          <Link to={`/product/${product._id}`} style={styles.viewLink}>
            View
          </Link>

          <Link to={`/product/${product._id}`}>
            <button style={styles.buyBtn}>Buy</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
