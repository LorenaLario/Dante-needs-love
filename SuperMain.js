//! VARIABLES GLOBALES

const pantallaInicioDOM = document.querySelector("#pantalla-inicio");
const pantallaPerderDOM = document.querySelector("#gameOver");
const btnPlayDOM = document.querySelector("#playBtn");
const btnAgainDOM = document.querySelector("#AgainBtn");
const audioJuego = document.querySelector("#audio-1");


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
  audioJuego.play();
  gameObj.gameLoop();
};

const playAgain = () => {
  primerNivel.classList.remove("hide");
  pantallaPerderDOM.classList.add("hide");

  gameObj = new Game();
  
  audioJuego.play();
  gameObj.gameLoop();
};


//! ADD EVENT LISTENERS

btnPlayDOM.addEventListener("click", startGame);
btnAgainDOM.addEventListener("click", playAgain);

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    gameObj.danteObj.imgSaltando(); 
  }

  if (event.code === "KeyA") {
    gameObj.danteObj.haciaAtras(true)
  }

  if (event.code === "KeyD") {
    gameObj.danteObj.haciaDelante(true)
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "KeyD") {
    gameObj.danteObj.haciaDelante(false)
  }
  if (event.code === "KeyA") {
    gameObj.danteObj.haciaAtras(false)
  }
})
