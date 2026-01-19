// src/pages/Checkout.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, totalPrice, clear } = useCart();
  const navigate = useNavigate();

  const handleConfirm = () => {
    // stub: in a real app you'd call a payments API here
    alert(`Order placed! Total: $${totalPrice.toFixed(2)}\n(Checkout is a demo stub)`);
    clear();
    navigate('/');
  };

  return (
    <div className="container py-5">
      <h1>Checkout</h1>
      <p className="text-muted">This is a checkout stub — integrate Stripe or other provider later.</p>

      {items.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
        ) : (
        <>
          <ul className="list-group mb-3">
            {items.map(i => (
              <li key={i.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{i.title}</strong>
                  <div className="small text-muted">Qty: {i.quantity}</div>
                </div>
                <div>${(i.price * i.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="h5">Total</div>
            <div className="h5">${totalPrice.toFixed(2)}</div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={handleConfirm}>Confirm order (demo)</button>
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
          </div>
        </>
      )}
    </div>
  );
}
