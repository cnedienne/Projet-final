<?php

// error_reporting(E_ALL);
// ini_set('display_errors', 1);

require_once '../../../connexion.php';
require_once '../../utils/questions/methods.php';
require_once '../../utils/methods.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$method = $_SERVER['REQUEST_METHOD'];
$segments = parse_url_path();


switch($method){

    case 'GET':
        // <!-- http://localhost:8085/admin/api/questions/4 avec get pour avoir la question 4 et son trait et poids-->
        // <!-- http://localhost:8085/admin/api/questions avec get pour avoir tt les questions avec leur poids-->
        $depth_1 = 4;
        $depth_2 = 3;
        if (count($segments) !== $depth_1 && count($segments) !== $depth_2) {
            http_response_code(400);
            echo json_encode(['error' => 'URL invalide']);
            exit();
        }
        handle_get($conn,$segments,$depth_1,$depth_2);
        break;

    case 'POST':
        //     <!-- http://localhost:8085/admin/api/questions ajouter la questions depuis data -->
        $depth = 3;
        if (count($segments) !== $depth) {
            http_response_code(400);
            echo json_encode(['error' => 'URL invalide']);
            exit();
        }

        // $question_text  = get_json_field("question_text",1,255);
        // $trait_id  = get_json_field("trait_id",1,255);
        // $weight  = get_json_field("weight",1,255);

        $input = file_get_contents("php://input"); 
        $data = json_decode($input, true);
        $question_text = $data["question_text"];
        $trait_id = $data["trait_id"];
        $weight = $data["weight"]; 

        add_question_to_database($conn, $question_text,$trait_id,$weight);
        break;
    case 'DELETE':
         //  <!-- http://localhost:8085/admin/api/questions/1 supprime la question 1  -->
        $depth = 4;
        if (count($segments) !== $depth) {
            http_response_code(400);
            echo json_encode(['error' => 'URL invalide']);
            exit();
        }

        $id_str = $segments[3];
        if (!ctype_digit($id_str)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID invalide']);
            exit();
        }

        $question_id = (int) $id_str;

        remove_question_from_database($conn, $question_id);
        break;
    case 'PUT':
    case 'PATCH':
        //     <!-- http://localhost:8085/admin/api/questions/4 modifer la question 4 et mettre la valeur le poids au trait -->
        $depth = 4;
        if (count($segments) !== $depth) {
            http_response_code(400);
            echo json_encode(['error' => 'URL invalide']);
            exit();
        }

        $id_str = $segments[3];
        if (!ctype_digit($id_str)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID invalide']);
            exit();
        }

        $question_id = (int) $id_str;

        // il me faut un champ question_text avec le new text depuis le front
        $input = file_get_contents("php://input"); 
        $data = json_decode($input, true);
        $new_question_text = $data["question_text"];
        $trait_id = $data["trait_id"];
        $weight = $data["weight"]; 

        update_question_in_database($conn, $question_id, $new_question_text,$trait_id,$weight);
        break;
    default:
        http_response_code(405); 
        echo json_encode(['error' => 'Methode non autorisee']);
        exit();

}

?>