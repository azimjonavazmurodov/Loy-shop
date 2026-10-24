import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";
import { useWishlist } from "../context/WishlistContext";

export function Wishlist() {
  const { tokens: T } = useTheme();
  const { products } = useProducts();
  const { ids } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-14 pb-6">
        <p className="f-body text-xs uppercase tracking-widest mb-3" style={{ color: T.moss }}>Sevimlilar</p>
        <h1 className="f-display italic mb-8" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>Sevimli buyumlaringiz</h1>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex items-center justify-center mb-5">
              <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: T.card, border: `1px solid ${T.border}` }}>
                <Heart size={20} color={T.dim} />
              </div>
            </div>
            <p className="f-body text-base mb-6" style={{ color: T.dim }}>
              Hozircha sevimlilar bo'sh. Yoqqan buyumni yurakcha bosib saqlab qo'ying.
            </p>
            <Link to="/katalog" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full f-body text-sm font-semibold" style={{ background: T.ink, color: T.stone }}>
              Katalogni ko'rish <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {items.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </section>
    </Layout>
  );
}
