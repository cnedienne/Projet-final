<?php
header('Content-Type: application/json');

require_once '../../../connexion.php';
require_once '../../utils/traits/methods.php';
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

switch ($method) {
    case 'GET':
        // <!-- http://localhost:8085/admin/api/traits/4/1 avec get pour avoir le trait 4 de la personne 1 -->
        // <!-- http://localhost:8085/admin/api/traits avec get pour avoir tt les traits-->
        $depth_1 = 5;
        $depth_2 = 3;
        handle_get($conn,$segments,$depth_1,$depth_2);
        break;
    case 'POST':
        //     <!-- http://localhost:8085/admin/api/traits ajouter le trait de data -->
        $depth = 3;
        if (count($segments) !== $depth) {
            http_response_code(400);
            echo json_encode(['error' => 'URL invalide']);
            exit();
        }
        $trait_name  = get_json_field("trait_name",1,255);
        add_trait_to_database($conn, $trait_name);
        break;
    case 'DELETE':
         //  <!-- http://localhost:8085/admin/api/traits/1 supprime le trait 1  -->
        $depth = 4;
        if (count($segments) !== $depth) {
            http_response_code(400);
            echo json_encode(['error' => 'URL invalide POST']);
            exit();
        }

        $id_str = $segments[3];
        if (!ctype_digit($id_str)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID invalide']);
            exit();
         }

        $trait_id = (int) $id_str;

        remove_trait_from_database($conn, $trait_id);
        break;
    case 'PUT':
    case 'PATCH':
        //     <!-- http://localhost:8085/admin/api/traits/4 modifer le trait 4 et mettre data -->
        $depth = 4;
        if (count($segments) !== $depth) {
            http_response_code(400);
            echo json_encode(['error' => 'URL invalide PUT / PATCH']);
            exit();
        }
        $trait_id = $segments[3];
        if (!ctype_digit($trait_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètres invalides']);
            exit();
        }
        // il me faut un champ trait_name avec le new nom depuis le front
        $new_trait_name = get_json_field("trait_name", 1, 100);
        update_trait_in_database($conn, $trait_id, $new_trait_name);
        break;
    default:
        http_response_code(405); 
        echo json_encode(['error' => 'Methode non autorisee']);
        exit();
}


?>