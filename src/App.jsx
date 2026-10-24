import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { OrderProvider } from "./context/OrderContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Materials } from "./pages/Materials";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Wishlist } from "./pages/Wishlist";
import { UserPage } from "./pages/UserPage";
import { Admin } from "./pages/admin/Admin";

export default function App() {
  return (
    <ThemeProvider>
      <ProductsProvider>
        <CartProvider>
          <UserProvider>
            <OrderProvider>
              <WishlistProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/katalog" element={<Shop />} />
                    <Route path="/materiallar" element={<Materials />} />
                    <Route path="/mahsulot/:id" element={<ProductDetail />} />
                    <Route path="/savat" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/sevimlilar" element={<Wishlist />} />
                    <Route path="/profil" element={<UserPage />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </BrowserRouter>
              </WishlistProvider>
            </OrderProvider>
          </UserProvider>
        </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
  );
}
