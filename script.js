// game.js

let hiddenNumber;
let startTime;
let timerInterval;

function startGame() {
    // Si hiddenNumber n'est pas défini, générer un chiffre aléatoire entre 1 et 1000
    if (!hiddenNumber) {
        hiddenNumber = Math.floor(Math.random() * 10) + 1;
        startTime = new Date().getTime(); // Enregistrez le temps de début du jeu
        timerInterval = setInterval(updateTimer, 1000); // Lancer le chronomètre
    }

    // Récupérer la valeur saisie par l'utilisateur
    let userGuessInput = document.getElementById('userGuess');
    let userGuess = parseInt(userGuessInput.value);

    // Vérifier si le chiffre est inférieur, égal ou supérieur au chiffre caché
    if (!isNaN(userGuess)) {
        if (userGuess < hiddenNumber) {
            document.querySelector('.chiffreInf').textContent = `Le chiffre caché est supérieur à ${userGuess}.`;
            document.querySelector('.chiffreSupp').textContent = ''; // Réinitialiser le texte
        } else if (userGuess > hiddenNumber) {
            document.querySelector('.chiffreSupp').textContent = `Le chiffre caché est inférieur à ${userGuess}.`;
            document.querySelector('.chiffreInf').textContent = ''; // Réinitialiser le texte
        } else {
            document.querySelector('.chiffreInf').textContent = '';
            document.querySelector('.chiffreSupp').textContent = `Félicitations, vous avez gagné ! Le chiffre caché était ${hiddenNumber}.`;

            // Arrêter le chronomètre
            clearInterval(timerInterval);
            displayElapsedTime();

            // Afficher le bouton "Recommencer"
            showRestartButton();

            // Réinitialiser le jeu pour permettre de rejouer
            resetGame();
        }

        // Effacer le contenu de la barre de recherche
        userGuessInput.value = '';
    } else {
        alert("Veuillez entrer un nombre valide.");
    }
}

function resetGame() {
    // Réinitialiser les éléments nécessaires pour recommencer
    hiddenNumber = null;
    startTime = null;
    timerInterval = null;

    // Réinitialiser le contenu des divs
    document.querySelector('.chiffreInf').textContent = '';
    document.querySelector('.chiffreSupp').textContent = '';
    document.querySelector('time').textContent = '00:00:00';

    // Cacher le bouton "Recommencer"
    hideRestartButton();
}

function updateTimer() {
  // Mettez à jour le contenu de la balise time avec le temps écoulé
  let currentTime = new Date().getTime();
  let elapsedTime = currentTime - startTime;
  let formattedTime = formatTime(elapsedTime);
  document.querySelector('time').textContent = formattedTime;
}


function formatTime(milliseconds) {
  let minutes = Math.floor(milliseconds / (60 * 1000));
  let seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  let remainingMilliseconds = milliseconds % 1000;
  return `${padZero(minutes)}:${padZero(seconds)}:${padZero(remainingMilliseconds)}`;
}

function padZero(num) {
    // Ajoute un zéro devant un nombre si celui-ci est inférieur à 10
    return (num < 10 ? '0' : '') + num;
}

function displayElapsedTime() {
    // Affiche le temps total écoulé à la fin du jeu
    let currentTime = new Date().getTime();
    let elapsedTime = Math.floor((currentTime - startTime) / 1000);
    alert(`Félicitations ! Vous avez trouvé le chiffre caché en ${formatTime(elapsedTime)}.`);
}

function showRestartButton() {
    // Créer un bouton "Recommencer"
    let restartButton = document.createElement('button');
    restartButton.textContent = 'Recommencer';
    restartButton.addEventListener('click', resetGame);

    // Ajouter le bouton au document
    document.querySelector('.barreRecherche #restartContainer').appendChild(restartButton);
}

function hideRestartButton() {
    // Supprimer le bouton "Recommencer" s'il existe
    let restartButton = document.querySelector('.barreRecherche #restartContainer button');
    if (restartButton) {
        restartButton.remove();
    }
}


// Ajouter un gestionnaire d'événements pour la touche Entrée
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        startGame();
    }
});
