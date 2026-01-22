// src/components/ProductCard.jsx
import React from 'react';
import placeholder from '../assets/placeholder.png';
import { useToast } from '../context/ToastContext';

/**
 * ProductCard
 * Props:
 *  - product: object { id, title, price, image, images, short, description }
 *  - onAdd: optional callback (product) => {}
 *  - onPreview: optional callback (product) => {}
 */
export default function ProductCard({ product, onAdd, onPreview }) {
  // Call hook at top-level (no conditional/inside-callback) to satisfy rules-of-hooks
  const toastCtx = useToast(); // may be undefined if provider not mounted
  const addToast = toastCtx?.addToast;

  const handleAdd = () => {
    if (typeof onAdd === 'function') {
      onAdd(product);
      // Parent typically handles toasting; do not duplicate here.
    } else {
      // fallback: show a toast if provider exists
      addToast?.({
        type: 'success',
        title: 'Added to cart',
        message: `${product.title} has been added to your cart.`,
        duration: 3000,
      });
      // (Optional) you could implement a local cart here
    }
  };

  const handlePreview = () => {
    if (typeof onPreview === 'function') onPreview(product);
  };

  const srcSet = (product.images && product.images.length)
    ? product.images.map((src, i) => `${src} ${Math.min(400 * (i + 1), 1200)}w`).join(', ')
    : `${product.image} 800w`;

  return (
    <article className="card h-100 shadow-sm" aria-labelledby={`product-${product.id}-title`}>
      <div style={{ height: 220, overflow: 'hidden' }}>
        <img
          src={product.image}
          srcSet={srcSet}
          alt={`${product.title} — ${product.short || product.description || ''}`}
          className="card-img-top"
          loading="lazy"
          onError={(e) => {
            if (!e?.target) return;
            e.target.onerror = null;
            e.target.src = placeholder;
          }}
          style={{ cursor: 'pointer' }}
          onClick={handlePreview}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h3 id={`product-${product.id}-title`} className="card-title h5">
          {product.title}
        </h3>
        <p className="card-text text-muted small">
          {product.short || product.description}
        </p>

        <div className="mt-auto d-flex gap-2 justify-content-between align-items-center">
          <div><strong>${Number(product.price).toFixed(2)}</strong></div>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={handlePreview}
              aria-label={`Preview ${product.title}`}
            >
              Quick view
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={handleAdd}
              aria-label={`Add ${product.title} to cart`}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
