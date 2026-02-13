import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJeans } from "../services/jeansApi";
import { p } from "framer-motion/client";

export default function JeansFeatured() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const truncateWords = (text, limit = 4) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  const visibleCards = 4;

  useEffect(() => {
    getAllJeans()
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const next = () => {
    if (index < products.length - visibleCards) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section style={{ padding: "30px 0", position: "relative" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>
        JEANS
      </h2>

      <div style={{ position: "relative" }}>
        {/* LEFT */}
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
            scrollbarWidth: "auto",      // Firefox
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
                  onClick={() => navigate(`/product/jeans/${p._id}`)}
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

      <div style={{ textAlign: "center", marginTop: 25 }}>
        <button
          onClick={() => navigate("/collections/jeans")}
          style={{
            padding: "12px 28px",
            borderRadius: 6,
            background: "#0b327b",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          VIEW COLLECTIONS
        </button>
      </div>
    </section>
  );
}
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
