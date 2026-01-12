<?php
require_once __DIR__ . "/cors.php";
require_once __DIR__ . "/env_loader.php";

use Firebase\JWT\JWT;

//only post request
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Ungültige Anfrage"
    ]);
    exit;
}

//read json
$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"] ?? ""; //for login with username
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Bitte E-Mail und Passwort angeben."
    ]);
    exit;
}


//db connection
try {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $pdo = new PDO($dsn, $dbusername, $dbpassword, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Login fehlgeschlagen. Bitte versuche es später erneut."
    ]);
    exit;
}

//load user
$stmt = $pdo->prepare(
    "SELECT id, email, password, username, deleted_at FROM users WHERE email = ? LIMIT 1"
);
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

//check if inactive
if ($user && $user['deleted_at'] !== null) {
    http_response_code(403);
    echo json_encode([
        "success" => false, 
        "message" => "Dein Profil ist deaktiviert."
    ]);
    exit;
}

if (!$user || !password_verify($password, $user["password"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "E-Mail oder Passwort falsch."
    ]);
    exit;
}

// check if account is deactivated
if ($user['deleted_at'] !== null) {
    http_response_code(403);
    echo json_encode([
        "success" => false,
        "message" => "Dein Profil ist deaktiviert."
    ]);
    exit;
}

//===== JWT
$payload = [
    "user_id" => $user["id"],
    "email" => $user["email"],
    "username" => $user["username"],
    "exp" => time() + 7200 // valid for 2 h
];

$jwt = JWT::encode(
    $payload,
    $_ENV["JWT_SECRET"],
    "HS256"
);

//success
echo json_encode([
    "success" => true,
    "token" => $jwt,
    "user_id" => $user["id"],
    "email" => $user["email"],
    "username" => $user["username"]
]);



?>