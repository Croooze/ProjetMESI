let nombreCache;
let startTime;
let timerInterval;
let elapsedTimeToWin; 

function startGame() {
    if (!nombreCache) {
        nombreCache = Math.floor(Math.random() * 10) + 1;
        startTime = new Date().getTime(); 
        timerInterval = setInterval(updateTimer, 10); 
    }

    let userGuessInput = document.getElementById('userGuess');
    let userGuess = parseInt(userGuessInput.value);

    if (!isNaN(userGuess)) {
        if (userGuess < nombreCache) {
            document.querySelector('.chiffreInf').textContent = `Le chiffre caché est supérieur à ${userGuess}.`;
            document.querySelector('.chiffreSupp').textContent = '';
        } else if (userGuess > nombreCache) {
            document.querySelector('.chiffreSupp').textContent = `Le chiffre caché est inférieur à ${userGuess}.`;
            document.querySelector('.chiffreInf').textContent = '';
        } else {
            document.querySelector('.chiffreInf').textContent = '';
            document.querySelector('.chiffreSupp').textContent = ''; // Réinitialise le message
            clearInterval(timerInterval);
            displayElapsedTime();
            showRestartButton();
            resetGame();
        }

        userGuessInput.value = '';
    } else {
        alert("Veuillez entrer un nombre valide.");
    }
}

function resetGame() {
    nombreCache = null;
    startTime = null;
    timerInterval = null;
    elapsedTimeToWin = null;
    document.querySelector('.chiffreInf').textContent = '';
    document.querySelector('.chiffreSupp').textContent = '';
    document.querySelector('time').textContent = '00:00:00'; 
}

function showRestartButton() {
    let restartButton = document.createElement('button');
    restartButton.textContent = 'Recommencer';
    restartButton.onclick = function() {
        window.location.reload();
    };
    document.getElementById('restartContainer').appendChild(restartButton);
}

function updateTimer() {
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
    let minutes = Math.floor(elapsedTime / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = elapsedTime % 1000;

    // Met à jour la variable elapsedTimeToWin avec le format correct
    elapsedTimeToWin = `${padZero(minutes)}:${padZero(seconds)}.${padZero(Math.floor(milliseconds / 10), 2)}`;

    document.querySelector('time').textContent = `${padZero(minutes)}:${padZero(seconds)}.${padZero(Math.floor(milliseconds / 10), 2)}`;
}

function displayElapsedTime() {
    // Affiche le temps total écoulé à la fin du jeu
    document.querySelector('.chiffreSupp').textContent = `Félicitations ! Vous avez trouvé le chiffre caché en ${elapsedTimeToWin} secondes.`;
}

function padZero(num, length = 2) {
    return num.toString().padStart(length, '0');
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        startGame();
    }
});
