<?php
include_once "cors.php";
include_once "env_loader.php";


/////////////////////////////////////////////////////////////////
//contenttype json in cors.php included

//===== READ DATA FROM POST
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

if ($data === null) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Ungültiges JSON-Format gesendet."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Anfrage fehlgeschlagen."]);
    exit;
}

//===== GET DATA VIA JSON

$username = $data["username"] ?? "";
$email = $data["email"] ?? "";
$rawpassword = $data["password"] ?? "";

if (empty($username) || empty($email) || empty($rawpassword)) {
    http_response_code(400); //bad request code
    echo json_encode(["success" => false, "message" => "Bitte fülle alle Felder aus."]);
    exit;
}
$password = password_hash($data["password"], PASSWORD_BCRYPT); //hash after validation

//===== DATABASE HANDLING
//*credentials include */
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Wichtig: Fehlermodus auf Exceptions setzen
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false, // Wichtig: Deaktiviert die Emulation für echte Prepared Statements
];

//CHECK EXISTING USER

$pdo = new PDO($dsn, $dbusername, $dbpassword, $options);

$userCheck = "SELECT id FROM users WHERE email = ?";
$stmtCheck = $pdo->prepare($userCheck);
$stmtCheck->execute([$email]);
$checkResult = $stmtCheck->fetch(); //only fetch, because exit if first data is found

if ($checkResult) {
    echo json_encode(["success" => false, "message" => "Diese E-Mail-Adresse ist bereits registriert."]);
    exit;
}

//INSERT
$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($sql);

try {
    $success = $stmt->execute([
        $username,
        $email,
        $password
    ]);
    if ($success) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Registrierung erfolgreich!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Registrierung fehlgeschlagen!"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}


?>