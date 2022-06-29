'use strict';
// Select Tage elments
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// Startin condations
const init = function () {
  scores = [0, 0]; //This Array For player one and player two
  currentScore = 0; // to make score Defualt on Start 0
  activePlayer = 0; // player when he play score start 0
  playing = true; // when players playing is going be true when one of player win 🏆 change to fals to stop play ⛔

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEL.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// Make function to call in every place DRY

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1- Genrating a randome dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2-Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3-check for rolled 1: If true, switch to next player
    if (dice !== 1) {
      // Add Current Score
      currentScore += dice;
      // current0El.textContent = currentScore; //Change to be Dunamic
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Swith to next player
      switchPlayer();
    }
  }
});

// Holding  functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1- Add Current Score to active player score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2- Check if player Score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finsh the Game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Swith to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
