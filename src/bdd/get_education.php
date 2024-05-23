<?php
include 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if (isset($_GET['idUsersEducation']) && is_string($_GET['idUsersEducation'])) {
    $idUsersEducation = intval($_GET['idUsersEducation']);

    $stmt = $conn->prepare("SELECT * FROM education WHERE idUsersEducation = ?");
    $stmt->bind_param("i", $idUsersEducation);
    $stmt->execute();
    $result = $stmt->get_result();

    $education = array(); // Initialisation du tableau pour stocker toutes les expériences utilisateur

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $education[] = $row; // Ajoute chaque ligne d'expérience à l'array
        }
        echo json_encode($education); // Renvoie toutes les expériences en tant que JSON
    } else {
        echo json_encode(["error" => "Aucune éducation trouvée pour cet utilisateur"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "ID d'utilisateur invalide"]);
}

$conn->close();
?>