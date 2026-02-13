import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllInnerwear } from "../services/innerwearApi";

export default function InnerwearPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    getAllInnerwear()
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={container}>
      {/* Breadcrumb */}
      <nav style={breadcrumb}>
        Home / <span style={{ color: "#000" }}>Innerwear</span>
      </nav>

      {/* Product Grid */}
      <div style={grid}>
        {products.map((p) => {
          const isHovered = hoveredId === p._id;

          return (
            <div
              key={p._id}
              style={card}
              onClick={() => navigate(`/product/innerwear/${p._id}`)}
              onMouseEnter={() => setHoveredId(p._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div style={imageWrapper}>
                <img
                  src={
                    isHovered && p.images?.[1]
                      ? p.images[1]
                      : p.images?.[0]
                  }
                  alt={p.name}
                  style={image(isHovered)}
                />

                {/* Discount Badge */}
                {p.oldPrice && (
                  <div style={discount}>
                    -{Math.round(
                      ((p.oldPrice - p.price) / p.oldPrice) * 100
                    )}%
                  </div>
                )}

                {/* Hover CTA */}
                {isHovered && window.innerWidth > 768 && (
                  <div style={quickView}>VIEW PRODUCT</div>
                )}
              </div>

              {/* Info */}
              <div style={info}>
                <p style={category}>
                  {p.category?.toUpperCase() || "INNERWEAR"}
                </p>

                <h3 style={title}>{p.name}</h3>

                <div style={priceRow}>
                  <span style={price}>₹{p.price}</span>
                  {p.oldPrice && (
                    <span style={oldPrice}>₹{p.oldPrice}</span>
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

/* ================== STYLES ================== */

const container = {
  padding: "60px 5%",
  background: "#ffffff",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
};

const breadcrumb = {
  fontSize: 11,
  letterSpacing: 1,
  color: "#aaa",
  marginBottom: 40,
  textTransform: "uppercase",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "45px 30px",
};

const card = {
  cursor: "pointer",
  transition: "0.4s ease",
};

const imageWrapper = {
  position: "relative",
  width: "100%",
  height: 380,
  overflow: "hidden",
  background: "#f6f6f6",
};

const image = (hover) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
  transform: hover ? "scale(1.08)" : "scale(1)",
});

const discount = {
  position: "absolute",
  top: 14,
  left: 14,
  background: "#111",
  color: "#fff",
  fontSize: 10,
  fontWeight: 700,
  padding: "4px 8px",
};

const quickView = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  background: "rgba(255,255,255,0.9)",
  textAlign: "center",
  padding: "12px 0",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1,
};

const info = {
  paddingTop: 14,
};

const category = {
  fontSize: 10,
  color: "#999",
  fontWeight: 700,
  letterSpacing: 1.4,
};

const title = {
  fontSize: 16,
  fontWeight: 500,
  margin: "6px 0 8px",
  color: "#111",
};

const priceRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const price = {
  fontSize: 16,
  fontWeight: 700,
  color: "#000",
};

const oldPrice = {
  fontSize: 14,
  color: "#bbb",
  textDecoration: "line-through",
};
