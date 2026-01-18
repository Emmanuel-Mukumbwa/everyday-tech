// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('everydaytech_cart_v1');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('everydaytech_cart_v1', JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image, quantity: qty }];
    });
  };

  const removeItem = (productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i));
  };

  const clear = () => setItems([]);

  const totalCount = items.reduce((s, it) => s + (it.quantity || 0), 0);
  const totalPrice = items.reduce((s, it) => s + (it.price * (it.quantity || 0)), 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
