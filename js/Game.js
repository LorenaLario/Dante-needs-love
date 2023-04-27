class Game {
  constructor() {
    this.background = new Image();
    this.background.src = "imagenes/fondo-nivel1.jpg";
    this.background2 = new Image();
    this.background2.src = "imagenes/fondo-nivel1-invertido.jpg";
    this.backgroundX = 0;
    this.backgroundX2 = canvas.width;
    this.backgroundVelocidad = 1;

    this.danteObj = new Dante();

    this.pinchosArr = [];
    this.corazonesArr = [];
    this.rayitosArr = [];
    this.puntosArr = JSON.parse(localStorage.getItem("puntuacion"));

    this.puntos = 0;
    this.nivel = 1;
    this.pausado = false;
    this.musicaPausada = false;
    this.isGameOn = true;
  }

  drawBackground = () => {
    if (!this.pausado) {
      this.backgroundX -= this.backgroundVelocidad;
      this.backgroundX2 -= this.backgroundVelocidad;
      if (this.backgroundX <= -canvas.width) {
        this.backgroundX = canvas.width;
      }
      if (this.backgroundX2 <= -canvas.width) {
        this.backgroundX2 = canvas.width;
      }
    }
    ctx.drawImage(this.background, this.backgroundX, 0, canvas.width, canvas.height);
    ctx.drawImage(this.background2, this.backgroundX2, 0, canvas.width, canvas.height);
  };

  gameOver = () => {
    this.isGameOn = false;
    primerNivel.classList.add("hide");
    gameOver.classList.remove("hide");

    audioJuego.pause();
    audioJuego.currentTime = 0;

    puntuacionFinal.innerText = `Tu puntuación es: ${this.puntos}`;
    if (this.puntosArr === null) {
      this.puntosArr = [];
    }
    this.puntosArr.push(this.puntos);
    let puntosArrJSON = JSON.stringify(this.puntosArr);
    localStorage.setItem("puntuacion", puntosArrJSON);
    this.almacenarRanking();
  };

  pinchosEnPantalla = () => {
    if (this.pinchosArr.length === 0 || this.pinchosArr[this.pinchosArr.length - 1].x < canvas.width) {
      let posicionRandomPincho = Math.random() * 300 + canvas.width + 200;
      let nuevoPincho = new Pincho(575, posicionRandomPincho, "imagenes/pincho.png");
      this.pinchosArr.push(nuevoPincho);
    }
  };

  pinchosEnPantallaNivel2 = (img) => {
    if (this.pinchosArr.length === 0 || this.pinchosArr[this.pinchosArr.length - 1].x < canvas.width / 1.5) {
      let posicionRandomPincho = Math.random() * 300 + canvas.width + 350;
      let nuevoPincho = new Pincho(575, posicionRandomPincho, img);
      this.pinchosArr.push(nuevoPincho);
    }
  };

  corazonesEnPantalla = () => {
    if (this.corazonesArr.length === 0 || this.corazonesArr[this.corazonesArr.length - 1].x < canvas.width) {
      let posicionRandomCorazon = Math.random() * 300 + canvas.width + 400;
      let nuevoCorazon = new Corazon(505, posicionRandomCorazon, "imagenes/corazon-primer-nivel.png");
      this.corazonesArr.push(nuevoCorazon);
    }
  };

  corazonesEnPantallaNivel2 = (img) => {
    if (this.corazonesArr.length === 0 || this.corazonesArr[this.corazonesArr.length - 1].x < canvas.width) {
      let posicionRandomCorazon = Math.random() * 300 + canvas.width + 600;
      let nuevoCorazon = new Corazon(505, posicionRandomCorazon, img);
      this.corazonesArr.push(nuevoCorazon);
    }
  };

  rayitosEnPantalla = () => {
    if (this.rayitosArr.length === 0 || this.rayitosArr[this.rayitosArr.length - 1].y > canvas.height) {
      let posicionRandomRayito = Math.random() * canvas.width;
      let nuevoRayito = new Rayito(posicionRandomRayito, "imagenes/rayito.png");
      this.rayitosArr.push(nuevoRayito);
    }
  };

  rayitosEnPantallaNivel3 = () => {
    if (this.rayitosArr.length === 0 || this.rayitosArr[this.rayitosArr.length - 1].y > canvas.height / 2) {
      let posicionRandomRayito = Math.random() * canvas.width;
      let nuevoRayito = new Rayito(posicionRandomRayito, "imagenes/rayito3.png");
      this.rayitosArr.push(nuevoRayito);
    }
  };

  colisionDantePincho = () => {
    this.pinchosArr.forEach((eachPincho) => {
      if (
        eachPincho.x < this.danteObj.x + this.danteObj.w &&
        eachPincho.x + eachPincho.w > this.danteObj.x &&
        eachPincho.y < this.danteObj.y + this.danteObj.h &&
        eachPincho.h + eachPincho.y > this.danteObj.y
      ) {
        this.gameOver();
      }
    });
  };

  colisionDanteCorazon = () => {
    this.corazonesArr.forEach((eachCorazon, index) => {
      if (
        eachCorazon.x < this.danteObj.x + this.danteObj.w &&
        eachCorazon.x + eachCorazon.w > this.danteObj.x &&
        eachCorazon.y < this.danteObj.y + this.danteObj.h &&
        eachCorazon.h + eachCorazon.y > this.danteObj.y
      ) {
        this.puntos++;
        this.corazonesArr.splice(index, 1);
      }
    });
  };

  colisionDanteRayito = () => {
    this.rayitosArr.forEach((eachRayito) => {
      if (
        eachRayito.x < this.danteObj.x + this.danteObj.w &&
        eachRayito.x + eachRayito.w > this.danteObj.x &&
        eachRayito.y < this.danteObj.y + this.danteObj.h &&
        eachRayito.h + eachRayito.y > this.danteObj.y
      ) {
        this.gameOver();
      }
    });
  };

  dibujadoPuntuacion = () => {
    ctx.font = "32px Comic Sans MS";
    ctx.fillStyle = "magenta";
    ctx.strokeStyle = "black";
    ctx.fillText(`Puntos: ${this.puntos}`, 430, 50);
    ctx.strokeText(`Puntos: ${this.puntos}`, 430, 50);
  };

  danteNoSeSale = () => {
    if (this.danteObj.x + this.danteObj.w > canvas.width) {
      this.danteObj.x = canvas.width - this.danteObj.w;
    } else if (this.danteObj.x < 0) {
      this.danteObj.x = 0;
    }
  };

  logicaNivel1 = () => {
    if (this.nivel !== 1) {
      return;
    }
    this.pinchosEnPantalla();
    this.corazonesEnPantalla();

    this.terminanNiveles();
  };

  logicaNivel2 = () => {
    if (this.nivel !== 2) {
      return;
    }
    this.pinchosEnPantallaNivel2("imagenes/pincho3.png");
    this.corazonesEnPantalla("imagenes/corazon-segundo-nivel.png");
    this.rayitosEnPantalla();
    this.colisionDanteRayito();
    this.rayitosArr.forEach((eachRayito) => {
      eachRayito.rayitosCaen();
    });

    this.terminanNiveles();
  };

  logicaNivel3 = () => {
    if (this.nivel !== 3) {
      return;
    }
    this.pinchosEnPantallaNivel2("imagenes/pincho3.png");
    this.corazonesEnPantallaNivel2("imagenes/corazon-tercer-nivel.png");
    this.rayitosEnPantallaNivel3();
    this.colisionDanteRayito();
    this.rayitosArr.forEach((eachRayito) => {
      eachRayito.rayitosCaen2();
    });
  };

  empiezaNivel2 = () => {
    this.background = new Image();
    this.background.src = "imagenes/fondo-nivel-2.jpg";
    this.background2 = new Image();
    this.background2.src = "imagenes/fondo-nivel-2-invertido.jpg";

    this.nivel = 2;
  };

  empiezaNivel3 = () => {
    this.background = new Image();
    this.background.src = "imagenes/fondo-nivel-3.jpg";
    this.background2 = new Image();
    this.background2.src = "imagenes/fondo-nivel-3-invertido.jpg";

    this.nivel = 3;
  };

  terminanNiveles = () => {
    if (this.puntos === 5) {
      this.empiezaNivel2();
    } else if (this.puntos === 10) {
      this.empiezaNivel3();
    }
  };

  limpiezaCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  almacenarRanking = () => {
    this.puntosArr.sort((a, b) => {
      return b - a;
    });
    listaRanking.children[0].innerText = this.puntosArr[0];
    listaRanking.children[1].innerText = this.puntosArr[1];
    listaRanking.children[2].innerText = this.puntosArr[2];
  };

  gameLoop = () => {

    if (!this.pausado) {
      this.limpiezaCanvas();

      this.logicaNivel1();
      this.logicaNivel2();
      this.logicaNivel3();
      this.danteNoSeSale();
      this.colisionDantePincho();
      this.colisionDanteCorazon();
      this.danteObj.pasitoDFluido();
      this.danteObj.pasitoIFluido();
      this.danteObj.logicaSalto();
      this.pinchosArr.forEach((eachPincho) => {
        eachPincho.pinchosSeMueven();
      });
      this.corazonesArr.forEach((eachCorazon) => {
        eachCorazon.corazonesSeMueven();
      });
    }

    this.drawBackground();
    this.danteObj.draw();
    this.pinchosArr.forEach((eachPincho) => {
      eachPincho.draw();
    });
    this.corazonesArr.forEach((eachCorazon) => {
      eachCorazon.draw();
    });
    this.dibujadoPuntuacion();
    this.rayitosArr.forEach((eachRayito) => {
      eachRayito.draw();
    });

    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
};
