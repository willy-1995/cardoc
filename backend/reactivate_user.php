<?php
require_once __DIR__ . "/cors.php";
require_once __DIR__ . "/env_loader.php";

// PDO Connection einbinden (wie in login.php)
try {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $pdo = new PDO($dsn, $dbusername, $dbpassword, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Verbindung fehlgeschlagen: " . $e->getMessage()
    ]);
    exit;
}

// reactivate_user.php
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? null;

if (!$email) {
    echo json_encode(["success" => false, "message" => "E-Mail fehlt"]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE users SET deleted_at = NULL WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() === 0) {
        echo json_encode([
            "success" => false,
            "message" => "Profil nicht gefunden oder bereits aktiv."
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "Profil wurde reaktiviert!"
    ]);
    exit;

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Fehler bei der Reaktivierung: " . $e->getMessage()
    ]);
    exit;
}
?>