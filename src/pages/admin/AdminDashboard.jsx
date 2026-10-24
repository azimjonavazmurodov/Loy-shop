import React from "react";
import { useState } from "react";
import { Pencil, Trash2, PlusCircle, LogOut, LayoutDashboard, Package, ClipboardList } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useProducts } from "../../context/ProductsContext";
import { useOrders } from "../../context/OrderContext";
import { Layout } from "../../components/Layout";
import { Shape } from "../../components/Shape";
import { formatSom } from "../../utils/format";
import { ProductForm } from "./ProductForm";
import { AdminOverview } from "./AdminOverview";
import { AdminOrders } from "./AdminOrders";

export function AdminDashboard({ onLogout }) {
  const { tokens: T } = useTheme();
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const { orders } = useOrders();
  const [tab, setTab] = useState("dashboard");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "products", label: "Mahsulotlar", icon: Package },
    { key: "orders", label: "Buyurtmalar", icon: ClipboardList },
  ];

  const titles = {
    dashboard: "Boshqaruv paneli",
    products: "Mahsulotlarni boshqarish",
    orders: "Buyurtmalar",
  };

  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pt-14 pb-24">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="f-body text-xs uppercase tracking-widest mb-2" style={{ color: T.moss }}>Admin panel</p>
            <h1 className="f-display italic" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
              {titles[tab]}
            </h1>
          </div>
          <button onClick={onLogout} className="inline-flex items-center gap-2 f-body text-sm" style={{ color: T.dim }}>
            <LogOut size={16} /> Chiqish
          </button>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="inline-flex items-center gap-2 f-body text-sm px-4 py-2 rounded-full"
              style={{
                background: tab === t.key ? T.ink : "transparent",
                color: tab === t.key ? T.stone : T.ink,
                border: `1px solid ${tab === t.key ? T.ink : T.border}`,
              }}
            >
              <t.icon size={15} /> {t.label}
              {t.key === "orders" && orders.filter((o) => o.status === "Yangi").length > 0 && (
                <span
                  className="f-mono text-[10px] rounded-full flex items-center justify-center"
                  style={{ background: tab === t.key ? T.stone : T.moss, color: tab === t.key ? T.ink : T.stone, width: 16, height: 16, minWidth: 16 }}
                >
                  {orders.filter((o) => o.status === "Yangi").length}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === "dashboard" && <AdminOverview products={products} />}
        {tab === "orders" && <AdminOrders />}
        {tab === "products" && (
          <>
            <p className="f-body text-sm mb-6" style={{ color: T.dim }}>Jami {products.length} ta mahsulot. O'zgarishlar shu brauzerda saqlanadi.</p>

            {adding && (
              <div className="mb-8">
                <ProductForm
                  onCancel={() => setAdding(false)}
                  onSave={(data) => { addProduct(data); setAdding(false); }}
                />
              </div>
            )}

            {!adding && (
              <button
                onClick={() => setAdding(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full f-body text-sm font-semibold mb-8"
                style={{ background: T.ink, color: T.stone }}
              >
                <PlusCircle size={16} /> Yangi mahsulot qo'shish
              </button>
            )}

            <div className="flex flex-col gap-3">
              {products.map((p) =>
                editingId === p.id ? (
                  <ProductForm
                    key={p.id}
                    initial={p}
                    onCancel={() => setEditingId(null)}
                    onSave={(data) => { updateProduct(p.id, data); setEditingId(null); }}
                  />
                ) : (
                  <div key={p.id} className="flex items-center gap-4 rounded-2xl p-4" style={{ background: T.card, border: `1px solid ${T.border}` }}>
                    <div className="flex items-center justify-center flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 56, height: 56, background: T.stone }}>
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <Shape shape={p.shape} color={p.color} style={{ width: 46, height: 50 }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="f-display italic text-lg truncate">{p.name}</p>
                      <p className="f-body text-xs" style={{ color: T.dim }}>{p.cat}</p>
                    </div>
                    <p className="f-mono text-sm hidden sm:block" style={{ color: T.clayDeep }}>{formatSom(p.price)}</p>
                    <button onClick={() => setEditingId(p.id)} aria-label="Tahrirlash" style={{ color: T.dim }}>
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => deleteProduct(p.id)} aria-label="O'chirish" style={{ color: "#B3413F" }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                )
              )}
            </div>

            <button onClick={resetProducts} className="f-body text-xs underline mt-10" style={{ color: T.dim }}>
              Katalogni boshlang'ich holatga qaytarish
            </button>
          </>
        )}
      </section>
    </Layout>
  );
}
