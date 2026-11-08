<?php
declare(strict_types=1);

namespace Avatar\Models;

use PDO;

class Player
{
    public int $id;
    public int $user_id;
    public int $xu;
    public int $luong;
    public int $luong_khoa;
    public int $gender;
    public array $wearing;
    public array $chests;

    public static function findByUserId(PDO $pdo, int $userId): ?self
    {
        $stmt = $pdo->prepare("SELECT * FROM players WHERE user_id = :uid LIMIT 1");
        $stmt->execute([':uid' => $userId]);
        $row = $stmt->fetch();
        if (!$row) return null;

        $player = new self();
        $player->id = (int)$row['id'];
        $player->user_id = (int)$row['user_id'];
        $player->xu = (int)$row['xu'];
        $player->luong = (int)$row['luong'];
        $player->luong_khoa = (int)$row['luong_khoa'];
        $player->gender = (int)$row['gender'];
        $player->wearing = json_decode($row['wearing'] ?? '[]', true) ?: [];
        $player->chests = json_decode($row['chests'] ?? '[]', true) ?: [];
        return $player;
    }
}
