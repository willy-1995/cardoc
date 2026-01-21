<?php

require_once __DIR__ . "/cors.php";
require_once __DIR__ . "/env_loader.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Content-Type: application/json; charset=UTF-8");

//FROM API
//=====READING ALL HEADERS BC JWT IS IN HEADER
$headers = getallheaders();

$token = null;

if (isset($headers["Authorization"])) {
    // API
    $token = str_replace("Bearer ", "", $headers["Authorization"]);
} elseif (isset($_GET['token'])) {
    //URL PDF-Export (window.open)
    $token = $_GET['token'];
}

if (!$token) {
    http_response_code(401);
    //Only send json, if no pdf
    echo json_encode(["success" => false, "message" => "Kein Token gesendet."]);
    exit;
}


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
$username = $decoded->username ?? "";



?>