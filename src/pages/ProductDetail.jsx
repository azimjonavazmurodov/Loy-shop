import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingBag, Minus, Plus, Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { useWishlist } from "../context/WishlistContext";
import { Layout } from "../components/Layout";
import { Shape } from "../components/Shape";
import { ProductCard } from "../components/ProductCard";
import { formatSom, discountPercent } from "../utils/format";

export function ProductDetail() {
  const { tokens: T } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { products } = useProducts();
  const { has, toggle } = useWishlist();
  const product = products.find((p) => p.id === id);
  const pct = product ? discountPercent(product.price, product.oldPrice) : 0;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-24 text-center">
          <h1 className="f-display italic text-3xl mb-4">Buyum topilmadi</h1>
          <Link to="/katalog" className="f-body text-sm underline" style={{ color: T.clayDeep }}>Katalogga qaytish</Link>
        </div>
      </Layout>
    );
  }

  const related = products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 3);

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-10 pb-4">
        <button onClick={() => navigate(-1)} className="f-body text-sm" style={{ color: T.dim }}>
          ← Orqaga
        </button>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-16 grid sm:grid-cols-2 gap-14 items-center">
        <div className="flex items-center justify-center rounded-3xl relative overflow-hidden" style={{ background: T.card, border: `1px solid ${T.border}`, minHeight: 380 }}>
          {pct > 0 && (
            <span
              className="absolute top-4 left-4 z-10 f-mono text-xs px-2.5 py-1.5 rounded-full font-semibold"
              style={{ background: "#B3413F", color: "#fff" }}
            >
              -{pct}%
            </span>
          )}
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover absolute inset-0" />
          ) : (
            <Shape shape={product.shape} color={product.color} style={{ width: 220, height: 260 }} />
          )}
        </div>
        <div>
          <p className="f-body text-xs uppercase tracking-widest mb-3" style={{ color: T.moss }}>{product.group || product.cat}</p>
          <h1 className="f-display italic mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}>{product.name}</h1>
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <p className="f-mono text-xl" style={{ color: pct > 0 ? "#B3413F" : T.clayDeep }}>{formatSom(product.price)}</p>
            {pct > 0 && (
              <p className="f-mono text-base line-through" style={{ color: T.dim }}>{formatSom(product.oldPrice)}</p>
            )}
          </div>
          <p className="f-body text-base leading-relaxed mb-8" style={{ color: T.dim, maxWidth: "46ch" }}>{product.detail}</p>

          <div className="flex items-center gap-5 mb-6">
            <div className="flex items-center gap-4 rounded-full px-4 py-2" style={{ border: `1px solid ${T.border}` }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Kamaytirish"><Minus size={16} /></button>
              <span className="f-mono text-sm w-5 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Ko'paytirish"><Plus size={16} /></button>
            </div>
          </div>

          <button
            onClick={() => { add(product.id, qty); setAdded(true); }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full f-body text-sm font-semibold"
            style={{ background: T.ink, color: T.stone }}
          >
            <ShoppingBag size={16} /> Savatga qo'shish
          </button>
          <button
            onClick={() => toggle(product.id)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full f-body text-sm font-semibold ml-3"
            style={{ border: `1px solid ${T.border}`, color: has(product.id) ? "#B3413F" : T.ink }}
          >
            <Heart size={16} fill={has(product.id) ? "#B3413F" : "none"} />
            {has(product.id) ? "Sevimlida" : "Sevimlilarga"}
          </button>
          {added && (
            <p className="f-body text-sm mt-4" style={{ color: T.moss }}>
              Savatga qo'shildi. <Link to="/savat" className="underline">Savatni ko'rish →</Link>
            </p>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-16" style={{ borderTop: `1px solid ${T.border}` }}>
          <h2 className="f-display italic mb-8" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.2rem)" }}>Shu toifadan yana</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
            {related.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      )}
    </Layout>
  );
}
