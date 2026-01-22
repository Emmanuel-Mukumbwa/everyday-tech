// src/components/Hero.jsx
import React from 'react';
import heroImg from '../assets/hero-product.jpg';
import heroPlaceholder from '../assets/hero-placeholder.png';

/**
 * Hero component
 * Props:
 *  - onPrimaryClick: optional callback for primary CTA (Shop Collection)
 */
export default function Hero({ onPrimaryClick }) {
  const handlePrimaryClick = (e) => {
    e?.preventDefault?.();
    if (typeof onPrimaryClick === 'function') onPrimaryClick();
    // smooth scroll to products section as fallback
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="container py-5" aria-labelledby="hero-heading">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 id="hero-heading" className="display-5 fw-bold">
            Smart tech & modern essentials for everyday productivity
          </h1>

          <p className="lead text-muted">
            Practical tech accessories and lifestyle gear made for work, travel, and daily use.
          </p>

          <div className="d-flex gap-2">
            <a
              href="#products"
              className="btn btn-success btn-lg"
              onClick={handlePrimaryClick}
            >
              Shop Collection
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="#features">
              Learn more
            </a>
          </div>

          <div className="mt-3 small text-muted">
            Mobile-first · Secure checkout · Ships locally & internationally
          </div>
        </div>

        <div className="col-md-6 text-center">
          <img
            src={heroImg}
            alt="Everyday Tech hero product preview"
            className="img-fluid rounded shadow-sm hero-img"
            loading="lazy"
            onError={(e) => {
              if (!e?.target) return;
              e.target.onerror = null; // prevent infinite loop
              e.target.src = heroPlaceholder;
            }}
          />
        </div>
      </div>
    </section>
  );
}
