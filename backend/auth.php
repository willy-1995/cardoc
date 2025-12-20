<?php

require_once __DIR__ . "/cors.php";
require_once __DIR__ . "/env_loader.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Content-Type: application/json; charset=UTF-8");

//=====READING ALL HEADERS BC JWT IS IN HEADER
$headers = getallheaders();

if (!isset($headers["Authorization"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Kein Token gesendet."
    ]);
    exit;
}

//===== REMOVE BEARER BC JWT LIBRARY ONLY READS TOKEN, NOT TEXT
$token = str_replace("Bearer ", "", $headers["Authorization"]);

//=====VALIDATE AND DECODE JWT
try {
    $decoded = JWT::decode(
        $token,
        new Key($_ENV["JWT_SECRET"], "HS256")
    );
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Ungültiger oder abgelaufener Token."
    ]);
    exit;
}

//=====USER DATA
$userId = $decoded->user_id;
$email  = $decoded->email;


?>