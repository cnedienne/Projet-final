<?php
session_start();

// 🔐 Autoriser les requêtes cross-origin depuis React
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// ✅ Si l'utilisateur est déjà connecté, on renvoie directement
if (isset($_SESSION['username'])) {
    echo json_encode([
        "auth" => true,
        "message" => "Déjà connecté",
        "username" => $_SESSION['username'],
        "redirect" => "/admin/" . $_SESSION['username']
    ]);
    exit;
}

require_once '../utils/methods.php';
require_once '../connexion.php';

// 🔎 Récupération des données POST
$username = isset($_POST['username']) ? strtolower(trim($_POST['username'])) : null;
$password = isset($_POST['password']) ? trim($_POST['password']) : null;
$lgn      = isset($_POST['lgn']) ? true : false;

$response = [
  "success" => false,
  "message" => "Données manquantes"
];

// 🔁 Si c’est une tentative de connexion
if ($lgn && $username && $password) {
    $hashed_pswd = hash('sha256', $password);

    $sql = "SELECT username, password FROM users WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);

        if ($row['password'] === $hashed_pswd) {
            $_SESSION['username'] = $username;

            $response = [
                "success" => true,
                "message" => "Connexion réussie",
                "username" => $username,
                "redirect" => "/admin/$username"
            ];
        } else {
            $response["message"] = "Mot de passe incorrect";
        }
    } else {
        $response["message"] = "Utilisateur non trouvé";
    }
}

// 📤 Réponse JSON finale
echo json_encode($response);
