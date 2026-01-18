// src/components/CartWidget.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

export default function CartWidget() {
  const { totalCount, items, totalPrice, clear } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div className="position-relative">
      <button
        type="button"
        className="btn btn-outline-light ms-2 position-relative"
        onClick={() => setOpen(prev => !prev)}
        aria-label="Toggle cart preview"
      >
        <FiShoppingCart size={18} />
        {totalCount > 0 && (
          <span className="badge bg-success rounded-pill cart-badge">
            {totalCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="position-absolute end-0 mt-2 bg-white text-dark shadow rounded p-3"
          style={{ width: 280, zIndex: 1100 }}
          role="dialog"
          aria-label="Cart preview"
        >
          <h6 className="mb-2">Your Cart</h6>

          {!items.length && (
            <p className="text-muted small mb-0">Cart is empty.</p>
          )}

          {items.length > 0 && (
            <>
              <ul className="list-unstyled small mb-2">
                {items.map(item => (
                  <li key={item.id} className="d-flex justify-content-between mb-1">
                    <span>{item.title} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between fw-bold border-top pt-2 mb-2">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary w-50"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-sm btn-danger w-50"
                  onClick={() => {
                    clear();
                    setOpen(false);
                  }}
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
