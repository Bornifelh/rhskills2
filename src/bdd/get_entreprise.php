<?php
include 'config.php'; // Inclure le fichier de configuration pour établir la connexion à la base de données

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Requête pour récupérer les produits
$sql = "SELECT * FROM entreprises";
$result = $conn->query($sql);

$entreprises = array();

if ($result->num_rows > 0) {
    // Parcourir chaque ligne de résultats
    while($row = $result->fetch_assoc()) {
        // Ajouter chaque produit à un tableau
        $entreprises[] = $row;
    }
}

// Convertir le tableau en JSON et l'afficher
echo json_encode($entreprises);

// Fermer la connexion
$conn->close();
?>