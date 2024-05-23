<?php
include 'config.php'; // Inclure le fichier de configuration pour établir la connexion à la base de données

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$searchTerm = $_GET['search']; // Récupérer le terme de recherche depuis la requête GET
$location = isset($_GET['location']) ? $_GET['location'] : ''; // Récupérer la localisation depuis la requête GET

// Requête pour récupérer les emplois filtrés par le terme de recherche et la localisation
$sql = "SELECT * FROM jobs WHERE poste LIKE '%$searchTerm%'";

// Ajouter une condition pour filtrer par localisation
if ($location !== '') {
    $sql .= " AND lieu LIKE '%$location%'";
}

$result = $conn->query($sql);

$jobs = array();

if ($result->num_rows > 0) {
    // Parcourir chaque ligne de résultats
    while($row = $result->fetch_assoc()) {
        // Ajouter chaque emploi à un tableau
        $jobs[] = $row;
    }
}

// Convertir le tableau en JSON et l'afficher
echo json_encode($jobs);

// Fermer la connexion
$conn->close();
?>