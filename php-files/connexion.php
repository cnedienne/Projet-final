<?php

//mettre dans un ficher cacher ...

$host = 'mariadb';
$db   = 'web_app';
$user = 'rapidcode';
$pass = 'password';
$charset = 'utf8mb4';

// error_reporting(0);


$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    exit;
}


?>
