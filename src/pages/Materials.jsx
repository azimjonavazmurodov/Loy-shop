import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useProducts } from "../context/ProductsContext";
import { Layout } from "../components/Layout";
import { MaterialCard } from "../components/MaterialCard";

export function Materials() {
  const { tokens: T } = useTheme();
  const { products } = useProducts();
  const materials = products.filter((p) => p.cat === "Materiallar");
  const groups = Array.from(new Set(materials.map((m) => m.group || "Boshqa")));

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 pb-6">
        <p className="f-body text-xs uppercase tracking-widest mb-3" style={{ color: T.moss }}>
          Ustaxona
        </p>
        <h1 className="f-display italic mb-4" style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
          Materiallar va uskunalar
        </h1>
        <p className="f-body text-sm sm:text-base leading-relaxed mb-10 sm:mb-14" style={{ color: T.dim, maxWidth: "56ch" }}>
          Har bir Loy buyumi orqasida tabiiy xomashyo, sinchkovlik bilan tanlangan sirlar va
          avloddan-avlodga o'tib kelayotgan an'anaviy asboblar turadi. O'zingiz ham uyda ishlab
          ko'rmoqchi bo'lsangiz — kerakli materiallarni shu yerdan buyurtma qilishingiz mumkin.
        </p>
      </section>

      {groups.map((group) => (
        <section key={group} className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-12 sm:pb-16">
          <h2 className="f-display italic mb-6 sm:mb-8" style={{ fontSize: "clamp(1.4rem, 3.2vw, 2rem)" }}>
            {group}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {materials.filter((m) => (m.group || "Boshqa") === group).map((m) => (
              <MaterialCard key={m.id} p={m} />
            ))}
          </div>
        </section>
      ))}
    </Layout>
  );
}
