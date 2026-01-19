// src/components/CartWidget.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

export default function CartWidget() {
  const { totalCount, openCart } = useCart();

  return (
    <button
      type="button"
      className="btn btn-outline-light ms-2 position-relative"
      onClick={openCart}
      aria-label="Open cart"
    >
      <FiShoppingCart size={18} />
      {totalCount > 0 && (
        <span className="badge bg-success rounded-pill cart-badge">
          {totalCount}
        </span>
      )}
      <span className="visually-hidden">Cart with {totalCount} items</span>
    </button>
  );
}
