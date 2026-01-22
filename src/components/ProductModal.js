// src/components/ProductModal.jsx
import React from 'react';

export default function ProductModal({ product, open, onClose, onAdd }) {
  if (!open || !product) return null;

  return (
    <div
      className="product-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={(e) => { if (e.target.classList.contains('product-modal-backdrop')) onClose(); }}
    >
      <div className="product-modal container py-4">
        <div className="row g-3">
          <div className="col-md-6 text-center">
            <img src={product.image} alt={product.title} className="img-fluid rounded" style={{ maxHeight: 360 }} />
          </div>
          <div className="col-md-6">
            <h2 id="product-modal-title">{product.title}</h2>
            <p className="text-muted">{product.short}</p>
            {product.specs && (
              <ul className="small">
                {Object.entries(product.specs).map(([k, v]) => (
                  <li key={k}><strong>{k}:</strong> {Array.isArray(v) ? v.join(', ') : v}</li>
                ))}
              </ul>
            )}
            <div className="mt-3 d-flex align-items-center gap-3">
              <div className="fs-4"><strong>${Number(product.price).toFixed(2)}</strong></div>
              <button className="btn btn-success" onClick={() => { onAdd?.(product); onClose(); }}>
                Add to cart
              </button>
              <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}
