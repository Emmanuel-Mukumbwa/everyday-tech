import React, { useState, useEffect, useRef, useMemo } from 'react';
import placeholder from '../assets/placeholder.png';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product, onAdd, onPreview }) {
  const toastCtx = useToast();
  const addToast = toastCtx?.addToast;

  // Build a unique set of images, memoized to avoid recreating on every render
  const { images, hasMultiple } = useMemo(() => {
    const mainImage = product.image;
    const extraImages = product.images || [];
    const allImages = [mainImage, ...extraImages.filter(img => img !== mainImage)];
    const uniqueImages = [...new Set(allImages)];
    return {
      images: uniqueImages,
      hasMultiple: uniqueImages.length > 1,
    };
  }, [product]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto‑rotate images every 4 seconds (only when multiple and not hovered)
  useEffect(() => {
    if (!hasMultiple || isHovered) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [images.length, hasMultiple, isHovered]);

  // Reset index when product changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [product]);

  // Preload the next image to reduce flicker
  useEffect(() => {
    if (hasMultiple) {
      const nextIndex = (currentIndex + 1) % images.length;
      const nextImg = new Image();
      nextImg.src = images[nextIndex];
    }
  }, [currentIndex, images, hasMultiple]);

  const handleAdd = () => {
    if (typeof onAdd === 'function') {
      onAdd(product);
    } else {
      addToast?.({
        type: 'success',
        title: 'Added to cart',
        message: `${product.title} has been added to your cart.`,
        duration: 3000,
      });
    }
  };

  const handlePreview = () => {
    if (typeof onPreview === 'function') onPreview(product);
  };

  const currentImage = images[currentIndex];

  return (
    <article
      className="card h-100 shadow-sm"
      aria-labelledby={`product-${product.id}-title`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          height: 220,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#f8f9fa', // light background while loading
        }}
      >
        <img
          key={currentIndex} // forces re‑render to trigger transition
          src={currentImage}
          alt={`${product.title} — view ${currentIndex + 1}`}
          className="card-img-top"
          loading="lazy"
          onError={(e) => {
            if (!e?.target) return;
            e.target.onerror = null;
            e.target.src = placeholder;
          }}
          style={{
            cursor: 'pointer',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.25s ease-in-out',
            opacity: 1,
          }}
          onClick={handlePreview}
        />
        {hasMultiple && (
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            {images.map((_, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  margin: '0 3px',
                  backgroundColor: idx === currentIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </div>
        )}
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