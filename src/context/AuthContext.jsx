import React, { createContext, useEffect, useState } from "react";
import API, { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  // ✅ Sync token with axios on app load & token change
  useEffect(() => {
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(null);
    }
  }, [token]);

  // 🔐 LOGIN
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });

    const { token: t, user: u } = res.data;

    setToken(t);
    setUser(u);

    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));

    setAuthToken(t);
    return u;
  };

  // 📝 REGISTER
  const register = async (name, email, password, mobile) => {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
      mobile,
    });

    const { token: t, user: u } = res.data;

    setToken(t);
    setUser(u);

    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));

    setAuthToken(t);
    return u;
  };

  // 🚪 LOGOUT
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthToken(null);
  };

  // 👤 UPDATE PROFILE (REFRESH SAFE)
  const updateProfile = async (updates) => {
    const res = await API.put("/auth/profile", updates);

    const updatedUser = res.data.user;

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
