import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { CATEGORIES } from "../data/products";
import { useProducts } from "../context/ProductsContext";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";

export function Shop() {
  const { tokens: T } = useTheme();
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const [cat, setCat] = useState(searchParams.get("cat") || "Barchasi");
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const urlCat = searchParams.get("cat");
    if (urlCat && CATEGORIES.includes(urlCat)) {
      setCat(urlCat);
    }
    const urlQ = searchParams.get("q");
    if (urlQ !== null) {
      setQuery(urlQ);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = cat === "Barchasi" ? products : products.filter((p) => p.cat === cat);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.cat.toLowerCase().includes(q) ||
          (p.blurb || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, cat, query]);

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-14 pb-6">
        <p className="f-body text-xs uppercase tracking-widest mb-3" style={{ color: T.moss }}>Katalog</p>
        <h1 className="f-display italic mb-8" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>Barcha buyumlar</h1>

        <div className="relative mb-6 max-w-md">
          <Search size={18} style={{ color: T.dim, position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mahsulot qidirish..."
            className="w-full pl-11 pr-10 py-3 rounded-full f-body text-sm outline-none"
            style={{ background: T.card, border: `1px solid ${T.border}`, color: T.ink }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Tozalash"
              style={{ color: T.dim, position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="f-body text-sm px-5 py-2 rounded-full"
              style={{
                background: cat === c ? T.ink : "transparent",
                color: cat === c ? T.stone : T.ink,
                border: `1px solid ${cat === c ? T.ink : T.border}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        {filtered.length === 0 && (
          <p className="f-body text-sm" style={{ color: T.dim }}>Qidiruv bo'yicha hech narsa topilmadi.</p>
        )}
      </section>
    </Layout>
  );
}
