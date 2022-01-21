'use strict';

//selecting elements
const score0El = document.querySelector('#score--0'); //way 1
const currscore0El = document.querySelector('#current--0'); //way 1
const score1El = document.getElementById('score--1'); //way2
const currscore1El = document.getElementById('current--1'); //way2
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const btnClose = document.querySelector('.close-modal');
const modal = document.querySelector('.modal-card');
const overlay = document.querySelector('.overlay');

let beat = new Audio('yay.mp3');

//initial conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let totalScore = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//functions

function init() {
  console.log('active player: ' + activePlayer);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  score0El.textContent = 0;
  score1El.textContent = 0;
  currscore0El.textContent = 0;
  currscore1El.textContent = 0;
  diceEl.classList.add('hidden');

  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  player0.classList.add('player--active');
  player0.classList.add('focusActive');
  player1.classList.remove('focusActive');
  playing = true;
}

init();

function closeModal(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');

}
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  if (activePlayer === 0) {
    player0.classList.add('focusActive');
    player1.classList.remove('focusActive');
  } else {
    player0.classList.remove('focusActive');
    player1.classList.add('focusActive');
  }
  //   document.querySelector(`.player--${activePlayer}`).classList.toggle('focusActive');
  //   document.querySelector(`.player--${activePlayer}`).classList.remove('focusActive');
}

const start = () => {
  setTimeout(function () {
    confetti.start();
  }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  Stop

const stop = () => {
  setTimeout(function () {
    confetti.stop();
  }, 3000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};

//eventListeners
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a random number b/w 1-6
    const dice = Math.trunc(Math.random() * 6) + 1;

    //accordingly match the image of the dice

    diceEl.src = `dice-${dice}.png`; //dice changes everytime u roll..the image is imported according to the value
    diceEl.classList.remove('hidden');
    console.log(dice);

    //check for roll 1?switch:continue
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    totalScore[activePlayer] = totalScore[activePlayer] + currentScore;
    console.log(totalScore[activePlayer]);
    //updating the total score according to whoever was the active player
    //adding the currentScore to the total score
    document.getElementById(`score--${activePlayer}`).textContent =
      Number(document.getElementById(`score--${activePlayer}`).textContent) +
      currentScore;

    // resetting that active guy's score
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    if (totalScore[activePlayer] >= 100) {
      playing = false;

    
      beat.play();
      
      start();
      stop();

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //switching the active player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
overlay.addEventListener('click',closeModal);


btnClose.addEventListener('click', closeModal);
document.addEventListener('keydown',function(e){
    if (e.key==='Escape') {

        if (!modal.classList.contains('hidden')) {
            
            console.log(e.key);
            closeModal();
            
        }

    }
});
