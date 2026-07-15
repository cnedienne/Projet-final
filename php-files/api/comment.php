<?php
// <!-- lui il va servir a save dans la base des donnes les commentaires des clients avec un nom
// faire gaffe aux injection de code tt ca -->


$method = $_SERVER['REQUEST_METHOD'];

check_HTTP_methode($method,"POST");

$data = json_decode(file_get_contents("php://input"), true);

if(!is_array($data)){
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input format, expected array']);
    exit;
}

//   {
//     "cookie_id": "9fa1c15e7c0b92e10e573fb9e3bca671",
//     "nom": "Alice",
//     "commentaire": "J'ai adoré le résultat ! Très pertinent 👏",
//     "date": "2025-06-13T15:42:00Z",
//   },

// tester les injection de code ?

foreach($data as $item){
    if (!isset($item['cookie_id']) || !isset($item['nom'])
    || !isset($item['commentaire']) || !isset($item['date'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input (question/answers) from client']);
        exit;
    }
}









?>
