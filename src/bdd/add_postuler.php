<?php
require 'config.php';  // Inclure le fichier config.php

$target_dir = "uploads/";
$uploadOk = 1;
$maxFileSize = 5000000; // 5MB

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES["myFile"])) {
    $fileTmpPath = $_FILES['myFile']['tmp_name'];
    $fileName = $_FILES['myFile']['name'];
    $fileSize = $_FILES['myFile']['size'];
    $fileType = $_FILES['myFile']['type'];
    $target_file = $target_dir . basename($fileName);
    $fileExtension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    $allowedTypes = ['pdf'];  // Extensions autorisées
    $allowedMimeTypes = ['application/pdf'];  // MIME types autorisés

    if (!in_array($fileExtension, $allowedTypes) || !in_array($fileType, $allowedMimeTypes)) {
        echo "Erreur: Seuls les fichiers PDF sont autorisés.";
        $uploadOk = 0;
    }

    if ($fileSize > $maxFileSize) {
        echo "Erreur: Le fichier est trop volumineux.";
        $uploadOk = 0;
    }

    if ($uploadOk == 0) {
        echo "Désolé, votre fichier n'a pas été téléchargé.";
    } else {
        if (move_uploaded_file($fileTmpPath, $target_file)) {
            echo "Le fichier ". htmlspecialchars(basename($fileName)). " a été téléchargé.";

            // Utilisation de la fonction connect() définie dans config.php
            $conn = connect();

            $sql = $conn->prepare("INSERT INTO postuler (filename, filepath) VALUES (?, ?)");
            $sql->bind_param("ss", $fileName, $target_file);

            if ($sql->execute()) {
                echo "Nouveau enregistrement créé avec succès";
            } else {
                echo "Erreur: " . $sql->error;
            }

            $sql->close();
            $conn->close();
        } else {
            echo "Désolé, une erreur est survenue lors de l'upload de votre fichier.";
        }
    }
} else {
    echo "Aucun fichier n'a été uploadé.";
}
?>