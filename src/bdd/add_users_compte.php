<?php
// Inclure le fichier de configuration
include 'config.php';

// Autoriser les requêtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Récupérer les données du corps de la requête JSON
$data = json_decode(file_get_contents('php://input'), true);

// Vérifier si les données ont été envoyées en POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données de la requête JSON
    $email = $data['email'];
    $password = $data['password'];

    // Connexion à la base de données
    $conn = new mysqli($servername, $username, $password_db, $dbname);

    // Vérifier la connexion
    if ($conn->connect_error) {
        die("La connexion a échoué : " . $conn->connect_error);
    }

    // Vérifier si l'email existe déjà
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Si un compte avec cet e-mail existe déjà, renvoyer une réponse JSON avec un message d'erreur
        echo json_encode(array("error" => "Vous avez déjà un compte avec cette Email"));
    } else {
        // Sinon, procéder à l'insertion des données
        // Préparer la requête SQL pour insérer les données dans la table appropriée avec une requête préparée
        $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $hashed_password);
    
        // Hasher le mot de passe
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
        // Exécuter la requête préparée
        if ($stmt->execute()) {
            // Si l'insertion est réussie, renvoyer une réponse JSON avec un message de succès
            echo json_encode(array("success" => " Votre compte a été créé avec succès"));
        } else {
            // Si l'insertion échoue, renvoyer une réponse JSON avec un message d'erreur
            echo json_encode(array("error" => "Impossible de créé votre compte maintenant, rééssayer"));
        }
    }
    
    

    // Fermer les requêtes
    $stmt->close();

    // Fermer la connexion à la base de données
    $conn->close();
} else {
    echo "Les données n'ont pas été envoyées via la méthode POST.";
}
?>