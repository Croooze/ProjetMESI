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

// Récupérer les données du pseudo et du temps depuis la base de données
$sql = "SELECT pseudo, temps FROM user ORDER BY temps ASC LIMIT 1";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Afficher les données du pseudo et du temps
    $row = $result->fetch_assoc();
    $pseudo = $row["pseudo"];
    $temps = $row["temps"];
    echo "Le meilleur temps est de $temps secondes réalisé par $pseudo";
} else {
    echo "Aucun utilisateur n'a encore joué.";
}

$conn->close();
?>
