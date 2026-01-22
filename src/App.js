// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

// Components 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Pages
import Home from './pages/Home';
import Checkout from './pages/Checkout';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="flex-fill">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
                {/* future routes: /product/:id, /cart, /about */}
              </Routes>
            </main>

            <Footer />
            <CartDrawer />
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
