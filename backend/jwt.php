<?php

use Firebase\JWT\JWT;

$secretKey = $_ENV["JWT_SECRET"];

$payload = [
    "user_id" => $userId,
    "email" => $email,
    "username"=> $username,
    "exp" => time() + 3600
];

$token = JWT::encode($payload, $secretKey, "HS256");
?>