import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const COLLECTIONS = [
  { name: "T-Shirts", tagline: "Street Essential" },
  { name: "Shirts", tagline: "Formal Perfection" },
  { name: "Jeans", tagline: "Timeless Denim" },
  { name: "Premium Innerwear", tagline: "Ultimate Comfort" },
];

const API_MAP = {
  "T-Shirts": "http://localhost:5000/api/tshirts",
  "Shirts": "http://localhost:5000/api/shirts",
  "Jeans": "http://localhost:5000/api/jeans",
  "Premium Innerwear": "http://localhost:5000/api/innerwear",
};

export default function Collections() {
  const navigate = useNavigate();
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      let imgObj = {};
      for (let item of COLLECTIONS) {
        try {
          const res = await axios.get(API_MAP[item.name]);
          imgObj[item.name] = res.data?.data?.[0]?.images?.[0];
        } catch (err) {
          console.error(item.name, err);
        }
      }
      setImages(imgObj);
    };
    fetchImages();
  }, []);

  return (
    <section style={styles.collectionSection}>
      <div style={styles.headerBox}>
        <span style={styles.preTitle}>SEASON 2026</span>
        <h2 style={styles.mainHeading}>THE COLLECTIONS</h2>
        <div style={styles.divider}></div>
      </div>

      <div style={styles.gridContainer}>
        {COLLECTIONS.map((c, index) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => navigate(`/collections/${c.name.toLowerCase().replace(/\s/g, "-")}`)}
            style={styles.card}
          >
            <div style={styles.imageBox}>
              <img
                src={images[c.name] || "https://via.placeholder.com/400x600"}
                alt={c.name}
                style={styles.image}
              />
              <div style={styles.overlay}>
                <div style={styles.content}>
                  <p style={styles.tagline}>{c.tagline}</p>
                  <h3 style={styles.collName}>{c.name}</h3>
                  <div className="shop-link" style={styles.shopLink}>
                    View Details →
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


const styles = {
  collectionSection: {
    padding: "80px 5%",
    // background: "#ffffff",
  },
  headerBox: {
    textAlign: "center",
    marginBottom: "50px",
  },
  preTitle: {
    fontSize: "12px",
    letterSpacing: "4px",
    color: "#888",
    fontWeight: "600",
  },
  mainHeading: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#111",
    marginTop: "10px",
    textTransform: "uppercase",
  },
  divider: {
    width: "60px",
    height: "2px",
    background: "#000",
    margin: "15px auto",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "4px", // Subtle rounding for pro look
  },
  imageBox: {
    position: "relative",
    width: "100%",
    height: "450px", // Balanced height for laptop
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)",
    display: "flex",
    alignItems: "flex-end",
    padding: "30px",
    transition: "background 0.3s ease",
  },
  content: {
    color: "#fff",
  },
  tagline: {
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "5px",
    color: "#ddd",
  },
  collName: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 10px 0",
  },
  shopLink: {
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    borderBottom: "1px solid #fff",
    display: "inline-block",
    paddingBottom: "2px",
    opacity: 0.8,
  },
};