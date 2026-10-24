export function formatSom(n) {
  return n.toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";
}

export function discountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

export function slugify(name) {
  const map = { "o'": "o", "g'": "g", ş: "sh", ç: "ch" };
  return (
    name
      .toLowerCase()
      .replace(/[ʻʼ']/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 40) || `mahsulot-${Date.now()}`
  );
}
