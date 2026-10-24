import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Shape } from "./Shape";
import { formatSom, discountPercent } from "../utils/format";
import { useWishlist } from "../context/WishlistContext";

export function ProductCard({ p }) {
  const { tokens: T } = useTheme();
  const { has, toggle } = useWishlist();
  const liked = has(p.id);
  const pct = discountPercent(p.price, p.oldPrice);

  function onHeartClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggle(p.id);
  }

  return (
    <Link to={`/mahsulot/${p.id}`} className="lift block rounded-2xl p-4 sm:p-6 text-left w-full relative" style={{ background: T.card, border: `1px solid ${T.border}` }}>
      {pct > 0 && (
        <span
          className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 f-mono text-[11px] px-2 py-1 rounded-full font-semibold"
          style={{ background: "#B3413F", color: "#fff" }}
        >
          -{pct}%
        </span>
      )}
      <button
        onClick={onHeartClick}
        aria-label={liked ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center justify-center rounded-full"
        style={{ width: 32, height: 32, background: `${T.card}E6`, border: `1px solid ${T.border}` }}
      >
        <Heart size={15} fill={liked ? "#B3413F" : "none"} color={liked ? "#B3413F" : T.dim} />
      </button>
      <div className="flex items-center justify-center mb-3 sm:mb-4 overflow-hidden rounded-xl" style={{ height: 130 }}>
        {p.image ? (
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          <Shape shape={p.shape} color={p.color} className="shape-hover" style={{ width: 105, height: 114 }} />
        )}
      </div>
      <p className="f-body text-xs uppercase tracking-widest mb-1" style={{ color: T.dim }}>{p.cat}</p>
      <h3 className="f-display italic text-xl sm:text-2xl mb-2" style={{ color: T.ink }}>{p.name}</h3>
      <div className="flex items-center gap-2 flex-wrap">
        <p className="f-mono text-sm" style={{ color: pct > 0 ? "#B3413F" : T.clayDeep }}>{formatSom(p.price)}</p>
        {pct > 0 && (
          <p className="f-mono text-xs line-through" style={{ color: T.dim }}>{formatSom(p.oldPrice)}</p>
        )}
      </div>
    </Link>
  );
}
