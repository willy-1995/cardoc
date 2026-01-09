<?php
require_once __DIR__ . "/cors.php";
require_once __DIR__ . "/env_loader.php";
require_once __DIR__ . "/auth.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Nur POST-Anfragen erlaubt"
    ]);
    exit;
}

//read json body
$data = json_decode(file_get_contents("php://input"), true);

$action = $data['action'] ?? '';
$trip_id = $data['trip_id'] ?? null;
$vehicle_id = $data['vehicle_id'] ?? null;

//wrong data body
if ($action !== 'cancel' || !$trip_id || !$vehicle_id) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Fehlende Daten für Stornierung"
    ]);
    exit;
}

//db connect
try {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $pdo = new PDO($dsn, $dbusername, $dbpassword, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Datenbankfehler"
    ]);
    exit;
}

$stmtUser = $pdo->prepare("SELECT username FROM users WHERE id = ?");
$stmtUser->execute([$userId]);
$user = $stmtUser->fetch(PDO::FETCH_ASSOC);

$username = $user['username']; // username for table

//update trip
try {
    $stmt = $pdo->prepare("
        UPDATE trips
        SET canceled = 1,
            canceled_at = NOW(),
            canceled_by = :username
        WHERE id = :trip_id
          AND vehicle_id = :vehicle_id
    ");
    $stmt->execute([
        ':username' => $username,
        ':trip_id' => $trip_id,
        ':vehicle_id' => $vehicle_id
    ]);

    if ($stmt->rowCount() > 0) {
//load current trip
        $stmt2 = $pdo->prepare("SELECT id, canceled, canceled_at, canceled_by FROM trips WHERE id = :trip_id");
        $stmt2->execute([':trip_id' => $trip_id]);
        $updatedTrip = $stmt2->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => "success",
            "cncl_message" => "Fahrt erfolgreich storniert",
            "trip" => $updatedTrip
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "cncl_message" => "Fahrt nicht gefunden oder bereits storniert"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "cncl_message" => "Fehler beim Stornieren: " . $e->getMessage()
    ]);
}

?>