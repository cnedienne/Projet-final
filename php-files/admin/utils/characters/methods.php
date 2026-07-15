<?php


function check_tables_name($table){
    if (!$table) {
        http_response_code(400);
        echo json_encode(['error' => 'No table specified']);
        exit;
    }

    $allowedTables = ['characters' ];

    if (!in_array($table, $allowedTables)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid table..']);
        exit;
    }
}


//fonction pour ajouter un characteer dans la abse des donnees a demande depuis le front
// on ajoute

function add_character_to_database($conn, $char_name, $char_title, $char_desc, $trait_tab,$image) {


    $stmt = $conn->prepare("INSERT INTO characters (char_name, char_title, char_desc, char_image) VALUES (?, ?, ?, NULL)");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation INSERT");
    }

    $stmt->bind_param("sss", $char_name, $char_title, $char_desc);
    $stmt->execute();
    $stmt->close();

    $char_id = $conn->insert_id;

    $image_name = "char_" . $char_id . ".jpg";

    $stmt = $conn->prepare("UPDATE characters SET char_image = ? WHERE char_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation UPDATE");
    }

    $stmt->bind_param("si", $image_name, $char_id);
    $stmt->execute();
    $stmt->close();

    if (is_array($trait_tab) && !empty($trait_tab)) {
        $stmt = $conn->prepare("INSERT INTO character_traits (character_id, trait_id, weight) VALUES (?, ?, ?)");
        if (!$stmt) {
            http_response_code(500);
            exit("Erreur préparation INSERT traits");
        }

        foreach ($trait_tab as $trait) {
            $trait_id = isset($trait['trait_id']) ? (int)$trait['trait_id'] : 0;
            $weight = isset($trait['weight']) ? (float)$trait['weight'] : 0;

            if ($trait_id > 0 && $weight >= 0 && $weight <= 1) {
                $stmt->bind_param("iid", $char_id, $trait_id, $weight);
                $stmt->execute();
            }
        }
        $stmt->close();
    }

    if ($image && $image['error'] === UPLOAD_ERR_OK) {
        $upload_dir = __DIR__ . '/../../../api/uploads/';
        $upload_path = $upload_dir . $image_name;

        if (!is_dir($upload_dir)) {
    http_response_code(500);
    echo json_encode(['Erreur' => 'Répertoire de destination inexistant']);
    exit();
}

if (!is_writable($upload_dir)) {
    http_response_code(500);
    echo json_encode(['Erreur' => 'Répertoire non accessible en écriture']);
    exit();
}

        if (!file_exists($image['tmp_name'])) {
            http_response_code(500);
            echo json_encode(['Erreur' => 'Fichier temporaire introuvable']);
            exit();
        }



        if (!move_uploaded_file($image['tmp_name'], $upload_path)) {
            http_response_code(500);
            echo json_encode(['Erreur' => 'Erreur lors de l’enregistrement de l’image']);
            exit();
        }
    }

    echo json_encode(['Succes' => 'Ca marche']);

}




function remove_character_from_database($conn, $char_id) {

    // Étape 1 : Récupérer le nom de l'image (si existante)
    $stmt = $conn->prepare("SELECT char_image FROM characters WHERE char_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation SELECT");
    }

    $stmt->bind_param("i", $char_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $image_name = null;
    if ($row = $result->fetch_assoc()) {
        $image_name = $row['char_image'];
    }

    // Étape 2 : Supprimer les traits associés
    $stmt = $conn->prepare("DELETE FROM character_traits WHERE character_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit();
    }

    $stmt->bind_param("i", $char_id);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM characters WHERE char_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit();
    }

    $stmt->bind_param("i", $char_id);
    $stmt->execute();
    $stmt->close();

    // Étape 4 : Supprimer l'image du dossier si elle existe
    // if ($image_name) {
    //     $image_path = __DIR__ . '/../uploads/' . basename($image_name);
    //     if (file_exists($image_path)) {
    //         unlink($image_path);
    //     }
    // }
}


function update_character_in_database($conn, $char_id, $char_name, $char_title, $char_desc, $trait_tab = []) {

    $stmt = $conn->prepare("UPDATE characters SET char_name = ?, char_title = ?, char_desc = ? WHERE char_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation UPDATE personnage");
    }

    $stmt->bind_param("sssi", $char_name, $char_title, $char_desc, $char_id);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM character_traits WHERE character_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur suppression anciens traits");
    }

    $stmt->bind_param("i", $char_id);
    $stmt->execute();
    $stmt->close();

    if (!empty($trait_tab) && is_array($trait_tab)) {
        $stmt = $conn->prepare("INSERT INTO character_traits (character_id, trait_id, weight) VALUES (?, ?, ?)");
        if (!$stmt) {
            http_response_code(500);
            exit("Erreur insertion nouveaux traits");
        }

        foreach ($trait_tab as $trait) {
            $trait_id = isset($trait['trait_id']) ? (int)$trait['trait_id'] : 0;
            $weight = isset($trait['weight']) ? (float)$trait['weight'] : 0;

            if ($trait_id > 0 && $weight >= 0 && $weight <= 1) {
                $stmt->bind_param("iid", $char_id, $trait_id, $weight);
                $stmt->execute();
            }
        }

        $stmt->close();
    }
    echo json_encode(['Succes' => 'Ca marche']);
}


function handle_get($conn, $segments, $depth_1, $depth_2) {
    $table = $segments[2];
    check_tables_name($table);

    if (count($segments) === $depth_1) {
        // admin/api/characters/4
        $stmt = $conn->prepare("SELECT * FROM characters WHERE char_id = ?");
        if (!$stmt) {
            http_response_code(500);
            exit();
        }

        $id_str = $segments[3];
        if (!ctype_digit($id_str)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID invalide']);
            exit();
        }

        $character_id = (int) $id_str;

        $stmt->bind_param("i", $character_id);
        $stmt->execute();
        $char_result = $stmt->get_result();
        $stmt->close();

        $character = $char_result->fetch_assoc();
        if (!$character) {
            echo json_encode(['error' => 'Personnage non connu']);
            exit();
        }

        $stmt = $conn->prepare("SELECT t.trait_name,t.trait_id, ct.weight 
            FROM traits t 
            JOIN character_traits ct ON ct.trait_id = t.trait_id WHERE ct.character_id = ?
            ORDER BY ct.weight DESC LIMIT 3");

        if (!$stmt) {
            http_response_code(500);
            exit();
        }

        $stmt->bind_param("i", $character_id);
        $stmt->execute();
        $traits_result = $stmt->get_result();
        $stmt->close();

        $traits = [];
        while ($row = $traits_result->fetch_assoc()) {
            $traits[] = $row;
        }

        $character['top_traits'] = $traits;
        echo json_encode($character);

    } elseif (count($segments) === $depth_2) {
        // admin/api/characters
        $stmt = $conn->prepare("SELECT * FROM characters");
        if (!$stmt) {
            http_response_code(500);
            exit();
        }

        $stmt->execute();
        $char_result = $stmt->get_result();
        $stmt->close();

        $characters = [];
        while ($character = $char_result->fetch_assoc()) {
            $char_id = $character['char_id'];

            $stmt2 = $conn->prepare("SELECT t.trait_name,t.trait_id , ct.weight 
                FROM traits t 
                JOIN character_traits ct ON ct.trait_id = t.trait_id 
                WHERE ct.character_id = ? ORDER BY ct.weight DESC LIMIT 3 ");

            if (!$stmt2) {
                http_response_code(500);
                exit();
            }

            $stmt2->bind_param("i", $char_id);
            $stmt2->execute();
            $traits_result = $stmt2->get_result();
            $stmt2->close();

            $traits = [];
            while ($row = $traits_result->fetch_assoc()) {
                $traits[] = $row;
            }

            $character['top_traits'] = $traits;
            $characters[] = $character;
        }

        echo json_encode($characters);

    } else {
        http_response_code(404);
        exit();
    }
}


?>