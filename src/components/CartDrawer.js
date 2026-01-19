// src/components/CartDrawer.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, clear, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-drawer-backdrop" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart-drawer-header d-flex align-items-center justify-content-between p-3 border-bottom">
          <h5 className="m-0">Your cart</h5>
          <div>
            <button className="btn btn-sm btn-outline-secondary me-2" onClick={clear}>Clear</button>
            <button className="btn btn-sm btn-outline-secondary" onClick={closeCart}>Close</button>
          </div>
        </div>

        <div className="cart-drawer-body p-3" style={{ overflowY: 'auto', maxHeight: '60vh' }}>
          {items.length === 0 && (
            <div className="text-center text-muted py-4">Your cart is empty.</div>
          )}

          {items.map(item => (
            <div key={item.id} className="d-flex gap-3 align-items-start mb-3">
              <img src={item.image} alt={item.title} className="rounded" style={{ width: 72, height: 72, objectFit: 'cover' }} onError={(e)=> e.target.src = '/products/placeholder.png'} />
              <div className="flex-fill">
                <div className="d-flex justify-content-between">
                  <strong>{item.title}</strong>
                  <button className="btn btn-sm btn-link text-danger" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
                <div className="small text-muted">${(item.price).toFixed(2)}</div>

                <div className="d-flex align-items-center gap-2 mt-2">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>-</button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value || '1', 10))}
                    className="form-control form-control-sm text-center"
                    style={{ width: 64 }}
                  />
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-drawer-footer p-3 border-top">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="small text-muted">Subtotal</div>
            <div><strong>${totalPrice.toFixed(2)}</strong></div>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-success w-100"
              onClick={() => { closeCart(); navigate('/checkout'); }}
              disabled={items.length === 0}
            >
              Proceed to checkout
            </button>
            <button className="btn btn-outline-secondary w-100" onClick={closeCart}>Continue shopping</button>
          </div>
        </div>
      </aside>
    </>
  );
}
