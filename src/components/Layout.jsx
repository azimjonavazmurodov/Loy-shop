import React from "react";
import { useTheme } from "../context/ThemeContext";
import { GlobalStyle } from "./GlobalStyle";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }) {
  const { tokens: T } = useTheme();
  return (
    <div style={{ background: T.stone, color: T.ink, minHeight: "100vh", transition: "background .25s ease, color .25s ease" }}>
      <GlobalStyle />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
