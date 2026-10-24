import React from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Logo } from "./Logo";

export function Footer() {
  const { tokens: T } = useTheme();
  return (
    <footer className="mt-24" style={{ borderTop: `1px solid ${T.border}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-14 grid sm:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <Logo size={30} />
            <p className="f-display italic text-2xl">Loy</p>
          </div>
          <p className="f-body text-sm leading-relaxed" style={{ color: T.dim, maxWidth: "32ch" }}>
            Toshkentdagi kichik studiyada, har bir buyum qo'lda aylantirilib, sirlanib, kuydiriladi.
          </p>
        </div>
        <div>
          <p className="f-body text-xs uppercase tracking-widest mb-4" style={{ color: T.dim }}>Studiya</p>
          <div className="flex flex-col gap-2 f-body text-sm" style={{ color: T.ink }}>
            <Link to="/katalog">Katalog</Link>
            <Link to="/materiallar">Materiallar</Link>
            <Link to="/profil">Profil</Link>
            <a href="#">Biz haqimizda</a>
            <a href="#">Yetkazib berish</a>
            <Link to="/admin" style={{ color: T.dim }}>Admin panel</Link>
          </div>
        </div>
        <div>
          <p className="f-body text-xs uppercase tracking-widest mb-4" style={{ color: T.dim }}>Aloqa</p>
          <p className="f-body text-sm" style={{ color: T.ink }}>hello@loy.uz</p>
          <p className="f-body text-sm" style={{ color: T.ink }}>+998 90 123 45 67</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-10 flex items-center gap-2 f-body text-xs" style={{ color: T.dim }}>
        <Leaf size={14} /> Har bir buyum qo'lda, kichik partiyalarda ishlanadi © 2026 Loy
      </div>
    </footer>
  );
}
