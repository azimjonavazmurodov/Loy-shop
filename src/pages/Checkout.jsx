import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Layout } from "../components/Layout";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useOrders } from "../context/OrderContext";
import { formatSom } from "../utils/format";

export function Checkout() {
  const { tokens: T } = useTheme();
  const navigate = useNavigate();
  const { lines, subtotal, promo, discountAmount, total, clear } = useCart();
  const { profile, updateProfile } = useUser();
  const { addOrder } = useOrders();
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: null }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Ism kiritilishi shart";
    if (!form.phone.trim()) e.phone = "Telefon raqam kiritilishi shart";
    if (!form.address.trim()) e.address = "Manzil kiritilishi shart";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    const newOrder = addOrder({
      customer: form,
      items: lines.map((l) => ({ id: l.id, name: l.product.name, qty: l.qty, price: l.product.price })),
      total,
      subtotal,
      promo: promo ? { code: promo.code, percent: promo.percent, amount: discountAmount } : null,
    });
    updateProfile(form);
    clear();
    setOrder(newOrder);
  }

  if (order) {
    return (
      <Layout>
        <section className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-28 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="rounded-full flex items-center justify-center" style={{ width: 56, height: 56, background: T.card, border: `1px solid ${T.border}` }}>
              <ShieldCheck size={22} color={T.moss} />
            </div>
          </div>
          <p className="f-body text-xs uppercase tracking-widest mb-4" style={{ color: T.moss }}>Rahmat</p>
          <h1 className="f-display italic mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Buyurtmangiz qabul qilindi
          </h1>
          <p className="f-body text-sm leading-relaxed mb-2" style={{ color: T.dim }}>
            Buyurtma raqami: <span className="f-mono" style={{ color: T.ink }}>{order.id}</span>
          </p>
          <p className="f-body text-sm leading-relaxed mb-10" style={{ color: T.dim }}>
            Studiyamiz siz bilan <span className="f-mono">{form.phone}</span> raqami orqali tez orada bog'lanadi.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/katalog" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full f-body text-sm font-semibold" style={{ background: T.ink, color: T.stone }}>
              Katalogga qaytish <ArrowRight size={16} />
            </Link>
            <Link to="/profil" className="f-body text-sm underline" style={{ color: T.clayDeep }}>
              Buyurtmalarim
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  if (lines.length === 0) {
    return (
      <Layout>
        <section className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-28 text-center">
          <p className="f-body text-base mb-6" style={{ color: T.dim }}>Savatingiz bo'sh, buyurtma berish uchun avval mahsulot tanlang.</p>
          <Link to="/katalog" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full f-body text-sm font-semibold" style={{ background: T.ink, color: T.stone }}>
            Katalogni ko'rish <ArrowRight size={16} />
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pt-14 pb-24">
        <p className="f-body text-xs uppercase tracking-widest mb-3" style={{ color: T.moss }}>Buyurtma</p>
        <h1 className="f-display italic mb-10" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>Buyurtmani rasmiylashtirish</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          <form onSubmit={submit} className="lg:col-span-2 rounded-2xl p-5 sm:p-6 flex flex-col gap-4" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <div>
              <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Ism familiya</label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ism familiyangiz"
                className="w-full px-3 py-2.5 rounded-lg f-body text-sm outline-none"
                style={{ background: T.stone, border: `1px solid ${errors.name ? "#B3413F" : T.border}` }}
              />
              {errors.name && <p className="f-body text-xs mt-1" style={{ color: "#B3413F" }}>{errors.name}</p>}
            </div>
            <div>
              <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Telefon raqam</label>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full px-3 py-2.5 rounded-lg f-mono text-sm outline-none"
                style={{ background: T.stone, border: `1px solid ${errors.phone ? "#B3413F" : T.border}` }}
              />
              {errors.phone && <p className="f-body text-xs mt-1" style={{ color: "#B3413F" }}>{errors.phone}</p>}
            </div>
            <div>
              <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Yetkazib berish manzili</label>
              <textarea
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                rows={3}
                placeholder="Shahar, tuman, ko'cha, uy"
                className="w-full px-3 py-2.5 rounded-lg f-body text-sm outline-none resize-none"
                style={{ background: T.stone, border: `1px solid ${errors.address ? "#B3413F" : T.border}` }}
              />
              {errors.address && <p className="f-body text-xs mt-1" style={{ color: "#B3413F" }}>{errors.address}</p>}
            </div>
            <button type="submit" className="mt-2 px-7 py-3.5 rounded-full f-body text-sm font-semibold" style={{ background: T.ink, color: T.stone }}>
              Buyurtmani tasdiqlash
            </button>
          </form>

          <div className="rounded-2xl p-5 sm:p-6 h-fit" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <p className="f-body text-xs uppercase tracking-widest mb-4" style={{ color: T.moss }}>Buyurtma tarkibi</p>
            <div className="flex flex-col gap-2 mb-4">
              {lines.map((l) => (
                <div key={l.id} className="flex justify-between f-body text-sm" style={{ color: T.dim }}>
                  <span className="truncate pr-2">{l.product.name} × {l.qty}</span>
                  <span className="f-mono flex-shrink-0" style={{ color: T.ink }}>{formatSom(l.product.price * l.qty)}</span>
                </div>
              ))}
            </div>
            {promo && (
              <div className="flex justify-between f-body text-sm mb-2 pt-3" style={{ color: T.moss, borderTop: `1px solid ${T.border}` }}>
                <span>Chegirma ({promo.code}, -{promo.percent}%)</span><span>-{formatSom(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between f-body text-base font-semibold pt-4" style={{ borderTop: `1px solid ${T.border}` }}>
              <span>Jami</span><span className="f-mono">{formatSom(total)}</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
