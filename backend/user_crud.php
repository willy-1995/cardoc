<?php
include_once "cors.php";
include_once "env_loader.php";
require_once __DIR__ . "/auth.php";

//DB CONNECTION
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

$pdo = new PDO($dsn, $dbusername, $dbpassword, $options);

//json data/ body
$data = json_decode(file_get_contents("php://input"), true);
$action = $data["action"] ?? null;

//=====READ=====
if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $sql = "SELECT * FROM users
            WHERE id = ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);
    echo json_encode($stmt->fetchAll());
    exit;
}

//=====UPDATE=====
if ($_SERVER['REQUEST_METHOD'] === "POST" && $action === "update") {

    $id = $data['id'] ?? null;
    $username = $data['username'] ?? null;
    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (!$id || !$username || !$email) {
        echo json_encode(["status" => "error", "message" => "Fehlende Daten"]);
        exit;
    }

    if (!empty($password)) {
        // if password is changed
        $hashPassword = password_hash($password, PASSWORD_BCRYPT);
        $sql = "
            UPDATE users
            SET username = ?, email = ?, password = ?
            WHERE id = ?
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username, $email, $hashPassword, $id]);
    } else {
        // if password is not changed
        $sql = "
            UPDATE users
            SET username = ?, email = ?
            WHERE id = ?
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username, $email, $id]);
    }

    echo json_encode(["status" => "success", "message" => "Daten erfolgreich geändert!"]);
    exit;
}

//=====SOFT DELETE=====
if ($_SERVER['REQUEST_METHOD'] === "POST" && $action === "soft_delete") {
    

    if (!$userId) {
        echo json_encode(["status" => "error", "message" => "ID fehlt"]);
        exit;
    }


    $sql = "UPDATE users SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL";
    try{
        
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]); //user id from auth.php

    
    if ($stmt->rowCount() === 0) {
        echo json_encode([
            "status" => "error",
            "message" => "Dieses Profil existiert nicht oder ist bereits gelöscht."
        ]);
        exit;
    }

    echo json_encode([
        "status" => "success",
        "message" => "Du hast dein Profil erfolgreich deaktiviert!"
    ]);
    exit;
    }
    catch( PDOException $e){
          error_log("Soft delete Fehler: " . $e->getMessage());

        echo json_encode([
            "status" => "error",
            "message" => "Deaktivierung fehlgeschlagen"
        ]);
        exit;
    }
}


//===== HARD DELETE=====
if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
    $id = $data['id'] ?? null;

    if (!$id) {
        echo json_encode(["status" => "error", "message" => "ID fehlt"]);
        exit;
    }

    //protection
    if ((int)$id !== (int)$userId) {
        echo json_encode([
            "status" => "error",
            "message" => "Keine Berechtigung"
        ]);
        exit;
    }

    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);

    echo json_encode(["status" => "success", "message" => "User gelöscht"]);
    exit;
}

echo json_encode([
    "status" => "error",
    "message" => "Ungültige Anfrage"
]);
exit;

?>