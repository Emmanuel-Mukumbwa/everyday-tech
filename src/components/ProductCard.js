// src/components/ProductCard.jsx
import React from 'react';

/**
 * ProductCard
 * Props:
 *  - product: object { id, title, price, image, images, short, description }
 *  - onAdd: optional callback (product) => {}
 */
export default function ProductCard({ product, onAdd }) {
  const handleAdd = () => {
    if (typeof onAdd === 'function') {
      onAdd(product);
    } else {
      // simple fallback stub for now
      alert(`${product.title} added to cart (client-side stub)`);
    }
  };

  // Build a simple srcSet if product.images provided, else fallback to product.image
  const srcSet = (product.images && product.images.length)
    ? product.images.map((src, i) => `${src} ${Math.min(400 * (i + 1), 1200)}w`).join(', ')
    : `${product.image} 800w`;

  return (
    <article className="card h-100 shadow-sm" aria-labelledby={`product-${product.id}-title`}>
      <div style={{ height: 220, overflow: 'hidden' }}>
        <picture>
          {/* If you provide webp variants in product.images, prefer those in source */}
          <source srcSet={product.image?.replace(/\.(jpe?g|png)$/i, '.webp')} type="image/webp" />
          <img
            src={product.image}
            srcSet={srcSet}
            alt={`${product.title} — ${product.short || product.description || ''}`}
            className="card-img-top"
            loading="lazy"
            onError={(e) => { e.target.src = '/products/placeholder.png'; }}
          />
        </picture>
      </div>

      <div className="card-body d-flex flex-column">
        <h3 id={`product-${product.id}-title`} className="card-title h5">
          {product.title}
        </h3>
        <p className="card-text text-muted small">
          {product.short || product.description}
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div><strong>${Number(product.price).toFixed(2)}</strong></div>
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
    </article>
  );
}
