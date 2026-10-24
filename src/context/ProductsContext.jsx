import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_PRODUCTS } from "../data/products";
import { slugify } from "../utils/format";

const ProductsContext = createContext(null);

export function useProducts() {
  return useContext(ProductsContext);
}

const STORAGE_KEY = "loy_products_v2";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
    }
  }, [products]);

  function addProduct(data) {
    const id = slugify(data.name);
    const withId = { ...data, id: products.some((p) => p.id === id) ? `${id}-${Date.now()}` : id };
    setProducts((prev) => [withId, ...prev]);
  }
  function updateProduct(id, data) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }
  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }
  function resetProducts() {
    setProducts(INITIAL_PRODUCTS);
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
