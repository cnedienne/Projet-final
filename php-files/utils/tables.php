<?php

//cet endpoint c'est pour uniquement pour envoyer la table char ou celle des questions
//http://localhost:8085/api/tables/questions
//http://localhost:8085/api/tables/characters

require_once '../utils/methods.php';
require_once '../connexion.php';

// $method = $_SERVER['REQUEST_METHOD'];

$segments = parse_url_path();

if(count($segments) != 3 ){
     echo json_encode(['error' => 'Nonono']);
}

// est ce que ca n'as plus d'importance de voir si c'est get ou pas car c'est juste un url a check?
// check_HTTP_methode($method,"GET");

$table = $table = $segments[2] ?? null;

check_table_name($table);

send_json_data_from_table($conn,$table);

?>