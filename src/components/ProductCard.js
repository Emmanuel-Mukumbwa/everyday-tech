// src/components/ProductCard.jsx
import React from 'react';

/**
 * ProductCard
 * Props:
 *  - product: object { id, title, price, image, images, short, description }
 *  - onAdd: optional callback (product) => {}
 *  - onPreview: optional callback (product) => {}
 */
export default function ProductCard({ product, onAdd, onPreview }) {
  const handleAdd = () => {
    if (typeof onAdd === 'function') {
      onAdd(product);
    } else {
      alert(`${product.title} added to cart (client-side stub)`);
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
        <picture>
          <source srcSet={product.image?.replace(/\.(jpe?g|png)$/i, '.webp')} type="image/webp" />
          <img
            src={product.image}
            srcSet={srcSet}
            alt={`${product.title} — ${product.short || product.description || ''}`}
            className="card-img-top"
            loading="lazy"
           onError={(e) => {
              if (!e?.target) return;
              e.target.onerror = null;
              e.target.src = '/products/placeholder.png';
            }}
            style={{ cursor: 'pointer' }}
            onClick={handlePreview}
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
