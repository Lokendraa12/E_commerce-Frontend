import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { text } from "framer-motion/client";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const [openOrder, setOpenOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${user.id}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await axios.put(`http://localhost:5000/api/orders/cancel/${id}`);
      const updatedOrder = res.data.order;
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? updatedOrder : order))
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error cancelling order");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/orders/${id}`);
      setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting order");
    }
  };

  const getTrackingStep = (status) => {
    switch (status) {
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "Out for Delivery":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 0;
    }
  };
  

  return (
    <div style={styles.container}>
      {/* Blurred background logo */}
      <div style={styles.bgLogo}></div>

      <h2 style={styles.title}>Your Orders</h2>

      {orders.length === 0 ? (
        <div style={styles.emptyBox}>
          <h3>No Orders Yet</h3>
          <p>Looks like you haven’t placed any order.</p>
        </div>
      ) : (
        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div key={order._id} style={styles.card}>
              {/* Header */}
              <div style={styles.header}>
                <div>
                  <p style={styles.orderId}>Order ID: {order._id}</p>
                  <p style={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={styles.summary}>
                  <span style={styles.total}>₹{order.totalAmount}</span>
                  <span style={{
                    ...styles.status,
                    background:
                      order.status === "Processing"
                        ? "#fff3cd"
                        : order.status === "Shipped"
                          ? "#d1ecf1"
                          : order.status === "Out for Delivery"
                            ? "#e2e3ff"
                            : order.status === "Cancelled"
                              ? "#fdecea"
                              : "#e6f4ea",
                    color:
                      order.status === "Processing"
                        ? "#856404"
                        : order.status === "Shipped"
                          ? "#0c5460"
                          : order.status === "Out for Delivery"
                            ? "#3730a3"
                            : order.status === "Cancelled"
                              ? "#b71c1c"
                              : "#1e7e34",
                  }}>
                    {order.status || "Processing"}
                  </span>
                </div>
              </div>

              {/* Items */}
              {order.items.map((item, i) => (
                <div key={i} style={styles.itemRow}>
                  <img src={item.image} alt={item.name} style={styles.image} />
                  <div style={styles.itemDetails}>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    <p style={styles.itemPrice}>₹{item.price} × {item.qty}</p>
                  </div>
                </div>
              ))}

              {/* Buttons */}
              <div style={styles.buttonGroup}>
                {order.status !== "Delivered" && order.status !== "Cancelled" && (
                  <button
                    style={styles.cancelBtn}
                    onClick={() => handleCancel(order._id)}
                  >
                    Cancel Order
                  </button>
                )}

                {(order.status === "Cancelled" ||
                  order.status === "Delivered") && (
                    <button
                      style={styles.deleteIcon}
                      onClick={() => handleDelete(order._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  )}

                <button
                  style={styles.detailsBtn}
                  onClick={() =>
                    setOpenOrder(openOrder === order._id ? null : order._id)
                  }
                >
                  {openOrder === order._id ? "Hide Details" : "View Details"}
                </button>
              </div>


              {/* Details */}
              {openOrder === order._id && (
                <div style={styles.detailsBox}>
                  <h4>Delivery Address</h4>
                  <p>{order.address.name}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state}</p>
                  <p>{order.address.pincode}</p>

                  {order.status !== "Cancelled" && (
                    <>
                      <h4>Estimated Delivery</h4>
                      <p>{new Date(order.estimatedDelivery).toDateString()}</p>
                    </>
                  )}


                  {order.status !== "Cancelled" && (
                    <>
                      <h4>Tracking Status</h4>

                      <div style={styles.trackingContainer}>

                        {/* Grey Line */}
                        <div style={styles.mainLine}></div>

                        {/* Green Progress Line */}
                        {(() => {
                          const currentStep = getTrackingStep(order.status);
                          const totalSteps = 4;
                          const progressWidth =
                            currentStep === 0
                              ? 0
                              : ((currentStep - 1) / (totalSteps - 1)) * 100 + (100 / (totalSteps * 2));

                          return (
                            <div
                              style={{
                                ...styles.progressLine,
                                width: `${progressWidth}%`,
                              }}
                            />
                          );
                        })()}


                        {(() => {
                          const steps = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
                          const currentStep = getTrackingStep(order.status);
                          const totalSteps = steps.length;

                          const progressWidth =
                            ((currentStep - 1) / (totalSteps - 1)) * 100;

                          return steps.map((step, index) => {
                            const circlePosition =
                              (index / (totalSteps - 1)) * 100;

                            const isActive = progressWidth >= circlePosition;

                            return (
                              <div key={index} style={styles.stepWrapper}>
                                <div
                                  style={{
                                    ...styles.stepCircle,
                                    background: isActive ? "#41b245" : "#ccc",
                                  }}
                                >
                                  {isActive ? "✓" : index + 1}
                                </div>
                                <p
                                  style={{
                                    ...styles.stepLabel,
                                    color: isActive ? "#111" : "#aaa",
                                  }}
                                >
                                  {step}
                                </p>
                              </div>
                            );
                          });
                        })()}

                      </div>

                    </>
                  )}


                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- STYLES ---
const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: "10px 20px",
    overflow: "hidden",
  },

  bgLogo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "800px",
    height: "800px",
    backgroundImage: "url('/logo.png')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    opacity: 0.05,
    transform: "translate(-50%, -50%)",
    filter: "blur(5px)",
    zIndex: 0,
  },

  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#111",
    marginBottom: "40px",
    position: "relative",
    zIndex: 1,
  },

  ordersList: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    position: "relative",
    zIndex: 1,
  },

  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    transition: "0.3s",
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "18px",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
  },

  orderId: { fontSize: "13px", color: "#777" },
  date: { fontSize: "13px", color: "#aaa" },
  summary: { textAlign: "right" },
  total: { fontSize: "22px", fontWeight: "700", color: "#111" },
  status: { padding: "6px 14px", fontSize: "12px", borderRadius: "20px", fontWeight: "600", display: "inline-block", marginTop: "8px" },

  itemRow: { display: "flex", alignItems: "center", gap: "18px", marginBottom: "18px", flexWrap: "wrap" },
  image: { width: "120px", height: "120px", objectFit: "cover", borderRadius: "12px", border: "1px solid #eee" },
  itemDetails: { flex: 1 },

  buttonGroup: { display: "flex", gap: "12px", marginTop: "15px", flexWrap: "wrap" },
  cancelBtn: { padding: "9px 16px", borderRadius: "8px", border: "none", background: "#e53935", color: "#fff", cursor: "pointer", fontWeight: "500" },
  detailsBtn: { padding: "9px 16px", borderRadius: "8px", border: "none", background: "#111", color: "#fff", cursor: "pointer", fontWeight: "500" },
  deleteIcon: { padding: "6px", border: "none", background: "transparent", cursor: "pointer", color: "#e53935", fontSize: "20px" },

  detailsBox: { marginTop: "20px", padding: "20px", background: "#fafbff", borderRadius: "14px", border: "1px solid #eee" },
  trackingBar: { height: "10px", background: "#e0e0e0", borderRadius: "20px", overflow: "hidden", marginTop: "12px" },
  progress: { height: "100%", background: "linear-gradient(90deg,#4caf50,#2e7d32)", transition: "0.5s ease" },

  emptyBox: { textAlign: "center", background: "#fff", padding: "50px", borderRadius: "16px", boxShadow: "0 8px 25px rgba(0,0,0,0.05)", zIndex: 1 },
  trackingContainer: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    marginTop: "40px",
  },


  stepWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
    flex: 1,
  },
  mainLine: {
    position: "absolute",
    top: "20px",
    left: "0",
    right: "0",
    height: "4px",
    background: "#ddd",
    zIndex: 1,
  },

  progressLine: {
    position: "absolute",
    top: "20px",
    left: "0",
    height: "4px",
    background: "#41b245",
    zIndex: 2,
    transition: "0.4s ease",
  },



  stepCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: "8px",
    transition: "0.3s ease",
  },
  stepLine: {
    flex: 1,
    height: "4px",
    margin: "0 8px",
    borderRadius: "10px",
    textAlign: "center",
    transition: "0.3s ease",
  },


  stepLabel: {
    fontSize: "12px",
    textAlign: "center",
    fontWeight: "500"
  },

};
