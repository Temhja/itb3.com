/* ITB3 print templates — files live in assets/templates/<file>.pdf, previews in assets/templates/thumbs/<file>.webp */
const ITB3_TEMPLATES = {
  cats: {"cards": {"ar": "بطاقات العمل", "en": "Business cards", "ku": "کارتی کار"}, "bags": {"ar": "حقائب كرتون", "en": "Carton bags", "ku": "جانتای کارتۆن"}, "brochures": {"ar": "بروشورات", "en": "Brochures", "ku": "برۆشور"}, "stationery": {"ar": "قرطاسية ومطبوعات مكتبية", "en": "Stationery", "ku": "قرتاسیە"}},
  items: [
    {"file": "itb3-business-card-82x50mm-vertical", "cat": "cards", "products": ["standard-business-card", "soft-touch-business-card"], "title": {"ar": "بطاقة عمل 82×50 ملم · عمودي", "en": "Business card 82×50 mm · Vertical", "ku": "کارتی کار 82×50 ملم · ستوونی"}, "kb": 34},
    {"file": "itb3-business-card-82x50mm-horizontal", "cat": "cards", "products": ["standard-business-card", "soft-touch-business-card"], "title": {"ar": "بطاقة عمل 82×50 ملم · أفقي", "en": "Business card 82×50 mm · Horizontal", "ku": "کارتی کار 82×50 ملم · ئاسۆیی"}, "kb": 34},
    {"file": "itb3-business-card-90x50mm-vertical", "cat": "cards", "products": ["standard-business-card", "soft-touch-business-card"], "title": {"ar": "بطاقة عمل 90×50 ملم · عمودي", "en": "Business card 90×50 mm · Vertical", "ku": "کارتی کار 90×50 ملم · ستوونی"}, "kb": 34},
    {"file": "itb3-business-card-90x50mm-horizontal", "cat": "cards", "products": ["standard-business-card", "soft-touch-business-card"], "title": {"ar": "بطاقة عمل 90×50 ملم · أفقي", "en": "Business card 90×50 mm · Horizontal", "ku": "کارتی کار 90×50 ملم · ئاسۆیی"}, "kb": 34},
    {"file": "itb3-business-card-83x51mm-rounded-vertical", "cat": "cards", "products": ["embossed-business-card"], "title": {"ar": "بطاقة عمل 83×51 ملم · زوايا دائرية · عمودي", "en": "Business card 83×51 mm · Rounded corners · Vertical", "ku": "کارتی کار 83×51 ملم · گۆشەی خڕ · ستوونی"}, "kb": 37},
    {"file": "itb3-business-card-83x51mm-rounded-horizontal", "cat": "cards", "products": ["embossed-business-card"], "title": {"ar": "بطاقة عمل 83×51 ملم · زوايا دائرية · أفقي", "en": "Business card 83×51 mm · Rounded corners · Horizontal", "ku": "کارتی کار 83×51 ملم · گۆشەی خڕ · ئاسۆیی"}, "kb": 37},
    {"file": "itb3-business-card-80x50mm-emboss-foil-vertical", "cat": "cards", "products": ["foil-business-card"], "title": {"ar": "بطاقة عمل 80×50 ملم · بارز + فويل · عمودي", "en": "Business card 80×50 mm · Emboss + foil · Vertical", "ku": "کارتی کار 80×50 ملم · بەرز + فۆیل · ستوونی"}, "kb": 39},
    {"file": "itb3-business-card-80x50mm-emboss-foil-horizontal", "cat": "cards", "products": ["foil-business-card"], "title": {"ar": "بطاقة عمل 80×50 ملم · بارز + فويل · أفقي", "en": "Business card 80×50 mm · Emboss + foil · Horizontal", "ku": "کارتی کار 80×50 ملم · بەرز + فۆیل · ئاسۆیی"}, "kb": 38},
    {"file": "itb3-raised-varnish-card-83x51mm-one-side-vertical-straight", "cat": "cards", "products": ["embossed-business-card"], "title": {"ar": "بطاقة عمل 83×51 ملم · لاك بارز · وجه واحد · عمودي · زوايا مستقيمة", "en": "Business card 83×51 mm · Raised varnish · One side · Vertical · Straight corners", "ku": "کارتی کار 83×51 ملم · لاکی بەرز · یەک ڕوو · ستوونی · گۆشەی ڕاست"}, "kb": 36},
    {"file": "itb3-raised-varnish-card-83x51mm-one-side-horizontal-straight", "cat": "cards", "products": ["embossed-business-card"], "title": {"ar": "بطاقة عمل 83×51 ملم · لاك بارز · وجه واحد · أفقي · زوايا مستقيمة", "en": "Business card 83×51 mm · Raised varnish · One side · Horizontal · Straight corners", "ku": "کارتی کار 83×51 ملم · لاکی بەرز · یەک ڕوو · ئاسۆیی · گۆشەی ڕاست"}, "kb": 36},
    {"file": "itb3-raised-varnish-card-83x51mm-one-side-horizontal-rounded", "cat": "cards", "products": ["embossed-business-card"], "title": {"ar": "بطاقة عمل 83×51 ملم · لاك بارز · وجه واحد · أفقي · زوايا دائرية", "en": "Business card 83×51 mm · Raised varnish · One side · Horizontal · Rounded corners", "ku": "کارتی کار 83×51 ملم · لاکی بەرز · یەک ڕوو · ئاسۆیی · گۆشەی خڕ"}, "kb": 36},
    {"file": "itb3-raised-varnish-card-83x51mm-two-sides-vertical-straight", "cat": "cards", "products": ["embossed-business-card"], "title": {"ar": "بطاقة عمل 83×51 ملم · لاك بارز · وجهان · عمودي · زوايا مستقيمة", "en": "Business card 83×51 mm · Raised varnish · Two sides · Vertical · Straight corners", "ku": "کارتی کار 83×51 ملم · لاکی بەرز · دوو ڕوو · ستوونی · گۆشەی ڕاست"}, "kb": 40},
    {"file": "itb3-raised-varnish-card-83x51mm-two-sides-horizontal-straight", "cat": "cards", "products": ["embossed-business-card"], "title": {"ar": "بطاقة عمل 83×51 ملم · لاك بارز · وجهان · أفقي · زوايا مستقيمة", "en": "Business card 83×51 mm · Raised varnish · Two sides · Horizontal · Straight corners", "ku": "کارتی کار 83×51 ملم · لاکی بەرز · دوو ڕوو · ئاسۆیی · گۆشەی ڕاست"}, "kb": 39},
    {"file": "itb3-raised-varnish-card-83x51mm-two-sides-vertical-rounded", "cat": "cards", "products": ["embossed-business-card"], "title": {"ar": "بطاقة عمل 83×51 ملم · لاك بارز · وجهان · عمودي · زوايا دائرية", "en": "Business card 83×51 mm · Raised varnish · Two sides · Vertical · Rounded corners", "ku": "کارتی کار 83×51 ملم · لاکی بەرز · دوو ڕوو · ستوونی · گۆشەی خڕ"}, "kb": 40},
    {"file": "itb3-carton-bag-23x8x24cm-vertical-cmyk", "cat": "bags", "products": ["advertising-bag"], "title": {"ar": "حقيبة كرتون 23×8×24 سم · عمودي · ألوان كاملة CMYK", "en": "Carton bag 23×8×24 cm · Vertical · Full colour CMYK", "ku": "جانتای کارتۆن 23×8×24 سم · ستوونی · ڕەنگی تەواو CMYK"}, "kb": 58},
    {"file": "itb3-carton-bag-23x8x24cm-vertical-single-colour", "cat": "bags", "products": ["advertising-bag"], "title": {"ar": "حقيبة كرتون 23×8×24 سم · عمودي · لون واحد", "en": "Carton bag 23×8×24 cm · Vertical · Single colour", "ku": "جانتای کارتۆن 23×8×24 سم · ستوونی · یەک ڕەنگ"}, "kb": 58},
    {"file": "itb3-carton-bag-24x8x30cm-vertical-cmyk", "cat": "bags", "products": ["advertising-bag"], "title": {"ar": "حقيبة كرتون 24×8×30 سم · عمودي · ألوان كاملة CMYK", "en": "Carton bag 24×8×30 cm · Vertical · Full colour CMYK", "ku": "جانتای کارتۆن 24×8×30 سم · ستوونی · ڕەنگی تەواو CMYK"}, "kb": 55},
    {"file": "itb3-carton-bag-24x8x30cm-vertical-single-colour", "cat": "bags", "products": ["advertising-bag"], "title": {"ar": "حقيبة كرتون 24×8×30 سم · عمودي · لون واحد", "en": "Carton bag 24×8×30 cm · Vertical · Single colour", "ku": "جانتای کارتۆن 24×8×30 سم · ستوونی · یەک ڕەنگ"}, "kb": 55},
    {"file": "itb3-carton-bag-24x8x35cm-vertical-cmyk", "cat": "bags", "products": ["advertising-bag"], "title": {"ar": "حقيبة كرتون 24×8×35 سم · عمودي · ألوان كاملة CMYK", "en": "Carton bag 24×8×35 cm · Vertical · Full colour CMYK", "ku": "جانتای کارتۆن 24×8×35 سم · ستوونی · ڕەنگی تەواو CMYK"}, "kb": 55},
    {"file": "itb3-carton-bag-24x8x35cm-vertical-single-colour", "cat": "bags", "products": ["advertising-bag"], "title": {"ar": "حقيبة كرتون 24×8×35 سم · عمودي · لون واحد", "en": "Carton bag 24×8×35 cm · Vertical · Single colour", "ku": "جانتای کارتۆن 24×8×35 سم · ستوونی · یەک ڕەنگ"}, "kb": 55},
    {"file": "itb3-carton-bag-35x8x24cm-horizontal-cmyk", "cat": "bags", "products": ["advertising-bag"], "title": {"ar": "حقيبة كرتون 35×8×24 سم · أفقي · ألوان كاملة CMYK", "en": "Carton bag 35×8×24 cm · Horizontal · Full colour CMYK", "ku": "جانتای کارتۆن 35×8×24 سم · ئاسۆیی · ڕەنگی تەواو CMYK"}, "kb": 41},
    {"file": "itb3-brochure-a5-210x148mm-single-fold", "cat": "brochures", "products": ["brochure"], "title": {"ar": "بروشور A5 (210×148 ملم) · طية واحدة", "en": "Brochure A5 (210×148 mm) · Single fold", "ku": "برۆشور A5 (210×148 ملم) · یەک قەد"}, "kb": 35},
    {"file": "itb3-brochure-a4-297x210mm-single-fold", "cat": "brochures", "products": ["brochure"], "title": {"ar": "بروشور A4 (297×210 ملم) · طية واحدة", "en": "Brochure A4 (297×210 mm) · Single fold", "ku": "برۆشور A4 (297×210 ملم) · یەک قەد"}, "kb": 35},
    {"file": "itb3-brochure-a4-297x210mm-z-fold", "cat": "brochures", "products": ["brochure"], "title": {"ar": "بروشور A4 (297×210 ملم) · طية Z", "en": "Brochure A4 (297×210 mm) · Z fold", "ku": "برۆشور A4 (297×210 ملم) · قەدی Z"}, "kb": 36},
    {"file": "itb3-brochure-a4-297x210mm-roll-fold", "cat": "brochures", "products": ["brochure"], "title": {"ar": "بروشور A4 (297×210 ملم) · طية للداخل", "en": "Brochure A4 (297×210 mm) · Roll fold", "ku": "برۆشور A4 (297×210 ملم) · قەدی ناوەوە"}, "kb": 36},
    {"file": "itb3-brochure-a3-420x297mm-single-fold", "cat": "brochures", "products": ["brochure"], "title": {"ar": "بروشور A3 (420×297 ملم) · طية واحدة", "en": "Brochure A3 (420×297 mm) · Single fold", "ku": "برۆشور A3 (420×297 ملم) · یەک قەد"}, "kb": 35},
    {"file": "itb3-brochure-a3-420x297mm-z-fold", "cat": "brochures", "products": ["brochure"], "title": {"ar": "بروشور A3 (420×297 ملم) · طية Z", "en": "Brochure A3 (420×297 mm) · Z fold", "ku": "برۆشور A3 (420×297 ملم) · قەدی Z"}, "kb": 35},
    {"file": "itb3-brochure-a3-420x297mm-roll-fold", "cat": "brochures", "products": ["brochure"], "title": {"ar": "بروشور A3 (420×297 ملم) · طية للداخل", "en": "Brochure A3 (420×297 mm) · Roll fold", "ku": "برۆشور A3 (420×297 ملم) · قەدی ناوەوە"}, "kb": 35},
    {"file": "itb3-pocket-folder", "cat": "stationery", "products": [], "title": {"ar": "ملف بجيب", "en": "Pocket folder", "ku": "فایلی بە گیرفان"}, "kb": 43},
    {"file": "itb3-pocket-folder-raised-varnish", "cat": "stationery", "products": [], "title": {"ar": "ملف بجيب · لاك بارز", "en": "Pocket folder · Raised varnish", "ku": "فایلی بە گیرفان · لاکی بەرز"}, "kb": 91},
    {"file": "itb3-cube-notepad-250-sheets", "cat": "stationery", "products": [], "title": {"ar": "مكعب ملاحظات 250 ورقة", "en": "Cube notepad, 250 sheets", "ku": "دەفتەری شەشپاڵوو ٢٥٠ پەڕە"}, "kb": 52},
    {"file": "itb3-cube-notepad-500-sheets", "cat": "stationery", "products": [], "title": {"ar": "مكعب ملاحظات 500 ورقة", "en": "Cube notepad, 500 sheets", "ku": "دەفتەری شەشپاڵوو ٥٠٠ پەڕە"}, "kb": 42},
    {"file": "itb3-cube-notepad-inner-sheet-78x78mm", "cat": "stationery", "products": [], "title": {"ar": "ورقة داخلية لمكعب الملاحظات 78×78 ملم", "en": "Cube notepad inner sheet 78×78 mm", "ku": "پەڕەی ناوەوەی دەفتەر 78×78 ملم"}, "kb": 37}
  ]
};

// Rendering helpers (need i18n.js and app.js loaded first)
function tplCard(t) {
  const lang = i18n.getLang(), title = t.title[lang] || t.title.ar, base = root + 'assets/templates/';
  return `<article class="tpl-card">
    <a class="tpl-thumb" href="${base}${t.file}.pdf" download><img src="${base}thumbs/${t.file}.webp" alt="${title}" loading="lazy" width="480" height="360"></a>
    <div class="tpl-body">
      <h3 class="tpl-title">${title}</h3>
      <div class="tpl-meta">${i18n.t('tpl_pdf')} · ${t.kb} KB</div>
      <a class="btn btn-outline btn-sm tpl-btn" href="${base}${t.file}.pdf" download><i class="i i-file"></i> ${i18n.t('tpl_download')}</a>
    </div>
  </article>`;
}
function templatesForProduct(productId) {
  const list = ITB3_TEMPLATES.items.filter(t => t.products.includes(productId));
  if (!list.length) return '';
  const lang = i18n.getLang();
  return `<div class="tpl-box">
    <div class="tpl-box-head"><strong><i class="i i-file"></i> ${i18n.t('tpl_for_product')}</strong><a href="${root}templates.html">${i18n.t('tpl_see_all')}</a></div>
    <ul class="tpl-list">${list.map(t => `<li><a href="${root}assets/templates/${t.file}.pdf" download>${t.title[lang] || t.title.ar}</a><span>PDF · ${t.kb} KB</span></li>`).join('')}</ul>
  </div>`;
}
