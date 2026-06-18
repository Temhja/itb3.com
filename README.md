# ITB3 v2 — E-Commerce Printing Website

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
- Default password: `itb3admin2025`
- **Change it immediately from Settings tab**

---

## Add product images
Put images in: `assets/images/products/`
Filename must match product `image` field in `data/products.json`
Example: `standard-business-card.jpg`

---

## Logo colors
Update CSS variables in `assets/css/style.css` `:root`:
```css
--primary: #D62828;      /* Main red */
--secondary: #003049;    /* Navy blue */
--accent: #F77F00;       /* Orange */
```

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
