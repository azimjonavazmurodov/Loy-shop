import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ArrowRight, Tag, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { Layout } from "../components/Layout";
import { Shape } from "../components/Shape";
import { formatSom } from "../utils/format";

export function Cart() {
  const { tokens: T } = useTheme();
  const { lines, subtotal, promo, discountAmount, total, setQty, remove, applyPromo, removePromo } = useCart();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState(false);

  function submitPromo(e) {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput);
    setPromoError(!ok);
    if (ok) setPromoInput("");
  }

  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pt-14 pb-24">
        <p className="f-body text-xs uppercase tracking-widest mb-3" style={{ color: T.moss }}>Savat</p>
        <h1 className="f-display italic mb-10" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>Sizning savatingiz</h1>

        {lines.length === 0 ? (
          <div className="text-center py-16">
            <p className="f-body text-base mb-6" style={{ color: T.dim }}>Savatingiz hozircha bo'sh.</p>
            <Link to="/katalog" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full f-body text-sm font-semibold" style={{ background: T.ink, color: T.stone }}>
              Katalogni ko'rish <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {lines.map((l) => (
                <div key={l.id} className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-5 rounded-2xl p-3 sm:p-4" style={{ background: T.card, border: `1px solid ${T.border}` }}>
                  <div className="flex items-center justify-center flex-shrink-0 w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-lg overflow-hidden" style={{ background: T.stone }}>
                    {l.product.image ? (
                      <img src={l.product.image} alt={l.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Shape shape={l.product.shape} color={l.product.color} className="w-11 h-12 sm:w-[60px] sm:h-[66px]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <Link to={`/mahsulot/${l.id}`} className="f-display italic text-lg sm:text-xl block truncate text-left">{l.product.name}</Link>
                    <p className="f-mono text-sm" style={{ color: T.clayDeep }}>{formatSom(l.product.price)}</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-full px-3 py-1.5" style={{ border: `1px solid ${T.border}` }}>
                    <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Kamaytirish"><Minus size={14} /></button>
                    <span className="f-mono text-sm w-4 text-center">{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Ko'paytirish"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => remove(l.id)} aria-label="O'chirish" style={{ color: T.dim }}>
                    <X size={18} />
                  </button>
                </div>
              ))}

              <form onSubmit={submitPromo} className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
                <p className="f-body text-xs uppercase tracking-widest mb-3" style={{ color: T.moss }}>Promo-kod</p>
                {promo ? (
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 f-body text-sm" style={{ color: T.moss }}>
                      <Check size={16} /> "{promo.code}" qo'llandi (-{promo.percent}%)
                    </span>
                    <button type="button" onClick={removePromo} className="f-body text-xs underline" style={{ color: T.dim }}>
                      Olib tashlash
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="relative flex-1 min-w-[160px]">
                      <Tag size={15} style={{ color: T.dim, position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        value={promoInput}
                        onChange={(e) => { setPromoInput(e.target.value); setPromoError(false); }}
                        placeholder="Masalan: LOY10"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg f-mono text-sm outline-none"
                        style={{ background: T.stone, border: `1px solid ${promoError ? "#B3413F" : T.border}`, color: T.ink }}
                      />
                    </div>
                    <button type="submit" className="px-5 py-2.5 rounded-lg f-body text-sm font-semibold" style={{ background: T.ink, color: T.stone }}>
                      Qo'llash
                    </button>
                  </div>
                )}
                {promoError && <p className="f-body text-xs mt-2" style={{ color: "#B3413F" }}>Bunday promo-kod topilmadi.</p>}
              </form>
            </div>

            <div className="rounded-2xl p-6 h-fit" style={{ background: T.card, border: `1px solid ${T.border}` }}>
              <div className="flex justify-between f-body text-sm mb-3" style={{ color: T.dim }}>
                <span>Mahsulotlar</span><span>{formatSom(subtotal)}</span>
              </div>
              {promo && (
                <div className="flex justify-between f-body text-sm mb-3" style={{ color: T.moss }}>
                  <span>Chegirma ({promo.percent}%)</span><span>-{formatSom(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between f-body text-sm mb-5" style={{ color: T.dim }}>
                <span>Yetkazib berish</span><span>Bepul</span>
              </div>
              <div className="flex justify-between f-body text-base font-semibold mb-6 pt-4" style={{ borderTop: `1px solid ${T.border}` }}>
                <span>Jami</span><span className="f-mono">{formatSom(total)}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-3.5 rounded-full f-body text-sm font-semibold"
                style={{ background: T.ink, color: T.stone }}
              >
                Buyurtma berish
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
