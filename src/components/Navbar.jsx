import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import "./Navbar.css";

export default function Navbar() {
    const { cartItems } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const nav = useNavigate();

    const doLogout = () => {
        logout();
        nav('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim() === "") return;
        nav(`/search?q=${searchText}`);
        setSearchText("");
    };

    return (
        <nav className="wow-navbar">
            <div className="wow-nav-inner">

                {/* LEFT : Logo */}
                <Link to="/" className="wow-logo">
                    <img src="/logo.png" alt="WowMart" />
                </Link>

                {/* CENTER : Links */}
                <div className="wow-links">
                    <Link to="/">Home</Link>
                </div>

                {/* SEARCH */}
                <form className="wow-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="submit">
                        <i className="ri-search-line"></i>
                    </button>
                </form>

                {/* RIGHT : Cart & Profile */}
                <div className="right-section">

                    {/* 🛒 Cart (Click to open page, no hover) */}
                    <Link to="/cart" className="cart-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M1 2h3l3 11l-1 4h15M7 21a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm14 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM7 13h12l3-9H4.545z" /></svg>

                        {cartItems?.length > 0 && (
                            <span className="cart-badge">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>


                    {/* Profile */}
                    {user ? (
                         <div className="profile-area">
    <div className="profile">
      <img src={user.avatar || "/avatar.png"} alt="profile" />
    </div>

    <div className="profile-menu">
      <Link to="/profile" className="menu-item">My Profile</Link>
      <Link to="/orders" className="menu-item">My Orders</Link>
      <button onClick={doLogout} className="menu-item logout-btn">
        Logout
      </button>
    </div>
  </div>
                    ) : (
                        <>
                            <Link to="/login" className="navlink">Login</Link>
                            <Link to="/register" className="navlink">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
