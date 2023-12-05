/*// Génère un chiffre aléatoire entre 1 et 100
let secretNumber = generateRandomNumber();

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

let displayedNumbers = []; // Tableau pour stocker les chiffres affichés
let displayedNumberElement; // Variable pour stocker l'élément affiché
let timer; // Variable pour stocker le timer

function startTimer() {
    // Démarre le chrono de 30 secondes
    timer = setTimeout(() => {
      document.getElementById('feedback').innerText = 'Perdu! Le temps est écoulé.';
      document.getElementById('userGuess').disabled = true; // Désactive la saisie après la fin du temps
    }, 30000); // 30 secondes
  }

  function resetTimer() {
    // Réinitialise le chrono
    clearTimeout(timer);
  }

function checkGuess() {
  // Récupère la valeur saisie par l'utilisateur
  const userGuess = document.getElementById('userGuess').value;

  // Vérifie si la saisie est un nombre
  if (isNaN(userGuess) || userGuess === '') {
    document.getElementById('feedback').innerText = 'Veuillez entrer un nombre valide.';
    return;
  }

  // Convertit la saisie en nombre entier
  const guess = parseInt(userGuess);

  // Compare le chiffre choisi par l'utilisateur avec le chiffre secret
  if (guess === secretNumber) {
    document.getElementById('feedback').innerText = 'Félicitations! Vous avez deviné le chiffre!';
    document.getElementById('userGuess').disabled = true; // Désactive la saisie après avoir trouvé le chiffre
  } else if (guess < secretNumber) {
    document.getElementById('feedback').innerText = 'Le chiffre est plus grand!';
    displayNumber(guess, 'bottom'); // Affiche le chiffre en bas
  } else {
    document.getElementById('feedback').innerText = 'Le chiffre est plus petit!';
    displayNumber(guess, 'top'); // Affiche le chiffre en haut
  }

  // Compare le chiffre choisi par l'utilisateur avec le chiffre secret
  if (guess === secretNumber) {
    document.getElementById('feedback').innerText = 'Félicitations! Vous avez deviné le chiffre!';
    document.getElementById('userGuess').disabled = true; // Désactive la saisie après avoir trouvé le chiffre
  } else if (guess < secretNumber) {
    document.getElementById('feedback').innerText = 'Le chiffre est plus grand!';
    displayNumber(guess, 'bottom'); // Affiche le chiffre en bas
  } else {
    document.getElementById('feedback').innerText = 'Le chiffre est plus petit!';
    displayNumber(guess, 'top'); // Affiche le chiffre en haut
  }
}

function displayNumber(number, position) {
  // Supprime le chiffre le plus ancien s'il y en a plus de 5 affichés
  if (displayedNumbers.length >= 5) {
    const oldestNumber = displayedNumbers.shift();
    const elementToRemove = document.getElementById(`displayedNumber-${oldestNumber}`);
    if (elementToRemove) {
      elementToRemove.remove();
    }
    // Démarre le chrono uniquement si ce n'est pas déjà fait
  if (!timer) {
    startTimer();
  }
  }

  // Supprime l'élément précédemment affiché s'il existe
  if (displayedNumberElement) {
    displayedNumberElement.remove();
  }

  // Crée un élément paragraphe
  const displayElement = document.createElement('p');

  // Ajoute la classe CSS pour la mise en forme
  displayElement.classList.add('displayed-number');

  // Affecte la valeur du chiffre à afficher
  displayElement.innerText = number;

  // Ajoute un identifiant unique à l'élément
  displayElement.id = `displayedNumber-${number}`;

  // Ajoute l'élément à la fin du corps du document
  document.body.appendChild(displayElement);

  // Stocke l'élément affiché dans la variable
  displayedNumberElement = displayElement;

  // Ajoute le chiffre au tableau
  displayedNumbers.push(number);

  // Positionne le chiffre en haut ou en bas de la page
  if (position === 'top') {
    displayElement.style.top = '10px';
  } else {
    displayElement.style.bottom = '10px';
  }
}

function resetGame() {
  // Réinitialise le jeu en générant un nouveau chiffre secret
  secretNumber = generateRandomNumber();
  document.getElementById('userGuess').value = ''; // Réinitialise la valeur de la saisie
  document.getElementById('userGuess').disabled = false; // Réactive la saisie
  document.getElementById('feedback').innerText = ''; // Efface le feedback

  // Supprime tous les éléments affichés
  displayedNumbers.forEach(number => {
    const elementToRemove = document.getElementById(`displayedNumber-${number}`);
    if (elementToRemove) {
      elementToRemove.remove();
    }
  });

  // Réinitialise le tableau
  displayedNumbers = [];

  // Réinitialise le chrono
  resetTimer();
}
*/

var h1 = document.getElementsByTagName('h1')[0];
var start = document.getElementById('start');
var sec = 0;
var min = 0;
var hrs = 0;

function tick() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
    if (min >= 60) {
      min = 0;
      hrs++;
    }
  }
}

function add() {
  tick();
  h1.textContent = (hrs > 9 ? hrs : '0' + hrs) + ':' +
      (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
  timer();
}

function timer() {
  t = setTimeout(add, 30);
}


// Génère un Chiffre au hasard aléatoire.
function getRandomNumber() {
  return Math.floor(Math.random() * max)
}

start.onclick = timer;

// Repère si la touche 'Entrer' est appuyer.
document.addEventListener("keyup", function(event) {
  if (event.code === 'Enter') {
      alert('Enter is pressed!');
  }
});
