<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION['username'])) {
    echo json_encode([
        "auth" => true,
        "username" => $_SESSION['username']
    ]);
} else {
    echo json_encode([
        "auth" => false,
    ]);
}
