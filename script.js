/*** Page login ***/

  const guessButton = document.getElementById('guess-button');
  const mastermindButton = document.getElementById('mastermind-button');
  const startButton = document.getElementById('start-button');
  const pseudoInput = document.getElementById('pseudo-input');
  const errorMessage = document.getElementById('error-message');

  guessButton.addEventListener('click', () => {
    guessButton.classList.add('selected');
    mastermindButton.classList.remove('selected');
    startButton.disabled = false;
    errorMessage.style.display = 'none';
  });

  mastermindButton.addEventListener('click', () => {
    mastermindButton.classList.add('selected');
    guessButton.classList.remove('selected');
    startButton.disabled = false;
    errorMessage.style.display = 'none';
  });

  startButton.addEventListener('click', () => {
    const pseudo = pseudoInput.value.trim();
    if (pseudo === '') {
      errorMessage.style.display = 'block';
      return;
    }
    if (guessButton.classList.contains('selected')) {
      window.location.href = 'index.html';
    } else if (mastermindButton.classList.contains('selected')) {
      window.location.href = 'mastermind.html';
    } else {
      errorMessage.style.display = 'block';
    }
  });

/*** Page guess-numb ***/

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

/*** Récuperation des données en base ***/

/*** Pseudo ***/

document.getElementById('start-button').addEventListener('click', function() {
    var pseudo = document.getElementById('pseudo-input').value;

    if (pseudo !== "") {
        // Envoyer le pseudo au code PHP
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "insert_user.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log("Utilisateur inséré avec succès.");
                    // Rediriger l'utilisateur vers la page d'accueil ou une autre page
                    window.location.href = "accueil.php";
                } else {
                    console.error("Erreur lors de l'insertion de l'utilisateur.");
                }
            }
        };
        xhr.send("pseudo=" + encodeURIComponent(pseudo));
    } else {
        document.getElementById('error-message').textContent = "Veuillez entrer un pseudo.";
    }
});

/*** Temps ***/


var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var bestTime = JSON.parse(this.responseText).bestTime;
            document.getElementById("best-time").textContent = bestTime;
        }
    };
    xhr.open("GET", "get_best_time.php", true);
    xhr.send();
