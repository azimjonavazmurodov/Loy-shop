import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useOrders } from "../../context/OrderContext";
import { formatSom } from "../../utils/format";

const STATUS_OPTIONS = ["Yangi", "Tayyorlanmoqda", "Yuborildi", "Yetkazildi", "Bekor qilindi"];

export function AdminOrders() {
  const { tokens: T } = useTheme();
  const STATUS_COLOR = {
    "Yangi": T.clay,
    "Tayyorlanmoqda": T.plum,
    "Yuborildi": T.moss,
    "Yetkazildi": T.moss,
    "Bekor qilindi": "#B3413F",
  };
  const { orders, updateStatus } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl p-8 text-center" style={{ background: T.card, border: `1px solid ${T.border}` }}>
        <p className="f-body text-sm" style={{ color: T.dim }}>Hozircha buyurtmalar yo'q.</p>
      </div>
    );
  }

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <p className="f-mono text-lg sm:text-xl mb-1" style={{ color: T.ink }}>{orders.length}</p>
          <p className="f-body text-xs" style={{ color: T.dim }}>Jami buyurtmalar</p>
        </div>
        <div className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <p className="f-mono text-lg sm:text-xl mb-1" style={{ color: T.clayDeep }}>{formatSom(totalRevenue)}</p>
          <p className="f-body text-xs" style={{ color: T.dim }}>Jami tushum</p>
        </div>
        <div className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <p className="f-mono text-lg sm:text-xl mb-1" style={{ color: T.moss }}>
            {orders.filter((o) => o.status === "Yangi").length}
          </p>
          <p className="f-body text-xs" style={{ color: T.dim }}>Yangi buyurtmalar</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
              <div>
                <p className="f-mono text-sm" style={{ color: T.ink }}>{o.id}</p>
                <p className="f-body text-xs" style={{ color: T.dim }}>
                  {new Date(o.date).toLocaleString("uz-UZ", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <select
                value={o.status}
                onChange={(e) => updateStatus(o.id, e.target.value)}
                className="f-body text-xs px-3 py-1.5 rounded-full font-medium outline-none"
                style={{ background: T.stone, color: STATUS_COLOR[o.status] || T.dim, border: `1px solid ${T.border}` }}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="f-body text-xs uppercase tracking-widest mb-1.5" style={{ color: T.moss }}>Mijoz</p>
                <p className="f-body text-sm" style={{ color: T.ink }}>{o.customer.name}</p>
                <p className="f-mono text-sm" style={{ color: T.dim }}>{o.customer.phone}</p>
                <p className="f-body text-sm" style={{ color: T.dim }}>{o.customer.address}</p>
              </div>
              <div>
                <p className="f-body text-xs uppercase tracking-widest mb-1.5" style={{ color: T.moss }}>Mahsulotlar</p>
                {o.items.map((it) => (
                  <div key={it.id} className="flex justify-between f-body text-sm" style={{ color: T.dim }}>
                    <span className="truncate pr-2">{it.name} × {it.qty}</span>
                    <span className="f-mono flex-shrink-0" style={{ color: T.ink }}>{formatSom(it.price * it.qty)}</span>
                  </div>
                ))}
                {o.promo && (
                  <div className="flex justify-between f-body text-sm" style={{ color: T.moss }}>
                    <span>Promo: {o.promo.code} (-{o.promo.percent}%)</span>
                    <span className="f-mono flex-shrink-0">-{formatSom(o.promo.amount)}</span>
                  </div>
                )}
                <div className="flex justify-between f-body text-sm font-semibold mt-2 pt-2" style={{ borderTop: `1px solid ${T.border}` }}>
                  <span>Jami</span>
                  <span className="f-mono" style={{ color: T.clayDeep }}>{formatSom(o.total)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
