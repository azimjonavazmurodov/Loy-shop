import React from "react";
export function Shape({ shape, color, className, style }) {
  const common = { viewBox: "0 0 200 220", className, style };
  if (shape === "bowl") {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="88" rx="72" ry="14" fill={color} opacity="0.9" />
        <path d="M28 90 Q34 168 100 172 Q166 168 172 90 Q150 118 100 120 Q50 118 28 90 Z" fill={color} />
        <ellipse cx="100" cy="88" rx="60" ry="10" fill="#00000014" />
      </svg>
    );
  }
  if (shape === "vase") {
    return (
      <svg {...common}>
        <path
          d="M84 26 Q80 40 86 52 Q40 78 42 132 Q44 182 100 188 Q156 182 158 132 Q160 78 114 52 Q120 40 116 26 Z"
          fill={color}
        />
        <ellipse cx="100" cy="27" rx="16" ry="6" fill="#00000018" />
      </svg>
    );
  }
  if (shape === "mug") {
    return (
      <svg {...common}>
        <path d="M56 60 L146 60 L140 168 Q100 180 62 168 Z" fill={color} />
        <ellipse cx="101" cy="60" rx="45" ry="10" fill="#00000014" />
        <path d="M146 82 Q182 86 180 118 Q178 148 144 148" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" />
      </svg>
    );
  }
  if (shape === "plate") {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="110" rx="82" ry="30" fill={color} />
        <ellipse cx="100" cy="106" rx="58" ry="20" fill="#00000012" />
        <ellipse cx="100" cy="104" rx="58" ry="20" fill={color} opacity="0.55" />
      </svg>
    );
  }
  if (shape === "loy") {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="176" rx="76" ry="16" fill="#00000014" />
        <path
          d="M46 150 Q30 108 62 84 Q54 52 96 44 Q126 18 158 46 Q182 58 170 92 Q192 114 168 148 Q172 178 128 182 Q98 200 66 182 Q40 176 46 150 Z"
          fill={color}
        />
        <path d="M80 70 Q100 56 128 66" fill="none" stroke="#00000018" strokeWidth="6" strokeLinecap="round" />
        <path d="M60 120 Q90 132 96 158" fill="none" stroke="#00000014" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }
  if (shape === "sir") {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="188" rx="46" ry="10" fill="#00000014" />
        <path d="M70 74 L130 74 L126 176 Q100 188 74 176 Z" fill={color} />
        <rect x="80" y="46" width="40" height="30" rx="6" fill={color} />
        <ellipse cx="100" cy="46" rx="20" ry="7" fill="#00000018" />
        <path d="M96 90 Q86 130 98 168" fill="none" stroke="#00000016" strokeWidth="6" strokeLinecap="round" />
        <path d="M108 20 Q118 40 108 56 Q100 44 108 20 Z" fill={color} opacity="0.8" />
      </svg>
    );
  }
  if (shape === "charx") {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="176" rx="60" ry="14" fill="#00000014" />
        <rect x="92" y="120" width="16" height="56" fill={color} />
        <ellipse cx="100" cy="120" rx="78" ry="20" fill={color} />
        <ellipse cx="100" cy="116" rx="78" ry="20" fill={color} />
        <ellipse cx="100" cy="112" rx="58" ry="14" fill="#00000018" />
        <ellipse cx="100" cy="108" rx="30" ry="9" fill={color} opacity="0.6" />
        <circle cx="100" cy="108" r="7" fill="#00000024" />
      </svg>
    );
  }
  if (shape === "pech") {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="196" rx="70" ry="10" fill="#00000014" />
        <path d="M40 70 Q40 30 100 26 Q160 30 160 70 L156 186 Q100 202 44 186 Z" fill={color} />
        <rect x="72" y="96" width="56" height="56" rx="10" fill="#00000022" />
        <rect x="80" y="104" width="40" height="40" rx="6" fill="#00000030" />
        <circle cx="100" cy="124" r="10" fill={color} opacity="0.8" />
        <ellipse cx="100" cy="28" rx="30" ry="8" fill="#00000018" />
      </svg>
    );
  }
  if (shape === "asbob") {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="190" rx="60" ry="10" fill="#00000012" />
        <g transform="rotate(-18 100 110)">
          <rect x="60" y="40" width="14" height="130" rx="7" fill={color} />
          <path d="M50 36 L84 36 L67 12 Z" fill={color} />
        </g>
        <g transform="rotate(20 130 110)">
          <rect x="118" y="60" width="12" height="110" rx="6" fill={color} opacity="0.85" />
          <ellipse cx="124" cy="52" rx="18" ry="10" fill={color} opacity="0.85" />
        </g>
      </svg>
    );
  }
  return (
    <svg {...common}>
      <ellipse cx="100" cy="110" rx="82" ry="30" fill={color} />
      <ellipse cx="100" cy="106" rx="58" ry="20" fill="#00000012" />
      <ellipse cx="100" cy="104" rx="58" ry="20" fill={color} opacity="0.55" />
    </svg>
  );
}
