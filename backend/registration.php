<?php

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Methode nicht erlaubt
    echo json_encode(["success" => false, "message" => "Anfrage fehlgeschlagen."]);
    exit;
}

//===== GET POST DATA

$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];

if (empty($username) || empty($email) || empty($password)) {
    http_response_code(400); //bad request code
    echo json_encode(["success"=> false,"message"=> "Bitte fülle alle Felder aus."]);
    exit;
}

//===== DATABASE HANDLING
//*credentials include */
$dsn ="mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Wichtig: Fehlermodus auf Exceptions setzen
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false, // Wichtig: Deaktiviert die Emulation für echte Prepared Statements
];

try{

} catch (PDOException $e) {

}


?>