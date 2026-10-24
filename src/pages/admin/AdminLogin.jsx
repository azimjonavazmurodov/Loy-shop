import React from "react";
import { useState } from "react";
import { Lock } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Layout } from "../../components/Layout";

const ADMIN_PASSWORD = "loy2026";

export function AdminLogin({ onSuccess }) {
  const { tokens: T } = useTheme();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <Layout>
      <section className="max-w-sm mx-auto px-4 sm:px-6 md:px-10 py-28">
        <div className="flex items-center justify-center mb-6">
          <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: T.card, border: `1px solid ${T.border}` }}>
            <Lock size={20} color={T.clayDeep} />
          </div>
        </div>
        <h1 className="f-display italic text-center mb-2" style={{ fontSize: "2rem" }}>Admin panel</h1>
        <p className="f-body text-sm text-center mb-8" style={{ color: T.dim }}>Davom etish uchun parolni kiriting.</p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Parol"
            autoFocus
            className="w-full px-4 py-3 rounded-xl f-body text-sm outline-none"
            style={{ background: T.card, border: `1px solid ${error ? "#B3413F" : T.border}`, color: T.ink }}
          />
          {error && <p className="f-body text-xs" style={{ color: "#B3413F" }}>Parol noto'g'ri. Qayta urinib ko'ring.</p>}
          <button type="submit" className="w-full py-3 rounded-full f-body text-sm font-semibold mt-2" style={{ background: T.ink, color: T.stone }}>
            Kirish
          </button>
        </form>
        <p className="f-body text-xs text-center mt-6" style={{ color: T.dim }}>
          Demo parol: <span className="f-mono">{ADMIN_PASSWORD}</span>
        </p>
      </section>
    </Layout>
  );
}
