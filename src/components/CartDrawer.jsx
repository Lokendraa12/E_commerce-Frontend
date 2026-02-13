import React, { useContext, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { CartContext } from "../context/CartContext";
import Checkout from "../pages/Checkout";

export default function CartDrawer() {
  const {
    cartItems,
    openCart,
    setOpenCart,
    updateQty,
    removeFromCart,
  } = useContext(CartContext);

  const [showCheckout, setShowCheckout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      {/* OVERLAY */}
      {openCart && (
        <div
          onClick={() => setOpenCart(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
          }}
        />
      )}

      {/* DRAWER */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: openCart ? 0 : isMobile ? "-100%" : "-460px",
          width: isMobile ? "100%" : 440,
          height: "100vh",
          background: "#fff",
          zIndex: 1000,
          transition: "0.45s cubic-bezier(.4,0,.2,1)",
          display: "flex",
          flexDirection: "column",
          borderTopLeftRadius: isMobile ? 0 : 16,
          borderBottomLeftRadius: isMobile ? 0 : 16,
          boxShadow: "-10px 0 30px rgba(0,0,0,0.25)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "16px 20px",
            background: "#0b327b",
            color: "#fff",
            fontWeight: 700,
            fontSize: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          My Cart ({cartItems.length})
          <span
            onClick={() => setOpenCart(false)}
            style={{ cursor: "pointer", fontSize: 22 }}
          >
            ✕
          </span>
        </div>

        {/* ITEMS */}
        <div style={{ padding: 16, flex: 1, overflowY: "auto" }}>
          {cartItems.length === 0 ? (
            <div style={emptyBox}>
              <Icon icon="mdi:shopping-outline" width={70} color="#0b327b" />
              <h2>Your cart is empty</h2>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.cartId} style={productCard}>
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  style={productImage}
                />

                <div style={{ flex: 1 }}>
                  <p style={productName}>{item.name}</p>

                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <span style={badge}>Size: {item.size || "M"}</span>
                    <span style={badge}>Fit: {item.fit || "Regular"}</span>
                  </div>

                  <div style={row}>
                    {/* QTY */}
                    <div style={qtyBox}>
                      <button
                        style={qtyBtn}
                        onClick={() =>
                          item.qty === 1
                            ? removeFromCart(item.cartId)
                            : updateQty(item.cartId, item.qty - 1)
                        }
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        style={qtyBtn}
                        onClick={() =>
                          updateQty(item.cartId, item.qty + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* PRICE */}
                    <div style={{ textAlign: "right" }}>
                      <strong style={{ fontSize: 15 }}>
                        ₹ {(item.price * item.qty).toFixed(2)}
                      </strong>
                      {item.oldPrice && (
                        <div style={oldPrice}>
                          ₹ {item.oldPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div style={footer}>
            <div style={totalRow}>
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>

            <button
              style={checkoutBtn}
              onClick={() => setShowCheckout(true)}
            >
              PROCEED TO CHECKOUT
            </button>

            <p style={deliveryText}>Free Delivery on orders above ₹999</p>
          </div>
        )}
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <Checkout
          onClose={() => {
            setShowCheckout(false);
            setOpenCart(false);
          }}
        />
      )}
    </>
  );
}

/* ---------- STYLES ---------- */

const emptyBox = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};

const productCard = {
  display: "flex",
  gap: 14,
  padding: 12,
  marginBottom: 16,
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

const productImage = {
  width: 90,
  height: 120,
  objectFit: "cover",
  borderRadius: 10,
};

const productName = {
  fontSize: 14,
  fontWeight: 700,
  marginBottom: 6,
};

const badge = {
  fontSize: 11,
  padding: "4px 10px",
  borderRadius: 20,
  background: "#eef2ff",
  color: "#0b327b",
  fontWeight: 600,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  background: "#f6f6f6",
  padding: "6px 12px",
  borderRadius: 20,
};

const qtyBtn = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontSize: 16,
};

const oldPrice = {
  fontSize: 12,
  color: "#999",
  textDecoration: "line-through",
};

const footer = {
  padding: 18,
  background: "#fff",
  borderTop: "1px solid #eee",
  position: "sticky",
  bottom: 0,
  boxShadow: "0 -6px 16px rgba(0,0,0,0.08)",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 18,
  fontWeight: 700,
};

const checkoutBtn = {
  width: "100%",
  marginTop: 14,
  padding: 16,
  background: "linear-gradient(135deg, #0b327b, #1749b2)",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};

const deliveryText = {
  textAlign: "center",
  marginTop: 8,
  fontSize: 12,
  color: "#4caf50",
};
