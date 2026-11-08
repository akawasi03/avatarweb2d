<?php
declare(strict_types=1);

namespace Avatar\Controllers;

use Avatar\Services\Database;
use Avatar\Models\User;
use Avatar\Models\Player;
use PDO;

class AuthController
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::getPdo();
    }

    public function login(string $username, string $password): array
    {
        $username = trim($username);
        $password = trim($password);

        if (empty($username) || empty($password)) {
            return [
                'success' => false,
                'message' => 'Vui lòng nhập tài khoản và mật khẩu.'
            ];
        }

        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE username = :u LIMIT 1");
        $stmt->execute([':u' => $username]);
        $userRow = $stmt->fetch();

        if (!$userRow) {
            return [
                'success' => false,
                'message' => 'Tài khoản không tồn tại. Vui lòng kiểm tra lại!'
            ];
        }

        $hashedPass = md5($password);
        if ($userRow['password'] !== $hashedPass) {
            return [
                'success' => false,
                'message' => 'Mật khẩu không chính xác.'
            ];
        }

        if ((int)$userRow['active'] === 0) {
            // Auto-activate for ease of testing or show notice
            $this->pdo->prepare("UPDATE users SET active = 1 WHERE id = :id")->execute([':id' => $userRow['id']]);
        }

        // Auto unlock if account was locked from abrupt session termination
        if ((int)$userRow['login_lock'] === 1) {
            $this->pdo->prepare("UPDATE users SET login_lock = 0 WHERE id = :id")->execute([':id' => $userRow['id']]);
        }

        $player = Player::findByUserId($this->pdo, (int)$userRow['id']);
        if (!$player) {
            // Create default player if missing
            $createStmt = $this->pdo->prepare("
                INSERT INTO players (user_id, xu, luong, luong_khoa, gender, friendly, crazy, stylish, happy, hunger, items, chests, wearing)
                VALUES (:uid, 10000000, 20000000, 0, 0, 100, 0, 0, 100, 0, '[]', '[]', '[]')
            ");
            $createStmt->execute([':uid' => $userRow['id']]);
            $player = Player::findByUserId($this->pdo, (int)$userRow['id']);
        }

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['user_id'] = (int)$userRow['id'];
        $_SESSION['username'] = $userRow['username'];

        return [
            'success' => true,
            'message' => 'Đăng nhập thành công!',
            'user' => [
                'id' => (int)$userRow['id'],
                'username' => $userRow['username'],
                'role' => (int)$userRow['role'],
                'xu' => $player ? $player->xu : 10000000,
                'luong' => $player ? $player->luong : 20000000,
            ]
        ];
    }

    public function register(string $username, string $password, string $phone = '', string $inviteCode = ''): array
    {
        $username = trim($username);
        $password = trim($password);
        $phone = trim($phone);

        if (strlen($username) < 3 || strlen($username) > 20) {
            return [
                'success' => false,
                'message' => 'Tài khoản phải từ 3 đến 20 ký tự.'
            ];
        }

        if (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
            return [
                'success' => false,
                'message' => 'Tài khoản chỉ được chứa chữ cái, số và dấu gạch dưới.'
            ];
        }

        if (strlen($password) < 4) {
            return [
                'success' => false,
                'message' => 'Mật khẩu phải có ít nhất 4 ký tự.'
            ];
        }

        // Check if username exists
        $stmt = $this->pdo->prepare("SELECT id FROM users WHERE username = :u LIMIT 1");
        $stmt->execute([':u' => $username]);
        if ($stmt->fetch()) {
            return [
                'success' => false,
                'message' => 'Tài khoản này đã được sử dụng. Vui lòng chọn tên khác!'
            ];
        }

        // Create new user in users
        $insertUser = $this->pdo->prepare("
            INSERT INTO users (username, password, role, active, phone, vnd, login_lock)
            VALUES (:u, :p, -1, 1, :phone, 0, 0)
        ");
        $insertUser->execute([
            ':u' => $username,
            ':p' => md5($password),
            ':phone' => $phone ?: '0'
        ]);
        $newUserId = (int)$this->pdo->lastInsertId();

        // Create new player record in players with tân thủ gift: 10,000,000 Xu and 20,000,000 Lượng
        $insertPlayer = $this->pdo->prepare("
            INSERT INTO players (user_id, xu, luong, luong_khoa, gender, friendly, crazy, stylish, happy, hunger, items, chests, wearing)
            VALUES (:uid, 10000000, 20000000, 0, 0, 100, 0, 0, 100, 0, '[]', '[]', '[]')
        ");
        $insertPlayer->execute([':uid' => $newUserId]);

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['user_id'] = $newUserId;
        $_SESSION['username'] = $username;

        return [
            'success' => true,
            'message' => 'Đăng ký tài khoản thành công! Tặng ngay 10.000.000 Xu và 20.000.000 Lượng Tân Thủ.',
            'user' => [
                'id' => $newUserId,
                'username' => $username,
                'role' => -1,
                'xu' => 10000000,
                'luong' => 20000000
            ]
        ];
    }

    public function me(): array
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return [
                'authenticated' => false
            ];
        }

        $stmt = $this->pdo->prepare("SELECT id, username, role, active FROM users WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $userId]);
        $userRow = $stmt->fetch();

        if (!$userRow) {
            unset($_SESSION['user_id'], $_SESSION['username']);
            return ['authenticated' => false];
        }

        $player = Player::findByUserId($this->pdo, (int)$userRow['id']);

        return [
            'authenticated' => true,
            'user' => [
                'id' => (int)$userRow['id'],
                'username' => $userRow['username'],
                'role' => (int)$userRow['role'],
                'xu' => $player ? $player->xu : 0,
                'luong' => $player ? $player->luong : 0,
            ]
        ];
    }

    public function logout(): array
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
        return ['success' => true, 'message' => 'Đã đăng xuất'];
    }

    public function redeemGiftCode(string $code): array
    {
        $code = strtoupper(trim($code));
        if ($code !== 'AVATAR258' && $code !== 'HUYENTHOAIH5') {
            return [
                'success' => false,
                'message' => 'Mã GiftCode không hợp lệ hoặc đã hết hạn.'
            ];
        }

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return [
                'success' => false,
                'message' => 'Vui lòng đăng nhập để nhận GiftCode.'
            ];
        }

        // Add 10,000,000 Xu and 20,000,000 Lượng to player
        $updateStmt = $this->pdo->prepare("
            UPDATE players SET xu = xu + 10000000, luong = luong + 20000000 WHERE user_id = :uid
        ");
        $updateStmt->execute([':uid' => $userId]);

        $player = Player::findByUserId($this->pdo, (int)$userId);

        return [
            'success' => true,
            'message' => 'Nhận thưởng GiftCode thành công: +10.000.000 Xu và +20.000.000 Lượng!',
            'xu' => $player ? $player->xu : 10000000,
            'luong' => $player ? $player->luong : 20000000
        ];
    }
}
