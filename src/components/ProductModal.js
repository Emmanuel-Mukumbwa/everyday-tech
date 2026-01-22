// src/components/ProductModal.jsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import placeholder from '../assets/placeholder.png';

/**
 * ProductModal
 * Props:
 *  - product: product object
 *  - open: boolean
 *  - onClose: function
 *  - onAdd: function
 *
 * Renders the modal into a portal (document.body) so it overlays everything.
 * Prevents background scroll while open, focuses the close button, supports Escape key and backdrop click.
 */
export default function ProductModal({ product, open, onClose, onAdd }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  // Prevent background scroll and restore on close
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  // Focus the close button when modal opens (basic accessibility)
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);
    return () => clearTimeout(t);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !product) return null;

  const handleBackdropClick = (e) => {
    // close only when clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) onClose();
  };

  const modal = (
    <div
      className="product-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={handleBackdropClick}
    >
      <div className="product-modal container py-4" ref={dialogRef} role="document">
        <div className="row g-3">
          <div className="col-md-6 text-center">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxHeight: 360 }}
              onError={(e) => {
                if (!e?.target) return;
                e.target.onerror = null;
                e.target.src = placeholder;
              }}
            />
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

              <button
                className="btn btn-success"
                onClick={() => {
                  onAdd?.(product);
                  onClose();
                }}
              >
                Add to cart
              </button>

              <button
                ref={closeButtonRef}
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render into document.body via portal (safe-guard for SSR-less apps)
  return typeof document !== 'undefined' ? ReactDOM.createPortal(modal, document.body) : modal;
}
