import React, { createContext, useContext, useState, useEffect } from "react";
import { LIGHT, DARK } from "../theme";

const ThemeContext = createContext(null);
const STORAGE_KEY = "loy_theme_v1";

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
    }
  }, [mode]);

  const tokens = mode === "dark" ? DARK : LIGHT;

  function toggle() {
    setMode((m) => (m === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ mode, tokens, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
