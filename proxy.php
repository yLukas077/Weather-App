<?php
// Verifica se há uma consulta na URL
if(isset($_GET['query'])) {
    $query = urlencode($_GET['query']);
    $url = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${query}&limit=5&offset=0&hateoasMode=false";

    // Inicializa o cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);       

    $data = curl_exec($ch);
    curl_close($ch);

    // Define o cabeçalho como JSON
    header('Content-Type: application/json');
    // Permite CORS
    header('Access-Control-Allow-Origin: *');

    echo $data;
} else {
    // Retorna erro se não houver consulta
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(['error' => 'Query not provided']);
}
