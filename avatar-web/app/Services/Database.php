<?php
declare(strict_types=1);

namespace Avatar\Services;

use PDO;
use RuntimeException;

class Database
{
    private static ?PDO $instance = null;

    public static function getPdo(): PDO
    {
        if (self::$instance === null) {
            $config = require __DIR__ . '/../../config/database.php';
            $db = $config['connections'][$config['default']];

            $dsn = sprintf(
                '%s:host=%s;port=%d;dbname=%s;charset=%s',
                $db['driver'],
                $db['host'],
                $db['port'],
                $db['database'],
                $db['charset']
            );

            try {
                self::$instance = new PDO($dsn, $db['username'], $db['password'], $db['options']);
            } catch (\PDOException $e) {
                throw new RuntimeException("Database connection failed: " . $e->getMessage(), (int)$e->getCode(), $e);
            }
        }

        return self::$instance;
    }
}
