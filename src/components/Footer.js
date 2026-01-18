// src/components/Footer.js
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <small>© {new Date().getFullYear()} Everyday Tech — Smart tech & modern essentials.</small>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a className="text-decoration-none text-light me-3" href="#privacy">Privacy</a>
            <a className="text-decoration-none text-light me-3" href="#terms">Terms</a>
            <a className="text-decoration-none text-light" href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
