import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "loy_wishlist_v1";

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
    }
  }, [ids]);

  function has(id) {
    return ids.includes(id);
  }

  function toggle(id) {
    setIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  function remove(id) {
    setIds((prev) => prev.filter((i) => i !== id));
  }

  return (
    <WishlistContext.Provider value={{ ids, count: ids.length, has, toggle, remove }}>
      {children}
    </WishlistContext.Provider>
  );
}
