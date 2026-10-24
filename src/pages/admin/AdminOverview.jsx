import React from "react";
import { useMemo } from "react";
import { Package, Layers, Wallet, TrendingUp, ClipboardList, CircleDollarSign } from "lucide-react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "../../context/ThemeContext";
import { useOrders } from "../../context/OrderContext";
import { formatSom } from "../../utils/format";

const BAR_COLORS_KEYS = ["moss", "clay", "plum", "clayDeep", "dim"];

export function AdminOverview({ products }) {
  const { tokens: T } = useTheme();
  const BAR_COLORS = BAR_COLORS_KEYS.map((k) => T[k]);
  const { orders } = useOrders();
  const orderStats = useMemo(() => {
    const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
    const newCount = orders.filter((o) => o.status === "Yangi").length;
    return { count: orders.length, totalRevenue, newCount };
  }, [orders]);

  const stats = useMemo(() => {
    const buyumlar = products.filter((p) => p.cat !== "Materiallar");
    const materiallar = products.filter((p) => p.cat === "Materiallar");
    const totalValue = products.reduce((s, p) => s + (p.price || 0), 0);
    const avgPrice = products.length ? Math.round(totalValue / products.length) : 0;
    const mostExpensive = products.reduce((max, p) => (p.price > (max?.price || 0) ? p : max), null);

    const byCat = {};
    products.forEach((p) => {
      byCat[p.cat] = (byCat[p.cat] || 0) + 1;
    });
    const chartData = Object.entries(byCat).map(([name, count]) => ({ name, count }));

    return { buyumlar, materiallar, totalValue, avgPrice, mostExpensive, chartData };
  }, [products]);

  const cards = [
    { label: "Jami mahsulotlar", value: products.length, icon: Package, color: T.moss },
    { label: "Sopol buyumlar", value: stats.buyumlar.length, icon: Layers, color: T.clay },
    { label: "Materiallar", value: stats.materiallar.length, icon: Layers, color: T.plum },
    { label: "O'rtacha narx", value: formatSom(stats.avgPrice), icon: Wallet, color: T.clayDeep },
  ];

  return (
    <div className="mb-10">
      {orderStats.count > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-center rounded-full mb-3" style={{ width: 36, height: 36, background: T.stone }}>
              <ClipboardList size={16} color={T.moss} />
            </div>
            <p className="f-mono text-lg sm:text-xl mb-1" style={{ color: T.ink }}>{orderStats.count}</p>
            <p className="f-body text-xs" style={{ color: T.dim }}>Jami buyurtmalar</p>
          </div>
          <div className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-center rounded-full mb-3" style={{ width: 36, height: 36, background: T.stone }}>
              <CircleDollarSign size={16} color={T.clayDeep} />
            </div>
            <p className="f-mono text-lg sm:text-xl mb-1" style={{ color: T.ink }}>{formatSom(orderStats.totalRevenue)}</p>
            <p className="f-body text-xs" style={{ color: T.dim }}>Buyurtmalardan tushum</p>
          </div>
          <div className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-center rounded-full mb-3" style={{ width: 36, height: 36, background: T.stone }}>
              <Package size={16} color={T.plum} />
            </div>
            <p className="f-mono text-lg sm:text-xl mb-1" style={{ color: T.ink }}>{orderStats.newCount}</p>
            <p className="f-body text-xs" style={{ color: T.dim }}>Yangi buyurtmalar</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-center rounded-full mb-3" style={{ width: 36, height: 36, background: T.stone }}>
              <c.icon size={16} color={c.color} />
            </div>
            <p className="f-mono text-lg sm:text-xl mb-1" style={{ color: T.ink }}>{c.value}</p>
            <p className="f-body text-xs" style={{ color: T.dim }}>{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 rounded-2xl p-4 sm:p-6" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <p className="f-body text-xs uppercase tracking-widest mb-4" style={{ color: T.moss }}>Toifalar bo'yicha taqsimot</p>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={stats.chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.dim }} axisLine={{ stroke: T.border }} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: T.dim }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12 }}
                  cursor={{ fill: T.stone }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {stats.chartData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl p-4 sm:p-6" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <p className="f-body text-xs uppercase tracking-widest mb-4" style={{ color: T.moss }}>Katalog qiymati</p>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} color={T.clayDeep} />
            <p className="f-mono text-xl" style={{ color: T.ink }}>{formatSom(stats.totalValue)}</p>
          </div>
          <p className="f-body text-xs mb-5" style={{ color: T.dim }}>Barcha mahsulotlar narxi yig'indisi</p>

          {stats.mostExpensive && (
            <>
              <p className="f-body text-xs uppercase tracking-widest mb-2" style={{ color: T.moss }}>Eng qimmat mahsulot</p>
              <p className="f-display italic text-lg mb-1">{stats.mostExpensive.name}</p>
              <p className="f-mono text-sm" style={{ color: T.clayDeep }}>{formatSom(stats.mostExpensive.price)}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
