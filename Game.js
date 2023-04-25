class Game {
  constructor() {
    //? Agregamos el fondo:
    this.background = new Image();
    this.background.src = "imagenes/fondo-nivel1.jpg";
    this.background2 = new Image();
    this.background2.src = "imagenes/fondo-nivel1-invertido.jpg";
    this.backgroundX = 0;
    this.backgroundX2 = canvas.width;
    this.backgroundVelocidad = 1;

    //? Agregamos el personaje principal:
    this.danteObj = new Dante();
    console.log(this.danteObj);

    //? Añadimos los pinchos y corazones:
    this.pinchosArr = [];
    this.corazonesArr = [];
    this.puntos = 0;
    this.nivel = 1;

    this.isGameOn = true;
  }

  drawBackground = () => {
    this.backgroundX -= this.backgroundVelocidad;
    this.backgroundX2 -= this.backgroundVelocidad;
    if (this.backgroundX <= - canvas.width) {
      this.backgroundX = canvas.width;
    }
    if (this.backgroundX2 <= -canvas.width) {
      this.backgroundX2 = canvas.width;
    }
    ctx.drawImage(this.background, this.backgroundX, 0, canvas.width, canvas.height);
    ctx.drawImage(this.background2, this.backgroundX2, 0, canvas.width, canvas.height)
  };

  gameOver = () => {
    // 1- detener el juego
    this.isGameOn = false;
    primerNivel.classList.add("hide");
    gameOver.classList.remove("hide");
    audioNivel1.pause();
    audioNivel1.currentTime = 0;
  };

  pinchosEnPantalla = (img) => {
    if (
      this.pinchosArr.length === 0 ||
      this.pinchosArr[this.pinchosArr.length - 1].x < canvas.width
    ) {
      let posicionRandomPincho = Math.random() * 300 + canvas.width + 200;
      let nuevoPincho = new Pincho(575, posicionRandomPincho, img);
      this.pinchosArr.push(nuevoPincho);
    }
  };

  corazonesEnPantalla = (img) => {
    if (
      this.corazonesArr.length === 0 ||
      this.corazonesArr[this.corazonesArr.length - 1].x < canvas.width
    ) {
      let posicionRandomCorazon = Math.random() * 300 + canvas.width + 400;
      let nuevoCorazon = new Corazon(505, posicionRandomCorazon, img);
      this.corazonesArr.push(nuevoCorazon);
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
        //console.log("dante se pinchó")
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

  dibujadoPuntuacion = () => {
    ctx.font = "26px Comic Sans MS";
    ctx.fillStyle = "pink";
    ctx.fillText(`Puntos: ${this.puntos}`, 430, 50);
  };

  logicaNivel1 = () => {
    if (this.nivel !== 1) {
      return;
    }
    this.pinchosEnPantalla("imagenes/pincho.png");
    this.colisionDantePincho();
    this.colisionDanteCorazon();
    this.danteObj.logicaSalto();
    this.pinchosArr.forEach((eachPincho) => {
      eachPincho.pinchosSeMueven();
    });
    this.corazonesArr.forEach((eachCorazon) => {
      eachCorazon.corazonesSeMueven();
    });

    this.corazonesEnPantalla("imagenes/corazon-primer-nivel.png");
    this.terminaNivel1();

    //? Dibujado de los elementos
    this.drawBackground();
    this.danteObj.draw();
    this.pinchosArr.forEach((eachPincho) => {
      eachPincho.draw();
    });
    this.corazonesArr.forEach((eachCorazon) => {
      eachCorazon.draw();
    });

    this.dibujadoPuntuacion();
  };

  logicaNivel2 = () => {
    if (this.nivel !== 2) {
      return;
    }
    this.pinchosEnPantalla("imagenes/pincho.png");
  };

  empiezaNivel2 = () => {
    this.background = new Image();
    this.background.src = "imagenes/intento.jpg";
    // this.nivel++;
  };

  terminaNivel1 = () => {
    if (this.puntos === 3) {
      // this.empiezaNivel2();
    }
  };

  limpiezaCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  gameLoop = () => {
    console.log("ejecutando recursion");

    //? Limpieza del canvas
    this.limpiezaCanvas()
    //? Acciones y movimientos de los elementos
    this.logicaNivel1();

    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
