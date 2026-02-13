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
                <h2>Your Cart is Empty 😔</h2>
                <p>Add some products to see them here.</p>
                <Link to="/" className="btn-back">Go Shopping</Link>
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
