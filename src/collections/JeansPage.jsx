import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJeans } from "../services/jeansApi";

export default function JeansPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
 
  const truncateWords = (text, limit = 4) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > limit
    ? words.slice(0, limit).join(" ") + "..."
    : text;
};


  useEffect(() => {
    getAllJeans()
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        padding: "20px 40px",
        background: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
       {products.length} Products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 25,
        }}
      >
        {products.map((p) => {
          const showHoverImage =
            hoveredId === p._id && p.images?.[1];

          return (
            <div
              key={p._id}
              onClick={() => navigate(`/product/jeans/${p._id}`)}
              onMouseEnter={() => setHoveredId(p._id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: "#fff",
                padding: 12,
                borderRadius: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  width: "100%",
                  height: 300,
                  overflow: "hidden",
                  borderRadius: 10,
                }}
              >
                <img
                  src={showHoverImage ? p.images[1] : p.images?.[0]}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "0.4s ease",
                  }}
                />
              </div>

              {/* CATEGORY */}
              <p style={{ fontSize: 12, color: "#777", marginTop: 6 }}>
                {p.category}
              </p>

              {/* TITLE */}
              <p style={{ fontWeight: 600, marginTop: 4, fontSize: 15 }}>
  {truncateWords(p.name, 4)}
</p>


              {/* PRICE */}
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
          );
        })}
      </div>
    </div>
  );
}
