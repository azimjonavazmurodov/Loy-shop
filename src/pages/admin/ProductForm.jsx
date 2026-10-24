import React from "react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { T as STATIC_T } from "../../theme";
import { CATEGORIES } from "../../data/products";
import { SHAPE_OPTIONS, SHAPE_LABELS, COLOR_OPTIONS } from "../../data/shapeOptions";

const EMPTY_FORM = { name: "", cat: "Kosalar", shape: "bowl", color: STATIC_T.moss, price: "", blurb: "", detail: "", image: "" };

export function ProductForm({ initial, onCancel, onSave }) {
  const { tokens: T } = useTheme();
  const [form, setForm] = useState({ ...EMPTY_FORM, ...(initial || {}) });
  const isEdit = Boolean(initial);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    onSave({ ...form, price: Number(form.price) });
  }

  return (
    <form onSubmit={submit} className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: T.card, border: `1px solid ${T.border}` }}>
      <h3 className="f-display italic text-xl">{isEdit ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Nomi</label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} required
            className="w-full px-3 py-2.5 rounded-lg f-body text-sm outline-none" style={{ background: T.stone, border: `1px solid ${T.border}` }} />
        </div>
        <div>
          <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Narxi (so'm)</label>
          <input value={form.price} onChange={(e) => update("price", e.target.value.replace(/\D/g, ""))} required inputMode="numeric"
            className="w-full px-3 py-2.5 rounded-lg f-mono text-sm outline-none" style={{ background: T.stone, border: `1px solid ${T.border}` }} />
        </div>
        <div>
          <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Toifa</label>
          <select value={form.cat} onChange={(e) => update("cat", e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg f-body text-sm outline-none" style={{ background: T.stone, border: `1px solid ${T.border}` }}>
            {CATEGORIES.filter((c) => c !== "Barchasi").map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Shakl</label>
          <select value={form.shape} onChange={(e) => update("shape", e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg f-body text-sm outline-none" style={{ background: T.stone, border: `1px solid ${T.border}` }}>
            {SHAPE_OPTIONS.map((s) => <option key={s} value={s}>{SHAPE_LABELS[s]}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Rang</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {COLOR_OPTIONS.map((c) => (
            <button key={c.value} type="button" onClick={() => update("color", c.value)}
              title={c.label}
              className="rounded-full"
              style={{ width: 30, height: 30, background: c.value, border: form.color === c.value ? `2px solid ${T.ink}` : `2px solid transparent`, outlineOffset: 2, flexShrink: 0 }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={form.color}
            onChange={(e) => update("color", e.target.value)}
            aria-label="Boshqa rang tanlash"
            className="rounded-lg cursor-pointer"
            style={{ width: 40, height: 34, border: `1px solid ${T.border}`, background: "transparent", padding: 2 }}
          />
          <input
            type="text"
            value={form.color}
            onChange={(e) => update("color", e.target.value)}
            placeholder="#8B5A3C"
            className="flex-1 px-3 py-2 rounded-lg f-mono text-xs outline-none"
            style={{ background: T.stone, border: `1px solid ${T.border}` }}
          />
        </div>
      </div>

      <div>
        <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Rasm manzili (URL)</label>
        <div className="flex items-center gap-3">
          <input
            type="url"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            placeholder="https://misol.com/rasm.jpg"
            className="flex-1 px-3 py-2.5 rounded-lg f-body text-sm outline-none"
            style={{ background: T.stone, border: `1px solid ${T.border}` }}
          />
          {form.image && (
            <img
              src={form.image}
              alt="Ko'rinishi"
              className="rounded-lg object-cover flex-shrink-0"
              style={{ width: 48, height: 48, border: `1px solid ${T.border}` }}
              onError={(e) => { e.currentTarget.style.opacity = 0.2; }}
            />
          )}
        </div>
        <p className="f-body text-xs mt-1.5" style={{ color: T.dim }}>
          Bo'sh qoldirilsa, avtomatik chizilgan shakl (rang va shakl asosida) ko'rsatiladi.
        </p>
      </div>

      <div>
        <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Qisqa tavsif</label>
        <input value={form.blurb} onChange={(e) => update("blurb", e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg f-body text-sm outline-none" style={{ background: T.stone, border: `1px solid ${T.border}` }} />
      </div>
      <div>
        <label className="f-body text-xs mb-1.5 block" style={{ color: T.dim }}>Batafsil tavsif</label>
        <textarea value={form.detail} onChange={(e) => update("detail", e.target.value)} rows={3}
          className="w-full px-3 py-2.5 rounded-lg f-body text-sm outline-none resize-none" style={{ background: T.stone, border: `1px solid ${T.border}` }} />
      </div>

      <div className="flex gap-3 mt-2">
        <button type="submit" className="px-6 py-2.5 rounded-full f-body text-sm font-semibold" style={{ background: T.ink, color: T.stone }}>
          {isEdit ? "Saqlash" : "Qo'shish"}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-full f-body text-sm font-medium" style={{ border: `1px solid ${T.border}` }}>
          Bekor qilish
        </button>
      </div>
    </form>
  );
}
