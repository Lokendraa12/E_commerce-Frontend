import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("best");
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const visibleCards = 4;

  const truncateWords = (text, limit = 4) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  // 🔹 Fetch featured products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/features?type=${activeTab}`
        );
        const data = await res.json();
        setProducts(data);
        setIndex(0); // reset slider on tab change
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [activeTab]);

  // 🔹 Responsive
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const next = () => {
    if (index < products.length - visibleCards) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section style={{ padding: "30px 0", position: "relative" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
        FEATURED
      </h2>

      {/* TABS */}
      <div style={{ display: "flex", justifyContent: "center", gap: 26, marginBottom: 18 }}>
        {["best", "new"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 16,
              fontWeight: activeTab === tab ? 700 : 500,
              borderBottom:
                activeTab === tab ? "2px solid black" : "2px solid transparent",
              paddingBottom: 6,
              cursor: "pointer",
            }}
          >
            {tab === "best" ? "BEST SELLERS" : "NEW ARRIVALS"}
          </button>
        ))}
      </div>

      <div style={{ position: "relative" }}>
        {/* ARROWS (Desktop Only) */}
        {!isMobile && (
          <button onClick={prev} disabled={index === 0} style={arrowStyle("left", index === 0)}>
            ←
          </button>
        )}

        {!isMobile && (
          <button
            onClick={next}
            disabled={index >= products.length - visibleCards}
            style={arrowStyle("right", index >= products.length - visibleCards)}
          >
            →
          </button>
        )}

        {/* SLIDER */}
        <div
          style={{
            overflowX: isMobile ? "auto" : "hidden",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 20,
              transform: isMobile ? "none" : `translateX(-${index * 300}px)`,
              transition: "0.4s",
              paddingBottom: isMobile ? 10 : 0,
            }}
          >
            {products.map((p) => {
              const hoverImg = hoveredId === p._id && p.images?.[1];

              return (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p.category}/${p._id}`)}
                  onMouseEnter={() => setHoveredId(p._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={cardStyle}
                >
                  <div style={{ height: 260 }}>
                    <img
                      src={hoverImg ? p.images[1] : p.images?.[0]}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "0.3s",
                      }}
                    />
                  </div>

                  <div style={{ padding: 12 }}>
                    <p style={{ fontSize: 12, color: "#777" }}>{p.category}</p>
                    <p style={{ fontWeight: 600, fontSize: 15 }}>
                      {truncateWords(p.name, 5)}
                    </p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                    
                     <span
                        style={{
                          fontWeight: 700,
                          fontSize: 16,
                          color: "#0b327b",
                        }}
                      >
                        ₹{p.price}
                      </span>

                      {p.oldPrice && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#999",
                            fontSize: 13,
                          }}
                        >
                          ₹{p.oldPrice}
                        </span>
                      )}

                     

                      {p.oldPrice && (
                        <span
                          style={{
                            background: "#e53935",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "2px 6px",
                            borderRadius: 4,
                          }}
                        >
                          {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== STYLES ===== */

const cardStyle = {
  minWidth: 280,
  background: "#fff",
  borderRadius: 12,
  overflow: "hidden",
  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  cursor: "pointer",
};

const arrowStyle = (pos, disabled) => ({
  position: "absolute",
  [pos]: -50,
  top: "50%",
  transform: "translateY(-100%)",
  width: 45,
  height: 45,
  borderRadius: "50%",
  background: "#fff",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  border: "none",
  fontSize: 20,
  cursor: "pointer",
  opacity: disabled ? 0.3 : 1,
  zIndex: 10,
});
