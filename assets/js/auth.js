const Auth = (() => {
  const USERS_KEY = 'itb3_users';
  const SESSION_KEY = 'itb3_session';

  const getUsers = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; } };
  const saveUsers = u => localStorage.setItem(USERS_KEY, JSON.stringify(u));
  const getSession = () => { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch { return null; } };
  const setSession = u => sessionStorage.setItem(SESSION_KEY, JSON.stringify(u));
  const clearSession = () => sessionStorage.removeItem(SESSION_KEY);

  const register = (name, email, phone, password) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) return { ok: false, error: 'email_exists' };
    const user = { id: 'U' + Date.now(), name, email, phone, password: btoa(password), created: new Date().toISOString() };
    users.push(user);
    saveUsers(users);
    const { password: _, ...safe } = user;
    setSession(safe);
    return { ok: true, user: safe };
  };

  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === btoa(password));
    if (!user) return { ok: false, error: 'invalid_credentials' };
    const { password: _, ...safe } = user;
    setSession(safe);
    return { ok: true, user: safe };
  };

  const logout = () => { clearSession(); window.location.href = getRootPath() + 'index.html'; };

  const current = () => getSession();
  const isLoggedIn = () => !!getSession();

  const getRootPath = () => {
    const p = window.location.pathname;
    if (p.includes('/account/') || p.includes('/admin/') || p.includes('/products/')) return '../';
    return '';
  };

  const requireAuth = () => {
    if (!isLoggedIn()) {
      window.location.href = getRootPath() + 'account/login.html?redirect=' + encodeURIComponent(window.location.href);
    }
  };

  const updateNavAuth = () => {
    const user = current();
    const loginEl = document.getElementById('nav-login');
    const dashEl = document.getElementById('nav-dashboard');
    const logoutEl = document.getElementById('nav-logout');
    const userNameEl = document.getElementById('nav-username');
    if (user) {
      if (loginEl) loginEl.style.display = 'none';
      if (dashEl) dashEl.style.display = 'flex';
      if (logoutEl) logoutEl.style.display = 'flex';
      if (userNameEl) userNameEl.textContent = user.name.split(' ')[0];
    } else {
      if (loginEl) loginEl.style.display = 'flex';
      if (dashEl) dashEl.style.display = 'none';
      if (logoutEl) logoutEl.style.display = 'none';
    }
  };

  const getOrders = () => {
    const user = current();
    if (!user) return [];
    try {
      const all = JSON.parse(localStorage.getItem('itb3_user_orders_' + user.id)) || [];
      return all;
    } catch { return []; }
  };

  const saveOrder = order => {
    const user = current();
    if (!user) return;
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('itb3_user_orders_' + user.id, JSON.stringify(orders));
  };

  return { register, login, logout, current, isLoggedIn, requireAuth, updateNavAuth, getRootPath, getOrders, saveOrder };
})();

document.addEventListener('DOMContentLoaded', () => Auth.updateNavAuth());
