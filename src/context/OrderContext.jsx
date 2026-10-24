import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext(null);
const STORAGE_KEY = "loy_orders_v1";

export function useOrders() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
    }
  }, [orders]);

  function addOrder({ customer, items, total }) {
    const order = {
      id: `LOY-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      status: "Yangi",
      customer,
      items,
      total,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }

  function updateStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateStatus }}>
      {children}
    </OrderContext.Provider>
  );
}
