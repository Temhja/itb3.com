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

// Product photos are served as WebP; data still lists the original file names.
const webp = s => s ? s.replace(/\.(jpe?g|png)$/i, '.webp') : s;
const getParam = k => new URLSearchParams(window.location.search).get(k);

// ── Shared header / footer ─────────────────────────────────────
// One source of truth for the top bar, navbar, mobile drawer and footer.
// Every page gets the same chrome; pages only keep their own <main>.
// Category icons in data/products.json are stored as emoji; map them to brand line icons.
const ICON_MAP = {'🪪':'card','🏢':'building','📄':'file','🏙️':'sign','🍽️':'utensils','🎁':'gift'};
const ICO = n => `<i class="i i-${ICON_MAP[n] || n}"></i>`;
const LOGO = (v = '', cls = '') => `<img class="logo-img ${cls}" src="${root}assets/images/logo/logo${v}.svg" alt="اطبع.com — ITB3" width="110" height="50">`;
const LANGS = `<div class="lang-pill"><button class="lang-btn" data-lang="ar">عربي</button><button class="lang-btn" data-lang="en">English</button><button class="lang-btn" data-lang="ku">کوردی</button></div>`;
let _data;
const loadData = () => _data || (_data = fetch(root + 'data/products.json').then(r => r.json()).catch(() => ({ categories: [], products: [] })));

function renderChrome() {
  const oldNav = document.getElementById('main-nav');
  if (!oldNav) return; // admin panel has its own layout
  document.querySelectorAll('.topbar,#mob-overlay,#mob-nav,footer.footer,.wa-float').forEach(el => el.remove());
  const social = [['instagram', CONFIG.instagram], ['facebook', CONFIG.facebook], ['tiktok', CONFIG.tiktok]]
    .filter(([, u]) => u && u !== '#')
    .map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${ICO(n)}</a>`).join('');
  const header = `
<div class="topbar"><div class="container"><div class="topbar-inner">
  <div class="topbar-left">
    <a href="tel:${CONFIG.phone}" dir="ltr">${ICO('phone')} ${CONFIG.phone}</a>
    <span class="topbar-sep"></span>
    <a href="${root}track-order.html" data-i18n="nav_track"></a>
  </div>
  <div class="topbar-right">${LANGS}<span class="topbar-sep"></span><a href="${root}contact.html" data-i18n="nav_contact"></a></div>
</div></div></div>
<nav id="main-nav"><div class="container"><div class="nav-inner">
  <button class="menu-toggle" id="menu-toggle" aria-label="menu"><span></span><span></span><span></span></button>
  <a href="${root}index.html" class="nav-logo">${LOGO()}</a>
  <div class="nav-search">
    <input type="search" data-i18n-ph="search_ph" id="main-search" aria-label="search">
    <button class="nav-search-btn" id="main-search-btn" aria-label="search">${ICO('search')}</button>
  </div>
  <div class="nav-actions">
    <a href="${root}account/login.html" class="nav-action-btn auth-btn" id="nav-login"><span class="icon">${ICO('user')}</span><span data-i18n="nav_login"></span></a>
    <a href="${root}account/dashboard.html" class="nav-action-btn auth-btn" id="nav-dashboard" style="display:none"><span class="icon">${ICO('user')}</span><span id="nav-username"></span></a>
    <button class="nav-action-btn" id="nav-logout" style="display:none" onclick="Auth.logout()"><span class="icon">${ICO('logout')}</span><span data-i18n="nav_logout"></span></button>
    <a href="${root}cart.html" class="nav-action-btn" style="position:relative"><span class="icon">${ICO('cart')}</span><span data-i18n="nav_cart"></span><span class="cart-count">0</span></a>
  </div>
</div></div></nav>
<div class="cat-bar"><div class="container"><div class="cat-bar-inner" id="cat-bar"></div></div></div>
<div id="mob-overlay"></div>
<aside id="mob-nav">
  <div class="mob-nav-head">${LOGO('', 'logo-sm')}<button class="menu-toggle" aria-label="close" style="font-size:1.3rem;color:#666">✕</button></div>
  <nav class="mob-nav-links">
    ${[['index.html', 'home', 'nav_home'], ['products/index.html', 'tag', 'nav_products'], ['about.html', 'info', 'nav_about'], ['contact.html', 'phone', 'nav_contact'], ['track-order.html', 'box', 'nav_track'], ['cart.html', 'cart', 'nav_cart'], ['account/login.html', 'user', 'nav_login']]
      .map(([h, i, k]) => `<a href="${root}${h}" class="mob-nav-link"><span class="ico">${ICO(i)}</span><span data-i18n="${k}"></span></a>`).join('')}
  </nav>
  <div style="padding:16px"><div class="lang-pill lang-pill--light" style="justify-content:center">${LANGS.replace(/^<div[^>]*>|<\/div>$/g, '')}</div></div>
</aside>`;
  const footer = `
<footer class="footer"><div class="container">
  <div class="footer-grid">
    <div>
      <div class="footer-logo">${LOGO('-white', 'logo-footer')}</div>
      <p style="color:rgba(255,255,255,0.6);font-size:0.85rem;margin:12px 0 20px;line-height:1.8" data-i18n="tagline"></p>
      <div class="footer-social">${social}<a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICO('chat')}</a></div>
    </div>
    <div class="footer-col"><h4 data-i18n="footer_links"></h4><ul>
      ${[['index.html', 'nav_home'], ['products/index.html', 'nav_products'], ['about.html', 'nav_about'], ['contact.html', 'nav_contact'], ['track-order.html', 'nav_track'], ['account/login.html', 'nav_login']]
        .map(([h, k]) => `<li><a href="${root}${h}" data-i18n="${k}"></a></li>`).join('')}
    </ul></div>
    <div class="footer-col"><h4 data-i18n="footer_cats"></h4><ul id="footer-cats-list"></ul></div>
    <div class="footer-col"><h4 data-i18n="footer_contact"></h4>
      <div class="footer-contact-item"><span class="ico">${ICO('phone')}</span><a href="tel:${CONFIG.phone}" dir="ltr">${CONFIG.phone}</a></div>
      <div class="footer-contact-item"><span class="ico">${ICO('chat')}</span><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" data-i18n="whatsapp"></a></div>
      <div class="footer-contact-item"><span class="ico">${ICO('mail')}</span><a href="mailto:${CONFIG.email}" dir="ltr">${CONFIG.email}</a></div>
      <div class="footer-contact-item"><span class="ico">${ICO('pin')}</span><span data-i18n="location_val"></span></div>
      <div class="footer-contact-item"><span class="ico">${ICO('clock')}</span><span data-i18n="hours_val"></span></div>
    </div>
  </div>
  <div class="footer-bottom"><p>© ${new Date().getFullYear()} ITB3 · اطبع.com — <span data-i18n="footer_rights"></span></p><p data-i18n="footer_made"></p></div>
</div></footer>
<a href="https://wa.me/${CONFIG.whatsapp}" class="wa-float" aria-label="WhatsApp">${ICO('chat')}</a>`;
  document.querySelectorAll('.cat-bar').forEach(el => el.remove());
  oldNav.insertAdjacentHTML('beforebegin', header);
  oldNav.remove();
  const firstScript = document.querySelector('body > script');
  if (firstScript) firstScript.insertAdjacentHTML('beforebegin', footer); else document.body.insertAdjacentHTML('beforeend', footer);
  const go = () => { const q = document.getElementById('main-search').value.trim(); if (q) location.href = root + 'products/index.html?q=' + encodeURIComponent(q); };
  document.getElementById('main-search').addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  document.getElementById('main-search-btn').addEventListener('click', go);
  i18n.render(); Auth.updateNavAuth(); Cart.init(); renderChromeCats();
}

async function renderChromeCats() {
  const data = await loadData(), lang = i18n.getLang(), cur = getParam('cat');
  const cb = document.getElementById('cat-bar');
  if (cb) cb.innerHTML = data.categories.map(c => `<a href="${root}products/index.html?cat=${c.id}" class="cat-bar-item${cur === c.id ? ' active' : ''}"><span class="cat-icon">${ICO(c.icon)}</span>${c.name[lang] || c.name.ar}</a>`).join('');
  const fl = document.getElementById('footer-cats-list');
  if (fl) fl.innerHTML = data.categories.map(c => `<li><a href="${root}products/index.html?cat=${c.id}">${c.name[lang] || c.name.ar}</a></li>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderChrome();
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
      renderChromeCats();
      if (typeof pageRender === 'function') pageRender();
    });
  });
}

function initMobileMenu() {
  const toggle = document.querySelectorAll('.menu-toggle');
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

function initWAFloat() {}

function markActive() {
  const path = window.location.pathname;
  document.querySelectorAll('.cat-bar-item').forEach(l => {
    const href = l.getAttribute('href') || '';
    if (href && path.includes(href.split('?')[0].replace('../',''))) l.classList.add('active');
  });
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
      <img src="${base}${webp(p.image)||'assets/images/products/placeholder.svg'}" alt="${name}" loading="lazy" width="400" height="300" onerror="this.onerror=null;this.src='${base}assets/images/products/placeholder.svg'">
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
    <span class="cat-card__icon">${ICO(cat.icon)}</span>
    <div class="cat-card__name">${cat.name[lang]||cat.name.ar}</div>
    <div class="cat-card__count"></div>
  </a>`;
}
