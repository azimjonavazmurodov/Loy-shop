import React from "react";
import { useTheme } from "../context/ThemeContext";

export function Logo({ size = 34 }) {
  const { tokens: T } = useTheme();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="24" cy="24" r="23" fill={T.clayDeep} />
      <path
        d="M18 15 Q17 19 19 22 Q11 27 12 34 Q13 40 24 40 Q35 40 36 34 Q37 27 29 22 Q31 19 30 15 Z"
        fill={T.stone}
      />
      <ellipse cx="24" cy="15" rx="6.4" ry="2.4" fill={T.stone} opacity="0.7" />
      <path d="M19.5 24 Q24 26.5 28.5 24" stroke={T.clayDeep} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}
