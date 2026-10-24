import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, X, Menu, Search, User, Heart, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Logo } from "./Logo";

export function Navbar() {
  const { tokens: T, mode, toggle: toggleTheme } = useTheme();
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const links = [
    { path: "/", label: "Bosh sahifa" },
    { path: "/katalog", label: "Katalog" },
    { path: "/materiallar", label: "Materiallar" },
  ];

  function submitSearch(e) {
    e.preventDefault();
    navigate(`/katalog?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setOpen(false);
  }

  return (
    <header
      className="sticky top-0 z-40"
      style={{ background: `${T.stone}E6`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${T.border}` }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 h-20 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Logo size={34} />
          <span className="f-display italic text-3xl" style={{ color: T.ink }}>Loy</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="f-body text-sm"
              style={{ color: location.pathname === l.path ? T.clayDeep : T.dim, fontWeight: location.pathname === l.path ? 600 : 500 }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {searchOpen ? (
          <form onSubmit={submitSearch} className="flex-1 max-w-xs sm:max-w-sm flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Qidirish..."
              className="w-full px-4 py-2 rounded-full f-body text-sm outline-none"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.ink }}
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Yopish" style={{ color: T.dim, flexShrink: 0 }}>
              <X size={18} />
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-4 flex-shrink-0">
            <button onClick={toggleTheme} aria-label="Rejimni almashtirish" style={{ color: T.ink }}>
              {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setSearchOpen(true)} aria-label="Qidirish" style={{ color: T.ink }}>
              <Search size={20} />
            </button>
            <Link to="/profil" className="hidden sm:flex items-center" aria-label="Profil" style={{ color: T.ink }}>
              <User size={20} />
            </Link>
            <Link to="/sevimlilar" className="relative flex items-center" aria-label="Sevimlilar" style={{ color: T.ink }}>
              <Heart size={20} fill={wishCount > 0 ? T.ink : "none"} />
              {wishCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 flex items-center justify-center f-mono text-[10px] rounded-full"
                  style={{ background: T.plum, color: T.stone, width: 16, height: 16, minWidth: 16 }}
                >
                  {wishCount}
                </span>
              )}
            </Link>
            <Link to="/savat" className="relative flex items-center gap-2 f-body text-sm font-medium" style={{ color: T.ink }}>
              <ShoppingBag size={20} />
              <span className="hidden sm:inline">Savat</span>
              {count > 0 && (
                <span
                  className="absolute -top-2 -right-3 sm:static flex items-center justify-center f-mono text-[10px] rounded-full"
                  style={{ background: T.moss, color: T.stone, width: 18, height: 18, minWidth: 18 }}
                >
                  {count}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menyu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        )}
      </div>
      {open && !searchOpen && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.path} to={l.path} onClick={() => setOpen(false)} className="f-body text-sm text-left" style={{ color: T.dim }}>
              {l.label}
            </Link>
          ))}
          <Link to="/profil" onClick={() => setOpen(false)} className="f-body text-sm text-left" style={{ color: T.dim }}>
            Profil
          </Link>
          <button onClick={toggleTheme} className="inline-flex items-center gap-2 f-body text-sm text-left" style={{ color: T.dim }}>
            {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {mode === "dark" ? "Yorug' rejim" : "Qorong'i rejim"}
          </button>
        </div>
      )}
    </header>
  );
}
