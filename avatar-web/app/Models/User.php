<?php
declare(strict_types=1);

namespace Avatar\Models;

use PDO;

class User
{
    public int $id;
    public string $username;
    public string $password;
    public int $role;
    public int $active;
    public int $vnd;
    public int $login_lock;

    public static function findByUsername(PDO $pdo, string $username): ?self
    {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :u LIMIT 1");
        $stmt->execute([':u' => $username]);
        $row = $stmt->fetch();
        if (!$row) return null;

        $user = new self();
        $user->id = (int)$row['id'];
        $user->username = $row['username'];
        $user->password = $row['password'];
        $user->role = (int)$row['role'];
        $user->active = (int)$row['active'];
        $user->vnd = (int)($row['vnd'] ?? 0);
        $user->login_lock = (int)($row['login_lock'] ?? 0);
        return $user;
    }
}
