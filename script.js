// DOM Elements
let points = 100;
const elements = {
  newGame: document.querySelector(".new-game"),
  rollDice: document.querySelector(".roll-dice"),
  hold: document.querySelector(".hold"),
  container: document.querySelector(".container"),
  diceImg: document.querySelector(".dice-box img"),
  scores: [document.querySelector(".score1"), document.querySelector(".score2")],
  currents: [document.querySelector(".current1"), document.querySelector(".current2")],
  nameOfplayer1: document.querySelector(".player1-value"),
  nameOfplayer2: document.querySelector(".player2-value"),
  points: document.querySelector(".points"),
  start: document.querySelector(".start"),
  skip: document.querySelector(".skip"),
  restart: document.querySelector(".restart"),
};
elements.skip.onclick = () => {
  document.querySelector(".start-game-box").remove();
  document.querySelector(".poi").textContent = points;
};
elements.start.onclick = () => {
  if (elements.nameOfplayer1.value && elements.nameOfplayer2.value && elements.points.value) {
    document.querySelector(".player-1 h1").textContent = elements.nameOfplayer1.value;
    document.querySelector(".player-2 h1").textContent = elements.nameOfplayer2.value;
    points = elements.points.value;
    document.querySelector(".poi").textContent = points;
    document.querySelector(".start-game-box").classList.add("hidden");
  }
};
// Game State
const state = {
  activePlayer: 0,
  currentScore: 0,
  scores: [0, 0],
  playing: true,
};

// Helper Functions
const rollDiceNumber = () => Math.floor(Math.random() * 6) + 1;

const updateDice = (num) => {
  elements.diceImg.src = `./imgs/dice-${num}.png`;
};

const updateUI = () => {
  elements.scores.forEach((el, i) => (el.textContent = state.scores[i]));
  elements.currents.forEach((el, i) => (el.textContent = i === state.activePlayer ? state.currentScore : 0));
};

const switchPlayer = () => {
  document.querySelector(".switch").currentTime = 0;
  document.querySelector(".switch").play();
  state.currentScore = 0;
  state.activePlayer = state.activePlayer === 0 ? 1 : 0;
  elements.container.classList.toggle("role-player-2");
  updateUI();
};

const checkWinner = () => {
  const winner = state.scores.findIndex((score) => score >= points);
  if (winner !== -1) {
    document.querySelector(".woin-sound").play();
    state.playing = false;
    elements.rollDice.disabled = true;
    elements.container.classList.remove("role-player-2");
    elements.container.classList.add(`woin${winner + 1}`);
  }
};

const reset = () => {
  state.activePlayer = 0;
  state.currentScore = 0;
  state.scores = [0, 0];
  state.playing = true;
  elements.rollDice.disabled = false;
  elements.container.classList.remove("role-player-2", "woin1", "woin2");
  updateDice(1);
  updateUI();
};

// Event Listeners
elements.rollDice.addEventListener("click", () => {
  if (!state.playing) return;
  document.querySelector(".rolling-dice").currentTime = 0;
  document.querySelector(".rolling-dice").play();
  const dice = rollDiceNumber();
  updateDice(dice);

  if (dice !== 1) {
    state.currentScore += dice;
    updateUI();
  } else {
    updateDice(1);
    switchPlayer();
  }
});

elements.hold.addEventListener("click", () => {
  if (!state.playing) return;
  document.querySelector(".switch").currentTime = 0;
  document.querySelector(".switch").play();
  state.scores[state.activePlayer] += state.currentScore;
  updateUI();
  checkWinner();

  if (state.playing) {
    updateDice(1);
    switchPlayer();
  }
});

elements.newGame.addEventListener("click", reset);

// Initialize
reset();

// Restart
elements.restart.onclick = () => {
  location.reload();
};
// const newGame = document.querySelector(".new-game");
// const rollDice = document.querySelector(".roll-dice");
// const hold = document.querySelector(".hold");
// const score1 = document.querySelector(".score1");
// const score2 = document.querySelector(".score2");
// const current1 = document.querySelector(".current1");
// const current2 = document.querySelector(".current2");

// let role = 1;
// let x = 0;
// let randomNumber = 1;
// let sc1 = 0;
// let sc2 = 0;
// rollDice.addEventListener("click", () => {
//   randomNumber = Math.floor(Math.random() * 6) + 1;
//   document.querySelector(".dice-box img").src = `./imgs/dice-${randomNumber}.png`;
//   if (role === 1) {
//     if (randomNumber !== 1) {
//       x += randomNumber;
//       current1.textContent = x;
//     } else {
//       x = 0;
//       role = 2;
//       randomNumber = 1;
//       document.querySelector(".dice-box img").src = `./imgs/dice-${randomNumber}.png`;
//       current1.textContent = 0;
//       document.querySelector(".container").classList.add("role-player-2");
//     }
//   } else if (role === 2) {
//     if (randomNumber !== 1) {
//       x += randomNumber;
//       current2.textContent = x;
//     } else {
//       x = 0;
//       role = 1;
//       randomNumber = 1;
//       document.querySelector(".dice-box img").src = `./imgs/dice-${randomNumber}.png`;
//       current2.textContent = 0;
//       document.querySelector(".container").classList.remove("role-player-2");
//     }
//   }
// });

// hold.onclick = () => {
//   if (role === 1) {
//     sc1 = parseInt(current1.textContent) + parseInt(score1.textContent);
//     document.querySelector(".container").classList.add("role-player-2");
//     score1.textContent = x;
//     role = 2;
//     current1.textContent = 0;
//     score1.textContent = sc1;
//   } else if (role === 2) {
//     sc2 = parseInt(current2.textContent) + parseInt(score2.textContent);
//     document.querySelector(".container").classList.remove("role-player-2");
//     score2.textContent = x;
//     role = 1;
//     current2.textContent = 0;
//     score2.textContent = sc2;
//   }
//   randomNumber = 1;
//   document.querySelector(".dice-box img").src = `./imgs/dice-${randomNumber}.png`;
//   x = 0;
//   checkScore(sc1, sc2);
// };

// function checkScore(sco1, sco2) {
//   if (sco1 >= 100) {
//     document.querySelector(".container").classList.remove("role-player-2");
//     document.querySelector(".container").classList.add("woin1");
//     rollDice.disabled = true;
//   } else if (sco2 >= 100) {
//     document.querySelector(".container").classList.remove("role-player-2");
//     document.querySelector(".container").classList.add("woin2");
//     rollDice.disabled = true;
//   }
// }

// newGame.onclick = () => {
//   role = 1;
//   x = 0;
//   randomNumber = 1;
//   sc1 = 0;
//   sc2 = 0;
//   score1.textContent = x;
//   score2.textContent = x;
//   current1.textContent = 0;
//   current2.textContent = 0;
//   rollDice.disabled = false;
//   document.querySelector(".container").classList.remove("woin1");
//   document.querySelector(".container").classList.remove("woin2");
// };
