<?php
require_once "cors.php";
require_once "env_loader.php";
use Firebase\JWT\JWT;

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
    $vehicle_id = isset($_GET['vehicle_id']) ? (int) $_GET['vehicle_id'] : 0;

    if (!$vehicle_id) {
        echo json_encode(["status" => "error", "message" => "vehicle_id fehlt"]);
        exit;
    }//get vehicle id from url/react

    //=====GET TRIPS=====
    //get all trips (canceled and valid)
    $stmt = $pdo->prepare("
    SELECT *
    FROM trips
    WHERE vehicle_id = ?
    ORDER BY start_time DESC
");
    $stmt->execute([$vehicle_id]);
    $trips = $stmt->fetchAll();

    // get last valid km, no canceled
    $stmtKm = $pdo->prepare("
    SELECT end_km
    FROM trips
    WHERE vehicle_id = ?
      AND canceled = 0
    ORDER BY end_time DESC
    LIMIT 1
");
    $stmtKm->execute([$vehicle_id]);
    $lastKm = $stmtKm->fetchColumn();
    if ($lastKm === false) {
    $lastKm = 0; //frontend shows 0 instead false
}

    // response to frontend (both querys)
    echo json_encode([
        "status" => "success",
        "trips" => $trips,
        "last_km" =>(int)$lastKm
    ]);
    exit;
}

//=====POST=====

if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $vehicle_id = $data['vehicle_id'] ?? null;
    $driver = $data['driver'] ?? null;
    $start_time = $data['start_time'] ?? null;
    $end_time = $data['end_time'] ?? null;
    $start_km = $data['start_km'] ?? null;
    $end_km = $data['end_km'] ?? null;
    $distance_km = $data['distance_km'] ?? null;
    $start_location = $data['start_location'] ?? null;
    $end_location = $data['end_location'] ?? null;
    $purpose = $data['purpose'] ?? null;
    $trip_type = $data['trip_type'] ?? null;

    //missing vehicle id
    if (!$vehicle_id) {
        echo json_encode([
            "status" => "error",
            "message" => "vehicle_id fehlt"
        ]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO trips (vehicle_id, driver, start_time, end_time, start_km, end_km, distance_km, start_location, end_location, purpose, trip_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$vehicle_id, $driver, $start_time, $end_time, $start_km, $end_km, $distance_km, $start_location, $end_location, $purpose, $trip_type]);
    echo json_encode(["status" => "success", "message" => "Fahrt gespeichert"]);
    exit;

} else {
    echo json_encode(["status" => "error", "message" => "Keine Daten empfangen"]);
}
?>