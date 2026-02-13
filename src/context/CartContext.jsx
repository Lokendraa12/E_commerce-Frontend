import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const CartContext = createContext();

export function CartProvider({ children }) {

  // ✅ Load cart from localStorage on first render
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [openCart, setOpenCart] = useState(false);

  // ✅ Save cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ ADD TO CART
  const addToCart = (product) => {
    const cartProduct = {
      ...product,
      cartId: uuidv4(),
      qty: product.qty || 1, // safety
    };

    setCartItems((prev) => [...prev, cartProduct]);
    setOpenCart(true);
  };

  // 🔄 UPDATE QTY
  const updateQty = (cartId, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? { ...item, qty: Math.max(1, qty) }
          : item
      )
    );
  };

  // ❌ REMOVE PRODUCT
  const removeFromCart = (cartId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.cartId !== cartId)
    );
  };

  // 🧹 CLEAR CART
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        openCart,
        setOpenCart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
