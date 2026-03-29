// src/components/ProductCard.js
import React, { useState, useEffect, useRef, useMemo } from 'react';
import placeholder from '../assets/placeholder.png';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product, onAdd, onPreview, priority = false }) {
  const toastCtx = useToast();
  const addToast = toastCtx?.addToast;
  const cardRef = useRef(null);

  const { images, hasMultiple } = useMemo(() => {
    const mainImage = product?.image;
    const extraImages = product?.images || [];
    const allImages = mainImage ? [mainImage, ...extraImages.filter((img) => img !== mainImage)] : [];
    const uniqueImages = [...new Set(allImages)].filter(Boolean);

    return {
      images: uniqueImages,
      hasMultiple: uniqueImages.length > 1,
    };
  }, [product]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);

  const currentImage = images[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setLoaded(false);
  }, [product]);

  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }

    const node = cardRef.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '250px',
        threshold: 0.1,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!isVisible || !currentImage || images.length === 0) return;

    const toPreload = [currentImage];

    if (hasMultiple) {
      const nextIndex = (currentIndex + 1) % images.length;
      const nextImage = images[nextIndex];
      if (nextImage && nextImage !== currentImage) {
        toPreload.push(nextImage);
      }
    }

    toPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [isVisible, currentImage, currentIndex, hasMultiple, images]);

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

  const handlePrev = (e) => {
    e.stopPropagation();
    setLoaded(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLoaded(false);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <article
      ref={cardRef}
      className="card h-100 shadow-sm"
      aria-labelledby={`product-${product.id}-title`}
    >
      <div
        style={{
          height: 220,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#f1f3f5',
        }}
      >
        <img
          src={currentImage}
          alt={`${product.title} — view ${currentIndex + 1}`}
          className="card-img-top"
          loading={priority || isVisible ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            if (!e?.target) return;
            e.target.onerror = null;
            e.target.src = placeholder;
            setLoaded(true);
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            cursor: 'pointer',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 220ms ease-in-out',
          }}
          onClick={handlePreview}
        />

        {!loaded && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f1f3f5',
              zIndex: 2,
            }}
          >
            <div
              className="spinner-border text-secondary"
              role="status"
              aria-label="Loading image"
              style={{
                width: '2rem',
                height: '2rem',
              }}
            />
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label={`Previous image for ${product.title}`}
              className="btn btn-light btn-sm rounded-circle shadow-sm"
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 3,
                width: '2.25rem',
                height: '2.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              ‹
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={`Next image for ${product.title}`}
              className="btn btn-light btn-sm rounded-circle shadow-sm"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 3,
                width: '2.25rem',
                height: '2.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              ›
            </button>

            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                left: 0,
                right: 0,
                textAlign: 'center',
                zIndex: 3,
              }}
            >
              {images.map((_, idx) => (
                <span
                  key={idx}
                  role="button"
                  tabIndex={0}
                  aria-label={`Show image ${idx + 1} of ${product.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLoaded(false);
                    setCurrentIndex(idx);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLoaded(false);
                      setCurrentIndex(idx);
                    }
                  }}
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    margin: '0 3px',
                    backgroundColor: idx === currentIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </>
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
          <div>
            <strong>${Number(product.price).toFixed(2)}</strong>
          </div>

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