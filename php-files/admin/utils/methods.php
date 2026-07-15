<?php 

// session_start(); ???




//function pour recuperer les element de l'url et faire une bonne api rest sans .php
function parse_url_path() {
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    $trimmed_path = trim($path, '/');

    if (empty($trimmed_path)) {
        return [];
    }

    return explode('/', $trimmed_path);
}



//fonction qui va nous permet de check si on a un nom de table valide
function check_table_name($table){
    if (!$table) {
        http_response_code(400);
        echo json_encode(['error' => 'No table specified']);
        exit;
    }

    // voir si je rajoute les autres car admin ?
    $allowedTables = ['characters', 'questions' ];

    if (!in_array($table, $allowedTables)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid table']);
        exit;
    }
}


function check_HTTP_methode($method_tested,$method_wanted){    
    if ($method_tested !== $method_wanted) {
        http_response_code(405);
        echo json_encode(["error" => "Méthode non autorisée"]);
        exit;
    }
}



//function qui va servir a recuperer les donnees
//sous format json des differentes tables

function get_table($conn,$table){

    $stmt = $conn->prepare("SELECT * FROM `$table`");

    if (!$stmt) {
        http_response_code(500);
        exit;
    }

    $stmt->execute();

    $result = $stmt->get_result();
    $stmt->close();

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    $number_of_questions = count($data);
    header('Content-Type: application/json');
    echo json_encode($data);
}


function get_json_field($field_name, $min_length = 1, $max_length = 255) {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Données JSON invalides']);
        exit();
    }

    if (!isset($data[$field_name])) {
        http_response_code(400);
        echo json_encode(['error' => "Champ requis manquant : $field_name"]);
        exit();
    }

    $value = $data[$field_name];

    if (is_string($value)) {
        $value = trim($value);
        if (strlen($value) < $min_length || strlen($value) > $max_length) {
            http_response_code(400);
            echo json_encode([
                'error' => "Le champ '$field_name' doit contenir entre $min_length et $max_length caractères"
            ]);
            exit();
        }
        return $value;
    }

    if (is_array($value)) {

        if (count($value) < $min_length) {
            http_response_code(400);
            echo json_encode([
                'error' => "Le champ '$field_name' doit contenir au moins $min_length élément(s)"
            ]);
            exit();
        }
        return $value;
    }

    // http_response_code(400);
    echo json_encode(['success' => "success"]);
    exit();
}

















function check_image($image){

    $char_id = $_GET['char_id'] ?? null;

    if (!$char_id || !isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Requête invalide']);
        exit;
    }

    $upload_dir = __DIR__ . '/../uploads/';
    $max_size = 5 * 1024 * 1024; // 5 mo

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $_FILES['image']['tmp_name']);
    finfo_close($finfo);

    $allowed_types = [
        'image/png'  => '.png',
        'image/jpeg' => '.jpg',
        'image/webp' => '.webp'
    ];

    if (!isset($allowed_types[$mime])) {
        http_response_code(400);
        echo json_encode(['error' => 'Type non autorisé']);
        exit;
    }

    if ($_FILES['image']['size'] > $max_size) {
        http_response_code(400);
        echo json_encode(['error' => 'Fichier trop volumineux']);
        exit;
    }

    $ext = $allowed_types[$mime];
    $image_name = "char_" . intval($char_id) . $ext;
    $target_file = $upload_dir . $image_name;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
        echo json_encode(['success' => true, 'filename' => $image_name]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Échetal de traitsc upload']);
    }

}



?>