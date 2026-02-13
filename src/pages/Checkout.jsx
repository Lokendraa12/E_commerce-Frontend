import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Checkout({ onClose }) {
  const { cartItems, clearCart, updateQty, removeFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

   const handlePlaceOrder = () => {
    navigate("/OrderSuccess");
  };

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* 💰 PRICE */
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* 🚚 DELIVERY LOGIC */
  let DELIVERY_CHARGE = 0;

  if (paymentMethod === "COD" && itemsTotal < 999) {
    DELIVERY_CHARGE = 40;
  }

  const finalAmount = itemsTotal + DELIVERY_CHARGE;

  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  /* 🟢 PLACE ORDER */
  console.log("USER DATA:", user);
  
 const saveOrder = async () => {
  if (!address.name || !address.phone || !address.street) {
    alert("Please fill address details");
    return;
  }

  if (!user?.id) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  setLoading(true);

  try {
    const orderData = {
      userId: user.id,   // ✅ correct id
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        qty: item.qty,
        image: item.images?.[0] || ""
      })),
      address: address,
      paymentMethod: paymentMethod,  // ✅ dynamic
      deliveryCharge: DELIVERY_CHARGE,  // ✅ dynamic
      totalAmount: finalAmount,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
    };

    console.log("SENDING ORDER:", orderData); // 🔎 debug

    const res = await axios.post(
      "http://localhost:5000/api/orders",
      orderData
    );

    console.log("ORDER RESPONSE:", res.data);

    clearCart();
    setSuccessMsg("🎉 Order placed successfully!");

    setTimeout(() => {
      navigate("/orders");  // ✅ better redirect
    }, 1500);

  } catch (error) {
    console.error("ORDER ERROR:", error.response?.data || error.message);
    alert("Order failed!");
  }

  setLoading(false);
};




  return (
    <div style={overlay}>
      <div
        style={{
          ...popup,
          width: isMobile ? "100%" : 700,
          height: isMobile ? "100%" : "auto",
          borderRadius: isMobile ? 0 : 20,
        }}
      >
        {/* HEADER */}
        <div style={header}>
          <h2>Secure Checkout</h2>
          <span onClick={onClose} style={closeBtn}>✕</span>
        </div>

        {successMsg ? (
          <div style={successBox}>{successMsg}</div>
        ) : (
          <>
            {/* ADDRESS */}
            <div style={card}>
              <h3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14"><g fill="none"><path fill="#d7e0ff" d="M8.5 5.5h3a2 2 0 0 1 2 2v4h-5m-8 0h8v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1z"/><path fill="#fff" d="M3.5 13.5a1.75 1.75 0 1 1 0-3.5a1.75 1.75 0 0 1 0 3.5"/><path stroke="#4147d5" stroke-linecap="round" stroke-linejoin="round" d="M8.5 5.5h3a2 2 0 0 1 2 2v4H12m-10.5 0h-1v-7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v7m-.5 0H5.5" stroke-width="1"/><path stroke="#4147d5" stroke-linecap="round" stroke-linejoin="round" d="M3.5 13.5a1.75 1.75 0 1 1 0-3.5a1.75 1.75 0 0 1 0 3.5" stroke-width="1"/><path fill="#fff" d="M10.25 13.5a1.75 1.75 0 1 1 0-3.5a1.75 1.75 0 0 1 0 3.5"/><path stroke="#4147d5" stroke-linecap="round" stroke-linejoin="round" d="M10.25 13.5a1.75 1.75 0 1 1 0-3.5a1.75 1.75 0 0 1 0 3.5" stroke-width="1"/></g></svg> Shipping Address</h3>

              <div style={grid}>
                <input name="name" placeholder="Full Name" onChange={handleChange} style={input} />
                <input name="phone" placeholder="Phone Number" onChange={handleChange} style={input} />
                <input name="city" placeholder="City" onChange={handleChange} style={input} />
                <input name="state" placeholder="State" onChange={handleChange} style={input} />
                <input name="pincode" placeholder="Pincode" onChange={handleChange} style={input} />
              </div>

              <textarea
                name="street"
                placeholder="House no, Street, Area"
                rows={3}
                onChange={handleChange}
                style={{ ...input, resize: "none", marginTop: 8 }}
              />
            </div>

            {/* ITEMS */}
            <div style={card}>
              <h3><svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 32 32"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M6 6h24l-3 13H9m18 4H10L5 2H2"></path><circle cx={25} cy={27} r={2}></circle><circle cx={12} cy={27} r={2}></circle></g></svg> Order Summary</h3>

              {cartItems.map((item) => (
                <div key={item.cartId} style={itemRow}>
                  <img src={item.images?.[0]} alt="" style={img} />

                  <div style={{ flex: 1 }}>
                    <b>{item.name}</b>

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
                  </div>

                  <b>₹ {item.price * item.qty}</b>
                </div>
              ))}
            </div>

            {/* PAYMENT */}
            <div style={card}>
              <h3><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16"><path fill="currentColor" d="M3.5 3A2.5 2.5 0 0 0 1 5.5V6h14v-.5A2.5 2.5 0 0 0 12.5 3zM15 7H1v3.5A2.5 2.5 0 0 0 3.5 13h9a2.5 2.5 0 0 0 2.5-2.5zm-4.5 3h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1"></path></svg> Payment Method</h3>

              <label style={radio}>
                <input
                  type="radio"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                Cash on Delivery
              </label>

              <label style={radio}>
                <input
                  type="radio"
                  checked={paymentMethod === "ONLINE"}
                  onChange={() => setPaymentMethod("ONLINE")}
                />
                Online Payment (Free Delivery)
              </label>
            </div>

            {/* PRICE SUMMARY */}
            <div style={summary}>
              <p>
                Items Total <span>₹{itemsTotal}</span>
              </p>

              <p>
                Delivery
                <span style={{ color: DELIVERY_CHARGE === 0 ? "#2e7d32" : "#000" }}>
                  {DELIVERY_CHARGE === 0 ? "FREE" : `₹${DELIVERY_CHARGE}`}
                </span>
              </p>

              {itemsTotal >= 999 && (
                <p style={freeNote}>🎉 You got FREE Delivery!</p>
              )}

              <h3>
                Payable Amount <span>₹{finalAmount}</span>
              </h3>
            </div>

            <button onClick={saveOrder}   style={btn} disabled={loading}>
              {loading ? "PROCESSING..." : `PLACE ORDER ₹${finalAmount}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popup = {
  background: "#fff",
  padding: 20,
  maxHeight: "95vh",
  overflowY: "auto",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const closeBtn = {
  fontSize: 22,
  cursor: "pointer",
};

const successBox = {
  padding: 40,
  textAlign: "center",
  fontSize: 22,
  fontWeight: 700,
  color: "#2e7d32",
};

const card = {
  background: "#f8f9ff",
  padding: 18,
  borderRadius: 14,
  marginBottom: 16,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 10,
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #ccc",
  outline: "none",
};

const itemRow = {
  display: "flex",
  gap: 14,
  alignItems: "center",
  marginBottom: 12,
};

const img = {
  width: 72,
  height: 92,
  borderRadius: 10,
  objectFit: "cover",
};

const qtyBox = {
  display: "flex",
  gap: 10,
  marginTop: 6,
  alignItems: "center",
};

const qtyBtn = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const radio = {
  display: "flex",
  gap: 10,
  marginTop: 10,
  alignItems: "center",
};

const summary = {
  background: "#eef2ff",
  padding: 18,
  borderRadius: 14,
  marginBottom: 16,
};

const freeNote = {
  color: "#2e7d32",
  fontWeight: 600,
  marginTop: 4,
};

const btn = {
  width: "100%",
  padding: 16,
  borderRadius: 14,
  border: "none",
  fontSize: 17,
  fontWeight: 700,
  background: "linear-gradient(135deg,#0b327b,#1749b2)",
  color: "#fff",
  cursor: "pointer",
};
