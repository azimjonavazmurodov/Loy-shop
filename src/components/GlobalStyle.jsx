import React from "react";
import { useTheme } from "../context/ThemeContext";

export function GlobalStyle() {
  const { tokens: T } = useTheme();
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
      * { box-sizing: border-box; }
      body { margin: 0; background: ${T.stone}; transition: background .25s ease; }
      .f-display { font-family: 'Instrument Serif', serif; }
      .f-body { font-family: 'Manrope', sans-serif; }
      .f-mono { font-family: 'Space Mono', monospace; }
      html { scroll-behavior: smooth; }
      ::selection { background: ${T.moss}; color: ${T.stone}; }
      a { text-decoration: none; color: inherit; }
      button { font: inherit; cursor: pointer; background: none; border: none; }
      .lift { transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
      .lift:hover { transform: translateY(-6px); }
      .shape-hover { transition: transform .5s cubic-bezier(.22,1,.36,1); }
      .lift:hover .shape-hover { transform: rotate(-4deg) scale(1.04); }
      a:focus-visible, button:focus-visible, input:focus-visible {
        outline: 2px solid ${T.moss}; outline-offset: 3px;
      }
      @media (prefers-reduced-motion: reduce) {
        .lift, .shape-hover { transition: none !important; }
      }
    `}</style>
  );
}
