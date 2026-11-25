<?php
// Shared admin authentication. Included by the API scripts; not an endpoint.
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === basename(__FILE__)) { http_response_code(404); exit; }

const ADMIN_FILE = __DIR__ . '/../data/admin.json';
const MAX_FAILS = 5;
const LOCK_SECONDS = 900;

function admin_session(): void {
  if (session_status() === PHP_SESSION_ACTIVE) return;
  $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
  session_name('itb3_admin');
  session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Strict']);
  session_start();
}
function admin_load(): array {
  if (!file_exists(ADMIN_FILE)) return [];
  return json_decode((string)file_get_contents(ADMIN_FILE), true) ?: [];
}
function admin_save(array $d): bool {
  return file_put_contents(ADMIN_FILE, json_encode($d, JSON_PRETTY_PRINT), LOCK_EX) !== false;
}
function admin_is_setup(): bool { return !empty(admin_load()['hash']); }
function is_admin(): bool { admin_session(); return !empty($_SESSION['admin']); }
function require_admin(): void {
  if (!is_admin()) { http_response_code(401); echo json_encode(['success' => false, 'error' => 'unauthorized']); exit; }
}
