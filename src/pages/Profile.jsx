import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setMobile(user.mobile || "");
    }
  }, [user]);

  const handleSave = async () => {
    await updateProfile({ name, email, mobile });
    setEditMode(false);
    alert("Profile updated successfully");
  };

  return (
    <div style={page}>
      <div style={card}>
        {/* Logo Watermark */}
        <div style={watermark}></div>

        {/* Header */}
        <div style={header}>
          <div>
            <h2 style={{ margin: 0 }}>My Profile</h2>
            <span style={{ color: "#6b7280" }}>WowMart Account</span>
          </div>

          <img
            src="/logo.png"
            alt="WowMart"
            style={logo}
          />
        </div>

        {/* Body */}
        <div style={body}>
          {/* LEFT */}
          <div style={left}>
            <img
              src={user?.avatar || "/avatar.png"}
              alt="avatar"
              style={avatar}
            />
            <h3 style={{ marginTop: 12 }}>{user?.name}</h3>
            <p style={muted}>{user?.email}</p>
          </div>

          {/* RIGHT */}
          <div style={right}>
            <Field label="Full Name" value={name} setValue={setName} edit={editMode} />
            <Field label="Email Address" value={email} setValue={setEmail} edit={editMode} type="email" />
            <Field label="Mobile Number" value={mobile} setValue={setMobile} edit={editMode} />

            {!editMode ? (
              <button style={editBtn} onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            ) : (
              <button style={saveBtn} onClick={handleSave}>
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- Field Component -------- */
const Field = ({ label, value, setValue, edit, type = "text" }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={labelStyle}>{label}</label>
    {!edit ? (
      <div style={valueBox}>{value || "-"}</div>
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={input}
      />
    )}
  </div>
);


const page = {
  minHeight: "100vh",
  background: "#f3f4f6",
  display: "flex",
  justifyContent: "center",
  padding: "40px 15px",
};

const card = {
  width: "100%",
  maxWidth: "950px",
  background: "#fff",
  borderRadius: 18,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  position: "relative",
  overflow: "hidden",
};

const watermark = {
  position: "absolute",
  inset: 0,
  backgroundImage: "url('/logo.png')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "900px",
  opacity: 0.10,
  pointerEvents: "none",
};

const header = {
  padding: "20px 30px",
  borderBottom: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
};

const logo = {
  height: "100px",
  objectFit: "contain",
};

const body = {
  display: "flex",
  padding: 30,
  gap: 40,
  flexWrap: "wrap",
};

const left = {
  width: "100%",
  maxWidth: 260,
  textAlign: "center",
  borderRight: "1px solid #e5e7eb",
  paddingRight: 30,
};

const right = {
  flex: 1,
  minWidth: 250,
};

const avatar = {
  width: 110,
  height: 110,
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #2563eb",
};

const muted = {
  color: "#6b7280",
  fontSize: 14,
};

const labelStyle = {
  fontSize: 14,
  color: "#374151",
  marginBottom: 4,
  display: "block",
};

const valueBox = {
  padding: "10px 12px",
  background: "#f9fafb",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
};

const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 15,
};

const editBtn = {
  marginTop: 20,
  padding: "12px",
  width: "100%",
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};

const saveBtn = {
  ...editBtn,
  background: "#16a34a",
};
