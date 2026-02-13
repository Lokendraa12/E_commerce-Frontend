import React from 'react';
import {  Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import SearchResults from './pages/Search';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductCreate from "./pages/AddProduct";
import Collections from './pages/collection';
import ShirtsPage from './collections/Shirtpage';
import TShirtPage from './collections/TShirtPage';
import JeansPage from './collections/JeansPage';
import PremiumInnerwearPage from './collections/PremiumInnerwearPage';
import TrousersPage from './collections/TrousersPage';
import ShoesPage from './collections/ShoesPage';
import FeaturedProducts from './pages/FeatureProduct';
import Order from './pages/Order';

function AppContent() {
  const location = useLocation();

  // Routes where navbar should be HIDDEN
  const hideNavbarRoutes = ['/login', '/register'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
    <CartDrawer />
      {!shouldHideNavbar && <Navbar />}

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/featured" element={<FeaturedProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/Search/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-product" element={<ProductCreate />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
        </Routes>
        <Routes>
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/t-shirts" element={<TShirtPage />} />
          <Route path="/collections/shirts" element={<ShirtsPage/>} />
          <Route path="/collections/jeans" element={<JeansPage/>} />
          <Route path="/collections/premium-innerwear" element={<PremiumInnerwearPage/>} />
          <Route path="/collections/trousers" element={<TrousersPage/>} />
          <Route path="/collections/shoes" element={<ShoesPage/>} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
  
          <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
