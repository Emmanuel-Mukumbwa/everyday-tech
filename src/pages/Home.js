// src/pages/Home.jsx
import React, { useState } from 'react';
import products from '../data/products';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useCart } from '../context/CartContext';

/* Small inner component to show a confirmation toast-like message (simple) */
function AddConfirm({ item }) {
  if (!item) return null;
  return (
    <div className="position-fixed bottom-0 end-0 m-3">
      <div className="alert alert-success py-2 px-3 shadow-sm" role="status">
        Added <strong>{item.title}</strong> to cart
      </div>
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [recent, setRecent] = useState(null);
  const { addItem } = useCart();

  const handleAdd = (product) => {
    addItem(product, 1);
    setRecent(product);
    setTimeout(() => setRecent(null), 2200);
  };

  const handlePreview = (product) => {
    setSelected(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <Hero />

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
              <ProductCard product={p} onAdd={handleAdd} onPreview={handlePreview} />
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
            <form className="d-flex gap-2 justify-content-center" onSubmit={(e) => { e.preventDefault(); alert('Thanks! (replace with real submission)'); }}>
              <input type="email" required className="form-control w-50" placeholder="Your email" aria-label="Email address" />
              <button className="btn btn-success" type="submit">Subscribe</button>
            </form>
            <div className="mt-2 small text-muted">We respect your inbox. Unsubscribe anytime.</div>
          </div>
        </div>
      </section>

      <ProductModal
        product={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onAdd={(p) => { handleAdd(p); setSelected(null); }}
      />

      <AddConfirm item={recent} />
    </main>
  );
}
