let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startTimer() {
    timer = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        displayTime();
    }, 1000);
}

function displayTime() {
    const formattedTime = 
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;

    document.getElementById('chronoDisplay').innerText = formattedTime;
}

document.getElementById('start').addEventListener('click', function () {
    // Réinitialiser le chronomètre
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    displayTime();
  // Générer un chiffre aléatoire entre 1 et 1000
  var chiffreCache = Math.floor(Math.random() * 1000) + 1;

  // Récupérer la valeur saisie par l'utilisateur
  var userInput = parseInt(document.getElementById('userInput').value);

  // Vérifier si la valeur est inférieure, égale ou supérieure au chiffre caché
  if (userInput < chiffreCache) {
      document.querySelector('.chiffreInf').innerHTML = 'Le chiffre est inférieur à ' + chiffreCache;
      document.querySelector('.chiffreSupp').innerHTML = ''; // Effacer le message précédent
  } else if (userInput > chiffreCache) {
      document.querySelector('.chiffreSupp').innerHTML = 'Le chiffre est supérieur à ' + chiffreCache;
      document.querySelector('.chiffreInf').innerHTML = ''; // Effacer le message précédent
  } else {
      document.querySelector('.chiffreInf').innerHTML = '';
      document.querySelector('.chiffreSupp').innerHTML = '';
  }
});

