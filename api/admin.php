<?php
// Admin login / first-time setup / password change. Password is stored only as a hash in data/admin.json.
header('Content-Type: application/json');
header('Cache-Control: no-store');
require __DIR__ . '/_auth.php';
admin_session();
$out = fn(array $d, int $code = 200) => (http_response_code($code) || true) && exit(json_encode($d));

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $out(['setup' => admin_is_setup(), 'authed' => !empty($_SESSION['admin'])]);
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') $out(['success' => false], 405);

$action = $_POST['action'] ?? '';
$pass = (string)($_POST['password'] ?? '');
$cfg = admin_load();

if ($action === 'logout') { $_SESSION = []; session_destroy(); $out(['success' => true]); }

if ($action === 'setup') {
  if (!empty($cfg['hash'])) $out(['success' => false, 'error' => 'already_setup'], 403);
  if (strlen($pass) < 10) $out(['success' => false, 'error' => 'too_short'], 400);
  if (!admin_save(['hash' => password_hash($pass, PASSWORD_DEFAULT), 'fails' => 0, 'lock_until' => 0])) $out(['success' => false, 'error' => 'write_failed'], 500);
  session_regenerate_id(true); $_SESSION['admin'] = true;
  $out(['success' => true]);
}

if ($action === 'login') {
  if (empty($cfg['hash'])) $out(['success' => false, 'error' => 'not_setup'], 403);
  if (($cfg['lock_until'] ?? 0) > time()) $out(['success' => false, 'error' => 'locked', 'retry_in' => $cfg['lock_until'] - time()], 429);
  if (password_verify($pass, $cfg['hash'])) {
    $cfg['fails'] = 0; $cfg['lock_until'] = 0; admin_save($cfg);
    session_regenerate_id(true); $_SESSION['admin'] = true;
    $out(['success' => true]);
  }
  $cfg['fails'] = ($cfg['fails'] ?? 0) + 1;
  if ($cfg['fails'] >= MAX_FAILS) { $cfg['fails'] = 0; $cfg['lock_until'] = time() + LOCK_SECONDS; }
  admin_save($cfg); usleep(500000);
  $out(['success' => false, 'error' => 'invalid'], 401);
}

if ($action === 'change_password') {
  require_admin();
  if (strlen($pass) < 10) $out(['success' => false, 'error' => 'too_short'], 400);
  $cfg['hash'] = password_hash($pass, PASSWORD_DEFAULT);
  $out(['success' => admin_save($cfg)]);
}
$out(['success' => false, 'error' => 'unknown_action'], 400);
