const pantallaInicioDOM = document.querySelector("#pantalla-inicio");
const pantallaPerderDOM = document.querySelector("#gameOver");
const btnPlayDOM = document.querySelector("#playBtn");
const btnAgainDOM = document.querySelector("#AgainBtn");
const audioJuego = document.querySelector("#audio-1");
const puntuacionFinal = document.querySelector("#puntuacion");
const btnPauseJuego = document.querySelector("#btnPause");
const btnPauseMusic = document.querySelector("#btnMusic");
const listaRanking = document.querySelector("#lista")

const primerNivel = document.querySelector("#primer-nivel");
const canvas = primerNivel.querySelector(".my-Canvas");
const ctx = canvas.getContext("2d");

let gameObj;
let pausado = false;


const startGame = () => {
  pantallaInicioDOM.classList.add("hide");
  primerNivel.classList.remove("hide");
  
  gameObj = new Game();
  audioJuego.play();
  audioJuego.volume = 0.05;
  gameObj.gameLoop();
};

const playAgain = () => {
  primerNivel.classList.remove("hide");
  pantallaPerderDOM.classList.add("hide");

  gameObj = new Game();
  
  audioJuego.play();
  gameObj.gameLoop();
};


btnPlayDOM.addEventListener("click", startGame);
btnAgainDOM.addEventListener("click", playAgain);
canvas.addEventListener("click", gameObj.danteObj.imgSaltando);

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
});

btnPauseJuego.addEventListener('click', () => {
  gameObj.pausado = !gameObj.pausado
  if (gameObj.pausado) {
    audioJuego.pause();
  } else if (!gameObj.musicaPausada){
    audioJuego.play()
  }
  
});
btnPauseMusic.addEventListener('click', () => {
  if (!gameObj.musicaPausada) {
    audioJuego.pause();
    gameObj.musicaPausada = true;
  } else {
    gameObj.musicaPausada = false;

  if (!gameObj.pausado)
    audioJuego.play();
  }
    
});



