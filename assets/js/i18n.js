const i18n = (() => {
  const d = {
    ar: {
      dir:'rtl', font:'font-arabic',
      site_name:'ITB3', tagline:'مطبعتك الاحترافية في بغداد',
      nav_home:'الرئيسية', nav_products:'المنتجات', nav_about:'من نحن',
      nav_contact:'تواصل معنا', nav_track:'تتبع طلبك', nav_cart:'السلة',
      nav_login:'تسجيل دخول', nav_register:'إنشاء حساب', nav_dashboard:'حسابي', nav_logout:'خروج',
      search_ph:'ابحث عن منتج للطباعة...',
      hero_offer:'عرض محدود', shop_now:'اطلب الآن', view_all:'عرض الكل',
      cats_title:'تصفح الفئات', feat_title:'منتجات مميزة',
      opt_size:'الحجم', opt_orientation:'الاتجاه', opt_qty:'الكمية',
      opt_paper:'نوع الورق', opt_coating:'التشطيب', opt_sides:'جهة الطباعة',
      portrait:'عمودي', landscape:'أفقي',
      single_side:'وجه واحد', double_side:'وجهان',
      from:'يبدأ من', per_unit:'للقطعة', total_price:'السعر الإجمالي',
      add_cart:'أضف للسلة', order_wa:'اطلب عبر واتساب',
      choose_opt:'اختر', specs:'المواصفات',
      cart_title:'سلة التسوق', cart_empty:'السلة فارغة', cart_empty_sub:'أضف منتجات للبدء',
      product:'المنتج', variant:'المواصفة', qty:'الكمية', price:'السعر', total:'الإجمالي',
      subtotal:'المجموع', delivery:'التوصيل', calculated:'يُحسب عند التأكيد',
      checkout:'إتمام الطلب', continue_shop:'مواصلة التسوق', remove:'حذف',
      order_note:'ملاحظة للطلب', order_note_ph:'أي تعليمات خاصة...',
      checkout_title:'بيانات الطلب', name:'الاسم الكامل', phone:'رقم الهاتف',
      city:'المحافظة', address:'العنوان', notes:'ملاحظات', file_upload:'ارفع ملف التصميم',
      file_hint:'PDF, AI, PSD, JPG, PNG — حجم أقصى 50MB',
      submit_order:'إرسال الطلب', or_wa:'أو عبر واتساب',
      order_success:'تم إرسال طلبك! سيتواصل معك فريقنا قريباً.', order_error:'حدث خطأ، حاول مرة أخرى.',
      login_title:'تسجيل الدخول', register_title:'إنشاء حساب جديد',
      email:'البريد الإلكتروني', password:'كلمة المرور', confirm_pass:'تأكيد كلمة المرور',
      full_name:'الاسم الكامل', login_btn:'دخول', register_btn:'إنشاء الحساب',
      no_account:'ليس لديك حساب؟', have_account:'لديك حساب؟', sign_up:'سجل الآن', sign_in:'سجل دخولك',
      forgot_pass:'نسيت كلمة المرور؟',
      dashboard_title:'لوحة التحكم', my_orders:'طلباتي', my_profile:'ملفي الشخصي',
      order_id:'رقم الطلب', order_date:'التاريخ', order_status:'الحالة', order_total:'الإجمالي',
      status_pending:'قيد الانتظار', status_printing:'جاري الطباعة',
      status_finishing:'التشطيب', status_ready:'جاهز', status_delivered:'تم التسليم',
      track_title:'تتبع طلبك', track_ph:'أدخل رقم الطلب', track_btn:'تتبع',
      contact_title:'تواصل معنا', whatsapp:'واتساب', call:'اتصل بنا',
      location:'الموقع', location_val:'بغداد، العراق',
      hours:'أوقات العمل', hours_val:'السبت – الخميس: ٩ص – ٦م',
      send_msg:'أرسل رسالة', message:'الرسالة', send:'إرسال',
      about_title:'من نحن',
      footer_links:'روابط سريعة', footer_cats:'الفئات', footer_contact:'تواصل معنا',
      footer_rights:'جميع الحقوق محفوظة', footer_made:'صُنع في بغداد 🇮🇶',
      currency:'د.ع', loading:'جاري التحميل...', error:'حدث خطأ', close:'إغلاق',
      required:'مطلوب', save:'حفظ', edit:'تعديل', delete:'حذف',
      new_badge:'جديد', hot_badge:'الأكثر طلباً', sale_badge:'خصم',
    },
    en: {
      dir:'ltr', font:'font-english',
      site_name:'ITB3', tagline:'Baghdad\'s Professional Printing House',
      nav_home:'Home', nav_products:'Products', nav_about:'About',
      nav_contact:'Contact', nav_track:'Track Order', nav_cart:'Cart',
      nav_login:'Sign In', nav_register:'Sign Up', nav_dashboard:'My Account', nav_logout:'Logout',
      search_ph:'Search for a print product...',
      hero_offer:'Limited Offer', shop_now:'Order Now', view_all:'View All',
      cats_title:'Browse Categories', feat_title:'Featured Products',
      opt_size:'Size', opt_orientation:'Orientation', opt_qty:'Quantity',
      opt_paper:'Paper Type', opt_coating:'Coating / Finish', opt_sides:'Print Sides',
      portrait:'Portrait', landscape:'Landscape',
      single_side:'Single Side', double_side:'Double Side',
      from:'From', per_unit:'per unit', total_price:'Total Price',
      add_cart:'Add to Cart', order_wa:'Order via WhatsApp',
      choose_opt:'Select', specs:'Specifications',
      cart_title:'Shopping Cart', cart_empty:'Your cart is empty', cart_empty_sub:'Add some products to get started',
      product:'Product', variant:'Spec', qty:'Qty', price:'Price', total:'Total',
      subtotal:'Subtotal', delivery:'Delivery', calculated:'Calculated at confirmation',
      checkout:'Checkout', continue_shop:'Continue Shopping', remove:'Remove',
      order_note:'Order Note', order_note_ph:'Any special instructions...',
      checkout_title:'Order Details', name:'Full Name', phone:'Phone Number',
      city:'City / Governorate', address:'Address', notes:'Notes', file_upload:'Upload Design File',
      file_hint:'PDF, AI, PSD, JPG, PNG — Max 50MB',
      submit_order:'Submit Order', or_wa:'Or via WhatsApp',
      order_success:'Order submitted! Our team will contact you soon.', order_error:'An error occurred, please try again.',
      login_title:'Sign In', register_title:'Create Account',
      email:'Email Address', password:'Password', confirm_pass:'Confirm Password',
      full_name:'Full Name', login_btn:'Sign In', register_btn:'Create Account',
      no_account:"Don't have an account?", have_account:'Already have an account?', sign_up:'Sign Up', sign_in:'Sign In',
      forgot_pass:'Forgot password?',
      dashboard_title:'Dashboard', my_orders:'My Orders', my_profile:'My Profile',
      order_id:'Order ID', order_date:'Date', order_status:'Status', order_total:'Total',
      status_pending:'Pending', status_printing:'Printing',
      status_finishing:'Finishing', status_ready:'Ready', status_delivered:'Delivered',
      track_title:'Track Your Order', track_ph:'Enter order number', track_btn:'Track',
      contact_title:'Contact Us', whatsapp:'WhatsApp', call:'Call Us',
      location:'Location', location_val:'Baghdad, Iraq',
      hours:'Working Hours', hours_val:'Sat – Thu: 9am – 6pm',
      send_msg:'Send a Message', message:'Message', send:'Send',
      about_title:'About Us',
      footer_links:'Quick Links', footer_cats:'Categories', footer_contact:'Contact',
      footer_rights:'All rights reserved', footer_made:'Made in Baghdad 🇮🇶',
      currency:'IQD', loading:'Loading...', error:'Error occurred', close:'Close',
      required:'Required', save:'Save', edit:'Edit', delete:'Delete',
      new_badge:'New', hot_badge:'Best Seller', sale_badge:'Sale',
    },
    ku: {
      dir:'rtl', font:'font-arabic',
      site_name:'ITB3', tagline:'چاپخانەی پیشەیی بەغدا',
      nav_home:'سەرەکی', nav_products:'بەرهەمەکان', nav_about:'دەربارەمان',
      nav_contact:'پەیوەندی', nav_track:'شوێنکەوتن', nav_cart:'سەبەتە',
      nav_login:'چوونەژوورەوە', nav_register:'حیساب دروستکردن', nav_dashboard:'حیسابەکەم', nav_logout:'دەرچوون',
      search_ph:'بەرهەمی چاپ بگەڕێ...',
      hero_offer:'ئۆفەری تایبەت', shop_now:'ئێستا داواکاری بکە', view_all:'هەمووی ببینە',
      cats_title:'پۆلەکان ببینە', feat_title:'بەرهەمە تایبەتەکان',
      opt_size:'قەبارە', opt_orientation:'ئاراستە', opt_qty:'ژمارە',
      opt_paper:'جۆری کاغەز', opt_coating:'کۆتایی هاتن', opt_sides:'لای چاپ',
      portrait:'ستوونی', landscape:'ئەفقی',
      single_side:'یەک لا', double_side:'دوو لا',
      from:'لە', per_unit:'بۆ هەر دانە', total_price:'کۆی نرخ',
      add_cart:'بخە سەبەتەوە', order_wa:'داواکاری بە واتساپ',
      choose_opt:'هەڵبژێرە', specs:'تایبەتمەندیەکان',
      cart_title:'سەبەتەی کڕین', cart_empty:'سەبەتە بەتاڵە', cart_empty_sub:'بەرهەم زیاد بکە',
      product:'بەرهەم', variant:'تایبەتمەندی', qty:'ژمارە', price:'نرخ', total:'کۆی گشتی',
      subtotal:'کۆی بریتی', delivery:'گەیاندن', calculated:'لە کاتی پشتڕاستکردنەوەدا',
      checkout:'تەواوکردنی داواکاری', continue_shop:'بەردەوام بە کڕین', remove:'سڕینەوە',
      order_note:'تێبینی داواکاری', order_note_ph:'هەر ڕێنماییەکی تایبەت...',
      checkout_title:'زانیاریەکانی داواکاری', name:'ناوی تەواو', phone:'ژمارەی تەلەفۆن',
      city:'شار/پارێزگا', address:'ناونیشان', notes:'تێبینی', file_upload:'فایلی دیزاین بارکە',
      file_hint:'PDF, AI, PSD, JPG, PNG — زۆرینەی 50MB',
      submit_order:'داواکاری بنێرە', or_wa:'یان بە واتساپ',
      order_success:'داواکارییەکەت نێردرا! تیمەکەمان زوو پەیوەندیت پێوەدەکات.',
      order_error:'هەڵەیەک ڕوویدا، دووبارە هەوڵبدەرەوە.',
      login_title:'چوونەژوورەوە', register_title:'حیسابی نوێ دروستبکە',
      email:'ئیمەیڵ', password:'وشەی نهێنی', confirm_pass:'دووپاتکردنەوەی وشەی نهێنی',
      full_name:'ناوی تەواو', login_btn:'چوونەژوورەوە', register_btn:'دروستکردنی حیساب',
      no_account:'حیسابت نییە؟', have_account:'حیسابت هەیە؟', sign_up:'تۆمار بکە', sign_in:'بچۆ ژوورەوە',
      forgot_pass:'وشەی نهێنیت بیرچووە؟',
      dashboard_title:'داشبۆرد', my_orders:'داواکارییەکانم', my_profile:'پرۆفایلەکەم',
      order_id:'ژمارەی داواکاری', order_date:'بەروار', order_status:'دۆخ', order_total:'کۆی گشتی',
      status_pending:'چاوەڕوان', status_printing:'چاپکردن',
      status_finishing:'کۆتایی هاتن', status_ready:'ئامادەیە', status_delivered:'گەیشتووە',
      track_title:'داواکارییەکەت شوێن بکەوە', track_ph:'ژمارەی داواکاری داخڵ بکە', track_btn:'شوێنکەوتن',
      contact_title:'پەیوەندیمان پێوەبکە', whatsapp:'واتساپ', call:'پەیوەندی',
      location:'شوێن', location_val:'بەغدا، عێراق',
      hours:'کاتەکانی کار', hours_val:'شەممە – پێنجشەممە: ٩ بەیانی – ٦ ئێوارە',
      send_msg:'نامە بنێرە', message:'نامە', send:'ناردن',
      about_title:'دەربارەمان',
      footer_links:'لینکە خێراکان', footer_cats:'پۆلەکان', footer_contact:'پەیوەندی',
      footer_rights:'هەموو مافەکان پارێزراون', footer_made:'لە بەغدادا دروستکراوە 🇮🇶',
      currency:'د.ع', loading:'باردەکرێت...', error:'هەڵەیەک ڕوویدا', close:'داخستن',
      required:'پێویستە', save:'پاشەکەوتکردن', edit:'دەستکاری', delete:'سڕینەوە',
      new_badge:'نوێ', hot_badge:'زیاتر فرۆشراو', sale_badge:'داشکاندن',
    }
  };
  let cur = localStorage.getItem('itb3_lang') || 'ar';
  const t = k => d[cur][k] || d.en[k] || k;
  const setLang = l => {
    if (!d[l]) return;
    cur = l; localStorage.setItem('itb3_lang', l);
    document.documentElement.lang = l;
    document.documentElement.dir = d[l].dir;
    document.body.className = document.body.className.replace(/font-(arabic|english)/g,'').trim();
    document.body.classList.add(d[l].font);
    render();
  };
  const getLang = () => cur;
  const getDir = () => d[cur].dir;
  const render = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === cur));
  };
  const fmt = n => `${Number(n).toLocaleString('ar-IQ')} ${t('currency')}`;
  const init = () => {
    document.documentElement.lang = cur;
    document.documentElement.dir = d[cur].dir;
    document.body.classList.add(d[cur].font);
    render();
  };
  return { t, setLang, getLang, getDir, render, fmt, init };
})();
document.addEventListener('DOMContentLoaded', () => i18n.init());
