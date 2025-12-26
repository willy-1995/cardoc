<?php
include_once "cors.php";
include_once "env_loader.php";
require_once __DIR__ . "/auth.php";

//db connection
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Wichtig: Fehlermodus auf Exceptions setzen
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false, // Wichtig: Deaktiviert die Emulation für echte Prepared Statements
];

$pdo = new PDO($dsn, $dbusername, $dbpassword, $options);
//_____

//CHSOE ACTIONS

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT * FROM vehicles
            WHERE user_id = ?
            ORDER BY created_at DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);

    echo json_encode($stmt->fetchAll());
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $brand = $data['brand'] ?? null;
    $model = $data['model'] ?? null;
    $license_plate = $data['license_plate'] ?? null;
    $details = $data['details'] ?? null;

    $sql = "INSERT INTO vehicles (user_id, brand, model, license_plate, details) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId, $brand, $model, $license_plate, $details]);
    echo json_encode(["status" => "success", "message" => "Fahrzeug gespeichert"]);
    exit;

} else {
    echo json_encode(["status" => "error", "message" => "Keine Daten empfangen"]);
}

?>