<?php

function check_tables_name($table){
    if (!$table) {
        http_response_code(400);
        echo json_encode(['error' => 'No table specified']);
        exit;
    }

    $allowedTables = ['questions', 'questions_traits' ];

    if (!in_array($table, $allowedTables)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid table..']);
        exit;
    }
}

function add_question_to_database($conn, $question_text, $trait_id,$weight) {

    $stmt = $conn->prepare("INSERT INTO questions (question_text) VALUES (?)");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation INSERT");
    }

    $stmt->bind_param("s", $question_text);
    $stmt->execute();
    $stmt->close();

    $question_id = $conn->insert_id;

    $stmt = $conn->prepare("INSERT INTO question_traits (question_id, trait_id, weight) VALUES (?, ?, ?)");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur INSERT trait-question");
    }

    $stmt->bind_param("iid", $question_id, $trait_id,$weight);
    $stmt->execute();
    $stmt->close();
    echo json_encode(['Succes' => 'Question added']);
}



// function add_question_to_database($conn, $question_text) {

//     $stmt = $conn->prepare("INSERT INTO questions (question_text) VALUES (?)");
//     if (!$stmt) {
//         http_response_code(500);
//         exit("Erreur préparation INSERT");
//     }

//     $stmt->bind_param("s", $question_text);
//     $stmt->execute();
//     $stmt->close();

//     $question_id = $conn->insert_id;

//     $stmt = $conn->prepare("SELECT trait_id FROM traits");
//     if (!$stmt) {
//         http_response_code(500);
//         exit("Erreur SELECT traits");
//     }

//     $stmt->execute();
//     $result = $stmt->get_result();
//     $stmt->close();

//     $stmt = $conn->prepare("INSERT INTO question_traits (question_id, trait_id, weight) VALUES (?, ?, 0)");
    
//     if (!$stmt) {
//         http_response_code(500);
//         exit("Erreur INSERT traits-question");
//     }

//     while ($row = $result->fetch_assoc()) {
//         $trait_id = $row['trait_id'];
//         $stmt->bind_param("ii", $question_id, $trait_id);
//         $stmt->execute();
//     }

//     $stmt->close();
// }

function remove_question_from_database($conn, $question_id) {

    $stmt = $conn->prepare("DELETE FROM question_traits WHERE question_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation DELETE traits");
    }

    $stmt->bind_param("i", $question_id);
    $stmt->execute();
    $stmt->close();


    $stmt = $conn->prepare("DELETE FROM questions WHERE question_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation DELETE question");
    }

    $stmt->bind_param("i", $question_id);
    $stmt->execute();
    $stmt->close();
}



function update_question_in_database($conn, $question_id, $question_text, $trait_id, $weight) {

    $stmt = $conn->prepare("UPDATE questions SET question_text = ? WHERE question_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation UPDATE question");
    }

    $stmt->bind_param("si", $question_text, $question_id);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("UPDATE question_traits SET trait_id = ?, weight = ? WHERE question_id = ?");
    if (!$stmt) {
        http_response_code(500);
        exit("Erreur préparation UPDATE traits");
    }

    $stmt->bind_param("idi",$trait_id, $weight, $question_id);
    $stmt->execute();
    $stmt->close();
 
}

function handle_get($conn, $segments, $depth_1, $depth_2) {
    $table = $segments[2];
    check_tables_name($table);

    if (count($segments) === $depth_2) {
        // 1. Récupère toutes les questions
        $questions = [];
        $stmt = $conn->prepare("SELECT question_id, question_text FROM questions");
        if (!$stmt) {
            http_response_code(500);
            exit();
        }
        $stmt->execute();
        $res = $stmt->get_result();
        while ($row = $res->fetch_assoc()) {
            $row['traits'] = []; // pré-remplir pour l'étape suivante
            $questions[$row['question_id']] = $row;
        }
        $stmt->close();

        // 2. Récupère tous les traits liés aux questions
        $stmt = $conn->prepare("
            SELECT qt.question_id, qt.trait_id, t.trait_name, qt.weight
            FROM question_traits qt
            JOIN traits t ON qt.trait_id = t.trait_id
        ");
        if (!$stmt) {
            http_response_code(500);
            exit();
        }
        $stmt->execute();
        $res = $stmt->get_result();
        while ($row = $res->fetch_assoc()) {
            $q_id = $row['question_id'];
            if (isset($questions[$q_id])) {
                $questions[$q_id]['traits'][] = [
                    'trait_id' => $row['trait_id'],
                    'trait_name' => $row['trait_name'],
                    'weight' => $row['weight'],
                ];
            }
        }
        $stmt->close();

        // 3. Réindexation
        $data = array_values($questions);
        echo json_encode($data);

    } else if (count($segments) === $depth_1) {
        // Exemple : /admin/api/questions/4 (récupère une seule question + ses traits)
        $question_id = intval($segments[3]);

        // Récupère la question
        $stmt = $conn->prepare("SELECT question_id, question_text FROM questions WHERE question_id = ?");
        if (!$stmt) {
            http_response_code(500);
            exit();
        }
        $stmt->bind_param("i", $question_id);
        $stmt->execute();
        $res = $stmt->get_result();
        $question = $res->fetch_assoc();
        $stmt->close();

        if (!$question) {
            http_response_code(404);
            echo json_encode(['error' => 'Question non trouvée']);
            return;
        }

        // Récupère les traits associés
        $stmt = $conn->prepare("
            SELECT qt.trait_id, t.trait_name, qt.weight
            FROM question_traits qt
            JOIN traits t ON qt.trait_id = t.trait_id
            WHERE qt.question_id = ?
        ");
        if (!$stmt) {
            http_response_code(500);
            exit();
        }
        $stmt->bind_param("i", $question_id);
        $stmt->execute();
        $res = $stmt->get_result();
        $question['traits'] = [];
        while ($row = $res->fetch_assoc()) {
            $question['traits'][] = $row;
        }
        $stmt->close();

        echo json_encode($question);
    } else {
        http_response_code(404);
        exit();
    }
}


?>
