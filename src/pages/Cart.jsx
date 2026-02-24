import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import "../styles/cart.css";
import Checkout from './Checkout';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cartItems, removeFromCart, updateQty, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    if (!cartItems || cartItems.length === 0) {
    return (
        <div className="cart-empty">
            <div className="empty-box">
                <div className="empty-icon"><svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path fill="currentColor" d="M19.5 22a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-10 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path><path d="M5 4h17l-2 11H7zm0 0c-.167-.667-1-2-3-2m18 13H5.23c-1.784 0-2.73.781-2.73 2s.946 2 2.73 2H19.5"></path></g></svg></div>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven’t added anything yet.</p>
                <Link to="/" className="shop-btn">Start Shopping</Link>
            </div>
        </div>
    );
}


    // Calculate total
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div className="cart-page">
            <h1 className="cart-title">Shopping Cart</h1>

            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.cartId} className="cart-item">
                            <img 
                                src={Array.isArray(item.images) ? item.images[0] : item.images} 
                                alt={item.name} 
                                className="cart-item-img" 
                            />
                            <div className="cart-item-details">
                                <h3 className="cart-item-name">{item.name}</h3>
                                <p className="cart-item-price">₹{item.price}</p>
                                <div className="cart-item-qty">
                                    <button
                                        className="qty-btn"
                                        onClick={() => {
                                            if (item.qty > 1) {
                                                updateQty(item.cartId, item.qty - 1);
                                            } else {
                                                removeFromCart(item.cartId);
                                            }
                                        }}
                                    >-</button>
                                    <span>{item.qty}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQty(item.cartId, item.qty + 1)}
                                    >+</button>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.cartId)}
                                >Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <p>Total Items: {cartItems.length}</p>
                    <p>Total Price: <strong>₹{totalPrice.toFixed(2)}</strong></p>
                    <button className="checkout-btn" onClick={() => navigate('/Checkout')}>Proceed to Checkout</button>
                    <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
                </div>
            </div>
        </div>
        
    );
}
