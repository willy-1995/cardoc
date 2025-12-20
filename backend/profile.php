<?php
//Works as getter for auth
require_once __DIR__ . "/auth.php";

echo json_encode([
    "success" => true,
    "message" => "Willkommen!",
    "user_id" => $userId,
    "email" => $email
]);

?>