<?php


// error_reporting(0);

require_once '../../../connexion.php';
require_once '../../utils/characters/methods.php';
require_once '../../utils/methods.php';

// header('Content-Type: application/json');
// // header("Access-Control-Allow-Origin: *");

// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");

// $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
// $allowed_origins = ['http://localhost:5173'];

// if (in_array($origin, $allowed_origins)) {
//     header("Access-Control-Allow-Origin: $origin");
//     header("Access-Control-Allow-Credentials: true");
// }

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     http_response_code(200);
//     exit();
// }


//$origin = $_SERVER['HTTP_ORIGIN'] ?? '';


//$allowed_origins = ['http://localhost:5173'];

//if (in_array($origin, $allowed_origins)) {
    //header("Access-Control-Allow-Origin: $origin");
    //header("Access-Control-Allow-Credentials: true");
//}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
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
                http://localhost:8085/admin/table
        // <!-- http://localhost:8085/admin/api/character/4 avec get pour avoir le personnage 4 et les 3 trait dominants-->
        // <!-- http://localhost:8085/admin/api/characters avec get pour avoir les personnages et les 3 traits domiants de chacun et leur id et poids-->
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
        // <!-- http://localhost:8085/admin/api/characters ajouter la personne depuis data -->
        $depth = 3;
        if (count($segments) !== $depth) {
            http_response_code(400);
            echo json_encode(['error' => 'URL invalide']);
            exit();
        }
        $char_name = $_POST['char_name'] ?? '';
        $char_title = '';
        $char_desc = $_POST['char_desc'] ?? '';
        $trait_tab = json_decode($_POST['trait_tab'] ?? '[]', true);
        $image = $_FILES['image'] ?? null;
        add_character_to_database($conn, $char_name, $char_title, $char_desc, $trait_tab,$image);
        break;


     case 'DELETE':
         //  <!-- http://localhost:8085/admin/api/characters/1 supprime le perso 1  -->
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

        remove_character_from_database($conn, $question_id);
        break;
    case 'PUT':
    case 'PATCH':
        //     <!-- http://localhost:8085/admin/api/character/4 modifer le gars 4 et mettre la valeurs de la requete -->
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

        $char_id = (int) $id_str;

        $input = file_get_contents("php://input");
        $data = json_decode($input, true);
        $trait_tab = $data["trait_tab"];
        $new_char_name = $data["char_name"];
        $new_char_desc = $data["char_desc"];
        $new_char_title = $data["char_title"];

        // echo $new_char_name;

        update_character_in_database($conn, $char_id, $new_char_name, $new_char_title, $new_char_desc,$trait_tab);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Methode non autorisee']);
        exit();
}

?>
