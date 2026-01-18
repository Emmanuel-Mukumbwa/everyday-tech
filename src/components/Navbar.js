// src/components/Navbar.jsx
import React, { useState } from 'react';
import CartWidget from './CartWidget';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">Everyday Tech</a>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navMenu"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen(prev => !prev)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="navMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#features" onClick={handleLinkClick}>Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#products" onClick={handleLinkClick}>Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials" onClick={handleLinkClick}>Reviews</a>
              </li>
              <li className="nav-item d-flex align-items-center">
                <a className="btn btn-outline-light ms-2" href="#shop" onClick={handleLinkClick}>Shop</a>
              </li>
              <li className="nav-item d-flex align-items-center">
                <CartWidget />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
