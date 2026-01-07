<?php
//Works as getter for auth
require_once __DIR__ . "/auth.php";
require_once __DIR__ . "/env_loader.php";

//GET USERNAME FROM DB
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$pdo = new PDO($dsn, $dbusername, $dbpassword, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$stmt = $pdo->prepare("SELECT username FROM users WHERE id = ?");
$stmt->execute([$userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
$username = $user ? $user["username"] : "";

echo json_encode([
    "success" => true,
    "message" => "Willkommen!",
    "user_id" => $userId,
    "email" => $email,
    "username" => $username,
]);

?>