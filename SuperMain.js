//! VARIABLES GLOBALES

const pantallaInicioDOM = document.querySelector("#pantalla-inicio");
const pantallaPerderDOM = document.querySelector("#gameOver");
const BtnPlayDOM = document.querySelector("#playBtn");
const BtnAgainDOM = document.querySelector("#AgainBtn");

const primerNivel = document.querySelector("#primer-nivel");
const canvas = primerNivel.querySelector(".my-Canvas");
const ctx = canvas.getContext("2d");

let gameObj;

//! FUNCIONES QUE MANEJAN EL ESTADO DEL JUEGO

const startGame = () => {
  pantallaInicioDOM.classList.add("hide");
  primerNivel.classList.remove("hide");

  gameObj = new Game();
  console.log(gameObj);

  gameObj.gameLoop();
};

const playAgain = () => {
  primerNivel.classList.remove("hide");
  pantallaPerderDOM.classList.add("hide");

  gameObj = new Game();
  gameObj.gameLoop();
};

//! ADD EVENT LISTENERS

BtnPlayDOM.addEventListener("click", startGame);
BtnAgainDOM.addEventListener("click", playAgain);

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    gameObj.danteObj.jump();
  }
});
