<?php
include 'config.php'; // Inclure le fichier de configuration pour établir la connexion à la base de données

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Vérifie si l'ID de l'entreprise est passé en tant que paramètre GET
if(isset($_GET['idEntreprise'])) {
    // L'id de l'entreprise passé dans la requête
    $idEntreprise = $_GET['idEntreprise'];

    // Requête pour récupérer les emplois par ID de l'entreprise
    $sql = "SELECT * FROM jobs WHERE idEntreprise = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idEntreprise); // "i" pour indiquer un entier
    $stmt->execute();

    $result = $stmt->get_result();

    $jobs = array();

    if ($result->num_rows > 0) {
        // Parcourir chaque ligne de résultats
        while($row = $result->fetch_assoc()) {
            // Ajouter chaque produit à un tableau
            $jobs[] = $row;
        }
    }

    // Convertir le tableau en JSON et l'afficher
    echo json_encode($jobs);
} else {
    // Si l'ID de l'entreprise n'est pas fourni, retourner un message d'erreur
    echo "ID d'entreprise non fourni.";
}

// Fermer la connexion
$conn->close();
?>