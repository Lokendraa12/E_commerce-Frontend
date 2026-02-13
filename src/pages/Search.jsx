import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

/* ---------------- HELPERS ---------------- */

const normalize = (text = "") =>
  text.toLowerCase().replace(/[\s-]/g, "");

const detectCategory = (text = "") => {
  const t = normalize(text);
  if (t.includes("tshirt")) return "tshirt";
  if (t.includes("shirt")) return "shirt";
  if (t.includes("jean")) return "jeans";
  if (t.includes("trouser") || t.includes("pant")) return "trousers";
  if (t.includes("shoe")) return "shoes";
  if (t.includes("inner")) return "innerwear";
  return "";
};

const detectSearchType = (query = "") => detectCategory(query);

/* ---------------- COMPONENT ---------------- */

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q") || "";
  const qNorm = normalize(query);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const BASE = process.env.REACT_APP_API_URL;

        const urls = [
          `${BASE}/tshirts`,
          `${BASE}/shirts`,
          `${BASE}/jeans`,
          `${BASE}/trousers`,
          `${BASE}/shoes`,
          `${BASE}/innerwear`,
        ];

        const responses = await Promise.all(urls.map((u) => axios.get(u)));

        let allProducts = [];
        responses.forEach((res) => {
          if (Array.isArray(res.data?.data)) {
            allProducts.push(...res.data.data);
          }
        });

        const searchType = detectSearchType(query);

        const nameMatched = allProducts.filter((p) =>
          normalize(p.name).includes(qNorm)
        );

        if (nameMatched.length > 0 && searchType) {
          const categoryProducts = allProducts.filter(
            (p) => detectCategory(p.category) === searchType
          );

          const priority = [];
          const rest = [];

          categoryProducts.forEach((p) => {
            normalize(p.name).includes(qNorm)
              ? priority.push(p)
              : rest.push(p);
          });

          setProducts([...priority, ...rest]);
          return;
        }

        setProducts(allProducts);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div style={page}>
      <h2 style={heading}>Search Results for “{query}”</h2>

      {loading ? (
        <p style={center}>Searching products...</p>
      ) : products.length === 0 ? (
        <p style={center}>❌ No product found</p>
      ) : (
        <div style={grid}>
          {products.map((p) => {
            const discount =
              p.oldPrice && p.oldPrice > p.price
                ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
                : null;

            return (
              <div
                key={p._id}
                style={card}
                onClick={() => navigate(`/product/${p.category}/${p._id}`)}
              >
                <div style={imgWrap}>
                  {discount && <span style={discountTag}>{discount}% OFF</span>}
                  <img src={p.images?.[0]} alt={p.name} style={img} />
                </div>

                <div style={info}>
                  <span style={badge}>{p.category}</span>
                  <h4 style={name}>{p.name}</h4>

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
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  padding: "30px 50px",
  background: "#fafafa",
  minHeight: "100vh",
};

const heading = {
  fontSize: 26,
  marginBottom: 25,
  textAlign: "center",
};

const center = {
  textAlign: "center",
  marginTop: 60,
  fontSize: 18,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 25,
};

const card = {
  cursor: "pointer",
  background: "#fff",
  borderRadius: 14,
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "0.3s",
};

const imgWrap = {
  position: "relative",
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: 300,
  objectFit: "cover",
  transition: "0.4s",
};

const discountTag = {
  position: "absolute",
  top: 10,
  left: 10,
  background: "#e53935",
  color: "#fff",
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 4,
  fontWeight: 700,
  zIndex: 2,
};

const info = {
  padding: 14,
};

const badge = {
  fontSize: 11,
  background: "#0b327b",
  color: "#fff",
  padding: "3px 8px",
  borderRadius: 4,
  marginBottom: 6,
  display: "inline-block",
};

const name = {
  fontSize: 14,
  fontWeight: 600,
  margin: "6px 0",
  minHeight: 38,
};

const priceRow = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const price = {
  fontSize: 16,
  fontWeight: 700,
  color: "#0b327b",
};

const oldPrice = {
  fontSize: 13,
  color: "#999",
  textDecoration: "line-through",
};
