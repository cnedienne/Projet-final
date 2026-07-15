<?php


function check_tables_name($table){
    if (!$table) {
        http_response_code(400);
        echo json_encode(['error' => 'No table specified']);
        exit;
    }

    $allowedTables = ['traits', 'character_traits' ];

    if (!in_array($table, $allowedTables)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid table..']);
        exit;
    }
}


function add_trait_to_database($conn, $trait_name) {

    $stmt = $conn->prepare("INSERT INTO traits (trait_name) VALUES (?)");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation INSERT trait");
    }

    $stmt->bind_param("s", $trait_name);
    $stmt->execute();
    $stmt->close();

    $trait_id = $conn->insert_id;

    $stmt = $conn->prepare("SELECT char_id FROM characters");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur SELECT characters");
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    // pour chaque personnage  inserer le trait a 0
    $stmt = $conn->prepare("INSERT INTO character_traits (character_id, trait_id, weight) VALUES (?, ?, 0)");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur INSERT character_traits");
    }

    while ($row = $result->fetch_assoc()) {
        $char_id = $row['char_id'];
        $stmt->bind_param("ii", $char_id, $trait_id);
        $stmt->execute();
    }

    $stmt->close();
    echo json_encode(['Succes' => 'Ajout avec succes']);
}


function remove_trait_from_database($conn, $trait_id) {

    $stmt = $conn->prepare("DELETE FROM character_traits WHERE trait_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur DELETE character_traits");
    }

    $stmt->bind_param("i", $trait_id);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM question_traits WHERE trait_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur DELETE question_traits");
    }

    $stmt->bind_param("i", $trait_id);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM traits WHERE trait_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur DELETE trait");
    }

    $stmt->bind_param("i", $trait_id);
    $stmt->execute();
    $stmt->close();
     echo json_encode(['Succes' => 'Ajout avec succes']);
}



function update_trait_in_database($conn, $trait_id, $new_trait_name) {
    $stmt = $conn->prepare("UPDATE traits SET trait_name = ? WHERE trait_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation UPDATE trait");
    }

    $stmt->bind_param("si", $new_trait_name, $trait_id);
    $stmt->execute();
    $stmt->close();
    echo json_encode(['Succes' => 'Ajout avec succes']);
}


function handle_get($conn, $segments, $depth_with_ids, $depth_table_only) {

    if (count($segments) != $depth_with_ids && count($segments) != $depth_table_only) {
        http_response_code(400);
        echo json_encode(['error' => 'URL .. invalide']);
        exit();
    }

    $table = $segments[2];

    check_tables_name($table);

    if (count($segments) === $depth_with_ids) {
        //  admin/api/traits/4/1
        $trait_id = $segments[3];
        $char_id = $segments[4];

        $stmt = $conn->prepare("SELECT * FROM character_traits WHERE trait_id = ? AND character_id = ?");
        if (!$stmt) {
            http_response_code(500);
            exit();
        }

        $stmt->bind_param("ii", $trait_id, $char_id);

    } else{
        if(count($segments) === $depth_table_only) {
        // /api/traits
        $stmt = $conn->prepare("SELECT * FROM traits");
        if (!$stmt) {
            http_response_code(500);
            exit();
        }

        } else {
            http_response_code(404);
            exit();
        }
    }


    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}

?>