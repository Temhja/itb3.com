const Cart = (() => {
  const KEY = 'itb3_cart_v2';
  const get = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const save = items => { localStorage.setItem(KEY, JSON.stringify(items)); updateBadge(); dispatch(); };
  const add = item => {
    const items = get();
    const ex = items.find(i => i.id === item.id && i.specKey === item.specKey);
    if (ex) ex.qty += (item.qty || 1);
    else items.push({ ...item, qty: item.qty || 1 });
    save(items);
    showToast(i18n.t('add_cart') + ' ✓');
  };
  const remove = id => save(get().filter(i => i.id !== id));
  const setQty = (id, qty) => {
    if (qty < 1) { remove(id); return; }
    const items = get();
    const it = items.find(i => i.id === id);
    if (it) { it.qty = qty; save(items); }
  };
  const clear = () => { localStorage.removeItem(KEY); updateBadge(); dispatch(); };
  const count = () => get().reduce((s, i) => s + i.qty, 0);
  const total = () => get().reduce((s, i) => s + i.totalPrice, 0);
  const updateBadge = () => {
    const c = count();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = c; el.classList.toggle('show', c > 0);
    });
  };
  const dispatch = () => document.dispatchEvent(new CustomEvent('cart:changed'));
  const buildWAMsg = () => {
    const items = get(); const lang = i18n.getLang();
    if (!items.length) return '';
    let msg = `🖨️ *ITB3 — ${i18n.t('tagline')}*\n\n`;
    items.forEach(it => {
      msg += `• ${it.name[lang]||it.name.ar} — ${it.specLabel}\n`;
      msg += `  ${i18n.fmt(it.totalPrice)}\n\n`;
    });
    msg += `*${i18n.t('total')}: ${i18n.fmt(total())}*`;
    return encodeURIComponent(msg);
  };
  const openWA = phone => window.open(`https://wa.me/${phone}?text=${buildWAMsg()}`, '_blank');
  const showToast = msg => {
    let t = document.getElementById('cart-toast');
    if (!t) { t = document.createElement('div'); t.id = 'cart-toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  };
  const init = () => updateBadge();
  return { get, add, remove, setQty, clear, count, total, openWA, buildWAMsg, init };
})();
document.addEventListener('DOMContentLoaded', () => Cart.init());
