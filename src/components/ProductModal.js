// src/components/ProductModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import placeholder from '../assets/placeholder.png';

export default function ProductModal({ product, open, onClose, onAdd }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Build unique set of images, starting with main one
  const mainImage = product?.image;
  const extraImages = product?.images || [];
  const allImages = mainImage ? [mainImage, ...extraImages.filter(img => img !== mainImage)] : [];
  const images = [...new Set(allImages)];

  // Reset index when product changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [product]);

  // Prevent background scroll
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  // Focus close button when modal opens
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
    if (e.target === e.currentTarget) onClose();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

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
          <div className="col-md-6 text-center position-relative">
            <img
              src={currentImage}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxHeight: 360, width: 'auto', margin: '0 auto' }}
              onError={(e) => {
                if (!e?.target) return;
                e.target.onerror = null;
                e.target.src = placeholder;
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="btn btn-light position-absolute top-50 start-0 translate-middle-y rounded-circle shadow-sm"
                  style={{ left: '-15px', zIndex: 2 }}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  className="btn btn-light position-absolute top-50 end-0 translate-middle-y rounded-circle shadow-sm"
                  style={{ right: '-15px', zIndex: 2 }}
                  aria-label="Next image"
                >
                  ›
                </button>
                <div className="mt-2">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        margin: '0 3px',
                        backgroundColor: idx === currentIndex ? '#000' : '#ccc',
                        cursor: 'pointer',
                      }}
                      onClick={() => setCurrentIndex(idx)}
                    />
                  ))}
                </div>
              </>
            )}
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

  return typeof document !== 'undefined' ? ReactDOM.createPortal(modal, document.body) : modal;
}