<?php
declare(strict_types=1);

namespace Avatar\Config;

return [
    'app_name' => 'Avatar Teamobi WebGL',
    'app_env' => getenv('APP_ENV') ?: 'production',
    'debug' => (bool)(getenv('APP_DEBUG') ?: false),
    'url' => getenv('APP_URL') ?: 'http://localhost:3000',

    'websocket' => [
        'host' => '0.0.0.0',
        'port' => (int)(getenv('WS_PORT') ?: 19129),
        'bridge_tcp_host' => '127.0.0.1',
        'bridge_tcp_port' => (int)(getenv('TCP_PORT') ?: 19128),
    ],

    'game' => [
        'version' => '2.5.8',
        'fps' => 20,
        'logical_width' => 640,
        'logical_height' => 360,
    ],
];
