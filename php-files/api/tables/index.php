<?php

//cet endpoint c'est pour uniquement pour envoyer la table char ou celle des questions
//http://localhost:8085/api/tables/questions
//http://localhost:8085/api/tables/characters

require_once '../../utils/methods.php';
require_once '../../connexion.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$depth = 3;
$method = $_SERVER['REQUEST_METHOD'];

// est ce que ca n'as plus d'importance de voir si c'est get ou pas car c'est juste un url a check?
check_HTTP_methode($method,"GET");

$segments = parse_url_path();

if(count($segments) != $depth ){
     exit();
}


$table = $segments[$depth - 1] ?? null;

check_table_name($table);

send_json_data_from_table($conn,$table);

?>