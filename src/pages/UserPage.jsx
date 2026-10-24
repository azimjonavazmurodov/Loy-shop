import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { User, ArrowRight, Package } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Layout } from "../components/Layout";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { formatSom } from "../utils/format";

export function UserPage() {
  const { tokens: T } = useTheme();
  const STATUS_COLOR = {
    "Yangi": T.clay,
    "Tayyorlanmoqda": T.plum,
    "Yuborildi": T.moss,
    "Yetkazildi": T.moss,
    "Bekor qilindi": "#B3413F",
  };
  const { profile, updateProfile } = useUser();
  const { lines, subtotal, count } = useCart();
  const { orders } = useOrders();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function submit(e) {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
  }

  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 pb-24">
        <div className="flex items-center gap-3 mb-3">
          <div className="rounded-full flex items-center justify-center" style={{ width: 44, height: 44, background: T.card, border: `1px solid ${T.border}` }}>
            <User size={18} color={T.clayDeep} />
          </div>
          <p className="f-body text-xs uppercase tracking-widest" style={{ color: T.moss }}>Profil</p>
        </div>
        <h1 className="f-display italic mb-8 sm:mb-10" style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
          Mening ma'lumotlarim
        </h1>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14">
          <form onSubmit={submit} className="md:col-span-2 rounded-2xl p-5 sm:p-6 flex flex-col gap-4" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <div>
              <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Ism familiya</label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ism familiyangiz"
                className="w-full px-3 py-2.5 rounded-lg f-body text-sm outline-none"
                style={{ background: T.stone, border: `1px solid ${T.border}` }}
              />
            </div>
            <div>
              <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Telefon raqam</label>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full px-3 py-2.5 rounded-lg f-mono text-sm outline-none"
                style={{ background: T.stone, border: `1px solid ${T.border}` }}
              />
            </div>
            <div>
              <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Yetkazib berish manzili</label>
              <textarea
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                rows={3}
                placeholder="Shahar, tuman, ko'cha, uy"
                className="w-full px-3 py-2.5 rounded-lg f-body text-sm outline-none resize-none"
                style={{ background: T.stone, border: `1px solid ${T.border}` }}
              />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <button type="submit" className="px-6 py-2.5 rounded-full f-body text-sm font-semibold" style={{ background: T.ink, color: T.stone }}>
                Saqlash
              </button>
              {saved && <p className="f-body text-xs" style={{ color: T.moss }}>Ma'lumotlar saqlandi.</p>}
            </div>
          </form>

          <div className="rounded-2xl p-5 sm:p-6 h-fit" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <p className="f-body text-xs uppercase tracking-widest mb-3" style={{ color: T.moss }}>Savat holati</p>
            {count === 0 ? (
              <p className="f-body text-sm mb-4" style={{ color: T.dim }}>Savatingiz hozircha bo'sh.</p>
            ) : (
              <>
                <p className="f-body text-sm mb-1" style={{ color: T.ink }}>{count} ta buyum</p>
                <p className="f-mono text-lg mb-4" style={{ color: T.clayDeep }}>{formatSom(subtotal)}</p>
              </>
            )}
            <Link
              to="/savat"
              className="inline-flex items-center gap-2 f-body text-sm font-semibold underline"
              style={{ color: T.clayDeep }}
            >
              Savatni ko'rish <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mb-6">
          <Package size={18} color={T.clayDeep} />
          <h2 className="f-display italic" style={{ fontSize: "clamp(1.4rem, 3.2vw, 1.9rem)" }}>Mening buyurtmalarim</h2>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl p-6 text-center" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <p className="f-body text-sm" style={{ color: T.dim }}>Hozircha buyurtmalar yo'q.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((o) => (
              <div key={o.id} className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div>
                    <p className="f-mono text-sm" style={{ color: T.ink }}>{o.id}</p>
                    <p className="f-body text-xs" style={{ color: T.dim }}>
                      {new Date(o.date).toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <span
                    className="f-body text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: T.stone, color: STATUS_COLOR[o.status] || T.dim }}
                  >
                    {o.status}
                  </span>
                </div>
                <p className="f-body text-sm mb-1" style={{ color: T.dim }}>
                  {o.items.length} xil mahsulot, {o.items.reduce((s, i) => s + i.qty, 0)} dona
                </p>
                <p className="f-mono text-base" style={{ color: T.clayDeep }}>{formatSom(o.total)}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
