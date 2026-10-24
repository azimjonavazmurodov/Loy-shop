import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Shape } from "./Shape";
import { formatSom } from "../utils/format";
import { useWishlist } from "../context/WishlistContext";

export function MaterialCard({ p }) {
  const { tokens: T } = useTheme();
  const { has, toggle } = useWishlist();
  const liked = has(p.id);

  function onHeartClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggle(p.id);
  }

  return (
    <Link
      to={`/mahsulot/${p.id}`}
      className="lift flex flex-col sm:flex-row items-start gap-4 sm:gap-5 rounded-2xl p-4 sm:p-5 w-full text-left relative"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <button
        onClick={onHeartClick}
        aria-label={liked ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
        className="absolute top-3 right-3 z-10 flex items-center justify-center rounded-full"
        style={{ width: 30, height: 30, background: `${T.card}E6`, border: `1px solid ${T.border}` }}
      >
        <Heart size={14} fill={liked ? "#B3413F" : "none"} color={liked ? "#B3413F" : T.dim} />
      </button>
      <div className="flex items-center justify-center flex-shrink-0 rounded-xl overflow-hidden" style={{ width: 88, height: 88, background: T.stone }}>
        {p.image ? (
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          <Shape shape={p.shape} color={p.color} className="shape-hover" style={{ width: 62, height: 68 }} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="f-body text-xs uppercase tracking-widest mb-1" style={{ color: T.moss }}>{p.group || p.cat}</p>
        <h3 className="f-display italic text-lg sm:text-xl mb-1.5" style={{ color: T.ink }}>{p.name}</h3>
        <p className="f-body text-sm leading-relaxed mb-3" style={{ color: T.dim }}>{p.blurb}</p>
        <div className="flex items-center justify-between gap-3">
          <p className="f-mono text-sm" style={{ color: T.clayDeep }}>{formatSom(p.price)}</p>
          <span className="inline-flex items-center gap-1 f-body text-xs font-semibold" style={{ color: T.ink }}>
            Batafsil <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
