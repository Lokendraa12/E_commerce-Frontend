import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTshirts } from "../services/tshirtApi";

export default function TShirtPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    getAllTshirts()
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={containerStyle}>
      {/* 🔹 Header Section */}
      <nav style={breadcrumb}>Home  / <span style={{color: "#000"}}>T-Shirts</span></nav>
      

      {/* 🔹 Product Grid */}
      <div style={gridStyle}>
        {products.map((p) => {
          const isHovered = hoveredId === p._id;
          return (
            <div
              key={p._id}
              onClick={() => navigate(`/product/tshirt/${p._id}`)}
              onMouseEnter={() => setHoveredId(p._id)}
              onMouseLeave={() => setHoveredId(null)}
              style={productCard}
            >
              {/* IMAGE CONTAINER */}
              <div style={imageWrapper}>
                <img
                  src={(isHovered && p.images?.[1]) ? p.images[1] : p.images?.[0]}
                  alt={p.name}
                  style={imageStyle(isHovered)}
                />
                
                {/* Minimalist Save Badge */}
                {p.oldPrice && (
                  <div style={discountBadge}>
                    -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                  </div>
                )}

                {/* Quick Add Overlay (Appears on Hover) */}
                {isHovered && !window.innerWidth < 768 && (
                  <div style={quickAddOverlay}>VIEW PRODUCT</div>
                )}
              </div>

              {/* DETAILS */}
              <div style={infoContainer}>
                <p style={categoryLabel}>{p.category?.toUpperCase() || "T-SHIRT"}</p>
                <h3 style={productName}>{p.name}</h3>
                
                <div style={priceWrapper}>
                  <span style={currentPrice}>₹{p.price.toLocaleString()}</span>
                  {p.oldPrice && (
                    <span style={strikePrice}>₹{p.oldPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ===== 🎨 PREMIUM STYLES (No Background Colors) ===== */

const containerStyle = {
  padding: "60px 5%",
  backgroundColor: "#ffffff",
  minHeight: "100vh",
  fontFamily: "'Inter', sans-serif",
};

const headerSection = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: "40px",
  borderBottom: "1px solid #eee",
  paddingBottom: "20px",
};

const mainTitle = {
  fontSize: "32px",
  fontWeight: "300",
  letterSpacing: "2px",
  margin: 0,
  color: "#1a1a1a",
};
const breadcrumb = {
  fontSize: "11px",
  letterSpacing: "1px",
  color: "#aaa",
  marginBottom: "40px",
  textTransform: "uppercase",
};

const productCount = {
  fontSize: "13px",
  color: "#888",
  marginTop: "5px",
  fontWeight: "400",
};

const filterPlaceholder = {
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "1px",
  cursor: "pointer",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  columnGap: "30px",
  rowGap: "50px",
};

const productCard = {
  cursor: "pointer",
  transition: "0.4s ease",
};

const imageWrapper = {
  width: "100%",
  height: "400px",
  overflow: "hidden",
  position: "relative",
  backgroundColor: "#f9f9f9", // Very light grey for image placeholder
};

const imageStyle = (hover) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)",
  transform: hover ? "scale(1.08)" : "scale(1)",
});

const discountBadge = {
  position: "absolute",
  top: "15px",
  left: "15px",
  backgroundColor: "#d40e0eff",
  color: "#fff",
  fontSize: "10px",
  fontWeight: "700",
  padding: "4px 8px",
  letterSpacing: "0.5px",
};

const quickAddOverlay = {
  position: "absolute",
  bottom: "0",
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.9)",
  textAlign: "center",
  padding: "12px 0",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1px",
  animation: "slideUp 0.3s ease",
};

const infoContainer = {
  padding: "15px 0",
};

const categoryLabel = {
  fontSize: "10px",
  color: "#999",
  fontWeight: "700",
  letterSpacing: "1.5px",
  marginBottom: "6px",
};

const productName = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#1a1a1a",
  margin: "0 0 8px 0",
  textTransform: "capitalize",
};

const priceWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const currentPrice = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#000",
};

const strikePrice = {
  fontSize: "14px",
  color: "#bbb",
  textDecoration: "line-through",
  fontWeight: "400",
};