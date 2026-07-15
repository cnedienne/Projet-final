<?php

$number_of_questions = 0;


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

    // voir si je laisse que les char et les questions
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

function send_json_data_from_table($conn,$table){

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



//function qui permet de verfier si l'utilisateur a repondu a toute les question
// la variable number_of_questions a etait initialisée lors que l'envoi des questions

function  check_if_all_questions_are_answered($data){
    global $number_of_questions;
    return  count($data)  == $number_of_questions ;
}


// fonction pour generer un cookie aleatoire de 32 characters puis hasher en sha256
function generate_cookie(){
    $cookie = bin2hex(random_bytes(16));
    return hash('sha256',$cookie);
}

function delete_cookie_from_client(){
    setcookie('_cid', '', time() - 3600, '/');
}


//fonction pour retirer le cookie recu depuis la base des donnees
// et depuis le navigateur du client 
// peut etre utilise pour retirer car le client a fini de repondre

function delete_cookie_from_table($conn){

    if (isset($_COOKIE['_cid'])) {

        $cookie = $_COOKIE['_cid'];
        
        $stmt = $conn->prepare("DELETE FROM user_cookies WHERE cookie_id = ?");

        if (!$stmt) {
            http_response_code(500);
            exit;
        }

        $stmt->bind_param("s", $cookie);
        $stmt->execute();
        $stmt->close();
        
        delete_cookie_from_client();
    }

}

//function pour ajouter un cookie et les reponses actuels du client vers la base
// afin de reprendre les questions ou autre ...
function save_progression($conn, $cookie, $data) {

    $data_string = implode(":", $data);

    $stmt = $conn->prepare("INSERT INTO user_cookies (cookie_id, answers) VALUES (?, ?) ON DUPLICATE KEY UPDATE answers = VALUES(answers) ");

    if (!$stmt) {
        http_response_code(500);
        exit;
    }

    $stmt->bind_param("ss", $cookie, $data_string);
    $stmt->execute();
}




?>