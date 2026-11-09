<?php
declare(strict_types=1);

// Built-in PHP CLI server router for static files
if (php_sapi_name() === 'cli-server') {
    $requestedPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    $staticFile = __DIR__ . $requestedPath;
    if ($requestedPath !== '/' && is_file($staticFile)) {
        return false;
    }
}

require_once __DIR__ . '/../vendor/autoload.php';

use Avatar\Controllers\AuthController;

$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// -------------------------------------------------------------
// 1. API Endpoints Router (/api/...)
// -------------------------------------------------------------
if (str_starts_with($requestUri, '/api/')) {
    header('Content-Type: application/json; charset=utf-8');

    // Enable CORS for local testing
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    if ($method === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    if ($requestUri === '/api/health') {
        echo json_encode([
            'status' => 'OK',
            'game' => 'Avatar Teamobi WebGL',
            'version' => '2.5.8',
            'php' => PHP_VERSION,
            'timestamp' => time(),
        ]);
        exit;
    }

    $auth = new AuthController();

    if ($requestUri === '/api/auth/login' && $method === 'POST') {
        $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $username = (string)($body['username'] ?? '');
        $password = (string)($body['password'] ?? '');
        $res = $auth->login($username, $password);
        if (!$res['success']) {
            http_response_code(400);
        }
        echo json_encode($res);
        exit;
    }

    if ($requestUri === '/api/auth/register' && $method === 'POST') {
        $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $username = (string)($body['username'] ?? '');
        $password = (string)($body['password'] ?? '');
        $phone = (string)($body['phone'] ?? '');
        $inviteCode = (string)($body['invite_code'] ?? '');
        $res = $auth->register($username, $password, $phone, $inviteCode);
        if (!$res['success']) {
            http_response_code(400);
        }
        echo json_encode($res);
        exit;
    }

    if ($requestUri === '/api/auth/me' && $method === 'GET') {
        echo json_encode($auth->me());
        exit;
    }

    if ($requestUri === '/api/auth/logout' && $method === 'POST') {
        echo json_encode($auth->logout());
        exit;
    }

    if ($requestUri === '/api/giftcode/redeem' && $method === 'POST') {
        $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $code = (string)($body['code'] ?? '');
        $res = $auth->redeemGiftCode($code);
        if (!$res['success']) {
            http_response_code(400);
        }
        echo json_encode($res);
        exit;
    }

    http_response_code(404);
    echo json_encode(['error' => 'API endpoint not found']);
    exit;
}

// -------------------------------------------------------------
// 2. Client Views Router
// -------------------------------------------------------------
$view = $_GET['view'] ?? '';
if ($requestUri === '/client/sign-in') {
    $view = 'login';
} elseif ($requestUri === '/client/sign-up') {
    $view = 'register';
} elseif ($requestUri === '/client/play' || $requestUri === '/game') {
    $view = 'game';
}
if (!$view) {
    $view = 'home';
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Avatar Teamobi 2.5.8 - Cổng Game Trực Tuyến WebGL</title>
  <link rel="icon" type="image/png" href="/assets/portal/app_icon.png">
  <style>
    :root {
      --primary-blue: #0288d1;
      --primary-blue-hover: #0277bd;
      --primary-red: #f4511e;
      --primary-red-hover: #e64a19;
      --bg-color: #f1f5f9;
      --card-bg: #ffffff;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --border-color: #e2e8f0;
      --accent-gold: #f59e0b;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 14px rgba(0,0,0,0.08);
      --shadow-lg: 0 10px 25px rgba(0,0,0,0.12);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    /* -------------------------------------------------------------
       Top Navigation Bar
    ------------------------------------------------------------- */
    .top-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #ffffff;
      border-bottom: 1px solid var(--border-color);
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-shadow: var(--shadow-sm);
    }

    .nav-left {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }

    .btn-hamburger {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #334155;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
    }

    .btn-hamburger:hover {
      background-color: #f1f5f9;
    }

    .nav-title {
      font-size: 16px;
      font-weight: 700;
      color: #1e293b;
      letter-spacing: -0.2px;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-nav {
      border: none;
      padding: 7px 16px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .btn-nav-login {
      background-color: var(--primary-blue);
      color: #ffffff;
    }
    .btn-nav-login:hover {
      background-color: var(--primary-blue-hover);
      box-shadow: 0 2px 8px rgba(2, 136, 209, 0.35);
    }

    .btn-nav-register {
      background-color: var(--primary-red);
      color: #ffffff;
    }
    .btn-nav-register:hover {
      background-color: var(--primary-red-hover);
      box-shadow: 0 2px 8px rgba(244, 81, 30, 0.35);
    }

    .btn-nav-chat {
      background: none;
      border: 1px solid var(--border-color);
      color: #475569;
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.15s;
    }
    .btn-nav-chat:hover {
      background-color: #f8fafc;
      color: var(--primary-blue);
    }

    .user-pill {
      display: none;
      align-items: center;
      gap: 8px;
      background: #f8fafc;
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 4px 12px 4px 6px;
      font-size: 13px;
      font-weight: 600;
    }

    .user-avatar-badge {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    /* -------------------------------------------------------------
       Main Container
    ------------------------------------------------------------- */
    .portal-main {
      flex: 1;
      max-width: 980px;
      width: 100%;
      margin: 0 auto;
      padding: 20px 16px 100px;
    }

    /* -------------------------------------------------------------
       Hero Banner Card
    ------------------------------------------------------------- */
    .hero-banner-card {
      position: relative;
      width: 100%;
      height: 290px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      background-color: #0b1329;
      background-image: url('/assets/portal/hero_banner.png');
      background-size: cover;
      background-position: center;
      transition: box-shadow 0.2s ease;
    }

    .hero-banner-card:hover {
      box-shadow: var(--shadow-lg);
    }

    /* -------------------------------------------------------------
       Floating "CHƠI NGAY" Button (Bottom-Right FAB)
    ------------------------------------------------------------- */
    .floating-play-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 990;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #ff1744 0%, #ff5252 45%, #ff9100 100%);
      color: #ffffff;
      padding: 13px 26px;
      border-radius: 50px;
      font-size: 15px;
      font-weight: 900;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      border: 2px solid #ffffff;
      box-shadow: 0 8px 30px rgba(255, 23, 68, 0.55), 0 2px 10px rgba(0, 0, 0, 0.25);
      cursor: pointer;
      user-select: none;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
      animation: fab-bounce 2.6s ease-in-out infinite, fab-glow 2s ease-in-out infinite alternate;
    }

    .floating-play-btn::before {
      content: '';
      position: absolute;
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
      border-radius: 55px;
      border: 2px solid rgba(255, 68, 68, 0.75);
      animation: fab-pulse-ring 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
      z-index: -1;
      pointer-events: none;
    }

    .floating-play-btn:hover {
      transform: scale(1.08) translateY(-4px);
      box-shadow: 0 12px 35px rgba(255, 23, 68, 0.75), 0 4px 14px rgba(0, 0, 0, 0.35);
      background: linear-gradient(135deg, #d50000 0%, #ff1744 45%, #ffab00 100%);
    }

    .floating-play-btn:active {
      transform: scale(0.96) translateY(0);
    }

    .floating-play-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      padding: 4px;
      animation: fab-icon-wiggle 3s ease-in-out infinite;
    }

    .floating-play-icon svg {
      width: 14px;
      height: 14px;
      fill: #ffffff;
      margin-left: 2px;
    }

    @keyframes fab-pulse-ring {
      0% {
        transform: scale(0.95);
        opacity: 0.9;
      }
      60%, 100% {
        transform: scale(1.22);
        opacity: 0;
      }
    }

    @keyframes fab-bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
    }

    @keyframes fab-glow {
      0% {
        filter: drop-shadow(0 0 6px rgba(255, 23, 68, 0.6));
      }
      100% {
        filter: drop-shadow(0 0 18px rgba(255, 145, 0, 0.9));
      }
    }

    @keyframes fab-icon-wiggle {
      0%, 100% {
        transform: rotate(0deg) scale(1);
      }
      25% {
        transform: rotate(-10deg) scale(1.1);
      }
      75% {
        transform: rotate(10deg) scale(1.1);
      }
    }

    /* Bottom Info Overlay */
    .hero-bottom-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 30px 20px 14px;
      background: linear-gradient(to top, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0.75) 60%, transparent 100%);
      text-align: center;
      z-index: 2;
    }

    .hero-title-announcement {
      font-size: 19px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      background: linear-gradient(135deg, #fef08a, #f59e0b, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 2px 10px rgba(245, 158, 11, 0.4);
      margin-bottom: 4px;
    }

    .hero-giftcode-line {
      font-size: 15px;
      font-weight: 700;
      color: #fef08a;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }

    .hero-giftcode-badge {
      background: rgba(245, 158, 11, 0.25);
      border: 1px dashed #f59e0b;
      padding: 2px 8px;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
    }
    .hero-giftcode-badge:hover {
      background: rgba(245, 158, 11, 0.45);
    }

    .hero-sub-reward {
      font-size: 13px;
      font-weight: 600;
      color: #38bdf8;
      letter-spacing: 0.3px;
    }

    /* -------------------------------------------------------------
       Quick Navigation Bar (8 Icon Tiles)
    ------------------------------------------------------------- */
    .quick-nav-card {
      background: var(--card-bg);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      margin-top: 16px;
      padding: 14px 10px;
    }

    .quick-nav-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 8px;
      text-align: center;
    }

    .quick-nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 6px 2px;
      border-radius: var(--radius-sm);
      transition: background 0.15s, transform 0.15s;
    }

    .quick-nav-item:hover {
      background-color: #f8fafc;
      transform: translateY(-2px);
    }

    .quick-icon-box {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 6px;
      box-shadow: 0 3px 8px rgba(0,0,0,0.1);
      transition: transform 0.15s;
    }

    .quick-nav-item:hover .quick-icon-box {
      transform: scale(1.05);
    }

    .quick-icon-box svg {
      width: 22px;
      height: 22px;
      fill: #ffffff;
    }

    .quick-label {
      font-size: 12px;
      font-weight: 500;
      color: #475569;
      white-space: nowrap;
    }

    /* Tile colors matching reference */
    .tile-blue-home { background: linear-gradient(135deg, #42a5f5, #1e88e5); }
    .tile-indigo-pay { background: linear-gradient(135deg, #5c6bc0, #3949ab); }
    .tile-cyan-shop  { background: linear-gradient(135deg, #26c6da, #00acc1); }
    .tile-green-event{ background: linear-gradient(135deg, #66bb6a, #43a047); }
    .tile-teal-quest { background: linear-gradient(135deg, #26a69a, #00897b); }
    .tile-orange-spin{ background: linear-gradient(135deg, #ffa726, #fb8c00); }
    .tile-mint-rank  { background: linear-gradient(135deg, #4db6ac, #00897b); }
    .tile-pink-gift  { background: linear-gradient(135deg, #ec407a, #d81b60); }

    /* -------------------------------------------------------------
       View Containers (Trang Chủ, Đăng Nhập, Đăng Ký)
    ------------------------------------------------------------- */
    .view-section {
      display: none;
    }
    .view-section.active {
      display: block;
    }

    /* -------------------------------------------------------------
       Trang Chủ - News Section
    ------------------------------------------------------------- */
    .news-filter-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 20px 0 16px;
    }

    .filter-pill {
      background: #ffffff;
      border: 1px solid var(--border-color);
      color: #64748b;
      padding: 6px 18px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }

    .filter-pill:hover {
      border-color: #cbd5e1;
      color: #1e293b;
    }

    .filter-pill.active {
      background-color: var(--primary-blue);
      border-color: var(--primary-blue);
      color: #ffffff;
    }

    .news-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .news-card {
      background: var(--card-bg);
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }

    .news-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
      border-color: #cbd5e1;
    }

    .news-thumbnail-container {
      position: relative;
      width: 100%;
      height: 160px;
      overflow: hidden;
      background-color: #0f172a;
    }

    .news-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .news-card:hover .news-thumbnail {
      transform: scale(1.04);
    }

    .news-time-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(4px);
      padding: 3px 10px;
      border-radius: 14px;
      font-size: 11px;
      font-weight: 600;
      color: #334155;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }

    .news-body {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .news-title {
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
      line-height: 1.4;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .news-desc {
      font-size: 12px;
      color: #64748b;
      line-height: 1.5;
    }

    /* -------------------------------------------------------------
       Form Cards (Đăng Nhập & Đăng Ký)
    ------------------------------------------------------------- */
    .auth-card {
      background: var(--card-bg);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      margin-top: 18px;
      overflow: hidden;
    }

    .auth-card-header {
      padding: 14px 20px;
      border-bottom: 1px solid var(--border-color);
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
      background-color: #f8fafc;
    }

    .auth-card-body {
      padding: 24px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .auth-input-group {
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1px solid #cbd5e1;
      border-radius: var(--radius-sm);
      padding: 6px 12px;
      background: #ffffff;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    .auth-input-group:focus-within {
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(2, 136, 209, 0.15);
    }

    .auth-input-icon {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .auth-input-icon svg {
      width: 20px;
      height: 20px;
      fill: #ffffff;
    }

    .icon-bg-user   { background-color: #4caf50; }
    .icon-bg-lock   { background-color: #ef4444; }
    .icon-bg-phone  { background-color: #0288d1; }
    .icon-bg-invite { background-color: #f59e0b; }

    .auth-input-field {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      color: #1e293b;
      background: transparent;
    }

    .auth-input-field::placeholder {
      color: #94a3b8;
    }

    .auth-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
      padding-top: 14px;
    }

    .auth-link {
      font-size: 13px;
      color: #475569;
      cursor: pointer;
      font-weight: 500;
      transition: color 0.15s;
    }
    .auth-link:hover {
      color: var(--primary-blue);
      text-decoration: underline;
    }

    .btn-auth-submit {
      background-color: var(--primary-blue);
      color: #ffffff;
      border: none;
      padding: 9px 28px;
      border-radius: var(--radius-sm);
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s, box-shadow 0.15s;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .btn-auth-submit:hover {
      background-color: var(--primary-blue-hover);
      box-shadow: 0 3px 10px rgba(2, 136, 209, 0.35);
    }

    .auth-message-box {
      display: none;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 12px;
    }
    .auth-message-error {
      display: block;
      background-color: #fee2e2;
      border: 1px solid #fca5a5;
      color: #b91c1c;
    }
    .auth-message-success {
      display: block;
      background-color: #dcfce7;
      border: 1px solid #86efac;
      color: #15803d;
    }

    .quick-fill-accounts {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
    }
    .btn-quick-acc {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 3px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11px;
      font-weight: 600;
    }
    .btn-quick-acc:hover {
      background: #e2e8f0;
      color: var(--primary-blue);
    }

    /* -------------------------------------------------------------
       Game Modal / Fullscreen WebGL Window
    ------------------------------------------------------------- */
    html.game-active, body.game-active {
      overflow: hidden !important;
      height: 100% !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    #game-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000000;
      z-index: 9999;
      flex-direction: column;
      overflow: hidden;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .game-top-bar {
      display: none !important;
    }

    .game-bar-left {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
    }

    .game-bar-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-game-tool {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
    }
    .btn-game-tool:hover {
      background: rgba(255,255,255,0.2);
    }

    .btn-game-close {
      background: #dc2626;
      border: none;
      color: #ffffff;
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
    }
    .btn-game-close:hover {
      background: #b91c1c;
    }

    @media (max-width: 640px) {
      .game-top-bar {
        padding: 0 8px;
        font-size: 11px;
      }
      .game-bar-left span {
        display: none;
      }
      #gamePlayerInfo {
        display: none;
      }
      .btn-game-tool {
        padding: 3px 6px;
        font-size: 11px;
      }
      .btn-game-close {
        padding: 3px 8px;
        font-size: 11px;
      }
    }

    .game-canvas-wrapper {
      flex: 1;
      width: 100%;
      min-height: 0;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
    }

    #gameCanvas {
      width: 100%;
      height: 100%;
      display: block;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      cursor: crosshair;
    }

    #in-game-chat-bar {
      display: none !important;
    }

    .chat-label-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 700;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.15);
      padding: 3px 8px;
      border-radius: 4px;
      white-space: nowrap;
    }

    #in-game-chat-input {
      flex: 1;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      padding: 4px 12px;
      outline: none;
      color: #ffffff;
      font-size: 13px;
    }
    #in-game-chat-input:focus {
      border-color: #38bdf8;
      background: rgba(255, 255, 255, 0.12);
    }

    .btn-send-chat {
      background: var(--primary-blue);
      color: #ffffff;
      border: none;
      padding: 5px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
    }
    .btn-send-chat:hover {
      background: var(--primary-blue-hover);
    }

    /* -------------------------------------------------------------
       Modal Generic (Topup, Quests, GiftCode, Support)
    ------------------------------------------------------------- */
    .generic-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 1000;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .generic-modal-box {
      background: #ffffff;
      border-radius: var(--radius-md);
      max-width: 480px;
      width: 100%;
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      animation: modal-pop 0.2s ease-out;
    }

    @keyframes modal-pop {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .generic-modal-header {
      padding: 14px 18px;
      background: #f8fafc;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 700;
      font-size: 15px;
    }

    .btn-close-modal {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #64748b;
    }

    .generic-modal-body {
      padding: 18px;
      font-size: 13px;
      color: #334155;
      line-height: 1.6;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-banner-card {
        height: 220px;
      }
      .quick-nav-grid {
        grid-template-columns: repeat(4, 1fr);
      }
      .news-grid {
        grid-template-columns: 1fr;
      }
      .nav-title {
        display: none;
      }
      .floating-play-btn {
        bottom: 18px;
        right: 18px;
        padding: 10px 20px;
        font-size: 13px;
      }
    }
  </style>
</head>
<body>

  <!-- =============================================================
       1. Top Navigation Bar
  ============================================================= -->
  <header class="top-nav">
    <div class="nav-left" onclick="switchView('home')">
      <button class="btn-hamburger" title="Menu">☰</button>
      <span class="nav-title" id="pageHeaderTitle"><?= $view === 'login' ? 'Đăng Nhập' : ($view === 'register' ? 'Đăng Ký' : 'Trang Chủ') ?></span>
    </div>

    <div class="nav-right">
      <!-- Guest Navigation -->
      <div id="guestNavGroup" style="display: flex; gap: 8px;">
        <button class="btn-nav btn-nav-login" onclick="switchView('login')">Đăng Nhập</button>
        <button class="btn-nav btn-nav-register" onclick="switchView('register')">Đăng Ký</button>
      </div>

      <!-- Logged-in User Information -->
      <div id="userNavGroup" style="display: none; align-items: center; gap: 8px;">
        <div class="user-pill" style="display: flex;">
          <div class="user-avatar-badge">👤</div>
          <span id="navUsername">Player</span>
          <span style="color: #f59e0b; margin-left: 4px;" id="navUserXu">0 Xu</span>
        </div>
        <button class="btn-nav btn-nav-login" onclick="launchGame()">Vào Game</button>
        <button class="btn-nav" style="background: #e2e8f0; color: #334155;" onclick="onLogout()">Thoát</button>
      </div>

      <!-- Chat Icon -->
      <button class="btn-nav-chat" onclick="openChatSupportModal()" title="Hỗ trợ & Cộng đồng">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      </button>
    </div>
  </header>

  <!-- =============================================================
       2. Main Content
  ============================================================= -->
  <main class="portal-main">

    <!-- Hero Banner Card (Shared across views) -->
    <div class="hero-banner-card">
      <div class="hero-bottom-overlay">
        <div class="hero-title-announcement">CHÍNH THỨC RA MẮT</div>
        <div class="hero-giftcode-line">
          GIFT CODE: <span class="hero-giftcode-badge" onclick="event.stopPropagation(); copyGiftCode('AVATAR258')">**AVATAR258**</span>
        </div>
        <div class="hero-sub-reward">10 000 000 XU NẠP + 20 000 000 LƯỢNG MIỄN PHÍ</div>
      </div>
    </div>

    <!-- Quick Navigation Bar (8 Icon Tiles) -->
    <div class="quick-nav-card">
      <div class="quick-nav-grid">
        <!-- 1. Trang chủ -->
        <div class="quick-nav-item" onclick="switchView('home')">
          <div class="quick-icon-box tile-blue-home">
            <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </div>
          <span class="quick-label">Trang chủ</span>
        </div>

        <!-- 2. Nạp Xu -->
        <div class="quick-nav-item" onclick="openModal('topupModal')">
          <div class="quick-icon-box tile-indigo-pay">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
          </div>
          <span class="quick-label">Nạp Xu</span>
        </div>

        <!-- 3. Cửa Hàng -->
        <div class="quick-nav-item" onclick="openModal('shopModal')">
          <div class="quick-icon-box tile-cyan-shop">
            <svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h16v6z"/></svg>
          </div>
          <span class="quick-label">Cửa Hàng</span>
        </div>

        <!-- 4. Sự Kiện -->
        <div class="quick-nav-item" onclick="onFilterNews('event')">
          <div class="quick-icon-box tile-green-event">
            <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
          </div>
          <span class="quick-label">Sự Kiện</span>
        </div>

        <!-- 5. Nhiệm Vụ -->
        <div class="quick-nav-item" onclick="openModal('questModal')">
          <div class="quick-icon-box tile-teal-quest">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </div>
          <span class="quick-label">Nhiệm Vụ</span>
        </div>

        <!-- 6. Vòng Quay -->
        <div class="quick-nav-item" onclick="openModal('wheelModal')">
          <div class="quick-icon-box tile-orange-spin">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </div>
          <span class="quick-label">Vòng Quay</span>
        </div>

        <!-- 7. Xếp Hạng -->
        <div class="quick-nav-item" onclick="openModal('rankModal')">
          <div class="quick-icon-box tile-mint-rank">
            <svg viewBox="0 0 24 24"><path d="M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v14h-4V5zm-6 6h4v8H4v-8zm16 8h-4v-6h4v6z"/></svg>
          </div>
          <span class="quick-label">Xếp Hạng</span>
        </div>

        <!-- 8. GiftCode -->
        <div class="quick-nav-item" onclick="openModal('giftcodeModal')">
          <div class="quick-icon-box tile-pink-gift">
            <svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h16v6z"/></svg>
          </div>
          <span class="quick-label">GiftCode</span>
        </div>
      </div>
    </div>

    <!-- ===========================================================
         VIEW 1: TRANG CHỦ
    =========================================================== -->
    <section id="viewHome" class="view-section <?= $view === 'home' ? 'active' : '' ?>">
      <div class="news-filter-bar">
        <button class="filter-pill active" onclick="onFilterNews('all')">Tất cả</button>
        <button class="filter-pill" onclick="onFilterNews('new')">Mới</button>
        <button class="filter-pill" onclick="onFilterNews('hot')">Hot</button>
        <button class="filter-pill" onclick="onFilterNews('update')">Update</button>
      </div>

      <div class="news-grid">
        <!-- Card 1 -->
        <div class="news-card" onclick="openModal('giftcodeModal')">
          <div class="news-thumbnail-container">
            <img src="/assets/portal/news_event.png" alt="Đặc quyền tân thủ" class="news-thumbnail">
            <div class="news-time-badge">một tháng trước</div>
          </div>
          <div class="news-body">
            <div class="news-title">⚙ ĐẶC QUYỀN TÂN THỦ & VIP - NHẬN QUÀ FREE</div>
            <div class="news-desc">🎁 Nhập code liền tay nhận 10.000.000 Xu & 20.000.000 Lượng</div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="news-card" onclick="launchGame()">
          <div class="news-thumbnail-container">
            <img src="/assets/portal/news_race.png" alt="Khai mở server mới" class="news-thumbnail">
            <div class="news-time-badge">một tháng trước</div>
          </div>
          <div class="news-body">
            <div class="news-title">⚡ KHAI MỞ SERVER MỚI - ĐUA TOP CAO THỦ</div>
            <div class="news-desc">✨ Thử thách bản lĩnh, chinh phục các mốc phần thưởng giá trị</div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="news-card" onclick="openModal('maintenanceModal')">
          <div class="news-thumbnail-container">
            <img src="/assets/portal/news_casino.png" alt="Lịch bảo trì" class="news-thumbnail">
            <div class="news-time-badge">2 tháng trước</div>
          </div>
          <div class="news-body">
            <div class="news-title">⚙ LỊCH BẢO TRÌ HẰNG NGÀY ⚙</div>
            <div class="news-desc">⏰ Lịch bảo trì định kỳ lúc 05:00 sáng mỗi ngày</div>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="news-card" onclick="openModal('wheelModal')">
          <div class="news-thumbnail-container">
            <img src="/assets/portal/news_wheel.png" alt="Vòng quay may mắn" class="news-thumbnail">
            <div class="news-time-badge">2 tháng trước</div>
          </div>
          <div class="news-body">
            <div class="news-title">★ THỐNG TRỊ HAY LÀM NỀN - VÒNG QUAY MAY MẮN ★</div>
            <div class="news-desc">🏆 Luật lệ là xiềng xích của kẻ yếu, là công cụ của kẻ mạnh</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===========================================================
         VIEW 2: ĐĂNG NHẬP
    =========================================================== -->
    <section id="viewLogin" class="view-section <?= $view === 'login' ? 'active' : '' ?>">
      <div class="auth-card">
        <div class="auth-card-header">Đăng Nhập</div>
        <div class="auth-card-body">
          <div id="loginMsgBox" class="auth-message-box"></div>

          <!-- Tài khoản -->
          <div class="auth-input-group">
            <div class="auth-input-icon icon-bg-user">
              <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <input type="text" id="loginUsername" class="auth-input-field" placeholder="Tài khoản" autocomplete="username">
          </div>

          <!-- Mật khẩu -->
          <div class="auth-input-group">
            <div class="auth-input-icon icon-bg-lock">
              <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
            </div>
            <input type="password" id="loginPassword" class="auth-input-field" placeholder="Mật khẩu" autocomplete="current-password" onkeydown="if(event.key==='Enter') doLogin()">
          </div>

          <!-- Quick Fill buttons -->
          <div class="quick-fill-accounts">
            <span>Tài khoản có sẵn:</span>
            <button type="button" class="btn-quick-acc" onclick="fillLogin('admin','123456')">admin</button>
            <button type="button" class="btn-quick-acc" onclick="fillLogin('ad','123456')">ad</button>
          </div>

          <!-- Footer -->
          <div class="auth-card-footer">
            <a class="auth-link" onclick="openModal('forgotModal')">Quên mật khẩu?</a>
            <button class="btn-auth-submit" id="btnSubmitLogin" onclick="doLogin()">ĐĂNG NHẬP</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ===========================================================
         VIEW 3: ĐĂNG KÝ
    =========================================================== -->
    <section id="viewRegister" class="view-section <?= $view === 'register' ? 'active' : '' ?>">
      <div class="auth-card">
        <div class="auth-card-header">Đăng Ký</div>
        <div class="auth-card-body">
          <div id="registerMsgBox" class="auth-message-box"></div>

          <!-- Tài khoản -->
          <div class="auth-input-group">
            <div class="auth-input-icon icon-bg-user">
              <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <input type="text" id="regUsername" class="auth-input-field" placeholder="Tài khoản" autocomplete="username">
          </div>

          <!-- Mật khẩu -->
          <div class="auth-input-group">
            <div class="auth-input-icon icon-bg-lock">
              <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
            </div>
            <input type="password" id="regPassword" class="auth-input-field" placeholder="Mật khẩu" autocomplete="new-password">
          </div>

          <!-- Số điện thoại -->
          <div class="auth-input-group">
            <div class="auth-input-icon icon-bg-phone">
              <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            </div>
            <input type="tel" id="regPhone" class="auth-input-field" placeholder="Số điện thoại" autocomplete="tel">
          </div>

          <!-- Mã mời nếu có -->
          <div class="auth-input-group">
            <div class="auth-input-icon icon-bg-invite">
              <svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
            </div>
            <input type="text" id="regInvite" class="auth-input-field" placeholder="Mã mời nếu có (ví dụ: AVATAR258)" onkeydown="if(event.key==='Enter') doRegister()">
          </div>

          <!-- Footer -->
          <div class="auth-card-footer">
            <a class="auth-link" onclick="switchView('login')">Đã có tài khoản?</a>
            <button class="btn-auth-submit" id="btnSubmitRegister" onclick="doRegister()">ĐĂNG KÝ</button>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- =============================================================
       Floating "CHƠI NGAY" Button (Bottom-Right FAB)
  ============================================================= -->
  <button id="floatingPlayBtn" class="floating-play-btn" onclick="launchGame()" title="Bấm để vào thế giới Avatar 2.5.8 ngay!">
    <div class="floating-play-icon">
      <svg viewBox="0 0 24 24"><polygon points="6,3 20,12 6,21"></polygon></svg>
    </div>
    <span>CHƠI NGAY</span>
  </button>

  <!-- =============================================================
       3. Fullscreen WebGL Game Overlay (Zero top/bottom bars)
  ============================================================= -->
  <div id="game-modal">
    <div class="game-canvas-wrapper">
      <canvas id="gameCanvas" width="640" height="360"></canvas>
    </div>
  </div>

  <!-- =============================================================
       4. Popups & Modals (Nạp Xu, GiftCode, Vòng Quay, Xếp Hạng...)
  ============================================================= -->
  <!-- GiftCode Modal -->
  <div id="giftcodeModal" class="generic-modal" onclick="closeModal('giftcodeModal')">
    <div class="generic-modal-box" onclick="event.stopPropagation()">
      <div class="generic-modal-header">
        <span>🎁 Nhập GiftCode Nhận Quà</span>
        <button class="btn-close-modal" onclick="closeModal('giftcodeModal')">×</button>
      </div>
      <div class="generic-modal-body">
        <div id="giftcodeMsg" class="auth-message-box"></div>
        <p style="margin-bottom: 12px;">Nhập mã code để nhận ngay Xu, Lượng và trang phục độc quyền:</p>
        <div class="auth-input-group" style="margin-bottom: 14px;">
          <input type="text" id="giftcodeInput" class="auth-input-field" placeholder="Nhập mã code (ví dụ: AVATAR258)" value="AVATAR258" style="text-transform: uppercase;">
        </div>
        <button class="btn-auth-submit" style="width: 100%;" onclick="doRedeemGiftCode()">NHẬN QUÀ NGAY</button>
      </div>
    </div>
  </div>

  <!-- Topup Modal -->
  <div id="topupModal" class="generic-modal" onclick="closeModal('topupModal')">
    <div class="generic-modal-box" onclick="event.stopPropagation()">
      <div class="generic-modal-header">
        <span>💳 Nạp Xu / Lượng Trực Tuyến</span>
        <button class="btn-close-modal" onclick="closeModal('topupModal')">×</button>
      </div>
      <div class="generic-modal-body">
        <p style="font-weight: 600; color: #0288d1; margin-bottom: 8px;">Ưu đãi Khuyến Mãi Khai Mở:</p>
        <ul style="padding-left: 20px; margin-bottom: 14px;">
          <li>Khuyến mãi <strong>+100% Xu & Lượng</strong> cho lần nạp đầu tiên.</li>
          <li>Tặng Set Đồ Tân Thủ VIP & Thú cưỡi Cánh Băng vĩnh viễn.</li>
          <li>Hỗ trợ chuyển khoản ATM / Momo / Thẻ cào hoàn toàn tự động.</li>
        </ul>
        <button class="btn-auth-submit" style="width: 100%;" onclick="closeModal('topupModal'); alert('Tính năng nạp tự động qua API Momo/Banking đã sẵn sàng kết nối!');">XÁC NHẬN NẠP</button>
      </div>
    </div>
  </div>

  <!-- Quests Modal -->
  <div id="questModal" class="generic-modal" onclick="closeModal('questModal')">
    <div class="generic-modal-box" onclick="event.stopPropagation()">
      <div class="generic-modal-header">
        <span>📋 Hệ Thống Nhiệm Vụ Hằng Ngày</span>
        <button class="btn-close-modal" onclick="closeModal('questModal')">×</button>
      </div>
      <div class="generic-modal-body">
        <p>1. <strong>Chào hỏi dân cư:</strong> Gặp NPC và chat 3 câu (Thưởng: 50.000 Xu).</p>
        <p>2. <strong>Tham gia công viên:</strong> Ghé thăm Khu trung tâm và đổi 1 kiểu tóc (Thưởng: 100 Lượng).</p>
        <p>3. <strong>Đua thú Pet Racing:</strong> Tham gia 1 vòng đua tại trường đua thú (Thưởng: 200.000 Xu).</p>
      </div>
    </div>
  </div>

  <!-- Lucky Wheel Modal -->
  <div id="wheelModal" class="generic-modal" onclick="closeModal('wheelModal')">
    <div class="generic-modal-box" onclick="event.stopPropagation()">
      <div class="generic-modal-header">
        <span>🎡 Vòng Quay May Mắn</span>
        <button class="btn-close-modal" onclick="closeModal('wheelModal')">×</button>
      </div>
      <div class="generic-modal-body" style="text-align: center;">
        <img src="/assets/portal/news_wheel.png" style="width: 100px; height: 100px; object-fit: contain; margin-bottom: 12px;">
        <p>Tham gia Vòng Quay May Mắn tại Khu Giải Trí để có cơ hội trúng:</p>
        <p style="color: #f59e0b; font-weight: 700; margin: 8px 0;">Cánh Tiểu Tiên, Cánh Thiên Thần & Set Đồ Huyền Thoại!</p>
        <button class="btn-auth-submit" onclick="closeModal('wheelModal'); launchGame();">VÀO QUAY NGAY</button>
      </div>
    </div>
  </div>

  <!-- Rankings Modal -->
  <div id="rankModal" class="generic-modal" onclick="closeModal('rankModal')">
    <div class="generic-modal-box" onclick="event.stopPropagation()">
      <div class="generic-modal-header">
        <span>🏆 Bảng Xếp Hạng Cao Thủ</span>
        <button class="btn-close-modal" onclick="closeModal('rankModal')">×</button>
      </div>
      <div class="generic-modal-body">
        <p><strong>1. Top Đại Gia:</strong></p>
        <p style="padding-left: 14px;">🥇 <code>admin</code> — 10.000.000 Xu</p>
        <p style="padding-left: 14px;">🥈 <code>ad</code> — 5.000.000 Xu</p>
        <p style="margin-top: 10px;"><strong>2. Top Đua Thú:</strong></p>
        <p style="padding-left: 14px;">🥇 <code>nhoktrenk</code> — 15 trận thắng liên tiếp</p>
      </div>
    </div>
  </div>

  <!-- Chat / Support Modal -->
  <div id="chatSupportModal" class="generic-modal" onclick="closeModal('chatSupportModal')">
    <div class="generic-modal-box" onclick="event.stopPropagation()">
      <div class="generic-modal-header">
        <span>💬 Hỗ Trợ & Cộng Đồng Avatar</span>
        <button class="btn-close-modal" onclick="closeModal('chatSupportModal')">×</button>
      </div>
      <div class="generic-modal-body">
        <p>Chào mừng bạn đến với Thành Phố Diệu Kỳ Avatar Teamobi!</p>
        <p style="margin-top: 8px;">Nếu gặp bất kỳ vấn đề gì về tài khoản hoặc kết nối, bạn có thể chat trực tiếp trong game hoặc liên hệ quản trị viên.</p>
        <p style="margin-top: 8px; color: #0288d1; font-weight: 600;">Phiên bản: Avatar 2.5.8 WebGL Native</p>
      </div>
    </div>
  </div>

  <!-- =============================================================
       5. JavaScript Portal Controller & Game Bootstrap
  ============================================================= -->
  <script>
    let currentUser = null;
    let gameScriptLoaded = false;

    // View Switching
    function switchView(viewName) {
      document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
      const target = document.getElementById(viewName === 'login' ? 'viewLogin' : (viewName === 'register' ? 'viewRegister' : 'viewHome'));
      if (target) target.classList.add('active');

      const titleEl = document.getElementById('pageHeaderTitle');
      if (titleEl) {
        if (viewName === 'login') titleEl.textContent = 'Đăng Nhập';
        else if (viewName === 'register') titleEl.textContent = 'Đăng Ký';
        else titleEl.textContent = 'Trang Chủ';
      }

      const url = new URL(window.location);
      if (viewName === 'home') url.searchParams.delete('view');
      else url.searchParams.set('view', viewName);
      window.history.pushState({}, '', url);
    }

    // Modal Helpers
    function openModal(id) {
      const m = document.getElementById(id);
      if (m) m.style.display = 'flex';
    }

    function closeModal(id) {
      const m = document.getElementById(id);
      if (m) m.style.display = 'none';
    }

    function openChatSupportModal() {
      openModal('chatSupportModal');
    }

    function onFilterNews(category) {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      event?.target?.classList?.add('active');
      if (category === 'event') openModal('questModal');
    }

    function copyGiftCode(code) {
      navigator.clipboard?.writeText(code).then(() => {
        alert('Đã copy mã GiftCode: ' + code);
      }).catch(() => {
        alert('Mã GiftCode: ' + code);
      });
    }

    function fillLogin(u, p) {
      document.getElementById('loginUsername').value = u;
      document.getElementById('loginPassword').value = p;
    }

    // Check Auth State on load
    async function checkAuthStatus() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.authenticated && data.user) {
          currentUser = data.user;
          updateUserNav(data.user);
        } else {
          currentUser = null;
          updateUserNav(null);
        }
      } catch (e) {
        console.warn('Auth check error:', e);
      }
    }

    function updateUserNav(user) {
      const guestNav = document.getElementById('guestNavGroup');
      const userNav = document.getElementById('userNavGroup');
      const navUsername = document.getElementById('navUsername');
      const navUserXu = document.getElementById('navUserXu');

      if (user) {
        guestNav.style.display = 'none';
        userNav.style.display = 'flex';
        navUsername.textContent = user.username;
        navUserXu.textContent = Number(user.xu || 0).toLocaleString('vi-VN') + ' Xu';
      } else {
        guestNav.style.display = 'flex';
        userNav.style.display = 'none';
      }
    }

    // Login Action
    async function doLogin() {
      const u = document.getElementById('loginUsername').value.trim();
      const p = document.getElementById('loginPassword').value.trim();
      const msgBox = document.getElementById('loginMsgBox');
      const btn = document.getElementById('btnSubmitLogin');

      if (!u || !p) {
        msgBox.className = 'auth-message-box auth-message-error';
        msgBox.textContent = 'Vui lòng nhập tài khoản và mật khẩu!';
        return;
      }

      btn.disabled = true;
      btn.textContent = 'ĐANG ĐĂNG NHẬP...';
      msgBox.className = 'auth-message-box';
      msgBox.style.display = 'none';

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: u, password: p })
        });
        const data = await res.json();

        if (res.ok && data.success) {
          msgBox.className = 'auth-message-box auth-message-success';
          msgBox.textContent = data.message;
          currentUser = data.user;
          updateUserNav(data.user);
          setTimeout(() => {
            launchGame(u, p);
          }, 600);
        } else {
          msgBox.className = 'auth-message-box auth-message-error';
          msgBox.textContent = data.message || 'Đăng nhập thất bại!';
        }
      } catch (err) {
        msgBox.className = 'auth-message-box auth-message-error';
        msgBox.textContent = 'Lỗi kết nối máy chủ PHP!';
      } finally {
        btn.disabled = false;
        btn.textContent = 'ĐĂNG NHẬP';
      }
    }

    // Register Action
    async function doRegister() {
      const u = document.getElementById('regUsername').value.trim();
      const p = document.getElementById('regPassword').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const invite = document.getElementById('regInvite').value.trim();
      const msgBox = document.getElementById('registerMsgBox');
      const btn = document.getElementById('btnSubmitRegister');

      if (!u || !p) {
        msgBox.className = 'auth-message-box auth-message-error';
        msgBox.textContent = 'Vui lòng điền tài khoản và mật khẩu!';
        return;
      }

      btn.disabled = true;
      btn.textContent = 'ĐANG ĐĂNG KÝ...';
      msgBox.className = 'auth-message-box';
      msgBox.style.display = 'none';

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: u, password: p, phone, invite_code: invite })
        });
        const data = await res.json();

        if (res.ok && data.success) {
          msgBox.className = 'auth-message-box auth-message-success';
          msgBox.textContent = data.message;
          currentUser = data.user;
          updateUserNav(data.user);
          setTimeout(() => {
            launchGame(u, p);
          }, 800);
        } else {
          msgBox.className = 'auth-message-box auth-message-error';
          msgBox.textContent = data.message || 'Đăng ký thất bại!';
        }
      } catch (err) {
        msgBox.className = 'auth-message-box auth-message-error';
        msgBox.textContent = 'Lỗi kết nối máy chủ PHP!';
      } finally {
        btn.disabled = false;
        btn.textContent = 'ĐĂNG KÝ';
      }
    }

    // Logout
    async function onLogout() {
      await fetch('/api/auth/logout', { method: 'POST' });
      currentUser = null;
      updateUserNav(null);
      switchView('home');
    }

    // Redeem Giftcode
    async function doRedeemGiftCode() {
      const code = document.getElementById('giftcodeInput').value.trim();
      const msg = document.getElementById('giftcodeMsg');
      if (!code) return;

      try {
        const res = await fetch('/api/giftcode/redeem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          msg.className = 'auth-message-box auth-message-success';
          msg.textContent = data.message;
          if (currentUser) {
            currentUser.xu = data.xu;
            currentUser.luong = data.luong;
            updateUserNav(currentUser);
          }
        } else {
          msg.className = 'auth-message-box auth-message-error';
          msg.textContent = data.message || 'Mã code không hợp lệ';
        }
      } catch (e) {
        msg.className = 'auth-message-box auth-message-error';
        msg.textContent = 'Lỗi kết nối máy chủ!';
      }
    }

    // ===========================================================
    // Fullscreen WebGL Game Launch
    // ===========================================================
    function launchGame(autoUser, autoPass) {
      document.documentElement.classList.add('game-active');
      document.body.classList.add('game-active');
      const modal = document.getElementById('game-modal');
      modal.style.display = 'flex';
      const fab = document.getElementById('floatingPlayBtn');
      if (fab) fab.style.display = 'none';

      // Trigger canvas resize to fit container exactly
      window.dispatchEvent(new Event('resize'));

      const u = autoUser || currentUser?.username || 'admin';
      const p = autoPass || '123456';

      const playerInfoEl = document.getElementById('gamePlayerInfo');
      if (playerInfoEl) {
        playerInfoEl.textContent = 'Đang đăng nhập tài khoản: ' + u + '...';
      }

      if (window.loginWithCredentials) {
        window.loginWithCredentials(u, p);
      } else {
        const checkReady = setInterval(() => {
          if (window.loginWithCredentials) {
            clearInterval(checkReady);
            window.loginWithCredentials(u, p);
          }
        }, 100);
        setTimeout(() => clearInterval(checkReady), 6000);
      }
    }

    function connectGameSession(u, p) {
      if (window.loginWithCredentials) {
        window.loginWithCredentials(u, p);
      }
    }

    function closeGame() {
      const modal = document.getElementById('game-modal');
      modal.style.display = 'none';
      document.documentElement.classList.remove('game-active');
      document.body.classList.remove('game-active');
      const fab = document.getElementById('floatingPlayBtn');
      if (fab) fab.style.display = 'inline-flex';
      checkAuthStatus();
    }

    function toggleFullscreen() {
      const modal = document.getElementById('game-modal');
      if (!document.fullscreenElement) {
        modal.requestFullscreen?.().catch(console.error);
      } else {
        document.exitFullscreen?.().catch(console.error);
      }
    }

    function openWorldMap() {
      if (typeof window.openWorldMap === 'function') {
        window.openWorldMap();
      }
    }

    function sendInGameChat() {
      const input = document.getElementById('in-game-chat-input');
      const text = input.value.trim();
      if (!text) return;
      if (window.gameWorldScreen?.networkSession) {
        window.gameWorldScreen.networkSession.sendChat(text);
        input.value = '';
      }
    }

    // Initialize
    window.addEventListener('DOMContentLoaded', () => {
      checkAuthStatus();

      // Listen for view navigation via popstate
      window.addEventListener('popstate', () => {
        const p = new URLSearchParams(window.location.search);
        switchView(p.get('view') || 'home');
      });
    });
  </script>
  <script src="/game/app.js?v=<?= time() ?>"></script>
</body>
</html>
