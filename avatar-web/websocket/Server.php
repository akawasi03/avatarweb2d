<?php
declare(strict_types=1);

namespace Avatar\WebSocket;

/**
 * Avatar Teamobi WebSocket Server in PHP
 * Implements RFC 6455 Binary Framing & Bridges to Java Server (19128)
 */
class Server
{
    private string $host;
    private int $port;
    private string $tcpHost;
    private int $tcpPort;
    private $serverSocket = null;
    private array $clients = [];
    private array $tcpBridges = [];

    public function __construct(
        string $host = '0.0.0.0',
        int $port = 19129,
        string $tcpHost = '127.0.0.1',
        int $tcpPort = 19128
    ) {
        $this->host = $host;
        $this->port = $port;
        $this->tcpHost = $tcpHost;
        $this->tcpPort = $tcpPort;
    }

    public function start(): void
    {
        $address = "tcp://{$this->host}:{$this->port}";
        $errno = 0;
        $errstr = '';
        $this->serverSocket = @stream_socket_server($address, $errno, $errstr);

        if (!$this->serverSocket) {
            echo "[PHP WebSocket] Failed to bind to {$address}: {$errstr} ({$errno})\n";
            return;
        }

        stream_set_blocking($this->serverSocket, false);
        echo "[PHP WebSocket] Server started on {$address}\n";
        echo "[PHP WebSocket] Forwarding binary frames to TCP {$this->tcpHost}:{$this->tcpPort}\n";

        while (true) {
            $read = array_merge([$this->serverSocket], array_values($this->clients), array_values($this->tcpBridges));
            $write = null;
            $except = null;

            if (@stream_select($read, $write, $except, 0, 20000) > 0) {
                // New incoming WebSocket connection
                if (in_array($this->serverSocket, $read, true)) {
                    $newSocket = @stream_socket_accept($this->serverSocket);
                    if ($newSocket) {
                        stream_set_blocking($newSocket, false);
                        $id = (int)$newSocket;
                        $this->clients[$id] = $newSocket;
                        $this->performHandshake($id, $newSocket);
                    }
                    $read = array_diff($read, [$this->serverSocket]);
                }

                // Client WebSocket messages
                foreach ($this->clients as $id => $clientSocket) {
                    if (in_array($clientSocket, $read, true)) {
                        $this->handleClientData($id, $clientSocket);
                    }
                }

                // TCP Server incoming messages
                foreach ($this->tcpBridges as $id => $tcpSocket) {
                    if (in_array($tcpSocket, $read, true)) {
                        $this->handleTcpData($id, $tcpSocket);
                    }
                }
            }
        }
    }

    private function performHandshake(int $id, $socket): void
    {
        $headers = '';
        while ($line = fgets($socket)) {
            $headers .= $line;
            if ($line === "\r\n") break;
        }

        if (preg_match("/Sec-WebSocket-Key: (.*)\r\n/", $headers, $match)) {
            $key = trim($match[1]);
            $acceptKey = base64_encode(sha1($key . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', true));
            $upgrade = "HTTP/1.1 101 Switching Protocols\r\n" .
                       "Upgrade: websocket\r\n" .
                       "Connection: Upgrade\r\n" .
                       "Sec-WebSocket-Accept: {$acceptKey}\r\n\r\n";
            fwrite($socket, $upgrade);

            // Connect to Java TCP Server
            $tcp = @stream_socket_client("tcp://{$this->tcpHost}:{$this->tcpPort}");
            if ($tcp) {
                stream_set_blocking($tcp, false);
                $this->tcpBridges[$id] = $tcp;
                echo "[PHP WebSocket] Client #{$id} connected & bridged to Java TCP Server.\n";
            }
        }
    }

    private function handleClientData(int $id, $clientSocket): void
    {
        $raw = @fread($clientSocket, 8192);
        if ($raw === false || $raw === '') {
            $this->disconnectClient($id);
            return;
        }

        $decoded = $this->decodeWebSocketFrame($raw);
        if ($decoded !== null && isset($this->tcpBridges[$id])) {
            @fwrite($this->tcpBridges[$id], $decoded);
        }
    }

    private function handleTcpData(int $id, $tcpSocket): void
    {
        $data = @fread($tcpSocket, 8192);
        if ($data === false || $data === '') {
            $this->disconnectClient($id);
            return;
        }

        if (isset($this->clients[$id])) {
            $frame = $this->encodeWebSocketFrame($data, true);
            @fwrite($this->clients[$id], $frame);
        }
    }

    private function decodeWebSocketFrame(string $data): ?string
    {
        $len = ord($data[1]) & 127;
        $offset = 2;
        if ($len === 126) {
            $offset = 4;
        } elseif ($len === 127) {
            $offset = 10;
        }

        $masks = substr($data, $offset, 4);
        $payload = substr($data, $offset + 4);
        $text = '';
        for ($i = 0; $i < strlen($payload); ++$i) {
            $text .= $payload[$i] ^ $masks[$i % 4];
        }
        return $text;
    }

    private function encodeWebSocketFrame(string $payload, bool $isBinary = true): string
    {
        $b1 = 0x80 | ($isBinary ? 0x02 : 0x01);
        $len = strlen($payload);

        if ($len <= 125) {
            $header = pack('CC', $b1, $len);
        } elseif ($len <= 65535) {
            $header = pack('CCn', $b1, 126, $len);
        } else {
            $header = pack('CCNN', $b1, 127, 0, $len);
        }
        return $header . $payload;
    }

    private function disconnectClient(int $id): void
    {
        if (isset($this->clients[$id])) {
            @fclose($this->clients[$id]);
            unset($this->clients[$id]);
        }
        if (isset($this->tcpBridges[$id])) {
            @fclose($this->tcpBridges[$id]);
            unset($this->tcpBridges[$id]);
        }
        echo "[PHP WebSocket] Client #{$id} disconnected.\n";
    }
}
