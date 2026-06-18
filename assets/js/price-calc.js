// ── ITB3 Price Calculator ───────────────────────────────────────
// Mirrors bidolubaski.com price logic: size × qty × paper × coating × sides
// All prices in IQD

const PriceCalc = {

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
    'letterhead': {
      sizes: { 'A4':1, 'A5':0.6, 'Letter':1.05 },
      base: { 100:220, 250:150, 500:110, 1000:80, 2000:60 },
      paper: { 'كوشيه 100 جرام':0, 'مات 100 جرام':1000, 'كوشيه 120 جرام':2000 },
      coating: { 'بدون':0 },
      sides: { 'وجه واحد':0, 'وجهان':2000 },
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
    'spiral-notebook': {
      sizes: { 'A5 (60 صفحة)':1, 'A5 (80 صفحة)':1.3, 'A4 (60 صفحة)':1.6, 'A4 (80 صفحة)':2 },
      base: { 25:2200, 50:1600, 100:1200, 250:950 },
      paper: { 'داخل أبيض 80 جرام':0, 'داخل مسطر 80 جرام':1000, 'داخل مربع 80 جرام':1000 },
      coating: { 'غلاف كوشيه 300 جرام':0, 'غلاف سوفت تاتش':8000 },
      sides: { 'غلاف وجهان':0 },
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
    'advertising-bag': {
      sizes: { 'صغير (20×25 سم)':1, 'متوسط (25×32 سم)':1.6, 'كبير (32×40 سم)':2.4 },
      base: { 100:550, 250:400, 500:300, 1000:230 },
      paper: { 'كرافت 150 جرام':0, 'كوشيه 170 جرام':3000, 'نايلون':2000 },
      coating: { 'بدون':0, 'لمعة UV':2000 },
      sides: { 'وجه واحد':0, 'وجهان':2500 },
      orientations: ['عمودي'],
    },
    'envelope': {
      sizes: { 'DL (22×11 سم)':1, 'C5 (22×16 سم)':1.5, 'C4 (32×23 سم)':2.2 },
      base: { 100:180, 250:130, 500:100, 1000:75 },
      paper: { 'أبيض 100 جرام':0, 'كرافت 100 جرام':1500 },
      coating: { 'بدون':0 },
      sides: { 'وجه واحد':0 },
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
