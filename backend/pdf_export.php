<?php
include_once "cors.php";
include_once "env_loader.php";
require_once __DIR__ . "/auth.php";
require_once "vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Dompdf\Dompdf;
use Dompdf\Options;

//GET PARAMETER From FRONTEND (vehicle_id already there)
$vehicle_id = isset($_GET['vehicle_id']) ? (int) $_GET['vehicle_id'] : 0;
$year = isset($_GET['year']) ? (int) $_GET['year'] : date("Y");

if (!$vehicle_id) {
    die("Fehler: Fahrzeug wurde nicht gefunden.");
}

//DATABASE CONNECTION
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Wichtig: Fehlermodus auf Exceptions setzen
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false, // Wichtig: Deaktiviert die Emulation für echte Prepared Statements
];

$pdo = new PDO($dsn, $dbusername, $dbpassword, $options);

//GET VEHICLE
$stmtVehicle = $pdo->prepare("SELECT brand, model, license_plate FROM vehicles WHERE id = ? AND user_id = ?");
$stmtVehicle->execute([$vehicle_id, $userId]);
$vehicle = $stmtVehicle->fetch(PDO::FETCH_ASSOC);

//GET TRIPS BY YEAR
$stmtTrips = $pdo->prepare("
    SELECT * FROM trips 
    WHERE vehicle_id = ? 
    AND YEAR(start_time) = ? 
    AND canceled = 0 
    ORDER BY start_time ASC
");
$stmtTrips->execute([$vehicle_id, $year]);
$trips = $stmtTrips->fetchAll(PDO::FETCH_ASSOC);

//CREATE HTML FOR PDF
$html = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: sans-serif; font-size: 11px; color: #333; }
        h1 { text-align: center; font-size: 18px; }
        .info { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #999; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: right; font-size: 9px; }
    </style>
</head>
<body>
    <h1>Fahrtenbuch ' . $year . '</h1>
    
    <div class="info">
        <strong>Fahrzeug:</strong> ' . htmlspecialchars($vehicle['brand'] . ' ' . $vehicle['model']) . ' <br>
        <strong>Kennzeichen:</strong> ' . htmlspecialchars($vehicle['license_plate']) . '
    </div>

    <table>
        <thead>
            <tr>
                <th>Datum / Zeit</th>
                <th>Von -> Nach</th>
                <th>Start (km)</th>
                <th>Ende (km)</th>
                <th>Distanz</th>
                <th>Zweck</th>
                <th>Typ</th>
                <th>Fahrer</th>
            </tr>
        </thead>
        <tbody>';

foreach ($trips as $trip) {
    $html .= '<tr>
        <td>' . date("d.m.Y H:i", strtotime($trip['start_time'])) . '</td>
        <td>' . htmlspecialchars($trip['start_location']) . ' - ' . htmlspecialchars($trip['end_location']) . '</td>
        <td>' . number_format($trip['start_km'], 0, ',', '.') . '</td>
        <td>' . number_format($trip['end_km'], 0, ',', '.') . '</td>
        <td>' . $trip['distance_km'] . ' km</td>
        <td>' . htmlspecialchars($trip['purpose']) . '</td>
        <td>' . $trip['trip_type'] . '</td>
        <td>' . htmlspecialchars($trip['driver']) . '</td>
    </tr>';
}

$html .= '
        </tbody>
    </table>
    <div class="footer">Erstellt am ' . date("d.m.Y H:i") . '</div>
</body>
</html>';

//CREATE
$options = new Options();
$options->set('defaultFont', 'Arial');
$options->set('isHtml5ParserEnabled', true);

$dompdf = new Dompdf($options);
$dompdf->loadHtml($html);

// HORIZONTAL FOR BETTER VIEW
$dompdf->setPaper('A4', 'landscape');
$dompdf->render();

// SEND TO BROWSER
$dompdf->stream("Fahrtenbuch_" . $year . "_" . $vehicle['license_plate'] . ".pdf", ["Attachment" => true]);
exit;
?>