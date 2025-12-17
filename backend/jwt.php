<?php

use Firebase\JWT\JWT;

$secretKey = $_ENV["JWT_SECRET"];

$payload = [
    "user_id" => $userId,
    "email" => $email,
    "exp" => time() + 3600
];

$token = JWT::encode($payload, $secretKey, "HS256");
?>