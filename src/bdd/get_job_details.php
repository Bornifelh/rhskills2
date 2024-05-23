<?php
include 'config.php'; // Inclure le fichier de configuration pour établir la connexion à la base de données

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Vérifier si l'identifiant du poste est présent dans la requête et est un nombre entier valide
if(isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = $_GET['id'];

    // Requête préparée pour récupérer les détails du poste avec l'identifiant spécifié
    $stmt = $conn->prepare("SELECT * FROM jobs WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Renvoyer les détails du poste sous forme de JSON
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        // Si aucun poste n'est trouvé avec cet identifiant, renvoyer une réponse vide
        echo json_encode([]);
    }
} else {
    // Si aucun identifiant de poste valide n'est fourni, renvoyer une réponse vide avec un code d'erreur
    http_response_code(400);
    echo json_encode(["error" => "Invalid or missing job ID"]);
}

// Fermer la connexion
$stmt->close();
$conn->close();
?>