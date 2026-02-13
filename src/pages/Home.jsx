// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import JeansSlider from "./JeansSlider";
import FeaturedProducts from "./FeatureProduct";
import TrousersFeatured from "./TrousersFeatured";
import Collections from "./collection";
import ShirtsFeatured from "./Shirtslider";
import TshirtFeatured from "./TshirtFeatured";
import ShoesFeatured from "./Shoesslider";
import Footer from "./Footer";

/* ===================== CONSTANTS ===================== */
const HERO_APIS = [
  { url: "http://localhost:5000/api/tshirts", category: "tshirt" },
  { url: "http://localhost:5000/api/shirts", category: "shirt" },
  { url: "http://localhost:5000/api/jeans", category: "jeans" },
  { url: "http://localhost:5000/api/trousers", category: "trousers" },
  { url: "http://localhost:5000/api/shoes", category: "shoes" },
  { url: "http://localhost:5000/api/innerwear", category: "innerwear" },
];

const CATEGORIES = [
  { name: "Topwear", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXvsvYDOBJg47rvj_7mi0HyfR3TYFmevLnHA&s" },
  { name: "Bottomwear", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQStR49Ezi4rY0RlMkmUMlsZGMBZWHD3nuYFA&s" },
  { name: "Footwear", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpbh-zpGVPuQtwTNnIMOLExQAZv31mjiiOA&s" },
  { name: "Accessories", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Die8u5HED6ADoWIv0gWiPQ5PY5M3WHtoMA&s" },
];

/* ===================== HOME COMPONENT ===================== */
export default function Home() {
  const featuredRef = useRef(null);

  const scrollToFeatured = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={styles.page}>
      <Hero scrollToFeatured={scrollToFeatured} />
      <div style={styles.container1}>
        <CategoryStrip categories={CATEGORIES} />
      </div>
      <Collections />
      <main style={styles.container}>
        <div ref={featuredRef}><FeaturedProducts /></div>
        <ShirtsFeatured />
        <TshirtFeatured />
        <TrousersFeatured />
        <JeansSlider />
        <ShoesFeatured />
      </main>
      <Footer />
    </div>
  );
}

/* ===================== HERO COMPONENT ===================== */
function Hero({ scrollToFeatured }) {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Background Image for a shopping vibe (Replace with your actual image URL)
  const bgImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  return (
    <section style={styles.heroOuter}>
      {/* Background Layer with Overlay */}
      <div style={{
        ...styles.heroBg,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImage})`
      }}>
        <div style={styles.heroOverlay}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.8 }}
              style={styles.glassCard}
            >
              <span style={styles.trendingBadge}>🔥 TRENDING NOW</span>
              <h1 style={styles.mainTitle}>
                FASHION <br /> 
                <span style={styles.hollowText}>REDEFINED</span>
              </h1>
              <p style={styles.description}>
                Experience the perfect blend of comfort and luxury. Our new 2026 collection is designed for the bold and the stylish.
              </p>
              
              <div style={styles.btnWrapper}>
                <button onClick={scrollToFeatured} style={styles.shopBtn}>
                  SHOP NOW
                  <span style={{marginLeft: '10px'}}>→</span>
                </button>
                <div style={styles.offerTag}>
                  <strong>UP TO 50% OFF</strong>
                  <br />Limited Time Offer
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Product Preview (Right Side) */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            style={styles.productPreview}
          >
             <img 
               src={slides[index]?.img || "https://via.placeholder.com/400x500"} 
               alt="Featured Product" 
               style={styles.previewImg} 
             />
             <div style={styles.floatingTag}>New Arrival</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===================== CATEGORY STRIP ===================== */
function CategoryStrip({ categories }) {
  return (
    <section style={styles.catSectionNormal}>
      <div style={styles.headerRow}>
        <h2 style={styles.minimalTitle}>Explore Categories</h2>
        <div style={styles.titleLine}></div>
      </div>

      <div style={styles.catRowNormal}>
        {categories.map((c) => (
          <motion.div
            key={c.name}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            style={styles.catCardModern}
          >
            <div style={styles.imgWrapper}>
              <img src={c.img} alt={c.name} style={styles.catImgModern} />
              {/* Floating Glass Label */}
              <div style={styles.glassLabel}>
                {c.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ===================== STYLES ===================== */
const styles = {
  page: { fontFamily: "'Poppins', sans-serif", background: "#f4f6f8", color: "#0f172a" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "18px" },
  container1: { maxWidth: 1000, margin: "0 auto", padding: "18px" },

  heroOuter: { 
    width: "100%", // vw ki jagah 100% use karein taaki horizontal scroll na aaye
    height: "550px", // Fixed height laptop ke liye perfect hai
    overflow: "hidden", 
    backgroundColor: "#000",
    position: "relative"
  },
  heroBg: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.8s ease"
  },
  heroOverlay: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)", // Gradual shadow
    display: "flex",
    alignItems: "center",
    padding: "0 5%" // Side padding for content
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.1)", // Thoda aur transparent
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "40px",
    borderRadius: "20px",
    maxWidth: "500px", // Size normal rakha hai
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)"
  },
  mainTitle: {
    fontSize: "42px", // Normal but bold size
    fontWeight: "800",
    color: "#fff",
    lineHeight: "1.1",
    marginBottom: "15px",
  },
  hollowText: {
    WebkitTextStroke: "1px #fff",
    color: "transparent"
  },
  description: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "40px"
  },
  btnWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "30px"
  },
  shopBtn: {
    background: "#fff",
    color: "#000",
    padding: "18px 45px",
    border: "none",
    borderRadius: "50px",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
  },
  offerTag: {
    color: "#fff",
    fontSize: "14px",
    borderLeft: "2px solid #ff416c",
    paddingLeft: "15px"
  },
  productPreview: {
    position: "relative",
    display: "none", // Desktop pe show karne ke liye 'block' karein niche media query mein
    '@media (minWidth: 1024px)': { display: 'block' } 
  },
  previewImg: {
    width: "400px",
    height: "550px",
    objectFit: "cover",
    borderRadius: "30px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
    border: "8px solid rgba(255,255,255,0.1)"
  },
  floatingTag: {
    position: "absolute",
    top: "40px",
    right: "-20px",
    background: "#fff",
    color: "#000",
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
  },
  catSectionNormal: {
    padding: "40px 20px",
    textAlign: "center"
  },
  headerRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px"
  },
  minimalTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e293b",
    letterSpacing: "1px",
    textTransform: "uppercase",
    margin: "0 0 8px 0"
  },
  titleLine: {
    width: "40px",
    height: "3px",
    background: "#2874f0", // Aapka primary color
    borderRadius: "2px"
  },
  catRowNormal: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  catCardModern: {
    width: "160px", // Normal size
    cursor: "pointer",
  },
  imgWrapper: {
    position: "relative",
    width: "100%",
    height: "160px",
    borderRadius: "20px", // Rounded modern look
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    border: "1px solid #f1f5f9"
  },
  catImgModern: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease"
  },
  glassLabel: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    right: "10px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(8px)",
    padding: "8px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  }
};
