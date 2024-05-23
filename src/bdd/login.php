<?php
include 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['email']) || !isset($data['password'])) {
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Tous les champs sont requis."));
        exit();
    }

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("message" => "Erreur de connexion à la base de données."));
        exit();
    }

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $data['email']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($data['password'], $user['password'])) {
            http_response_code(200);
            echo json_encode(array("message" => "Connexion réussie", "user_id" => $user['id'], "user_email" => $user['email']));
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(array("message" => "Identifiants invalides."));
        }
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "Aucun compte trouvé avec cet e-mail."));
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Méthode non autorisée."));
}
?>