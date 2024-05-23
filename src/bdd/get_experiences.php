<?php
include 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if (isset($_GET['idUsers']) && is_string($_GET['idUsers'])) {
    $idUsers = intval($_GET['idUsers']);

    $stmt = $conn->prepare("SELECT * FROM experiences WHERE idUsers = ?");
    $stmt->bind_param("s", $idUsers);
    $stmt->execute();
    $result = $stmt->get_result();

    $experiences = array(); // Initialisation du tableau pour stocker toutes les expériences utilisateur

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $experiences[] = $row; // Ajoute chaque ligne d'expérience à l'array
        }
        echo json_encode($experiences); // Renvoie toutes les expériences en tant que JSON
    } else {
        // http_response_code(404); // Not Found
        echo json_encode(["error" => "Aucune expérience trouvée pour cet utilisateur"]);
    }

    $stmt->close();
} else {
    // http_response_code(400); // Bad Request
    echo json_encode(["error" => "ID d'utilisateur invalide"]);
}

$conn->close();
?>