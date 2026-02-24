import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { getTshirtById } from "../services/tshirtApi";
import { getShirtById } from "../services/shirtApi";
import { getTrouserById } from "../services/trouserApi";
import { getJeansById } from "../services/jeansApi";
import { getShoesById } from "../services/shoesApi";
import { getInnerwearById } from "../services/innerwearApi";
import { AuthContext } from "../context/AuthContext";
import Checkout from "./Checkout";

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
   const { user } = useContext(AuthContext);
  const { id, category } = useParams();
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const SIZE_MAP = {
    shirt: ["M", "L", "XL", "XXL"],
    tshirt: ["M", "L", "XL", "XXL"],
    jeans: ["30", "32", "34", "36", "38", "40"],
    trousers: ["30", "32", "34", "36", "38", "40"],
    shoes: ["5", "6", "7", "8", "9", "10"],
    innerwear: ["S", "M", "L", "XL", "XXL"],
  };

  const handleAuthCheck = (action) => {
  if (!user) {
    navigate("/login", {
      state: { from: `/product/${category}/${id}` }
    });
    return;
  }
  action();
};


  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      let res;
      if (category === "tshirt") res = await getTshirtById(id);
      else if (category === "shirt") res = await getShirtById(id);
      else if (category === "trousers") res = await getTrouserById(id);
      else if (category === "jeans") res = await getJeansById(id);
      else if (category === "shoes") res = await getShoesById(id);
      else if (category === "innerwear") res = await getInnerwearById(id);

      const data = res.data.data;
      setProduct(data);
      setActiveImage(0);

      const sizes =
        data.sizes?.length > 0
          ? data.sizes
          : SIZE_MAP[data.category?.toLowerCase()] || ["M"];

      setSize(sizes[0]);
    };

    fetchProduct();
  }, [id, category]);

  if (!product) return <p style={{ padding: 40 }}>Loading...</p>;

  const sizes =
    product.sizes?.length > 0
      ? product.sizes
      : SIZE_MAP[product.category?.toLowerCase()] || ["M"];

  return (
    <div
      style={{
        ...styles.page,
        flexDirection: isMobile ? "column" : "row",
        height: "auto",
      }}
    >
      {/* IMAGE SECTION */}
      <div
        style={{
          ...styles.left,
          position: isMobile ? "relative" : "sticky",
          top: isMobile ? 0 : 20,
        }}
      >
        <img
          src={product.images?.[activeImage]}
          alt={product.name}
          style={{
            ...styles.mainImage,
            height: isMobile ? 360 : 520,
          }}
        />

        <div style={styles.thumbRow}>
          {product.images?.slice(0, 5).map((img, i) => (
            <img
              key={i}
              src={img}
              alt="thumb"
              onClick={() => setActiveImage(i)}
              style={{
                ...styles.thumb,
                border:
                  activeImage === i
                    ? "2px solid #0b327b"
                    : "1px solid #ccc",
              }}
            />
          ))}
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div
        style={{
          ...styles.right,
          height: "auto",
          overflowY: "visible",
        }}
      >
        <p style={styles.category}>{product.category}</p>
        <h2>{product.name}</h2>

        <div style={styles.priceBox}>

          <span style={styles.newPrice}>₹{product.price}</span>
          {product.oldPrice && (
            <span style={styles.oldPrice}>₹{product.oldPrice}</span>
          )}

          {product.oldPrice && (
            <span style={styles.offBadge}>
              {Math.round(
                ((product.oldPrice - product.price) / product.oldPrice) * 100
              )}% OFF
            </span>
          )}
        </div>


        {/* SIZE */}
        <p style={styles.label}>Select Size</p>
        <div style={styles.sizeRow}>
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                ...styles.sizeBtn,
                background: size === s ? "#0b327b" : "#fff",
                color: size === s ? "#fff" : "#000",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* QTY */}
        <p style={styles.label}>Qty</p>
        <div style={styles.qtyRow}>
          <button onClick={() => setQty(qty - 1)} disabled={qty === 1}>
            −
          </button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>

        {/* BUTTONS */}
        <div
          style={{
            ...styles.btnGroup,
            width: isMobile ? "100%" : "60%",
          }}
        >
          <button
  style={styles.cartBtn}
  onClick={() =>
    handleAuthCheck(() =>
      addToCart({ ...product, qty, size })
    )
  }
>
  ADD TO CART
</button>


       <button
  style={styles.buyBtn}
  onClick={() =>
    handleAuthCheck(() => {
      addToCart({ ...product, qty, size })
      setShowCheckout(true);
    })
  }
>
  BUY IT NOW
</button>

 
        </div>

        {/* DETAILS */}
        <div style={styles.details}>
          <h2>Product Details</h2>
          <ul style={styles.list}>
            {product.material && <li><b>Material Type:</b> {product.material}</li>}
            {product.color && <li><b>Color:</b> {product.color}</li>}
            {product.soleType && <li><b>Sole Type:</b> {product.soleType}</li>}
            {product.closureType && <li><b>Closure Type:</b> {product.closureType}</li>}
            {product.fit && <li><b>Fit:</b> {product.fit}</li>}
            {product.style && <li><b>Style:</b> {product.style}</li>}
            {product.category && <li><b>Category:</b> {product.category}</li>}
            {product.itemsPerPack && <li><b>Number of items:</b> {product.itemsPerPack}</li>}
            {product.waistband && <li><b>waistband:</b> {product.waistband}</li>}
            {product.neckType && <li><b>Collar style:</b> {product.neckType}</li>}
            {product.sleeveType && <li><b>Sleeve Type:</b> {product.sleeveType}</li>}
            <li><b>Stock:</b> {product.stock > 0 ? "In Stock" : "Out of Stock"}</li>
            <div style={styles.line}></div>
            <h2>About this Item</h2>
            {product.description && (
              <p style={styles.desc}>{product.description}</p>
            )}
          </ul>

        </div>
      </div>
      {showCheckout && (
  <Checkout onClose={() => setShowCheckout(false)} />
)}

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    display: "flex",
    gap: 30,
    padding: 20,
  },

  left: {
    flex: 1,
  },

  mainImage: {
    width: "100%",
    objectFit: "cover",
    borderRadius: 12,
  },

  thumbRow: {
    display: "flex",
    gap: 10,
    marginTop: 12,
    overflowX: "auto",        // ✅ horizontal scroll
    paddingBottom: 6,
    WebkitOverflowScrolling: "touch",
  },


  thumb: {
    minWidth: 60,             // ✅ fixed width for scroll
    width: 60,
    height: 80,
    objectFit: "cover",
    borderRadius: 8,
    cursor: "pointer",
    flexShrink: 0,            // ✅ shrink hone se roke
  },


  right: {
    flex: 1,
  },

  category: {
    fontSize: 14,
    color: "#777",
  },

  price: {
    color: "#0b327b",
    margin: "10px 0",
  },

  label: {
    fontWeight: 600,
    marginTop: 15,
  },

  sizeRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    margin: "10px 0",
  },

  sizeBtn: {
    padding: "8px 14px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontWeight: 600,
  },

  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  btnGroup: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  cartBtn: {
    padding: 12,
    background: "#ccc",
    border: "none",
    fontWeight: 700,
  },

  buyBtn: {
    padding: 12,
    background: "#0b327b",
    color: "#fff",
    border: "none",
    fontWeight: 700,
  },

  details: {
    marginTop: 30,
  },

  desc: {
    lineHeight: 1.6,
    color: "#444",
  },

  list: {
    marginTop: 15,
    paddingLeft: 18,
    lineHeight: 1.8,
  },

  line: {
    height: 1,
    backgroundColor: "#ccc",
    margin: "20px 0",
  },
  priceBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "12px 0",
  },

  oldPrice: {
    textDecoration: "line-through",
    color: "#888",
    fontSize: 16,
  },

  newPrice: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0b327b",
  },

  offBadge: {
    background: "#e53935",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 4,
  },

};
