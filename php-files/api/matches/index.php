<?php

//http://localhost:8085/api/matches/


require_once '../../utils/methods.php';
require_once '../../connexion.php';
require_once '../../utils/personality.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$depth = 2;
$method = $_SERVER['REQUEST_METHOD'];

check_HTTP_methode($method,"POST");

$segments = parse_url_path();

if(count($segments) != $depth ){
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if(!is_array($data)){
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input format, expected array']);
    exit;
}

foreach($data as $item){
    if (!isset($item['question_id']) || !isset($item['score'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input (question/answers) from client']);
        exit;
    }
}

//§§§§ retirer le not §§§§
if(!check_if_all_questions_are_answered($data)){

    $personalities = calculate_vectors_for_characters($conn);
    $user_personality = calculate_vector($conn,$data);
    $closest_char = find_closest_character($conn,$personalities,$user_personality);
    $user_vector_with_traits = user_vector_with_trait_names($conn, $user_personality);

    echo json_encode([
        'closest_character' => $closest_char,
        'user_vector' => $user_vector_with_traits
    ]);

}
else{
    save_progression($conn,$cookie,$data);
    echo json_encode(["message" => "Votre progression est enregister"]);
}

?>