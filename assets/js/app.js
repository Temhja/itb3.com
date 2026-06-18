const CONFIG = {
  whatsapp: '9647736797122',
  phone: '+9647736797122',
  email: 'husseinalobaidi92@gmail.com',
  instagram: '#', facebook: '#', tiktok: '#',
};

const root = (() => {
  const p = window.location.pathname;
  if (p.includes('/account/') || p.includes('/admin/') || p.includes('/products/')) return '../';
  return '';
})();

document.addEventListener('DOMContentLoaded', () => {
  initNav(); initMobileMenu(); initLangSwitch(); initSlider();
  initScrollAnim(); initWAFloat(); markActive();
});

function initNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  // wa float links
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.addEventListener('click', () => {
      const msg = el.dataset.waMsg || i18n.t('tagline');
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });
}

function initLangSwitch() {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', () => {
      i18n.setLang(b.dataset.lang);
      if (typeof pageRender === 'function') pageRender();
    });
  });
}

function initMobileMenu() {
  const toggle = document.querySelectorAll('#menu-toggle');
  const overlay = document.getElementById('mob-overlay');
  const nav = document.getElementById('mob-nav');
  const open = () => { nav?.classList.add('open'); overlay?.classList.add('on'); document.body.classList.add('no-scroll'); };
  const close = () => { nav?.classList.remove('open'); overlay?.classList.remove('on'); document.body.classList.remove('no-scroll'); };
  toggle.forEach(t => t.addEventListener('click', () => nav?.classList.contains('open') ? close() : open()));
  overlay?.addEventListener('click', close);
  document.querySelectorAll('.mob-nav-link').forEach(l => l.addEventListener('click', close));
}

function initSlider() {
  const track = document.querySelector('.slides-track');
  if (!track) return;
  const slides = track.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  let cur = 0, timer;
  const go = n => {
    cur = (n + slides.length) % slides.length;
    track.style.transform = `translateX(${i18n.getDir() === 'rtl' ? cur * 100 : -cur * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  };
  const next = () => go(cur + 1);
  const prev = () => go(cur - 1);
  const startAuto = () => { clearInterval(timer); timer = setInterval(next, 5000); };
  document.querySelector('.slider-next')?.addEventListener('click', () => { next(); startAuto(); });
  document.querySelector('.slider-prev')?.addEventListener('click', () => { prev(); startAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); startAuto(); }));
  startAuto(); go(0);
}

function initScrollAnim() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

function initWAFloat() {
  const btn = document.querySelector('.wa-float');
  if (btn) btn.addEventListener('click', e => {
    e.preventDefault();
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(i18n.t('tagline'))}`, '_blank');
  });
}

function markActive() {
  const path = window.location.pathname;
  document.querySelectorAll('.cat-bar-item').forEach(l => {
    const href = l.getAttribute('href') || '';
    if (href && path.includes(href.split('?')[0].replace('../',''))) l.classList.add('active');
  });
}

const getParam = k => new URLSearchParams(window.location.search).get(k);

// shared nav header HTML injected per page — build it here
function buildNavHTML(activeLink) {
  return ''; // Each page has its own nav inline
}

// Product card builder
function buildCard(p, base = '') {
  const lang = i18n.getLang();
  const name = p.name[lang] || p.name.ar;
  const desc = (p.description[lang] || p.description.ar || '').substring(0, 70);
  const tbl = PriceCalc.getTable(p.id);
  let minPrice = 0;
  if (tbl) {
    const qtys = Object.keys(tbl.base).map(Number);
    const maxQty = Math.max(...qtys);
    minPrice = tbl.base[maxQty] || 0;
  }
  const badge = p.badge ? `<div class="product-badge${p.badge.type === 'new' ? ' badge-new' : p.badge.type === 'hot' ? ' badge-hot' : ''}">${p.badge[lang]||p.badge.ar}</div>` : '';
  const img = p.image || `${base}assets/images/products/placeholder.svg`;
  return `<div class="product-card fade-up">
    <a href="${base}product.html?id=${p.id}" class="product-card__img">
      ${badge}
      <img src="${base}${p.image||'assets/images/products/placeholder.svg'}" alt="${name}" loading="lazy" onerror="this.src='${base}assets/images/products/placeholder.svg'">
    </a>
    <div class="product-card__body">
      <div class="product-card__name"><a href="${base}product.html?id=${p.id}">${name}</a></div>
      <div class="product-card__attrs" id="attrs-${p.id}"></div>
      <div class="product-card__price">
        <div>
          <div class="product-price-from" data-i18n="from"></div>
          <div class="product-price-val">${i18n.fmt(minPrice)}</div>
          <div class="product-price-unit" data-i18n="per_unit"></div>
        </div>
        <a href="${base}product.html?id=${p.id}" class="btn-order" data-i18n="add_cart"></a>
      </div>
    </div>
  </div>`;
}

function buildCatCard(cat, base = '') {
  const lang = i18n.getLang();
  return `<a href="${base}products/index.html?cat=${cat.id}" class="cat-card">
    <span class="cat-card__icon">${cat.icon}</span>
    <div class="cat-card__name">${cat.name[lang]||cat.name.ar}</div>
    <div class="cat-card__count"></div>
  </a>`;
}
