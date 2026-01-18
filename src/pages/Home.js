// src/pages/Home.jsx
import React from 'react';
import products from '../data/products';

/**
 * NOTE:
 * - This Home.jsx contains small inline placeholder components (HeroInline, ProductCardInline)
 *   so the app renders immediately without needing external component files.
 * - When you create separate files `src/components/Hero.jsx` and `src/components/ProductCard.jsx`,
 *   replace the inline components with:
 *     import Hero from '../components/Hero';
 *     import ProductCard from '../components/ProductCard';
 */

/* ---------- Inline Hero (replace with components/Hero.jsx later) ---------- */
function HeroInline() {
  return (
    <section className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-5 fw-bold">Smart tech & modern essentials for everyday productivity</h1>
          <p className="lead text-muted">
            Practical tech accessories and lifestyle gear made for work, travel, and daily use.
          </p>
          <div className="d-flex gap-2">
            <a className="btn btn-success btn-lg" href="#products">Shop Collection</a>
            <a className="btn btn-outline-secondary btn-lg" href="#features">Learn more</a>
          </div>
          <div className="mt-3 small text-muted">Mobile-first · Secure checkout · Ships locally & internationally</div>
        </div>

        <div className="col-md-6 text-center">
          {/* Placeholder image - replace with public/hero-product.png or real image */}
          <div className="bg-light rounded shadow-sm d-inline-block p-3">
            <img
              src="/hero-product.png"
              alt="Hero product preview"
              className="img-fluid hero-img"
              style={{ maxWidth: 420 }}
              onError={(e)=>{ e.target.style.opacity = 0.5 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Inline ProductCard (replace with components/ProductCard.jsx later) ---------- */
function ProductCardInline({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <div style={{height:220, overflow:'hidden'}}>
        <img
          src={product.image}
          alt={product.title}
          className="card-img-top"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
          onError={(e)=> { e.target.src = '/products/placeholder.png'; }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted small">{product.short || product.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div><strong>${product.price}</strong></div>
          <button className="btn btn-success btn-sm" aria-label={`Add ${product.title} to cart`}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page Export ---------- */
export default function Home() {
  return (
    <main>
      <HeroInline />

      <section id="features" className="container py-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <h5>Mobile-first design</h5>
            <p className="text-muted">Fast, responsive layouts with mobile users in mind.</p>
          </div>
          <div className="col-md-4">
            <h5>Reliable gear</h5>
            <p className="text-muted">Products chosen for everyday durability and practicality.</p>
          </div>
          <div className="col-md-4">
            <h5>Secure checkout</h5>
            <p className="text-muted">Trust signals and clear policies to reduce friction.</p>
          </div>
        </div>
      </section>

      <section id="products" className="container py-5">
        <h2 className="mb-4">Featured products</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products && products.map(p => (
            <div key={p.id} className="col">
              <ProductCardInline product={p} />
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="container py-5">
        <h2 className="mb-4">What customers say</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <blockquote className="blockquote">
              <p>"Fast shipping and the power bank lasted me two long trips — strongly recommend."</p>
              <footer className="blockquote-footer">T. Banda</footer>
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote className="blockquote">
              <p>"Sleek design and the laptop stand fixed my posture. Great value."</p>
              <footer className="blockquote-footer">L. Mwale</footer>
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote className="blockquote">
              <p>"Good quality for the price — would buy again."</p>
              <footer className="blockquote-footer">A. Nkhoma</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="newsletter" className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h3>Get 10% off your first order</h3>
            <p className="text-muted">Join our newsletter for product drops and promos.</p>
            <form className="d-flex gap-2 justify-content-center" onSubmit={(e)=>{ e.preventDefault(); alert('Thanks! (replace with real submission)'); }}>
              <input type="email" required className="form-control w-50" placeholder="Your email" aria-label="Email address"/>
              <button className="btn btn-success" type="submit">Subscribe</button>
            </form>
            <div className="mt-2 small text-muted">We respect your inbox. Unsubscribe anytime.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
