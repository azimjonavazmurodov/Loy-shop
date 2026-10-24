import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useProducts } from "../context/ProductsContext";
import { Layout } from "../components/Layout";
import { Shape } from "../components/Shape";
import { ProductCard } from "../components/ProductCard";
import { ArrowRight } from "lucide-react";

export function Home() {
  const { tokens: T } = useTheme();
  const { products } = useProducts();
  const featured = products.slice(0, 4);
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-16 sm:pt-24 pb-20 grid sm:grid-cols-2 gap-12 items-center">
        <div>
          <p className="f-body text-xs uppercase tracking-widest mb-6" style={{ color: T.moss }}>
            Qo'lda kuydirilgan sopol buyumlar
          </p>
          <h1 className="f-display mb-6" style={{ fontSize: "clamp(2.6rem, 6vw, 4.4rem)", lineHeight: 1.05 }}>
            Har bir <span className="italic" style={{ color: T.clayDeep }}>chiziq</span>
            <br />qo'lning izi.
          </h1>
          <p className="f-body text-base leading-relaxed mb-8" style={{ color: T.dim, maxWidth: "40ch" }}>
            Loy — Toshkentdagi kichik keramika studiyasi. Har bir kosa, vaza va krujka
            aylanuvchi charxda qo'lda shakllantiriladi, keyin uch bosqichda kuydiriladi.
          </p>
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full f-body text-sm font-semibold"
            style={{ background: T.ink, color: T.stone }}
          >
            Katalogni ko'rish <ArrowRight size={16} />
          </Link>
        </div>
        <div className="flex items-center justify-center relative">
          <div
            className="absolute rounded-full"
            style={{ width: 320, height: 320, background: T.stoneDeep, filter: "blur(2px)" }}
          />
          <Shape shape="vase" color={T.clay} className="relative" style={{ width: 220, height: 260 }} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { label: "Kosalar", shape: "bowl", color: T.moss },
            { label: "Vazalar", shape: "vase", color: T.clay },
            { label: "Krujkalar", shape: "mug", color: T.plum },
            { label: "Laganlar", shape: "plate", color: T.moss },
            { label: "Materiallar", shape: "loy", color: T.clayDeep },
          ].map((c) => (
            <Link
              key={c.label}
              to={`/katalog?cat=${encodeURIComponent(c.label)}`}
              className="lift flex flex-col items-center gap-3 rounded-2xl py-8"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <Shape shape={c.shape} color={c.color} className="shape-hover" style={{ width: 60, height: 66 }} />
              <span className="f-body text-sm font-medium">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-16">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <h2 className="f-display italic" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>Tanlangan buyumlar</h2>
          <Link to="/katalog" className="f-body text-sm font-medium underline" style={{ color: T.clayDeep }}>
            Barchasini ko'rish
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="py-20" style={{ background: T.stoneDeep }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 text-center">
          <p className="f-display italic mb-6" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.2rem)", color: T.ink }}>
            "Har bir naqsh — sirning o'zi qanday oqishini biz emas, olov hal qiladi."
          </p>
          <p className="f-body text-sm" style={{ color: T.dim }}>— Nilufar, Loy studiyasi asoschisi</p>
        </div>
      </section>
    </Layout>
  );
}
