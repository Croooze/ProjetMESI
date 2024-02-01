<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guessnumber";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

// Traitement du formulaire d'inscription
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pseudo = $_POST["pseudo"];
    $temps = $_POST["temps"];

    // Insertion des données dans la base de données
    $sql = "INSERT INTO user (pseudo, temps) VALUES ('$pseudo', '$temps')";

    if ($conn->query($sql) === TRUE) {
        echo "Nouvel utilisateur créé avec succès";
    } else {
        echo "Erreur : " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
