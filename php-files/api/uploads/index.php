<?php

// cet endpoind sert a recuperer les images char_i.xxx depuis le serveur nginx vers le front
// http://localhost:8085/api/uploads/char_n.png
// http://localhost:8085/api/uploads/char_1.jpg


require_once '../../utils/methods.php';

check_HTTP_methode($method,"GET");

$depth = 3;
$segments = parse_url_path();

if(count($segments) != $depth ){
     exit();
}

$file = $segments[2] ?? '';

if(strlen($file) < 1){
    echo "ca marche";
    exit();
}

$path = __DIR__ . '/' . basename($file);


if (!file_exists($path)) {
    http_response_code(404);
    exit("Fichier non trouvé");
}

$mime = mime_content_type($path);

header("Access-Control-Allow-Origin: *");
header("Content-Type: $mime");
header("Content-Length: " . filesize($path));

readfile($path);
exit();

?>