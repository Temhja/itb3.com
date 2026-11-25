// ── ITB3 Price Calculator ───────────────────────────────────────
// Mirrors bidolubaski.com price logic: size × qty × paper × coating × sides
// All prices in IQD

const PriceCalc = {

  // ── Supplier-based pricing ─────────────────────────────────────
  // Products with a `matrixTL` table are priced from the supplier list:
  //   Genç Ofset (Istanbul) — OCAK 2026 FİYAT LİSTESİ, Turkish lira, KDV and design NOT included.
  // Selling price (IQD) = supplier TL × rate × markup, rounded to `roundTo`.
  // New list or new exchange rate? Change the numbers here only.
  supplier: {
    rate: 40,      // IQD per 1 TL
    markup: 1.5,   // +50% on top of supplier cost (shipping, customs, profit)
    roundTo: 250,  // smallest IQD step shown to customers
  },
  toIQD(tl) { const s = this.supplier; return Math.round(tl * s.rate * s.markup / s.roundTo) * s.roundTo; },
  // Quantities offered for one size of a matrix product
  qtysFor(productId, size) {
    const tbl = this.tables[productId];
    if (!tbl) return [];
    return Object.keys(tbl.matrixTL ? (tbl.matrixTL[size] || {}) : tbl.base).map(Number).sort((a,b)=>a-b);
  },
  // Surcharge of one option: plain IQD number (legacy products) or a supplier rule
  _extra(v, size, qty, baseTL) {
    if (!v) return 0;
    if (typeof v === 'number') return v;
    if (v.pct) return this.toIQD(baseTL * v.pct);
    if (v.tl) { const row = v.tl[size] || v.tl; return row[qty] != null ? this.toIQD(row[qty]) : 0; }
    return 0;
  },

  // Base price tables per product type (price per 1 unit at qty=1)
  tables: {
    'standard-business-card': {
      sizes: { '9×5 cm':1, '8.5×5.5 cm':0.95, '8×4.5 cm':0.9 },
      base: { 50:650, 100:420, 250:290, 500:210, 1000:150, 2000:110, 5000:80 },
      paper: { 'كوشيه 350 جرام':0, 'كوشيه 400 جرام':3000, 'مات 350 جرام':2000, 'كرافت 300 جرام':4000 },
      coating: { 'بدون':0, 'لمعة UV':3500, 'مات UV':4500, 'سوفت تاتش':9000, 'بدون طلاء':0 },
      sides: { 'وجه واحد':0, 'وجهان':4000 },
      orientations: ['عمودي','أفقي'],
    },
    'embossed-business-card': {
      sizes: { '9×5 cm':1, '8.5×5.5 cm':0.95 },
      base: { 50:1200, 100:900, 250:680, 500:520, 1000:420 },
      paper: { 'كوشيه 600 جرام':0, 'كوشيه 400 جرام':-2000 },
      coating: { 'لمعة UV':0, 'مات UV':1000, 'سوفت تاتش':5000 },
      sides: { 'وجه واحد':0, 'وجهان':5000 },
      orientations: ['عمودي','أفقي'],
    },
    'flyer': {
      sizes: { 'A6 (10.5×14.8cm)':0.7, 'A5 (14.8×21cm)':1, 'A4 (21×29.7cm)':1.8, 'A3 (29.7×42cm)':3.2 },
      base: { 100:320, 250:200, 500:140, 1000:95, 2000:70, 5000:50 },
      paper: { 'كوشيه 135 جرام':0, 'كوشيه 170 جرام':2000, 'مات 135 جرام':1500, 'مات 170 جرام':3000 },
      coating: { 'بدون':0, 'لمعة UV':3000, 'مات UV':4000 },
      sides: { 'وجه واحد':0, 'وجهان':3000 },
      orientations: ['عمودي','أفقي'],
    },
    'brochure': {
      sizes: { 'A5 ثلاثي الطي':1, 'A4 ثلاثي الطي':1.8, 'A4 رباعي الطي':2 },
      base: { 100:450, 250:290, 500:210, 1000:160, 2000:120 },
      paper: { 'كوشيه 170 جرام':0, 'مات 170 جرام':2000, 'كوشيه 200 جرام':3500 },
      coating: { 'بدون':0, 'لمعة UV':4000, 'مات UV':5000 },
      sides: { 'وجهان':0 },
      orientations: ['عمودي'],
    },
    // ANTETLİ — 20.5×29.5 cm, tek renk, 1. hamur 80 gr. (90 gr. +%15)
    'letterhead': {
      sizes: { 'A4 (20.5×29.5 سم)':1 },
      matrixTL: { 'A4 (20.5×29.5 سم)': { 500:600, 1000:750, 2000:1150, 3000:1500, 5000:2200, 7500:3200, 10000:4000, 15000:5900, 20000:7500 } },
      paper: { 'ورق أبيض 80 جرام':0, 'ورق أبيض 90 جرام':{ pct:0.15 } },
      coating: { 'بدون':0 },
      sides: { 'لون واحد':0, 'لونان':{ tl:{ 500:450, 1000:450, 2000:600, 3000:750, 5000:1000, 7500:1250, 10000:1800, 15000:2250, 20000:3000 } } },
      orientations: ['عمودي','أفقي'],
    },
    'catalogue': {
      sizes: { 'A5 (16 صفحة)':1, 'A5 (32 صفحة)':1.7, 'A4 (16 صفحة)':1.9, 'A4 (32 صفحة)':3.2, 'A4 (48 صفحة)':4.5 },
      base: { 50:2400, 100:1600, 250:1100, 500:850 },
      paper: { 'كوشيه 150 جرام':0, 'مات 150 جرام':5000, 'كوشيه 200 جرام':8000 },
      coating: { 'غلاف UV لمعة':0, 'غلاف سوفت تاتش':12000 },
      sides: { 'وجهان':0 },
      orientations: ['عمودي'],
    },
    'rollup-banner': {
      sizes: { '85×200 سم':1, '100×200 سم':1.25, '120×200 سم':1.5 },
      base: { 1:85000, 2:78000, 5:72000, 10:65000 },
      paper: { 'بوليستر عالي الجودة':0, 'بوليستر بريميوم':10000 },
      coating: { 'بدون':0 },
      sides: { 'وجه واحد':0 },
      orientations: ['عمودي'],
    },
    'vinyl-banner': {
      sizes: { '1م × 2م':1, '1م × 3م':1.4, '2م × 3م':2.6, '2م × 4م':3.4, '3م × 5م':6 },
      base: { 1:30000, 2:28000, 5:25000, 10:22000 },
      paper: { 'فينيل 510 جرام':0, 'فينيل 650 جرام':5000 },
      coating: { 'بدون':0 },
      sides: { 'وجه واحد':0 },
      orientations: ['أفقي','عمودي'],
    },
    'menu': {
      sizes: { 'A5 (صفحتان)':1, 'A4 (صفحتان)':1.8, 'A4 (4 صفحات)':2.5, 'A3 مطوي':3 },
      base: { 10:4500, 25:3200, 50:2600, 100:2000 },
      paper: { 'كوشيه 350 جرام':0, 'مات 350 جرام':3000, 'كوشيه مصفح 400 جرام':8000 },
      coating: { 'لمعة UV':0, 'مات UV':2000, 'تصفيح مط':10000 },
      sides: { 'وجهان':0 },
      orientations: ['عمودي','أفقي'],
    },
    'soft-touch-business-card': {
      sizes: { '9×5 cm':1, '8.5×5.5 cm':0.95 },
      base: { 50:950, 100:700, 250:520, 500:400, 1000:320 },
      paper: { 'كوشيه 400 جرام':0 },
      coating: { 'سوفت تاتش':0 },
      sides: { 'وجه واحد':0, 'وجهان':4000 },
      orientations: ['عمودي','أفقي'],
    },
    'foil-business-card': {
      sizes: { '9×5 cm':1 },
      base: { 50:1600, 100:1200, 250:900, 500:700 },
      paper: { 'كوشيه 600 جرام':0 },
      coating: { 'ورق الذهب':0, 'ورق الفضة':0 },
      sides: { 'وجه واحد':0, 'وجهان':6000 },
      orientations: ['عمودي','أفقي'],
    },
    'transparent-business-card': {
      sizes: { '9×5 cm (PVC)':1 },
      base: { 50:1200, 100:900, 250:700 },
      paper: { 'PVC شفاف 0.5mm':0 },
      coating: { 'UV رقمي':0 },
      sides: { 'وجه واحد':0, 'وجهان':5000 },
      orientations: ['عمودي','أفقي'],
    },
    // A6 / A5 ÜSTTEN SPİRALLİ BLOKNOT — 50'lik, kapak renkli 270-300 gr. bristol, içler tek renk
    'spiral-notebook': {
      sizes: { 'A6 (10×14 سم) 50 ورقة':1, 'A5 (14×20 سم) 50 ورقة':1 },
      matrixTL: {
        'A6 (10×14 سم) 50 ورقة': { 100:4250, 250:6500, 500:9500, 1000:15000, 2000:24500 },
        'A5 (14×20 سم) 50 ورقة': { 100:4750, 250:8500, 500:14000, 1000:21000, 2000:38000 },
      },
      paper: { 'داخل بلون واحد':0, 'داخل بلونين':{ tl:{
        'A6 (10×14 سم) 50 ورقة': { 100:750, 250:1000, 500:1500, 1000:2000, 2000:2950 },
        'A5 (14×20 سم) 50 ورقة': { 100:750, 250:1000, 500:1800, 1000:2950, 2000:4500 },
      } } },
      coating: { 'غلاف بريستول 270-300 جرام':0 },
      sides: { 'غلاف ملون':0 },
      orientations: ['عمودي'],
    },
    'calendar': {
      sizes: { 'جداري A3':1, 'جداري A2':1.8, 'مكتبي A5':0.8 },
      base: { 25:3000, 50:2200, 100:1700, 250:1400 },
      paper: { 'كوشيه 170 جرام':0, 'مات 170 جرام':3000 },
      coating: { 'غلاف UV':0 },
      sides: { 'وجهان':0 },
      orientations: ['عمودي'],
    },
    // KARTON ÇANTA — 230 gr. amerikan bristol, parlak / mat selefon
    'advertising-bag': {
      sizes: { '17×24×7 سم':1, '20×30×10 سم':1, '24.5×35×9 سم':1 },
      matrixTL: {
        '17×24×7 سم': { 100:5250, 250:6500, 500:8500, 1000:11000, 2000:18000 },
        '20×30×10 سم': { 100:6500, 250:8000, 500:10500, 1000:14000, 2000:23000 },
        '24.5×35×9 سم': { 100:7000, 250:8250, 500:11000, 1000:15000, 2000:24500 },
      },
      paper: { 'كرتون بريستول 230 جرام':0 },
      coating: { 'سلوفان لامع':0, 'سلوفان مات':0, 'سلوفان + ورنيش (لاك)':{ tl:{ 100:2000, 250:2000, 500:2000, 1000:2000, 2000:4000 } } },
      sides: { 'طباعة ملونة':0 },
      orientations: ['عمودي'],
    },
    // DİPLOMAT ZARF + TORBA ZARF (110 gr. 1. hamur)
    'envelope': {
      sizes: { 'دبلومات DL (بنافذة أو بدون)':1, 'ظرف كيس 17×25 سم':1, 'ظرف كيس 24×32 سم':1, 'ظرف كيس 26×35 سم':1, 'ظرف كيس 32×42 سم':1 },
      matrixTL: {
        'دبلومات DL (بنافذة أو بدون)': { 500:900, 1000:1200, 2000:2100, 2500:2600, 3000:3000, 5000:4750, 10000:9000 },
        'ظرف كيس 17×25 سم': { 500:1500, 1000:2400, 2000:4500 },
        'ظرف كيس 24×32 سم': { 500:2000, 1000:3100, 2000:6000 },
        'ظرف كيس 26×35 سم': { 500:2400, 1000:3600, 2000:7000 },
        'ظرف كيس 32×42 سم': { 500:4000, 1000:7000, 2000:13750 },
      },
      paper: { 'ورق أبيض':0 },
      coating: { 'بدون':0 },
      sides: { 'لون واحد':0, 'لونان':{ tl:{
        'دبلومات DL (بنافذة أو بدون)': { 500:500, 1000:500, 2000:700, 2500:800, 3000:900, 5000:1300, 10000:2250 },
        'ظرف كيس 17×25 سم': { 500:500, 1000:500, 2000:700 },
        'ظرف كيس 24×32 سم': { 500:800, 1000:800, 2000:1100 },
        'ظرف كيس 26×35 سم': { 500:800, 1000:800, 2000:1100 },
        'ظرف كيس 32×42 سم': { 500:800, 1000:800, 2000:1100 },
      } } },
      orientations: ['أفقي'],
    },
    'square-business-card': {
      sizes: { '6×6 سم':1, '7×7 سم':1.2 },
      base: { 50:750, 100:550, 250:400, 500:310, 1000:250 },
      paper: { 'كوشيه 350 جرام':0, 'مات 350 جرام':2000 },
      coating: { 'بدون':0, 'لمعة UV':3500, 'مات UV':4500 },
      sides: { 'وجه واحد':0, 'وجهان':4000 },
      orientations: ['—'],
    },
    'trodat-stamp': {
      sizes: { 'صغير 38×14mm':1, 'متوسط 47×18mm':1.4, 'كبير 60×40mm':2, 'دائري 40mm':1.8 },
      base: { 1:35000, 2:34000, 5:32000, 10:30000 },
      paper: { 'حبر أزرق':0, 'حبر أحمر':0, 'حبر أخضر':0, 'حبر أسود':0 },
      coating: { 'بدون':0 },
      sides: { 'وجه واحد':0 },
      orientations: ['—'],
    },
  },

  calculate(productId, size, qty, paper, coating, sides) {
    const tbl = this.tables[productId];
    if (!tbl) return { total: 0, perUnit: 0 };

    if (tbl.matrixTL) {
      const baseTL = (tbl.matrixTL[size] || {})[qty];
      if (baseTL == null) return { total: 0, perUnit: 0, unavailable: true };
      const base = this.toIQD(baseTL);
      const paperSurcharge = this._extra(tbl.paper[paper], size, qty, baseTL);
      const coatingSurcharge = this._extra(tbl.coating[coating], size, qty, baseTL);
      const sidesSurcharge = this._extra(tbl.sides[sides], size, qty, baseTL);
      const total = base + paperSurcharge + coatingSurcharge + sidesSurcharge;
      return { total, perUnit: Math.round(total / qty), basePerUnit: base / qty, sizeMultiplier: 1, paperSurcharge, coatingSurcharge, sidesSurcharge };
    }

    // Find qty bracket
    const qtys = Object.keys(tbl.base).map(Number).sort((a,b)=>a-b);
    let bracket = qtys[0];
    for (const q of qtys) { if (qty >= q) bracket = q; }

    const sizeMultiplier = tbl.sizes[size] ?? 1;
    const basePerUnit = tbl.base[bracket] ?? tbl.base[qtys[0]];
    const paperSurcharge = (tbl.paper[paper] ?? 0);
    const coatingSurcharge = (tbl.coating[coating] ?? 0);
    const sidesSurcharge = (tbl.sides[sides] ?? 0);

    const total = Math.round(
      (basePerUnit * sizeMultiplier * qty) + paperSurcharge + coatingSurcharge + sidesSurcharge
    );
    const perUnit = qty > 0 ? Math.round(total / qty) : 0;
    return { total, perUnit, basePerUnit, sizeMultiplier, paperSurcharge, coatingSurcharge, sidesSurcharge };
  },

  getTable(productId) { return this.tables[productId] || null; },
};

// Matrix products: derive the per-unit `base` table (used by product cards, sorting and the
// quantity picker) from the supplier matrix, so there is one source of truth.
Object.values(PriceCalc.tables).forEach(tbl => {
  if (!tbl.matrixTL) return;
  tbl.base = {};
  Object.values(tbl.matrixTL).forEach(row => Object.entries(row).forEach(([q, tl]) => {
    const unit = Math.round(PriceCalc.toIQD(tl) / q);
    if (tbl.base[q] == null || unit < tbl.base[q]) tbl.base[q] = unit;
  }));
});
