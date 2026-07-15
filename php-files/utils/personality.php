<?php

// error_reporting(0);

//fonction qui va permettre de calculer "la personnalite" de chaque personnage
// selon ce qui est def dans la base de donnees
//elle renvoi un tableau avec 
function calculate_vectors_for_characters($conn){

    $vectors = [];

    $stmt = $conn->prepare("SELECT character_id, trait_id, weight FROM character_traits");
    
    if (!$stmt) {
        http_response_code(500);
        exit;
    }

    $stmt->execute();
    $result = $stmt->get_result();

    // Parcours chaque ligne du résultat
    while ($row = $result->fetch_assoc()) {
        $charId = (int)$row['character_id'];
        $traitId = (int)$row['trait_id'];
        $value = (float)$row['weight'];

        if (!isset($vectors[$charId])) {
            $vectors[$charId] = [];
        }

        $vectors[$charId][$traitId] = $value;
    }

    $stmt->close();

    // [character_id => [trait_id => weight, ...], ...]
    return $vectors;
}


//function qui va renvoyer le personnage le plus proche juste son id dans la tables des char de la personalite de
// l'utilisateur

function find_closest_character($conn, $personalities_vector, $user_vector) {
    $minDistance = PHP_INT_MAX;
    $closestCharacterId = -1;

    foreach ($personalities_vector as $characterId => $characterVector) {
        $distance = 0.0;

        foreach ($user_vector as $traitId => $userScore) {
            $charScore = $characterVector[$traitId] ?? 0;
            $distance += pow($userScore - $charScore, 2);
        }

        $distance = sqrt($distance); // distance euclidienne

        if ($distance < $minDistance) {
            $minDistance = $distance;
            $closestCharacterId = $characterId;
        }
    }

    if ($closestCharacterId === -1) {
        return ['error' => 'Aucun personnage trouvé'];
    }

    $stmt = $conn->prepare("SELECT * FROM characters WHERE char_id = ?");

    if (!$stmt) {
        http_response_code(500);
        exit("Erreur de requête personnage");
    }

    $stmt->bind_param("i", $closestCharacterId);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $characterInfo = $result->fetch_assoc();
    return $characterInfo ?: ['error' => 'Personnage introuvable'];
}


function calculate_vector($conn, $user_answers) {
    $traitScores = [];
    $traitWeights = [];

    $sql = "SELECT question_id, trait_id, weight FROM question_traits WHERE question_id = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        http_response_code(500);
        exit;
    }

    foreach ($user_answers as $answer) {
        $question_id = $answer['question_id'];
        $score = ($answer['score'] + 2) / 4;

        $stmt->bind_param("i", $question_id);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            $trait_id = $row['trait_id'];
            $weight = $row['weight'];

            if (!isset($traitScores[$trait_id])) {
                $traitScores[$trait_id] = 0;
                $traitWeights[$trait_id] = 0;
            }

            $traitScores[$trait_id] += $score * $weight;
            $traitWeights[$trait_id] += $weight;
        }
    }

    $stmt->close();

    // ⚠ Normalisation : éviter les divisions par zéro
    foreach ($traitScores as $trait_id => &$value) {
        if (isset($traitWeights[$trait_id]) && $traitWeights[$trait_id] > 0) {
            $value /= $traitWeights[$trait_id];
        }
    }

    return $traitScores;
}



function user_vector_with_trait_names($conn, $vector) {
    $result = [];

    $trait_ids = array_keys($vector);
    if (empty($trait_ids)) return [];

    $placeholders = implode(',', array_fill(0, count($trait_ids), '?'));
    $types = str_repeat('i', count($trait_ids));

    $sql = "SELECT trait_id, trait_name FROM traits WHERE trait_id IN ($placeholders)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        http_response_code(500);
        exit();
    }

    $stmt->bind_param($types, ...$trait_ids);
    $stmt->execute();
    $res = $stmt->get_result();

    $idToName = [];
    while ($row = $res->fetch_assoc()) {
        $idToName[$row['trait_id']] = $row['trait_name'];
    }
    $stmt->close();

    foreach ($vector as $trait_id => $value) {
        $result[] = [
            'trait_id' => $trait_id,
            'trait_name' => $idToName[$trait_id] ?? 'Inconnu',
            'value' => $value
        ];
    }

    return $result;
}

?>