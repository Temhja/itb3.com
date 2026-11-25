# اطبع.com · ITB3 — E-Commerce Printing Website

## SETUP (3 steps)

### 1. Update contact info
Open `assets/js/app.js` — edit CONFIG:
```js
const CONFIG = {
  whatsapp: '964780XXXXXXX',   // WhatsApp without +
  phone: '+964 780 XXX XXXX',
  email: 'info@itb3.com',
};
```

### 2. Update admin email in PHP
In `api/order.php` and `api/contact.php`:
```php
@mail('YOUR_EMAIL@...
```

### 3. Admin panel
- URL: `yourdomain.com/admin/`
- **First visit:** the panel asks you to choose a password (10+ characters). It is stored only as a hash in `data/admin.json` on the server, never in the repo or the browser.
- Change it later from the Settings tab.
- **Forgot it?** Delete `data/admin.json` in the Hostinger File Manager and open `/admin/` again.
- Orders list, status updates, price saving, messages and design-file downloads all require this login.

---

## Add product images
Put images in: `assets/images/products/`
Filename must match product `image` field in `data/products.json`
Example: `standard-business-card.jpg`

---

## Brand
Colours and type follow the اطبع.com / ITB3 identity. Tokens live in `assets/css/style.css` `:root`:
```css
--primary: #BB1E50;    /* magenta: CTAs */
--accent: #1BB3B7;     /* teal: never with white text */
--teal-text: #0B7A7E;  /* teal as text on white */
--secondary: #1F1F20;  /* charcoal */
```
Fonts: Noto Kufi Arabic (headings), Vazirmatn (text). Header and footer are rendered once from `assets/js/app.js` (`renderChrome`), so edit them there, not per page.

---

## Features
- Trilingual: Arabic (RTL default), English, Kurdish
- Dynamic price calculator (size × qty × paper × coating × sides)
- Sign in / Sign up (localStorage)
- Full cart with WhatsApp ordering
- Order tracking
- Admin panel: orders management + price editing
- PHP backend: orders, contact form, file upload
- Fully responsive mobile

---
Made in Baghdad 🇮🇶
