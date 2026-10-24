import React from "react";
import { createContext, useContext, useState } from "react";
import { useProducts } from "./ProductsContext";

const CartContext = createContext(null);

export const PROMO_CODES = {
  LOY10: 10,
  LOY15: 15,
  SOPOL20: 20,
};

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { products } = useProducts();
  const [items, setItems] = useState([]);
  const [promo, setPromo] = useState(null);

  function add(id, qty = 1) {
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
  }
  function setQty(id, qty) {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  }
  function remove(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }
  function clear() {
    setItems([]);
    setPromo(null);
  }
  function applyPromo(code) {
    const clean = code.trim().toUpperCase();
    const percent = PROMO_CODES[clean];
    if (!percent) return false;
    setPromo({ code: clean, percent });
    return true;
  }
  function removePromo() {
    setPromo(null);
  }

  const lines = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
    .filter((l) => l.product);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.product.price, 0);
  const discountAmount = promo ? Math.round((subtotal * promo.percent) / 100) : 0;
  const total = subtotal - discountAmount;

  return (
    <CartContext.Provider
      value={{ items, lines, count, subtotal, promo, discountAmount, total, add, setQty, remove, clear, applyPromo, removePromo }}
    >
      {children}
    </CartContext.Provider>
  );
}
